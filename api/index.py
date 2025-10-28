# api/index.py
from backend.app import app  # export FastAPI 'app' for Vercel
from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def health():
    return {"ok": True}
