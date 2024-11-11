from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

index_name = db.usersNonIndex.create_index([('username', 1),('age', 1)])

print(f"Index created: {index_name}")
