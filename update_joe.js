
var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}
db.users_update.drop()
//-----------------------------------------
var joe = {name:'joe',friends:32,enemies:2}
print('::: 一開始 joe:')
printjson(joe);

print('::: insert joe to mongoDB')
print(db.users_update.insertOne(joe));

print('::: findOne name == joe');
var dbJoe = db.users_update.findOne({name:'joe'});
printjson(dbJoe);

print('::: 增加 relationship 欄位 dbJoe:');
dbJoe.relationships = {friends: dbJoe.friends, enemies: dbJoe.enemies};
printjson(dbJoe);

dbJoe.username = dbJoe.name;
print('::: 增加username 欄位 dbJoe:');
printjson(dbJoe);

delete dbJoe.friends;
delete dbJoe.enemies;
delete dbJoe.name;
print('::: delete friends, enemies and name  dbJoe:');
printjson(dbJoe)

print('::: update dbJoe to mongoDB');
print(db.users_update.replaceOne({name:'joe'}, dbJoe));

print('::: find Joe from mongoDB again');
var dbJoe2 = db.users_update.findOne({username:'joe'});
printjson(dbJoe2);




