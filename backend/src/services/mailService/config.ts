import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const options: SMTPTransport.Options = {
  host: process.env.MAIL_HOST!,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
};

export const transporter = nodemailer.createTransport(options);