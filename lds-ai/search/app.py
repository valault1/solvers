from flask import Flask, render_template, request, jsonify
import chromadb

# Initialize Chroma client and connect to the database
client = chromadb.HttpClient(host="localhost", port=8000)
collection = client.get_or_create_collection("content")

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('search_text')
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # Perform the query on the Chroma collection
    results = collection.query(query_texts=[query], n_results=5)
    print(results)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)