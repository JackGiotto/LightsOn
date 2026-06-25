import json
import os
import random
from datetime import datetime, timedelta
from pymongo import MongoClient

# data besides the location is generated with random values considered realistic

def generate_realistic_specs(light_type):
    """Generates realistic lifespan and wattage variations based on hardware profiles."""
    if light_type == 'LED':
        power = int(random.gauss(60, 15))          # Mean 60W, standard dev 15W
        power = max(25, min(power, 120))           # Clamp boundary safety
        lifespan = int(random.uniform(50000, 100000))
    elif light_type == 'HPS':
        power = random.choice([70, 100, 150, 250])
        lifespan = int(random.gauss(28000, 3000))
    elif light_type == 'MH':
        power = random.choice([100, 175, 250, 400])
        lifespan = int(random.gauss(15000, 2500))
    else: # LPS
        power = random.choice([35, 55, 90, 135])
        lifespan = int(random.uniform(14000, 18000))
    days_ago = random.randint(0, 365 * 6)
    install_date = datetime.utcnow() - timedelta(days=days_ago)

    return {
        "lightType": light_type,
        "power": power,
        "installationDate": install_date,
        "manufacturer": random.choice(["Philips", "Osram", "Cree", "Schréder", "Disano"]),
        "estimatedLifespan": lifespan
    }

def import_geojson_with_variations(json_file_path, mongo_uri, db_name, collection_name):
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]
    collection.create_index([("location", "2dsphere")])

    if not os.path.exists(json_file_path):
        return

    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    features = data.get("features", [])
    documents_to_insert = []

    light_types = ['LED', 'HPS', 'MH', 'LPS']
    type_weights = [0.55, 0.30, 0.10, 0.05]

    for feature in features:
        geometry = feature.get("geometry", {})
        coords = geometry.get("coordinates")

        if geometry.get("type") != "Point" or not coords:
            continue

        chosen_type = random.choices(light_types, weights=type_weights, k=1)[0]

        specs = generate_realistic_specs(chosen_type)

        if random.random() < 0.70:
            operation = {"turnOnTime": "20:00", "turnOffTime": "06:00"}
        else:
            operation = {"turnOnTime": "17:00", "turnOffTime": "08:00"}

        specs["operation"] = operation

        light_doc = {
            "location": {
                "type": "Point",
                "coordinates": [float(coords[0]), float(coords[1])]
            },
            "activeReport": {
                "reportId": None,
                "approvedCounts": 0
            },
            "specs": specs
        }
        documents_to_insert.append(light_doc)

    if documents_to_insert:
        result = collection.insert_many(documents_to_insert)
        print(f"Successfully processed database setup! Total items: {len(result.inserted_ids)}")

    client.close()

if __name__ == "__main__":
    import_geojson_with_variations("lamps.json", "mongodb://localhost:27017/", "lightson_dev", "lights")