import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ApiResponse = {
  message: string;
};

type ContactRequest = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-memory rate limiting.
// For multi-instance/serverless deployments, use a shared store such as Redis.
const rateLimitStore = new Map<string, RateLimitEntry>();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  requireTLS: Number(process.env.SMTP_PORT || 587) !== 465,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return entities[character];
  });
}

function getClientIp(req: NextApiRequest): string {
  // Prefer the socket address unless you have configured and trust
  // a known reverse proxy that supplies x-forwarded-for.
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodically remove expired entries.
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);

  if (!current || now >= current.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });

    return false;
  }

  current.count += 1;

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function createEmailLayout(content: string): string {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cryptech Services</title>
      </head>
      <body style="margin:0;padding:24px;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;color:#333;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"
                style="width:100%;max-width:600px;background:#fff;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 30px;background:#171717;color:#fff;">
                    <h1 style="margin:0;font-size:22px;">Cryptech Services</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;line-height:1.7;">
                    ${content}
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 30px;background:#f0f0f0;color:#777;font-size:12px;">
                    Cryptech Services
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function createInquiryEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\r?\n/g, '<br />');

  return createEmailLayout(`
    <h2 style="margin-top:0;">New website inquiry</h2>
    <p>You have received a new message through the Cryptech Services website.</p>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>

    <hr style="border:0;border-top:1px solid #e5e5e5;margin:24px 0;" />

    <h3>Message</h3>
    <p style="overflow-wrap:anywhere;">${message}</p>

    <p>
      <a href="mailto:${email}" style="color:#1769aa;">Reply to ${name}</a>
    </p>
  `);
}

function createConfirmationEmail(name: string): string {
  return createEmailLayout(`
    <h2 style="margin-top:0;">We've received your inquiry</h2>

    <p>Hi ${escapeHtml(name)},</p>

    <p>
      Thank you for contacting <strong>Cryptech Services</strong>.
      This email confirms that we received your inquiry submitted through
      our website.
    </p>

    <p>
      Our team will review your message and contact you if further information
      is needed.
    </p>

    <p>
      If you need assistance, email us at
      <a href="mailto:inquiries@cryptech.services" style="color:#1769aa;">
        inquiries@cryptech.services
      </a>.
    </p>

    <p>Thank you for considering Cryptech Services.</p>
  `);
}

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({
      message: 'Method not allowed. Please submit the contact form.'
    });
  }

  const { name, email, subject, message } = (req.body ?? {}) as ContactRequest;

  // Validate all fields.
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      message: 'Please complete all fields before submitting.'
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject = subject.trim();
  const cleanMessage = message.trim();

  if (
    cleanName.length > 120 ||
    cleanEmail.length > 254 ||
    cleanSubject.length > 200 ||
    cleanMessage.length > 10000
  ) {
    return res.status(400).json({
      message: 'One or more fields exceed the allowed length.'
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({
      message: 'Please provide a valid email address.'
    });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({
      message: 'Too many requests. Please wait a moment and try again.'
    });
  }

  // Check SMTP configuration before attempting to send.
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USERNAME ||
    !process.env.SMTP_PASSWORD
  ) {
    console.error('Contact API error: SMTP environment variables are missing.');

    return res.status(500).json({
      message: 'Email service is not configured. Please try again later.'
    });
  }

  try {
    // Send the inquiry to the Cryptech Services team.
    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: 'inquiries@cryptech.services',
      replyTo: {
        name: cleanName,
        address: cleanEmail
      },
      subject: `[CT Services] ${cleanSubject}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Subject: ${cleanSubject}`,
        '',
        'Message:',
        cleanMessage
      ].join('\n'),
      html: createInquiryEmail({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage
      })
    });

    // Send a receipt confirmation to the sender.
    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: cleanEmail,
      subject: 'Receipt Confirmation: Your Inquiry to Cryptech Services',
      text: [
        `Hi ${cleanName},`,
        '',
        'Thank you for contacting Cryptech Services.',
        'We have received your inquiry and our team will review it.',
        '',
        'For assistance, contact inquiries@cryptech.services.'
      ].join('\n'),
      html: createConfirmationEmail(cleanName)
    });

    return res.status(200).json({
      message: 'Your message has been sent successfully!'
    });
  } catch (error: unknown) {
    console.error('Nodemailer error:', error);

    return res.status(500).json({
      message: 'Unable to send your message. Please try again later.'
    });
  }
}
