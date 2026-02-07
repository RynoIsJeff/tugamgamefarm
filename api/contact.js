import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const { name, phone, email, enquiry_type, subject, message } = req.body || {};

    if (!name || !phone || !message || !enquiry_type) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmail = process.env.TO_EMAIL || "bookings@tugamgamefarm.co.za";
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const safeSubject = subject?.trim()
      ? `[Tugam Website] ${subject.trim()}`
      : `[Tugam Website] New enquiry (${enquiry_type})`;

    const textBody = `
New enquiry from Tugam website:

Name: ${name}
Phone: ${phone}
Email: ${email || "-"}
Enquiry Type: ${enquiry_type}
Subject: ${subject || "-"}
Message:
${message}
`.trim();

    await transporter.sendMail({
      from: `"Tugam Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: email || undefined,
      subject: safeSubject,
      text: textBody,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Email failed to send" });
  }
}
