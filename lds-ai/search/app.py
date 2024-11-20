from flask import Flask, render_template, request, jsonify
import chromadb
from chromadb import PersistentClient
import google.generativeai as genai
import os
from google.protobuf.json_format import MessageToJson


# Initialize Chroma client and connect to the database
client = PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("content")

app = Flask(__name__)

# initialize gemini ai
api_key = open(".apikey", "r").read()
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('search_text')
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # Perform the query on the Chroma collection
    results = collection.query(query_texts=[query],
                               #where_document={"$contains":query},
                               n_results=25)


    texts_for_prompt = []
    for i in range(len(results['documents'][0])):
        texts_for_prompt.append("id: %s\ndocument: %s" % (results['ids'][0][i], results['documents'][0][i]) )
    
    print("generating prompt with %s documents..." % len(texts_for_prompt))

    prompt = f"""
    You are a helpful assistant. You will be given a list of text documents with their ids.
    You will be given a search query. 
    You will return the ids of the 5 documents that are most relevant to the search query. 
    Don't provide any other text or reasoning, just list the 5 ids separated by new line characters.
    Thanks in advance!

    the query is: {query}

    Here are the ids and documents, separated by "-----":
    {"-----".join(texts_for_prompt)}
    """ 
    response = model.generate_content(prompt)
    print(response.text)
    print("tokens used: %s" % response._result.usage_metadata.total_token_count)
    relevant_ids = [x for x in response.text.split("\n") if x]
    relevant_documents = []
    relevant_metadatas = []
    ids = results["ids"][0]
    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    for i in range(len(ids)):
        if ids[i] in relevant_ids:
            relevant_documents.append(documents[i])
            relevant_metadatas.append(metadatas[i])
    

    response = {}
    response["documents"] = relevant_documents
    response["metadatas"] = relevant_metadatas
    response["ids"] = relevant_ids

    question_prompt = f"""
    You are a helpful assistant. You will be given a list of 5 text documents.
    You will be given a search query. 
    for each document, answer the question: what does this document say that is relevant to the query?
    Don't provide any other text or reasoning, just list the 5 answers separated by a single new line character.
    Be strict about that answer format!

    Thanks in advance!

    the query is: {query}

    Here are the documents, separated by "-----":
    {"-----".join(relevant_documents)}
    """ 
    print("asking the AI to summarize the prompts...")
    question_response = model.generate_content(question_prompt)
    response["ai_answers"] = [x for x in question_response.text.split("\n") if x]
    print(question_response.text)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)