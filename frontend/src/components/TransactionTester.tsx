import { useEffect, useMemo, useRef, useState } from "react";
import { getTransaction, sendWebhook } from "../lib/api";

const defaultPayload = {
  transaction_id: `txn_${Math.random().toString(36).slice(2, 8)}`,
  source_account: "acc_user_789",
  destination_account: "acc_merchant_456",
  amount: 1500,
  currency: "INR",
};

type Tx = {
  transaction_id: string;
  status: "PROCESSING" | "PROCESSED";
  created_at?: string;
  processed_at?: string | null;
  amount?: number;
  currency?: string;
  source_account?: string;
  destination_account?: string;
};

export default function TransactionTester() {
  const [payload, setPayload] = useState(defaultPayload);
  const [lastTx, setLastTx] = useState<Tx | null>(null);
  const [sending, setSending] = useState(false);
  const [polling, setPolling] = useState(false);
  const timerRef = useRef<number | null>(null);

  const canSend = useMemo(() => !sending, [sending]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const startPolling = (txId: string) => {
    setPolling(true);
    const started = Date.now();
    timerRef.current = window.setInterval(async () => {
      try {
        const data = await getTransaction(txId);
        setLastTx(data);
        if (data.status === "PROCESSED" || Date.now() - started > 45000) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setPolling(false);
        }
      } catch {}
    }, 1000);
  };

  const onSend = async () => {
    setSending(true);
    try {
      await sendWebhook(payload);
      setLastTx({
        transaction_id: payload.transaction_id,
        status: "PROCESSING",
        amount: payload.amount,
        currency: payload.currency,
        source_account: payload.source_account,
        destination_account: payload.destination_account,
      });
      startPolling(payload.transaction_id);
    } catch (e: any) {
      alert(`Failed to send webhook: ${e?.message ?? e}`);
    } finally {
      setSending(false);
    }
  };

  const regenId = () => {
    setPayload((p) => ({ ...p, transaction_id: `txn_${Math.random().toString(36).slice(2, 8)}` }));
  };

  return (
    <div>
      <div className="controls" style={{ marginBottom: 8 }}>
        <label>transaction_id</label>
        <input
          type="text"
          value={payload.transaction_id}
          onChange={(e) => setPayload({ ...payload, transaction_id: e.target.value })}
        />
        <button onClick={regenId}>New ID</button>
      </div>

      <div className="controls">
        <label>source_account</label>
        <input
          type="text"
          value={payload.source_account}
          onChange={(e) => setPayload({ ...payload, source_account: e.target.value })}
        />
        <label>destination_account</label>
        <input
          type="text"
          value={payload.destination_account}
          onChange={(e) => setPayload({ ...payload, destination_account: e.target.value })}
        />
        <label>amount</label>
        <input
          type="number"
          min={0}
          step={1}
          value={payload.amount}
          onChange={(e) => setPayload({ ...payload, amount: Number(e.target.value) })}
        />
        <label>currency</label>
        <input
          type="text"
          value={payload.currency}
          onChange={(e) => setPayload({ ...payload, currency: e.target.value })}
        />
      </div>

      <div className="controls" style={{ marginTop: 10 }}>
        <button disabled={!canSend} onClick={onSend}>
          {sending ? "Sending..." : "Send Webhook"}
        </button>
        {polling && <span className="kbd">Polling…</span>}
      </div>

      {lastTx && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="section-title">Latest Transaction</div>
          <div className="lead">ID: {lastTx.transaction_id}</div>
          <div style={{ marginTop: 8 }}>
            <div>Status: <strong>{lastTx.status}</strong></div>
            {lastTx.created_at && <div>Created: {new Date(lastTx.created_at).toLocaleString()}</div>}
            {lastTx.processed_at && <div>Processed: {new Date(lastTx.processed_at).toLocaleString()}</div>}
            {(lastTx.amount != null) && <div>Amount: {lastTx.amount} {lastTx.currency}</div>}
            {lastTx.source_account && <div>From: {lastTx.source_account}</div>}
            {lastTx.destination_account && <div>To: {lastTx.destination_account}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
