const API_BASE = import.meta.env.VITE_API_BASE as string;

function assertBase() {
  if (!API_BASE) throw new Error("VITE_API_BASE is not set in frontend/.env");
}

export type WebhookPayload = {
  transaction_id: string;
  source_account: string;
  destination_account: string;
  amount: number;
  currency: string;
};

export async function sendWebhook(payload: WebhookPayload): Promise<Response> {
  assertBase();
  return fetch(`${API_BASE}/v1/webhooks/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function getTransaction(transaction_id: string) {
  assertBase();
  const res = await fetch(`${API_BASE}/v1/transactions/${encodeURIComponent(transaction_id)}`);
  if (!res.ok) throw new Error(`GET status ${res.status}`);
  return res.json();
}
