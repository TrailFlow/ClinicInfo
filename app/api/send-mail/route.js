import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message)
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('send-mail error: missing GMAIL_USER or GMAIL_PASS');
      return NextResponse.json({ error: 'Mail server not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.CONTACT_RECEIVER || process.env.GMAIL_USER,
      subject: `Website contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('send-mail error', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
