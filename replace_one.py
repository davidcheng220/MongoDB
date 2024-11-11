from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

db.users.drop()

db.users.insert_one({"_id":1, "name": "Jane"})

result = db.users.replace_one(
    {"_id": 1},
    {"_id": 1, "name": "Jane Doe", "age": 32}
)

if result.matched_count > 0:
    print("Document replaced. Modified count:", result.modified_count)
else:
    print("No document matched the query. No changes made.")

upsert_result = db.users.replace_one(
    {"_id": 2},
    {"_id": 2, "name": "Alice Johnson", "age": 25},
    upsert=True
)

if upsert_result.upserted_id is not None:
    print("No document was found, so one was inserted with _id:", upsert_result.upserted_id)
else:
    print("Document replaced. Modified count:", upsert_result.modified_count)
