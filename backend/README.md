# Transactions Service

## Run locally
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL=sqlite:///./transactions.db
uvicorn app:app --reload
```

## Endpoints
- GET / -> health
- POST /v1/webhooks/transactions -> returns 202 immediately, enqueues background processing (30s)
- GET /v1/transactions/{transaction_id} -> returns status and timestamps

## Idempotency
Enforced via unique constraint on `transaction_id`. Duplicate webhooks return 202 without re-processing.

## Deploy
- Dockerfile included. Works on Render, Railway, Fly.io, Azure App Service, etc.
- For Postgres, set DATABASE_URL accordingly.
