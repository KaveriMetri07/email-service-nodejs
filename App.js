// server/App.js
import express from "express";
import dotenv from "dotenv";
import { EmailService } from "./EmailServices.js";
import { SendGridProvider } from "./Providers/sendgridProvider.js";

dotenv.config();

const app = express();
app.use(express.json());

const emailService = new EmailService([SendGridProvider]);

app.post("/send-email", async (req, res) => {
  const { id, email, subject, body } = req.body;

  if (!id || !email || !subject || !body) {
    return res
      .status(400)
      .json({ error: "All fields are required: id, email, subject, body" });
  }

  const result = await emailService.sendEmail({ id, email, subject, body });
  res.status(result.status === "success" ? 200 : 500).json(result);
});

// Render requires you to bind to process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📡 Email API listening on port ${PORT}`));
