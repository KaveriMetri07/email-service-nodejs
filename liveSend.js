import EmailService from "./EmailServices.js";
import { SendGridProvider } from "./Providers/sendgridProvider.js";

const emailService = new EmailService([SendGridProvider]);

emailService
  .sendEmail({
    id: "email-123",
    email: "recipient@example.com", // 🧪 test with your own email
    subject: "Hello from SendGrid",
    body: "This is a real email using SendGrid!",
  })
  .then(console.log);
