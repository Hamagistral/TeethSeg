from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import os
import torch
import vedo
from meshsegnet import *
from model import predict , predict_alpha
import time
from helpers import create_temp_file, delete_temp_file
app = FastAPI()

# Define origins that are allowed to access the API
origins = ["*"]

# Add the CORSMiddleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store temporary output files
OUTPUT_FOLDER = "outputs"

# Ensure the output folder exists
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Directory to store temporary files
TEMP_FOLDER = "temp"

# Ensure the temporary folder exists
if not os.path.exists(TEMP_FOLDER):
    os.makedirs(TEMP_FOLDER, exist_ok=True)


model_path = './model'
# model_name = 'Mesh_Segementation_MeshSegNet_15_classes_60samples_best.tar'
model_name = 'MeshSegNet_Max_15_classes_72samples_lr1e-2_best.zip'

num_classes = 15
num_channels = 15

# set model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MeshSegNet(num_classes=num_classes, num_channels=num_channels).to(device, dtype=torch.float)

# load trained model
checkpoint = torch.load(os.path.join(model_path, model_name), map_location='cpu')
model.load_state_dict(checkpoint['model_state_dict'])
del checkpoint
model = model.to(device, dtype=torch.float)
# Predicting
model.eval()


def delete_temp_file(filename):
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    try:
        os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")


def create_temp_file(filename, binary_data):
    temp_filepath = os.path.join(TEMP_FOLDER, filename)
    with open(temp_filepath, "wb") as temp_file:
        temp_file.write(binary_data)
    return temp_filepath


@app.get("/")
def read_root():
    return {"message": "Hi leeuw!"}


@app.post("/api/v1/predict")
async def predict_and_send(file: UploadFile = File(...)):

    # print("filename: " + type(file.filename))

    if file.filename == "":
        return{
            "message": "File Required"
        }
        
    filename = file.filename

    file_contents = await file.read()

    # Create a temporary file from the binary data
    temp_filepath = create_temp_file(file.filename, file_contents)
    
    # Create a vedo Mesh from the processed binary data
    mesh = vedo.Mesh(temp_filepath)
    
    # Prediction
    out_filename = predict(model, mesh, filename) 
    
    fileNameWithExt = out_filename + ".vtp"

    # Send the prediction result file to the frontend
    with open(os.path.join(OUTPUT_FOLDER, fileNameWithExt), "rb") as out_file:
        prediction_file_data = out_file.read()
    
    # Background task to delete temporary files after 30 sec
    background_tasks = BackgroundTasks()
    background_tasks.add_task(time.sleep, 30)  # Wait for 30 sec
    background_tasks.add_task(delete_temp_file, fileNameWithExt)
    
    # Delete the temporary file
    os.remove(temp_filepath)
    # os.remove(out_filename)
    
    return {
        "filename": out_filename + ".vtp",
        "prediction_file": prediction_file_data
    }


@app.post("/api/v1/predict/alpha")
async def predict_and_sendPalpha(file: UploadFile = File(...)):
    if file.filename == "":
        return{
            "message": "File Required"
        }
        
    filename = file.filename

    file_contents = await file.read()

    # Create a temporary file from the binary data
    temp_filepath = create_temp_file(file.filename, file_contents)
    
    # Create a vedo Mesh from the processed binary data
    mesh = vedo.Mesh(temp_filepath)
    
    # Prediction
    out_filename = predict_alpha(model, mesh, filename) 
    
    fileNameWithExt = out_filename + ".vtp"

    # Send the prediction result file to the frontend
    with open(os.path.join(OUTPUT_FOLDER, fileNameWithExt), "rb") as out_file:
        prediction_file_data = out_file.read()
    
    # Background task to delete temporary files after 30 sec
    background_tasks = BackgroundTasks()
    background_tasks.add_task(time.sleep, 30)  # Wait for 30 sec
    background_tasks.add_task(delete_temp_file, fileNameWithExt)
    
    # Delete the temporary file
    os.remove(temp_filepath)
    
    return {
        "filename": out_filename + ".vtp",
        "prediction_file": prediction_file_data
    }
