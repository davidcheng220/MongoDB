
var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

const db = connect("mongodb://localhost:27017/cii103")

db.food.drop();

db.food.insertOne({_id:1,fruit:['apple','cherry','banana'], size:3});
db.food.insertOne({_id:2,fruit:['apple','watermelon','orange'], size:3});
db.food.insertOne({_id:3,fruit:['cherry','banana','apple'], size:3});
db.food.insertOne({_id:4,fruit:['cherry','apple'], size:2});
db.food.insertOne({_id:5,fruit:['apple','cherry'], size:2});
db.food.insertOne({_id:6,fruit:['banana'], size:1});



cursor = db.food.find({fruit:["cherry", "apple"]});
showCursorItems(cursor);

// cursor = db.food.find({fruit:{$all:["cherry", "apple"]}});
// showCursorItems(cursor);


// print("fruit.1':'orange' -------------------------------------------")
// cursor = db.food.find({"fruit.0": "apple"});
// showCursorItems(cursor);


//print("$all:['apple','cherry'] -------------------------------------------")
//cursor = db.food.find({fruit:['apple','cherry']})
// cursor = db.food.find({
//                         fruit:{
//                             $all:['apple','cherry']
//                         }
//                       }
// );

//showCursorItems(cursor);

// print("{fruit:{$size:2}} -------------------------------------------")
// cursor = db.food.find({fruit:{$size:3}});
// showCursorItems(cursor);
// cursor = db.food.find({size:{$gte:2,$lte:3}});
// showCursorItems(cursor);

// print("{fruit:{$slice:2}}-------------------------------------------")
// cursor = db.food.find({}, {fruit:{$slice: 2}});
// showCursorItems(cursor);
    
// // print("{$slice:-1}} -------------------------------------------")
// cursor = db.food.find({}, {fruit:{$slice: -1}});
// showCursorItems(cursor);


// // print("{$slice:[2,1]},_id:0} -------------------------------------------")
// cursor = db.food.find({}, {fruit: {$slice:[1, 2]}});
// showCursorItems(cursor);



// var f = function(x){
//   print(x * 3)
// };

// [3,4,5,6,7,8].forEach(f);






// [{...},{...}].forEach(f)


// [3,4,5,6,7,8].forEach((x) => print(x*2));

//var fun = function(x){print(x*2);}

//[3,4,5,6,7,8].forEach(function(x){print(x*2);});




// print("foreach-------------------------------------------")
// cursor = db.food.find({},{fruit:1, _id:0});
//showCursorItems(cursor)
// cursor.forEach((j) => printjson(j))
//cursor.forEach((j) => { print(j.fruit[1])})


//[{..},{..}].forEach(f)


// // // //print(cursor);
//cursor.forEach(function(json){ print('first furit:['+json.fruit[0]+"] ((((_id:"+json._id+")");})


// cursor.forEach((data) =>  print(`
// first    
//  furit:[ ${data.fruit} ] 
//  (_id:
//  ${data._id})`))


