import { transporter } from "./config";
interface emailProps {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: emailProps) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      text: text,
    });
    console.log("Correo enviado");
  } catch (error) {
    console.log("Error enviando el correo");
  }
};
