from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')

database_names = client.list_database_names()
print("Databases available:")
pprint(database_names)

print('-' * 40)

db = client['cii103']
collection_names = db.list_collection_names()
print("Collections in 'cii103':")
pprint(collection_names)

