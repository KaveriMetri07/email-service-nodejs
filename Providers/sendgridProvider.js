// Updated providers.js (SendGrid)
import dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const SendGridProvider = {
  send: async ({ email, subject, body }) => {
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL, // must be verified sender
      subject,
      text: body,
    };

    const response = await sgMail.send(msg);
    return { provider: "SendGrid", success: true, response };
  },
};
