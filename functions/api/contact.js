// ─── Cloudflare Pages Function ─────────────────────────────────────────────
// Route: /api/contact  (auto-mapped by Cloudflare from functions/api/contact.js)
//
// Why this exists:
//   Google Apps Script doesn't support CORS preflight (OPTIONS) responses,
//   so browsers block direct cross-origin POSTs. This function acts as a
//   same-origin proxy — the browser calls /api/contact (no CORS), and this
//   Worker calls GAS server-to-server (no browser restrictions).
// ──────────────────────────────────────────────────────────────────────────
const GAS_URL =
  "https://script.google.com/macros/s/AKfycby9flZrBV_0sa-Qcpdrstn0EyHiVExrx5r5ZEyvRqVEhODTyW5fDPDDLN_U3N_TBgJ9/exec";

export async function onRequestPost(context) {
  try {
    // ── Parse incoming body ──────────────────────────────────────────────
    let body;
    try {
      body = await context.request.json();
    } catch {
      return jsonResponse({ success: false, message: "Invalid JSON body." }, 400);
    }

    const { name = "", email = "", message = "", source = "portfolio-chatbot" } = body;

    // ── Basic validation ─────────────────────────────────────────────────
    if (!name.trim() || !email.trim()) {
      return jsonResponse({ success: false, message: "Name and email are required." }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return jsonResponse({ success: false, message: "Invalid email format." }, 400);
    }

    // ── Forward to Google Apps Script (server-to-server, no CORS) ────────
    const gasResponse = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        source,
      }),
    });

    // GAS always returns 200, even for errors — check the JSON body
    const gasJson = await gasResponse.json().catch(() => null);

    if (!gasResponse.ok || gasJson?.success === false) {
      return jsonResponse(
        { success: false, message: gasJson?.message || "Upstream error from GAS." },
        502
      );
    }

    return jsonResponse({ success: true, message: "Lead saved successfully." }, 200);

  } catch (err) {
    return jsonResponse({ success: false, message: "Server error: " + err.message }, 500);
  }
}

// ── Handle unsupported methods ────────────────────────────────────────────
export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    // Preflight — not needed since same-origin, but handle just in case
    return new Response(null, { status: 204 });
  }
  if (context.request.method !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed." }, 405);
  }
  return onRequestPost(context);
}

// ── Helper ────────────────────────────────────────────────────────────────
function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
