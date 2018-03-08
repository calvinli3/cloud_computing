import json
import pymongo

client = pymongo.MongoClient("mongodb://localhost")
db=client.hw2
factbook = db.factbook

page = open(".")
parsed = json.loads(page.read())

for item in parsed:
    factbook.insert(item)