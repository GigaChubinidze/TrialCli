from fastapi import FastAPI

app = FastAPI(title="TriaCli API")


@app.get("/health")
def health():
    return {"status": "ok"}
