import pymongo
from pymongo import MongoClient
client = MongoClient()
db = client.cii103
# query_dict = {"price":{"$not":{"$gte":10}}}
# for i in db.inventory.find(query_dict, {"_id":False}):
#     print(i)

# for i in db.food2.find({"$where": "Object.keys(obj).length !== new Set(Object.keys(obj).map((k) => obj[k])).size"}):
#     print(i)

cursor = db.grades.aggregate( [
  {
    "$project":
      {
        "name" : 1,
        "summary" :
        {
          "$switch":
            {
              "branches": [
                {
                  "case": { "$gte" : [ { "$avg" : "$scores" }, 90 ] },
                  "then": "Doing great!"
                },
                {
                  "case": { "$and" : [ { "$gte" : [ { "$avg" : "$scores" }, 80 ] },
                                   { "$lt" : [ { "$avg" : "$scores" }, 90 ] } ] },
                  "then": "Doing pretty well."
                },
                {
                  "case": { "$lt" : [ { "$avg" : "$scores" }, 80 ] },
                  "then": "Needs improvement."
                }
              ],
              "default": "No scores found."
            }
         }
      }
   }
] )

for j in cursor:
    print(j)