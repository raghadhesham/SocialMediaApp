import { createTransport } from "nodemailer";
import { config } from "../../../config/config.services";
export const sendEmail = async ({
  from,
  to,
  subject,
  html,
  attachments = [],
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: [];
}) => {
  const transporter = createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: config.email.EMAIL,
      pass: config.email.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    attachments,
  });
  return info.accepted.length ? true : false;
};
export const generateOTP = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};
