from pymongo import MongoClient


# connection
conn = MongoClient("mongodb://127.0.0.1")
db = conn["cii101"]
# collection = db.employee
for doc in db.colla.find():
    print(doc)

# list_name_with_salary = [ (e.get('name') +': $' + str(e.get('salary')) ) for e in colla.find()]
# print('list_name_with_salary: {}'.format(list_name_with_salary))

