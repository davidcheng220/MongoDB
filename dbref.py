from pymongo import MongoClient
from bson.dbref import DBRef
from bson.objectid import ObjectId
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
db.users.drop()
db.comments.drop()

user_id = db.users.insert_one({
    'name': 'John Doe', 
    'age':'31', 
    'tels':['091234567']
}).inserted_id

user_ref = DBRef('users', user_id)

comment_id = db.comments.insert_one({'text': 'This is a comment', 'user': user_ref}).inserted_id


comment = db.comments.find_one({'_id': comment_id})
print('Comment doc:')
pprint(comment)
user_dbref = comment['user']

user = db.dereference(user_dbref)
print('User from DBRef:')
pprint(user)
