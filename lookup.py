import pymongo
import json
from pprint import pprint

db = pymongo.MongoClient().cii103

docs = db.lookupPerson.aggregate([
    {
      "$lookup":
        {
          "from": "lookupTel",
          "localField": "tel_group",
          "foreignField": "group",
          "as": "tel_arr"
        }
    }
    ,
    {"$sort":{"name":1}}
    ,
    {
      "$project":{
        "姓名":"$name",
        "tels":"$tel_arr",
        "_id":0
      }
    }
    ,
    {
      "$project":{
        "tels._id":0,
        "tels.group":0
      }
    }
    ,
    {
      "$addFields": {
        "電話號碼": {
          "$function": {
            "body": '''function(telObjectList) {
              retTelStringList = []
              for (const telObject of telObjectList) {
                retTelStringList.push(telObject.tel)
              }
              return retTelStringList
            }''',
            "args": ["$tels"],
            "lang": "js"
          }
        }
      }
    }
    ,
    {
      "$project":{
        "tels":0
      }
    }
])

for doc in docs:
  # print(json.dumps(doc, indent=4, ensure_ascii=False))
  pprint(doc)


