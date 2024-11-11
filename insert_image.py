from pymongo import MongoClient
from bson.binary import Binary
import os

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
# collection = db['images']

db.images.drop()

with open('example.jpg', 'rb') as file:
    image_data = file.read()

binary_image = Binary(image_data)


document = {
    'image_name': 'example.jpg',
    'image_content': binary_image
}

result = db.images.insert_one(document)

print("Document inserted, _id:", result.inserted_id)
