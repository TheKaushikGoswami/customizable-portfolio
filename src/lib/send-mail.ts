'use server';
import nodemailer from 'nodemailer';
import { ContactEmailTemplate } from '~/components/email-templates/contact-email';
import React from 'react';

type SendEmailProps = {
  email: string;
  subject: string;
  name: string;
  company: string;
  message: string;
  reason: string;
};

type SendEmailResponse = {
  errorMessage?: string;
  error: boolean;
  data?: unknown;
};

// Parse the port safely
const port = Number(process.env.SMTP_PORT || 587);

// ✅ Fix: correctly determine secure setting
// Port 465 = secure: true (SSL)
// Port 587 = secure: false (STARTTLS)
const isSecure = port === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: port,
  secure: isSecure, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // 🔍 Enable Debug Logs to see exactly what happens in the terminal
  logger: true,
  debug: true,
});

export async function SendEmail({
  email,
  subject,
  name,
  company,
  message,
  reason,
}: SendEmailProps): Promise<SendEmailResponse> {
  try {
    // Verify destination exists
    const destination = process.env.CONTACT_MAIL_TO;
    if (!destination) {
      throw new Error('CONTACT_MAIL_TO environment variable is missing.');
    }

    // Dynamic import to bypass Next.js 15 build restriction
    const { renderToStaticMarkup } = await import('react-dom/server');

    const emailHtml = renderToStaticMarkup(
      React.createElement(ContactEmailTemplate, {
        name,
        company,
        message,
        reason,
      })
    );

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER, // Gmail always overrides this to your authenticated email
      to: destination,
      replyTo: email, // This lets you hit "Reply" to answer the user
      subject: `[Portfolio] ${subject}`,
      html: emailHtml,
    });

    console.log('✅ Message sent ID:', info.messageId);
    return { data: info, error: false };
  } catch (error: any) {
    console.error('❌ SMTP Error:', error);
    return {
      errorMessage: error.message || 'Failed to send email',
      error: true,
    };
  }
}