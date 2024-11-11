from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

db.users.drop()

result = db.command({
    'insert': 'users',
    'documents': [
        {'name': 'Justin Doe', 'age': 30},
        {'name': 'Kira Huang', 'age': 50},
        {'name': 'Peter Wu', 'age': 60}
    ]
})

print(result)
