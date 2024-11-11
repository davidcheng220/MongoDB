from pymongo import MongoClient
import re

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']

regex = re.compile("^user[^1-5][7-8]$")

results = db.iiiCollection.find(
    {"name": regex},
    {"_id": 0}
)

# results = db.iiiCollection.find(
#     {"age":{"$in":[ 25, 36, 99 ]}},
#     {"_id": 0}
# )

# results = db.inventory.find(
#     {"level":{"$in":[None], "$exists": True}},
#     {"_id": 0}
# )

# results = db.food.find(
#     {},
#     {"fruit":{"$slice": -1}}
# )

for result in results:
    print(result)
