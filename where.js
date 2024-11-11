db = connect("localhost:27017/cii103");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

db.food2.drop()

db.food2.insertOne({apple:26,banana:36,peach:56}); 
db.food2.insertOne({apple:5,spinach:25,watermelon:13,cccc:3}) 
db.food2.insertOne({apple:98, spinach:18, cccc:98})


 
print("---------------------------------+++++++++")
cursor = db.food2.find({$where:function(){
    print("=================================")
    for(const current in obj){
        for(const other in obj){
            print(">>>>>>>------>current:"+this[current]+" other:"+this[other]);
            if(current != other && obj[current] == obj[other]){
                return true;
            }
        }
    }
    return false;
}});
showCursorItems(cursor);


// cursor = db.food2.find({$where:function(){
//     const keySize = Object.keys(obj).length
//     //const valuesSize = new Set(Object.values(obj)).size
//     var vals = Object.keys(obj).map(function (key) {
//         return obj[key];
//     });
//     const valuesSize = new Set(vals).size
//     //print(`=======>>> keySize: ${keySize}, vals: ${vals}`)
//     return keySize !== valuesSize
// }});
// showCursorItems(cursor);


// cursor = db.food2.find({$where: "Object.keys(obj).length !== new Set(Object.keys(obj).map((k) => obj[k])).size"})
// showCursorItems(cursor);

// print("--------------------------------------")
// cursor = db.food2.find( { watermelon : {$exists:true}, $where:'this.watermelon >= 3 && this.apple > 3'} )
// cursor = db.food2.find({$where: "this.apple > 4"})
// showCursorItems(cursor);

// cursor = db.food2.find({$where:function(){
//  var count = 0;
//  for(var current in this){
//      count = count + 1
//      if(count >= 5){
//          return true;
//      }
//  }
//  return false;

// }});
// showCursorItems(cursor);


// cursor = db.food2.find({"$where":function(){
//   var sum = 0;
//   for(var current in this){
//      //print("current:"+current)
//      if(current != '_id') {
//          sum = sum + this[current];
//          if(sum >= 100){
//              return true;
//          }
//      }
//  }
//  return false;
// }});
// showCursorItems(cursor);
