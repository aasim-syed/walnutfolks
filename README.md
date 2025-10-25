# Fullstack Assessment – Complete Solution (Backend + Frontend)

This repository contains a complete implementation of the assessment:
- **Backend**: FastAPI service with immediate webhook ACK (202), background processing (30s), idempotency via DB unique constraint, status query endpoint, health endpoint, Dockerfile.
- **Frontend**: Vite + React + TypeScript dashboard with charts (dummy data) and an **editable** chart. Edits are gated by email and saved to **Supabase** keyed by email; on next visits it **restores previous values** and **asks for overwrite confirmation**.

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn app:app --reload
```
Endpoints:
- `GET /` → health
- `POST /v1/webhooks/transactions` → 202 ACK immediately
- `GET /v1/transactions/{transaction_id}` → status

### Frontend
```bash
cd frontend
cp .env.example .env     # fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm i
npm run dev
```

### Supabase
Create a project and run `supabase/schema.sql` in the SQL editor. Copy the URL + anon key into `frontend/.env`.

### Deploy
- Backend has a **Dockerfile** (Render/Railway/Fly/Azure ready). Set `DATABASE_URL` for Postgres in production.
- Frontend deployable to **Vercel/Netlify** with the two env vars.
