import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('newsletter error: missing GMAIL_USER or GMAIL_PASS');
      return NextResponse.json({ error: 'Mail server not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send a simple welcome/confirmation email to the subscriber
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thanks for subscribing',
      text: 'Thanks for subscribing to our newsletter!',
      html: '<p>Thanks for subscribing to our newsletter!</p>',
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('newsletter error', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
