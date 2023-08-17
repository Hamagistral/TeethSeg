# SegTeeth-api

## create an venv

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

at the moment there is only one endpoint `/predict`

so you can use `localhost:8000/predict` make sure to call this endpoit with post method.