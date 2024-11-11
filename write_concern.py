from pymongo import MongoClient, WriteConcern
from pymongo.collection import ReturnDocument

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
db.mycollection.drop()

collection = db.get_collection('mycollection', write_concern=WriteConcern(w=1))

result = collection.insert_one({'name': 'John Doe', 'age': 28})

print("Inserted ID:", result.inserted_id)

#########

wc = WriteConcern(w='majority', wtimeout=1000)
collection = db.get_collection('mycollection', write_concern=wc)

try:
    result = collection.insert_one({'name': 'Alice Huang', 'age': 30})
    print("Inserted ID:", result.inserted_id)
except Exception as e:
    print("An error occurred:", e)
