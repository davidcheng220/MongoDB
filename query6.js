
var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

const db = connect("mongodb://localhost:27017/cii103")

db.tmp3.drop();

try {
    db.tmp3.insertOne({_id:1});
    db.tmp3.insertOne({_id:1});
} catch (err) {
    print('show err')
    print('message:' + err.message)
    print('name:' + err.name)
}





