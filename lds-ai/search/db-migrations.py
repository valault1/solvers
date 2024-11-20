import os
from time import time
import chromadb
from chromadb import PersistentClient
import json
from typing import Dict, List
import hashlib

class Timer:
    def __init__(self):
        self.start_time = time()
    
    def log(self, message):
        elapsed = time() - self.start_time
        print("took %.2f seconds to %s" % (elapsed, message))

def hash(str):
  return hashlib.shake_128(str.encode(encoding="utf-8", errors="strict")).hexdigest(4)


base_file_path = os.getcwd() + "/../data-scraping/src/data/"
file_names = ["book-of-mormon-success.txt","conference-talk-success.txt"]
file_paths = [os.path.join(base_file_path, file_name) for file_name in file_names]
BATCH_SIZE = 100

client = PersistentClient(path="./chroma_db")
 # Get or create collection
collection_name = "content"
try:
    collection = client.get_collection(collection_name)
    client.delete_collection(collection_name)
finally:
    collection = client.create_collection(collection_name)

whole_migration_timer = Timer()
for file_path in file_paths: 
  file_timer = Timer()
  print("now processing file: %s" % file_path)
  file = open(file_path).read()

  contents = file.split("----- NEW CONTENT -----\n")

  documents=[]
  metadatas=[]
  ids=[]
  for idx in range(len(contents)):
    content = contents[idx]
    text = "\n".join(content.split("\n")[1:])
    metadata = json.loads(content.split("\n")[0])
    if ("title" in metadata and "contentType" in metadata):
      id = metadata["title"] +"-" +  metadata["contentType"] + "-" + hash(text)
    else:
      print("TITLE NOT FOUND")
      print(metadata)
      id = hash(text)
    
    documents.append(text)
    metadatas.append(metadata)
    ids.append(id)
    if len(documents) >= BATCH_SIZE or idx == len(contents):
      print("Adding documents %s to %s"%  (idx-BATCH_SIZE+1, idx+1))
      t = Timer()
      collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
      )
      t.log("add documents")
      documents=[]
      metadatas=[]
      ids=[]
  file_timer.log("process file")

whole_migration_timer.log("process all files")
  

