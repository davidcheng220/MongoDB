from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

db.users.drop()
user = { "_id": 1, "name": "John Doe", "interests": ["reading", "hiking"] }
db.users.insert_one(user)


result = db.users.update_one(
    {'_id': 1},
    {'$push': {'interests': 'cooking'}}
)

if result.matched_count > 0:
    print("Matched documents:", result.matched_count)
    if result.modified_count > 0:
        print("Modified documents:", result.modified_count)
        pprint(db.users.find_one({'_id':1}))
    else:
        print("No documents were modified.")
else:
    print("No documents matched the query.")
