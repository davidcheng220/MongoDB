from pymongo import MongoClient
from bson.objectid import ObjectId
from pymongo.collection import ReturnDocument

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

db.tasks.drop()

task = {'task': 'Update software', 'status': 'pending'}
task_id = db.tasks.insert_one(task).inserted_id

result = db.tasks.find_one_and_update(
    {'_id': task_id, 'status': 'pending'},
    {"$set": {'status': 'completed'}},
    return_document=ReturnDocument.AFTER
)

print("Updated document:", result)
