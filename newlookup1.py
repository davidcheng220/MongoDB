import pymongo
import json

db = pymongo.MongoClient().cii103

rows = db.newLookupPerson.aggregate(
   [
    {
      "$lookup":
        {
          "from": "newLookupTel",
          "localField": "_id",
          "foreignField": "belongTo",
          "as": "tel_arr"
        }
    }
    ,
    {"$sort":{"name":1}}
    ,
    {
      "$project":{
        '姓名':"$name",
        '電話':"$tel_arr",
        '工號':'$_id',
        "_id":0
      }
     }
    ,
    {
      "$project":{
        "電話._id":0,
        "電話.belongTo":0
      }
    }
    ,
    {
      "$addFields": {
        "電話字串陣列": {
          "$function": {
            "body": """function(telObjectList) {
              retTelStringList = []
              for (const telObject of telObjectList) {
                retTelStringList.push(telObject.tel)
              }
              return retTelStringList
            }""",
            "args": ["$電話"],
            "lang": "js"
          }
        }
      }
    }
    ,
    {
      "$project":{
        "電話":0
      }
    }
  ]
)

for row in rows:
    print(json.dumps(row, indent=4).encode('utf-8').decode('unicode_escape'))