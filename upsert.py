from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
db.employees.drop()

result = db.employees.update_one(
    {'name': 'Alice'},
    {'$set': {'age': 30, 'position': 'Data Analyst'}},
    upsert=True
)

if result.upserted_id is not None:
    print("No document was found, so one was inserted with _id:", result.upserted_id)
    pprint(db.employees.find_one())
else:
    print("Matched documents:", result.matched_count)
    print("Modified documents:", result.modified_count)
