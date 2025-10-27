const API_BASE = import.meta.env.VITE_API_BASE;
function assertBase() {
    if (!API_BASE)
        throw new Error("VITE_API_BASE is not set in frontend/.env");
}
export async function sendWebhook(payload) {
    assertBase();
    return fetch(`${API_BASE}/v1/webhooks/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}
export async function getTransaction(transaction_id) {
    assertBase();
    const res = await fetch(`${API_BASE}/v1/transactions/${encodeURIComponent(transaction_id)}`);
    if (!res.ok)
        throw new Error(`GET status ${res.status}`);
    return res.json();
}
