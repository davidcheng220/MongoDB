import pprint
import pymongo
from pymongo import MongoClient
client = MongoClient()
db = client['cii103']


cursor = db.employee.aggregate(
  [
    {
      "$project":{
         "員工":"$name",
         "_id":0,
         "totalPay":{
                 "$add":["$salary","$bonus"]
             }
       }
    },
    {"$sort":{"totalPay": -1}}
  ]
)

for d in cursor:
    pprint.pprint(d)