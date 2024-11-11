db = connect("localhost:27017/cii103");

var showCursorItems = function(cursor){
  while (cursor.hasNext()) {
      printjson(cursor.next());
  }
}

db.lookupPerson.drop();
db.lookupTel.drop();

var Justin = {_id:1, name: "Justin"}

var Alan = {_id:2, name: "Alan"}

var Kelly = {_id:3, name: "Kelly"}

db.lookupPerson.insert([Justin,Alan,Kelly]);


var justinTel_1 = { _id:1, owner_id:1, tel:"0929888777" }
var justinTel_2 = { _id:2, owner_id:1, tel:"0926777890"}
var justinTel_3 = { _id:3, owner_id:1, tel:"0927889908"}
var justinTel_4 = { _id:4, owner_id:1, tel:"0927889908"}
var justinTel_5 = { _id:5 ,owner_id:1, tel:"0927889908"}

var alanTel_1 = { _id:6, owner_id:2, tel:"0299887765"}
var alanTel_2 = { _id:7, owner_id:2, tel:"026677-1123"}

var KellyTel_1 = { _id:8, owner_id:3, tel:"03-44335566"}
var KellyTel_2 = { _id:9, owner_id:3, tel:"03-44337788"}

db.lookupTel.insert([
            justinTel_1,justinTel_2,justinTel_3,justinTel_4,justinTel_5,
            alanTel_1,alanTel_2,
            KellyTel_1,KellyTel_2
          ])


cursor = db.lookupPerson.aggregate([
  {
      "$lookup":
        {
          "from": "lookupTel",
          "localField": "_id",
          "foreignField": "owner_id",
          "as": "tel_arr"
        }
   }
   ,
   {"$sort":{"name":1}}
   ,
   {
      "$project":{
        user:"$name",
        tels:"$tel_arr"
        
      }
    }
   ,
    {
      $project:{
        "tels._id":0,
        "tels._owner_id":0
      }
    }
    ,
    {
      "$addFields": {
        "電話": {
          "$function": {
            "body": function(telObjectList) {
              retTelStringList = []
              for (const telObject of telObjectList) {
                retTelStringList.push(telObject.tel)
              }
              return retTelStringList
            },
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
  ]
);

showCursorItems(cursor)


// db.viewPerson.drop();

// db.createView(
//   "viewPerson", //view name
//   "lookupPerson", // source
//   [
//     {
//         "$lookup":
//           {
//             "from": "lookupTel",
//             "localField": "name",
//             "foreignField": "owner",
//             "as": "tel_arr"
//           }
//      }
//      ,
//      {"$sort":{"name":1}}
//      ,
//      {
//         "$project":{
//           user:"$name",
//           tels:"$tel_arr",
//           _id:0
//         }
//      }
//      ,
//      {
//         $project:{
//           "tels._id":0,
//           "tels.owner":0
//         }
//      }
//   ]

// );

// cursor = db.viewPerson.find();
// showCursorItems(cursor);



