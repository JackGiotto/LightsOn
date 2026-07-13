import json

import yaml

with open('api-docs.json', 'r') as file:
    swagger_spec = json.load(file)

with open('api-docs.yaml', 'w') as file:
    yaml.dump(swagger_spec, file, default_flow_style=False)

