from pymongo import MongoClient
from pprint import pprint

client = MongoClient()
db = client.cii103


func = '''function() {
     for(const current in obj) {
         for(const other in obj) {
             if(current != other && obj[current] == obj[other]) {
                 return true;
             }
         }
     }
     return false;
 };'''

for doc in db.food2.find({ '$where': func }):
    pprint(doc)