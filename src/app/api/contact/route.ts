import { NextResponse } from "next/server";
import { site } from "@/content/site";

/**
 * Posts the message to Resend's REST API directly rather than pulling in their
 * SDK, which would be a dependency for one fetch call.
 *
 * Without RESEND_API_KEY set this route fails loudly with a 503 and the form
 * shows the email address instead. That is deliberate: a contact form that
 * quietly swallows messages is worse than no form at all.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  // Hidden field. A human never sees it, so anything in it came from a bot.
  const honeypot = String(body.company ?? "").trim();

  if (honeypot) {
    // Answer 200 so the bot believes it succeeded and doesn't retry.
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "bad_email" }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  // Config is checked last, after the cheap rejections. Bots and malformed
  // posts never reach it, and the honeypot's 200 is not masked by a 503.
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Must be a domain verified in Resend, not the sender's address.
      from: `${site.domain} <noreply@${site.domain}>`,
      to: [site.email],
      // So hitting reply in Gmail goes to the person, not to noreply@.
      reply_to: email,
      subject: `${name} via ${site.domain}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("resend failed", response.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
