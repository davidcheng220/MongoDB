from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

db.users.drop()

result = db.users.insert_one({ "_id": 1, "name": "John", "age": 28, "score": 50 })
pprint(result)
if result.acknowledged:
    result = db.users.update_one(
        {"_id": 1},
        {
            "$inc": {"age": 1, "score": 10},
            "$set": {"status": "active"}
        }
    )
    pprint(result)

    if result.matched_count > 0:
        print("Document updated.")
        pprint(db.users.find_one({'_id':1}))
    else:
        print("No document matched the query.")
