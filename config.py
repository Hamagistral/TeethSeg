from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import torch
from meshsegnet import *


class AppConfig:
    def __init__(self, app):
        self.app = app
        self.configure_middleware()
        self.load_model()
        self.create_necessary_folders()

    def configure_middleware(self):
        origins = ["*"]

        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def load_model(self):
        model_path = './model'
        model_name = 'MeshSegNet_Max_15_classes_72samples_lr1e-2_best.zip'

        num_classes = 15
        num_channels = 15

        # set model
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = MeshSegNet(num_classes=num_classes, num_channels=num_channels).to(device, dtype=torch.float)

        # load trained model
        checkpoint = torch.load(os.path.join(model_path, model_name), map_location='cpu')
        self.model.load_state_dict(checkpoint['model_state_dict'])
        del checkpoint  
        self.model = self.model.to(device, dtype=torch.float)

        # Predicting
        self.model.eval()

    def create_necessary_folders(self):

        # Directory to store temporary output files
        self.OUTPUT_FOLDER = "outputs"

        # Ensure the output folder exists
        if not os.path.exists(self.OUTPUT_FOLDER):
            os.makedirs(self.OUTPUT_FOLDER, exist_ok=True)

        # Directory to store temporary files
        self.TEMP_FOLDER = "temp"

        # Ensure the temporary folder exists
        if not os.path.exists(self.TEMP_FOLDER):
            os.makedirs(self.TEMP_FOLDER, exist_ok=True)
