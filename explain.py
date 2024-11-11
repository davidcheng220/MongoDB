from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

query = {'age': 100}
explain_data = db.usersNonIndex.find(query).explain()

pprint(explain_data['executionStats'])
