/**
 * Client for the Real Lead Tools handler backend.
 * Sends chat messages to POST /webhook and returns the agent response.
 */

const HANDLER_URL = process.env.HANDLER_URL || "http://localhost:8000";
const HANDLER_WEBHOOK_SECRET = process.env.HANDLER_WEBHOOK_SECRET || "demo-secret-123";

interface HandlerRequest {
  companyId: string;
  userId: string;
  userEmail: string;
  message: string;
}

interface HandlerResponse {
  companyId: string;
  userId: string;
  message: string;
}

export async function sendToHandler(payload: HandlerRequest): Promise<HandlerResponse> {
  const res = await fetch(`${HANDLER_URL}/webhook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HANDLER_WEBHOOK_SECRET}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Handler error ${res.status}: ${detail}`);
  }

  return res.json();
}
