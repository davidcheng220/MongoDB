from pymongo import MongoClient

client = MongoClient(
    'mongodb://localhost:27017/',
    connectTimeoutMS=3000,
    socketTimeoutMS=2000,
    serverSelectionTimeoutMS=5000
)

# 使用這個連接進行操作
db = client['cii103']
collection = db['test_timeout_coll']

try:
    result = collection.insert_one({"name": "test", "time": "now"})
    print("Insert result:", result.inserted_id)
except Exception as e:
    print("An error occurred:", e)
