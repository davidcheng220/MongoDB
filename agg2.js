db = connect("mongodb://localhost:27017/cii103");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

var p1 = { "_id" : 1, "name" : "dave123", favorites: [ "chocolate", "cake", "butter", "apples" ] }
var p2 = { "_id" : 2, "name" : "li", favorites: [ "apples", "pudding", "pie" ] }
var p3 = { "_id" : 3, "name" : "ahn", favorites: [ "pears", "pecans", "chocolate", "cherries" ] }
var p4 = { "_id" : 4, "name" : "ty", favorites: [ "ice cream" ] }

db.test1.drop()
db.test1.insertMany([p1, p2, p3, p4])
cursor = db.test1.aggregate([
   {
     $project:
      {
         name: 1,
         first: { $arrayElemAt: [ "$favorites", 0 ] },
         last: { $arrayElemAt: [ "$favorites", -1 ] }
      }
   }
])
showCursorItems(cursor)
// print('---------------------------------')

// {a:1, b:2}+{c:3}+{b:3, d:4, a:5} = {c:3 ,b:3, d:4, a:5}
//{a: 5, b:3, c:3, d:4}

//{ b:3, d:4, a:5, c:9}


// {_id:1, dict1:{a:1, b:2}, dict2:{c:3}, dict3:{b:3, d:4, a:5, c:9}}
// {_id:1, dict_all:{ b:3, d:4, a:5, c:9 }}


// var a1 = {_id:1, dict1:{a:1, b:2}, dict2:{c:3}, dict3:{b:3, d:4, a:5, c:9}}
// db.test2.drop()
// db.test2.insertOne(a1)
// cursor = db.test2.aggregate(
//   [{
//     $project:{ 
//        dict_all:{$mergeObjects:["$dict1", "$dict2", "$dict3"]} 
//   }}]
// )
// showCursorItems(cursor)
// print('---------------------------------')


// { _id: "$_id", first: "", last: "" } + { "first" : "John", "last" : "Backus"} 
// = { _id: "$_id", "first" : "John", "last" : "Backus"}

// var r1 = { "_id": 1, "name" : { "first" : "John", "last" : "Backus"} }
// var r2 = { "_id": 2, "name" : { "first" : "John", "last" : "McCarthy"} } 
// var r3 = { "_id": 3, "name":  { "first" : "Grace", "last" : "Hopper"} } 

// db.test3.drop()
// db.test3.insertMany([r1, r2, r3])

// cursor = db.test3.aggregate([
//    { $replaceRoot: { newRoot: "$name" } }
// ])
// showCursorItems(cursor)
// print('---------------------------------')


// cursor = db.test3.aggregate([
//    { $replaceRoot: { newRoot: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } } }
// ])
// showCursorItems(cursor)
// print('---------------------------------')

///
// cursor = db.test3.aggregate([
//    { $replaceRoot: { newRoot: { $mergeObjects: [ "$$ROOT", "$name" ] } } },
//    {$project: {name:0}}
// ])
// showCursorItems(cursor)





