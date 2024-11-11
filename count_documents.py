from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

count = db.usersNonIndex.count_documents({})

print("Number of documents in the usersNonIndex:", count)

count_over_25 = db.usersNonIndex.count_documents({"age": {"$gt": 25}})

print("Number of documents with age > 25:", count_over_25)
