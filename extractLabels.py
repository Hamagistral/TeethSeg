from vedo import load
import json
import numpy as np

# Load the VTP file
vtp_file = r"C:\Users\HP\Desktop\Sample_1.vtp"
mesh = load(vtp_file)

# Access cell data (MaterialIds)
material_ids = mesh.celldata["MaterialIds"]

# Convert MaterialIds to a serializable list
material_ids_list = material_ids.astype(int).tolist()

# Create a dictionary to store face indices and MaterialIds
face_material_mapping = {}

# Associate MaterialIds with face indices
for face_index, material_id in enumerate(material_ids_list):
    face_material_mapping[face_index] = material_id

# Save the dictionary as a JSON file
json_file = "face_material_mapping.json"
with open(json_file, "w") as f:
    json.dump(face_material_mapping, f)

print("Face-Material mapping saved to", json_file)
