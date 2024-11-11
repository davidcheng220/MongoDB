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


var article1 = {
    date:(new Date(2016,5,23)),
    url:"http://A",
    score: 90,
    tags:['mongodb', 'c++','python','perl']
}

// emit(this.tags[i],{"urls":[this.url]});
// "c++"       {"urls":["http://A"]}
// "mongodb"   {"urls":["http://A"]}

var article2 = {
    date:(new Date(2016,3,25)),
    url:"http://idealog.co.nz/workplace/2016/01/cpluscplusAndPython",
    score: 90,
    tags:['python', 'c++', 'mongodb']
}

var article3 = {
    //date:(new Date(2016,1,25)),
    url:"http://idealog.co.nz/workplace/2016/01/PythonAndBigData",
    //score: 90,
    tags:['python' , 'perl']
}

var article4 = {
    date:(new Date(2016,5,25)),
    url:"http://idealog.co.nz/workplace/2016/01/cPlusPlusAndNosqlxxxxxx",
    score: 72,
    tags:['c++','java']
}

var article5 = {
    date:(new Date(2016,7,25)),
    url:"http://idealog.co.nz/workplace/2016/01/cplusplusAndMongdbAndJavaxxxxxxx",
    score: 90,
    tags:['java','mongodb','c++']
}

var article6 = {
    date:(new Date(2017,11,17)),
    url:"http://123",
    score: 90,
    tags:['perl','nosql','java']
}


db.mr2Data.drop();
db.mr2Data.insertMany([article1,article2,article3,article4,article5,article6])

map = function(){
    for(var i in this.tags){
        emit(this.tags[i],{"urls":[this.url]});
    }
};

//emits = [ {urls:[url1]},{urls:[url2]} ] => {urls:[url1, url2]}
reduce = function(key,emits){

    var total = {urls:[]}
    for(var i in emits){
        emits[i].urls.forEach(function(url){total.urls.push(url)})
    }
    return total;
}
result = db.mr2Data.mapReduce(map,reduce,{out:{inline:1}});
printjson(result)
// findAllAndShow('mr2DataResult');
