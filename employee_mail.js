db = connect("mongodb://localhost:27017/cii103");
db.employee.drop()

var emp1 = {firstName:'Alen',lastName:'Huang',hireDate:(new Date('2012/03/15')),salary:50000,bonus:10000,'401k':2000}
var emp2 = {firstName:'Kelly',lastName:'Chu',hireDate:new Date('2012/07/15'),salary:45000,bonus:2000, '401k':1000}
var emp3 = {firstName:'Mavis',lastName:'Li',hireDate:new Date('2011/02/15'),salary:50000,bonus:10000, '401k':1000}
var emp4 = {firstName:'Steven',lastName:'chen',hireDate:new Date('2010/05/15'),salary:50000,bonus:10000, '401k':1000}
var emp5 = {firstName:'Joe',lastName:'Yang',hireDate:new Date('2013/09/15'),salary:50000,bonus:10000, '401k':2000}
var emp6 = {firstName:'Austin',lastName:'Cheng',hireDate:new Date('2009/01/15'),salary:80000,bonus:20000, '401k':3000}

db.employee.insertMany([emp1,emp2,emp3,emp4,emp5,emp6])

var showCursorItems = function(cursor){
  while (cursor.hasNext()) {
      printjson(cursor.next());
  }
}

// var cursor = db.employee.aggregate({
//  $project:{
//    name:'$name',
//    _id:0,
//    totalPay:{
//      $add:["$salary","$bonus"]
//    }
//  }
// });
// showCursorItems(cursor);


// var cursor = db.employee.aggregate({
//  $project:{
//    name:'$name',
//    _id:0,
//    totalPay:{
//      $subtract:[{$add:["$salary","$bonus"]}, "$401k"] 
//    }
//  }
// });
// showCursorItems(cursor);

// var cursor = db.employee.aggregate({
//  $project:{
//    name:'$firstName',
//    _id:0,
//    hireIn:{$month:'$hireDate'}
//  }
// });
// showCursorItems(cursor);

// var cursor = db.employee.aggregate({
//  $project:{
//    name:'$firstName',
//    _id:0,
//    tenure:{
//      $subtract:[{$year:new Date()},{$year:'$hireDate'}]
//    }
//  }
// });
// showCursorItems(cursor);

var cursor = db.employee.aggregate(
{
  '$project':{
    'fname':'$firstName',
    'lname':'$lastName',
    _id:0,
    email:{
      "$concat":[
        {"$toLower": {"$substr":['$firstName',0,3]}},
        ".", 
        {"$toUpper":"$lastName"},
        "@gmail.com"
      ]
      
    }
  }
}
// ,
// {$out: "mailxxx0323"}
);
showCursorItems(cursor);

//"Ale.huang@gmail.com"

// db.grades.drop()

// db.grades.insertMany([
//  { "_id" : 1, "name" : "Susan Wilkes", "scores" : [ 87, 86, 90  ] },
//  { "_id" : 2, "name" : "Bob Hanna", "scores" : [ 71, 64, 81 ] },
//  { "_id" : 3, "name" : "James Torrelio", "scores" : [ 91, 84, 97 ] }
// ])

// cursor = db.grades.aggregate( [
//   {
//     $project:
//       {
//         "name" : 1,
//         "summary" :
//         {
//           $switch:
//             {
//               branches: [
//                 {
//                   case: { $gte : [ { $avg : "$scores" }, 90 ] },
//                   then: "Doing great!"
//                 },
//                 {
//                   case: { $and : [ { $gte : [ { $avg : "$scores" }, 80 ] },
//                                    { $lt : [ { $avg : "$scores" }, 90 ] } ] },
//                   then: "Doing pretty well."
//                 },
//                 {
//                   case: { $lt : [ { $avg : "$scores" }, 80 ] },
//                   then: "Needs improvement."
//                 }
//               ],
//               default: "No scores found."
//             }
//          }
//       }
//    }
// ] )

// showCursorItems(cursor);


// db.inventory.drop()
// db.inventory.insertMany([
//   { "_id" : 1, "item" : "abc1", qty: 300 },
//   { "_id" : 2, "item" : "abc2", qty: 200 },
//   { "_id" : 3, "item" : "xyz1", qty: 250 }
// ])

// c = db.inventory.aggregate(
//    [
//       {
//          $project:
//            {
//              item: 1,
//              qty:1,
//              discount:
//                {
//                  $cond: { if: { $gte: [ "$qty", 250 ] }, then: 30, else: 20 }
//                  //$cond: [ { $gte: [ "$qty", 250 ] }, 30, 20 ]
//                }
//            }
//       }
//    ]
// )
// showCursorItems(c)

// db.inventory.drop()
// db.inventory.insertMany( [
//    { "_id" : 1, "item" : "buggy", description: "toy car", "quantity" : 300 },
//    { "_id" : 2, "item" : "bicycle", description: null, "quantity" : 200 },
//    { "_id" : 3, "item" : "flag" }
// ] )

// c = db.inventory.aggregate(
//    [
//       {
//          $project: {
//             item: 1,
//             description: { $ifNull: [ "$description", "Unspecified" ] }
//          }
//       }
//    ]
// )
// showCursorItems(c)


