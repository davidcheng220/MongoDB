var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

const db = connect("mongodb://localhost:27017/cii103")

db.test.drop();

var user = {name:'Austin',age:30}; db.test.insertOne(user);
user.name = 'Zoooo'; user.age = 25; db.test.insertOne(user);
user.name = 'Justin'; user.age = 29; db.test.insertOne(user);

user.name = 'Hopper'; user.age = 27; db.test.insertOne(user);
user.name = 'Alan'; user.age = 35; db.test.insertOne(user);
user.name = 'Lisa'; user.age = 36; db.test.insertOne(user);

cursor = db.test.find()
//cursor = db.test.find().skip(3).limit(2);
//cursor = db.test.find().sort({age: -1})
// cursor = db.test.find()
// cursor = cursor.skip(3)
// cursor = cursor.limit(2)

showCursorItems(cursor);

// var cursor = db.test.find();
// cursor = cursor.sort({age: -1})
// cursor = cursor.limit(2)
// showCursorItems(cursor);

// var cursor1 = db.test.find().limit(3).sort({age: -1});
// showCursorItems(cursor1);
// // //print('----------')
//print(cursor1);
// print("-----------------------");
// var cursor2 = db.test.find().sort({age:-1}).limit(3);
// showCursorItems(cursor2);
//print(cursor2);


// var cursor = db.test.find({},{name:1,_id:0,age:1}).sort({name:-1,age:-1});
// var cursor = db.test.find({},{age:1,_id:0,name:1}).sort({age:-1,name:-1});

// showCursorItems(cursor1);
