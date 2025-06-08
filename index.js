// index.js
import { EmailService } from "./EmailServices.js";

const emailService = new EmailService();

// Simulate sending 3 emails (one of them is a duplicate)
const run = async () => {
  await emailService.sendEmail({
    id: "email-001",
    to: "abc@example.com",
    subject: "Welcome!",
    body: "Thank you for joining.",
  });

  await emailService.sendEmail({
    id: "email-002",
    to: "def@example.com",
    subject: "Reminder!",
    body: "Don’t forget to check in.",
  });

  await emailService.sendEmail({
    id: "email-001", // Duplicate ID to test idempotency
    to: "abc@example.com",
    subject: "Welcome again?",
    body: "Oops, did I send this already?",
  });

  console.log("\n Final Status:", emailService.getStatus());
};

run();
