# SegTeeth-api


## installation (new)

Simply you can run the setup.py script to configure you're project.

```bash
python setup.py
```

## Or by following these instruction (old way)

Follow these instruction to config you're project this is the old way.

### create a new venv

```bash
py -m venv venv
```

### activate venv

only for windows

```bash
./venv/Scripts/activate
```

### install dependencies

```bash
pip install -r requirements.txt
pip install pygco
```

## Run server

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