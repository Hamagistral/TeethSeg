# 💻 TeethSeg BackEnd Locally


## Installation 

- You can run the setup.py script to configure you're project.

```bash
python setup.py
```

## Or follow these instructions

Follow these instruction to config your project:

1. Create a new venv

```bash
py -m venv venv
```

2. Activate venv:

Windows:

```bash
./venv/Scripts/activate
```

Linux: 

```
source venv/Scripts/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
pip install pygco
```

4. Run server

After configuring you're project now you can run the app using uvicorn.

```bash
uvicorn main:app --reload
```

## Endpoints

### /api/v1/predict

Without post-proccessing (this will not give a good result)

### /api/v1/predict/post_processing

Here's the available endpoints and the methods to call them:

- GET "/": Description of the API and its routes  
- POST "/api/v1/predict": Without post-proccessing (this will not give a good result)
- POST "/api/v1/predict/post_processing": With post-proccessing (The segmentation with post proccessing is more precise)

Go to http://localhost:8000/ if you see a message like "message": "Hi 3DSF Interns!" everything is working correctly.

Make sure to call "/api/v1/predict" and "/api/v1/predict/post_processing" endpoints with the POST method.
