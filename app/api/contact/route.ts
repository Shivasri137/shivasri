import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 100) {
    return NextResponse.json({ error: 'Enter your name (up to 100 characters).' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Your message must be between 10 and 5,000 characters.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email delivery is not configured yet.' },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO || 'hello.shivasri@gmail.com';
  const from = process.env.CONTACT_FROM || 'Shiva Sri Portfolio <onboarding@resend.dev>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: 'Portfolio enquiry from ' + name,
        text: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Email service could not deliver the message. Please use the direct email link.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'The email service is temporarily unavailable.' },
      { status: 502 }
    );
  }
}
