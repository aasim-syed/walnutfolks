import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { getTransaction, sendWebhook } from "../lib/api";
const defaultPayload = {
    transaction_id: `txn_${Math.random().toString(36).slice(2, 8)}`,
    source_account: "acc_user_789",
    destination_account: "acc_merchant_456",
    amount: 1500,
    currency: "INR",
};
export default function TransactionTester() {
    const [payload, setPayload] = useState(defaultPayload);
    const [lastTx, setLastTx] = useState(null);
    const [sending, setSending] = useState(false);
    const [polling, setPolling] = useState(false);
    const timerRef = useRef(null);
    const canSend = useMemo(() => !sending, [sending]);
    useEffect(() => {
        return () => {
            if (timerRef.current)
                window.clearInterval(timerRef.current);
        };
    }, []);
    const startPolling = (txId) => {
        setPolling(true);
        const started = Date.now();
        timerRef.current = window.setInterval(async () => {
            try {
                const data = await getTransaction(txId);
                setLastTx(data);
                if (data.status === "PROCESSED" || Date.now() - started > 45000) {
                    if (timerRef.current)
                        window.clearInterval(timerRef.current);
                    setPolling(false);
                }
            }
            catch { }
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
        }
        catch (e) {
            alert(`Failed to send webhook: ${e?.message ?? e}`);
        }
        finally {
            setSending(false);
        }
    };
    const regenId = () => {
        setPayload((p) => ({ ...p, transaction_id: `txn_${Math.random().toString(36).slice(2, 8)}` }));
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "controls", style: { marginBottom: 8 }, children: [_jsx("label", { children: "transaction_id" }), _jsx("input", { type: "text", value: payload.transaction_id, onChange: (e) => setPayload({ ...payload, transaction_id: e.target.value }) }), _jsx("button", { onClick: regenId, children: "New ID" })] }), _jsxs("div", { className: "controls", children: [_jsx("label", { children: "source_account" }), _jsx("input", { type: "text", value: payload.source_account, onChange: (e) => setPayload({ ...payload, source_account: e.target.value }) }), _jsx("label", { children: "destination_account" }), _jsx("input", { type: "text", value: payload.destination_account, onChange: (e) => setPayload({ ...payload, destination_account: e.target.value }) }), _jsx("label", { children: "amount" }), _jsx("input", { type: "number", min: 0, step: 1, value: payload.amount, onChange: (e) => setPayload({ ...payload, amount: Number(e.target.value) }) }), _jsx("label", { children: "currency" }), _jsx("input", { type: "text", value: payload.currency, onChange: (e) => setPayload({ ...payload, currency: e.target.value }) })] }), _jsxs("div", { className: "controls", style: { marginTop: 10 }, children: [_jsx("button", { disabled: !canSend, onClick: onSend, children: sending ? "Sending..." : "Send Webhook" }), polling && _jsx("span", { className: "kbd", children: "Polling\u2026" })] }), lastTx && (_jsxs("div", { className: "card", style: { marginTop: 12 }, children: [_jsx("div", { className: "section-title", children: "Latest Transaction" }), _jsxs("div", { className: "lead", children: ["ID: ", lastTx.transaction_id] }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsxs("div", { children: ["Status: ", _jsx("strong", { children: lastTx.status })] }), lastTx.created_at && _jsxs("div", { children: ["Created: ", new Date(lastTx.created_at).toLocaleString()] }), lastTx.processed_at && _jsxs("div", { children: ["Processed: ", new Date(lastTx.processed_at).toLocaleString()] }), (lastTx.amount != null) && _jsxs("div", { children: ["Amount: ", lastTx.amount, " ", lastTx.currency] }), lastTx.source_account && _jsxs("div", { children: ["From: ", lastTx.source_account] }), lastTx.destination_account && _jsxs("div", { children: ["To: ", lastTx.destination_account] })] })] }))] }));
}
