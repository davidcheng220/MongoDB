from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
db.capped_coll2.drop()

collection = db.create_collection(
    "capped_coll2",
    capped=True,
    size=2000,
    max=10
)

print("Capped collection created: capped_coll2")
pprint(collection)

# for i in range(100):
#     doc = {'_id': i, 'message': f'This is document {i}'}
#     collection.insert_one(doc)

documents = [{'_id': i, 'message': f'This is document {i}'} for i in range(100)]
collection.insert_many(documents)

print("100 documents have been inserted one by one.")

for doc in collection.find():
    pprint(doc)