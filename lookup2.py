import pymongo
import json

db = pymongo.MongoClient().cii103

rows = db.lookup_product.aggregate([
    
    {'$unwind': "$sizes"}
     ,
    {
        '$lookup':
        {
          'from': "lookup_color",
          'localField': "sizes",
          'foreignField': "size",
          'as': "colors"
        }
    }
    ,
    {
      '$project':{
        "_id":0,
        "colors._id":0,
        "colors.size":0
      }
    },
    {
      "$addFields": {
        "顏色": {
          "$function": {
            "body": '''function(colors) {
              ret = []
              for (const c of colors) {
                ret.push(c.color)
              }
              return ret
            }''',
            "args": ["$colors"],
            "lang": "js"
          }
        }
      }
    }
    ,
    {
      "$project":{
        "colors":0
      }
    }
])


for row in rows:
    #print(row)
    print(json.dumps(row, indent=8, ensure_ascii=False))