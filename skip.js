var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

const db = connect("mongodb://localhost:27017/cii103")
db.usersRandom.drop()
var start = (new Date()).getTime();

 for(let i = 0; i < 200; i++){
    db.usersRandom.insertOne(
        {
            i:i,
            username:'user'+i,
            random: Math.random()
        }
    );
 }

 print('spend: '+ ((new Date()).getTime() - start) + ' ms');


var useGtOrLtToRandomFindUser = function(){
    var random = Math.random();
    var result = db.usersRandom.findOne({random:{$gt:random}},{username:1, _id:0})
    if(result == null){
        result = db.usersRandom.findOne({random:{$lt:random}},{username:1, _id:0})
    }
    printjson(result);
}

for(let i = 0 ; i < 10; i++){
    useGtOrLtToRandomFindUser();
}

// print('------------------------')

// var useSkipToRandomFindUser2 = function(){
//   let total = db.usersRandom.count();
//   let random = Math.floor(Math.random() * total);
//   //print("----->>random<<-----:"+random);
//   let result = db.usersRandom.findOne({i:random},{username:1, _id:0})
//   printjson(result)
// }

// for(i = 0 ; i < 10; i++){
//  useSkipToRandomFindUser2();
// }


