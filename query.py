from pymongo import MongoClient
from pprint import pprint

client = MongoClient()
db = client.cii103

for doc in db.iiiCollection.find({"age": {"$gte": 18, "$lte": 30}},{'_id': False}):
    pprint(doc)

print( '-' * 30)

docs = db.inventory.find( 
    {
      "$or":[
              {"quantity":50}
              ,
              {
                  "price":{
                      "$gt":10,
                      "$lt":20
                      }
              }
              ,
              {"price":{"$in":[10,20]}}
          ]
    }
    ,
    {"_id":0,"level":0}
);

for doc in docs:
    pprint(doc)


