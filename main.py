from helpers import create_temp_file, delete_temp_file
from fastapi import FastAPI, UploadFile, File
from model import predict_alpha
from config import AppConfig
from mangum import Mangum

import uvicorn
import json
import vedo
import os

app = FastAPI()
handler = Mangum(app)

# Configure the application using AppConfig
config = AppConfig(app)

@app.get("/")
def read_root():
    return {"message": "TeethSeg MeshSegNet API by 3DSF Interns! Routes possibl: '/api/v1/predict/post_processing' Prediction with post-processing."}


@app.post("/api/v1/predict/post_processing")
async def predict_and_sendPalpha(file: UploadFile = File(...)):
    if file.filename == "":
        return {
            "message": "File Required"
        }
        
    filename = file.filename

    file_contents = await file.read()

    # Create a temporary file from the binary data
    temp_filepath = create_temp_file(config.TEMP_FOLDER, file.filename, file_contents)
    
    # Create a vedo Mesh from the processed binary data
    mesh = vedo.Mesh(temp_filepath)
    
    try:
        # Prediction
        out_filename = predict_alpha(config.model, mesh, filename) 
    
        fileNameWithExt = out_filename[1] + ".vtp"

        # Send the prediction result file to the frontend
        with open(os.path.join(config.OUTPUT_FOLDER, fileNameWithExt), "r") as out_file:
            prediction_file_data = out_file.read()
        
        # Delete the temporary file
        os.remove(temp_filepath)
        
        # Delete files in the OUTPUT folder
        for i in range(3):
            delete_temp_file(config.OUTPUT_FOLDER, out_filename[i])

        prediction = {
            "filename": fileNameWithExt,
            "prediction_file": prediction_file_data
        }

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(prediction)
        }

    except Exception as e:
        print(e)
        
        # Delete the temporary file
        os.remove(temp_filepath)

        return {
            "message" : "Server Error"
        }
        
if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)