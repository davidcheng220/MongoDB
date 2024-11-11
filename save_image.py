from pymongo import MongoClient
from PIL import Image

client = MongoClient('mongodb://localhost:27017/')
db = client['cii103']
# collection = db['images']

document = db.images.find_one({'image_name': 'example.jpg'})

if document:
    image_data = document['image_content']

    with open('sample2.jpg', 'wb') as file:
        file.write(image_data)
    
    print("Image successfully saved as 'sample2.jpg'")
    img = Image.open('sample2.jpg')
    img.show()
else:
    print("No document found with image_name 'example.jpg'")
