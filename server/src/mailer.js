const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE ?? 'true') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Returns true if the mail was handed to the SMTP server, false otherwise. Never throws. */
async function sendEnquiryMail(enq) {
  const t = getTransporter();
  if (!t) {
    console.warn('[mail] SMTP not configured – enquiry saved but no email sent.');
    return false;
  }
  const when = new Date(enq.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px;color:#64748b;white-space:nowrap">${k}</td><td style="padding:6px 12px;font-weight:600;color:#0b2545">${v}</td></tr>`;

  const html = `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#0b2545;color:#fff;padding:16px 20px">
      <div style="font-size:12px;letter-spacing:.08em;color:#f5a623">NEW WEBSITE ENQUIRY</div>
      <div style="font-size:18px;font-weight:700">${esc(enq.name)}${enq.company ? ' · ' + esc(enq.company) : ''}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row('Mobile', `<a href="tel:${esc(enq.mobile)}" style="color:#0b2545">${esc(enq.mobile)}</a>`)}
      ${row('Company', esc(enq.company || '—'))}
      ${row('Service', esc(enq.service || '—'))}
      ${row('Received', esc(when))}
    </table>
    <div style="padding:12px 20px 20px;font-size:14px;color:#1e293b;white-space:pre-wrap">${esc(enq.message)}</div>
  </div>`;

  try {
    await t.sendMail({
      from: `"Aakarshit Enterprises Website" <${process.env.SMTP_USER}>`,
      to: process.env.ENQUIRY_TO || process.env.SMTP_USER,
      subject: `New enquiry from ${enq.name}${enq.company ? ' (' + enq.company + ')' : ''}`,
      text: `Name: ${enq.name}\nCompany: ${enq.company || '-'}\nMobile: ${enq.mobile}\nService: ${enq.service || '-'}\n\n${enq.message}`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[mail] failed to send enquiry email:', err.message);
    return false;
  }
}

module.exports = { sendEnquiryMail };
