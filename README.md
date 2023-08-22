# SegTeeth-api

## create a new venv

```bash
py -m venv venv
```

## activate venv

only for windows

```bash
./venv/Scripts/activate
```

## install dependencies

```bash
pip install -r requirements.txt
```

# run server

```bash
uvicorn main:app --reload
```

## Endpoints

### /api/v1/predict

Without post-proccessing (this will not give a good result)

### /api/v1/predict/post_processing

With post-proccessing (the segmentation with post=proccessing will be mush precise)


so you can use `localhost:8000/api/v1/predict` make sure to call this endpoit with post method.