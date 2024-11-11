
db = connect("localhost:27017/cii103");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

var findAllAndShow = function(coll_name){
    print('call findAll');
    var cursor = db[coll_name].find();
    showCursorItems(cursor);
}

var findOneAndShow = function(coll_name){
    printjson(db[coll_name].findOne());
}

db.mr1.drop();

db.mr1.insertMany(
    [   
        {x:1,y:1,z:2},
        {y:1,z:1,x:3},
        
        {z:1,w:1,x:1},
        {z:1,yyy:1,ccc: 1},
        
        {x:1,w:1,z:1,yyy:1},
        {x:123, yyy:101},
        {x:567},
        {x:66666},
        {y:1},
        {}
    ]
);

// var mapxx = function(){
//  for(var key in this){
//      if(key !== '_id'){
//          emit(key,{count:1});
//      }
//  }
// }


var mapxxx = function(){
 for(var key in this){
     if(key !== '_id'){
         emit(key,1); 
     }
 }
}

// var reducexx = function(key, emits){
//  total = 0;
//  for(var i in emits){
//      total+=emits[i].count;
//  }
//  return {count:total}
// }

var reducexxx = function(key,emits){
    total = 0;
    for(var i of emits){
        total+=i;
    }
    return total
    
}

// var mrResult = db.runCommand({'mapreduce':'mr1','map':mapxxx,'reduce':reducexxx, "out":{inline:1}});
// printjson(mrResult);

var mrResult = db.mr1.mapReduce(mapxxx, reducexxx, {out:'coll_mr1_cii103'});
findAllAndShow('coll_mr1_cii103');

// var mrResult = db.mr1.mapReduce(mapxxx,reducexxx,{out:'coll_20230311_2'});
// findAllAndShow('coll_20230311_2');





// var mapaa = function(){
//   emit(this["age"],1);
// }

// var reduceaa = function(key,emits){
//     total = 0;
//     for(var i of emits){
//         total+=i;
//     }
//     return total
// }

// var mrResult = db.usersNonIndex.mapReduce(mapaa,reduceaa, {out:'coll_20240612_1'});
// findAllAndShow('coll_20240612_1');


// var mrResult = db.runCommand({'mapreduce':'usersNonIndex','map':mapxx,'reduce':reducexx,"out":{inline:1}});
// printjson(mrResult);
