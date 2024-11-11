from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.binary import Binary
from bson.code import Code
from bson.decimal128 import Decimal128
from datetime import datetime, timezone, timedelta
from pprint import pprint
import os


client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
db.test_bson.drop()

doc = {
    "_id": ObjectId(),
    "binary_data": Binary(os.urandom(50)),
    "js_code": Code("function() { return true; }"),
    "current_utc_time": datetime.utcnow(),
    "current_time": datetime.now(),
    "custom_time": datetime(2023, 5, 1, 18, 13, 0, tzinfo=timezone(timedelta(hours=8))),
    "financial_data": Decimal128('12345.6789')
}

result = db.test_bson.insert_one(doc)

if result.acknowledged:
    print(f"Document inserted with _id: {doc['_id']}")
    pprint(db.test_bson.find_one())
else:
    print("Failed to insert document")
