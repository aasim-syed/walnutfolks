# backend/app.py
import asyncio
from datetime import datetime, timezone
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi.middleware.cors import CORSMiddleware

# 🔧 absolute (package) imports — no leading dots
from backend.db import Base, engine, get_session
from backend.models import Transaction, TxStatus
from backend.schemas import WebhookIn, TxOut

app = FastAPI(title="Transactions Service")

# CORS: local dev + your Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://walnutfolks.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB
Base.metadata.create_all(bind=engine)

@app.get("/")
def health():
    return {"status": "HEALTHY", "current_time": datetime.now(timezone.utc).isoformat()}

async def process_transaction(tx_id: str):
    await asyncio.sleep(30)
    with get_session() as db:
        tx = db.execute(select(Transaction).where(Transaction.transaction_id == tx_id)).scalar_one_or_none()
        if not tx:
            return
        tx.status = TxStatus.PROCESSED
        tx.processed_at = datetime.now(timezone.utc)
        db.commit()

@app.post("/v1/webhooks/transactions", status_code=202)
async def webhook(payload: WebhookIn, bg: BackgroundTasks):
    with get_session() as db:
        tx = Transaction(
            transaction_id=payload.transaction_id,
            source_account=payload.source_account,
            destination_account=payload.destination_account,
            amount=payload.amount,
            currency=payload.currency,
            status=TxStatus.PROCESSING,
        )
        try:
            db.add(tx)
            db.commit()
        except IntegrityError:
            db.rollback()
            return JSONResponse(status_code=202, content={"ack": True})
    bg.add_task(process_transaction, payload.transaction_id)
    return {"ack": True}

@app.get("/v1/transactions/{transaction_id}", response_model=TxOut)
def get_tx(transaction_id: str):
    with get_session() as db:
        tx = db.execute(select(Transaction).where(Transaction.transaction_id == transaction_id)).scalar_one_or_none()
        if not tx:
            raise HTTPException(status_code=404, detail="Not found")
        return TxOut(
            transaction_id=tx.transaction_id,
            source_account=tx.source_account,
            destination_account=tx.destination_account,
            amount=tx.amount,
            currency=tx.currency,
            status=tx.status.value,
            created_at=tx.created_at,
            processed_at=tx.processed_at,
        )
