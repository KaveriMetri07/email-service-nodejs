==================================================
EMAIL SENDING SERVICE - NODE.JS BACKEND PROJECT
==================================================

## 1. PROJECT TITLE

---

Email Sending Service - Reliable Node.js Microservice

## 2. DESCRIPTION

---

This project is a production-ready email sending service built with Node.js.
It ensures reliable and efficient email delivery by implementing industry best practices:

- Retry logic with exponential backoff on failed sends
- Fallback to alternative email providers if one fails
- Idempotency support to prevent duplicate emails using unique email IDs
- Rate limiting to prevent abuse (maximum 5 emails per minute)
- In-memory status tracking of all email send attempts

The goal is to simulate a **resilient and fault-tolerant email microservice**, suitable for real-world cloud deployment.

## 3. FEATURES

---

- Retries failed emails automatically with exponential backoff
- Switches to backup providers on failures to maximize delivery chances
- Blocks duplicate emails based on unique IDs (idempotency)
- Tracks status of every email send in memory (no external database)
- Limits email sends to 5 per minute to protect from spamming
- Comprehensive unit tests using Jest
- Clean, modular ES6+ codebase for maintainability and scalability

## 4. TECH STACK

---

- Node.js (v18 or higher)
- JavaScript (ES6 Modules)
- Jest (for unit testing)
- Console-based logging (can be extended to production logging tools)
- No external database; in-memory data structures only for demo purposes

## 5. FOLDER STRUCTURE

---

email-service/
│
├── App.js # Main Express server
├── EmailServices.js # Core logic for retry, fallback, rate limiting, etc.
├── Providers/
│ ├── MockProviders.js # Provider A and B (mock)
│ └── sendgridProvider.js # Optional real provider (SendGrid)
├── index.js # Standalone test runner for local testing
├── test/
│ └── EmailService.spec.js # Jest tests
├── package.json
├── .gitignore
└── README.md

## 6. GETTING STARTED

---

Follow these steps to run and test the project locally:

a. Clone the repository:
git clone <your-repo-url>
cd email-service

b. Install dependencies:
npm install

c. Run tests:
npm test

Note: To run tests successfully with ES Modules, use Node.js v18+ and run Jest with the following command:

node --experimental-vm-modules node_modules/jest/bin/jest.js

## Run local mock test

node index.js

## Run the API server locally

npm start
API will start on http://localhost:3000

## 7. USAGE

---

The EmailService class is designed to be imported and used in other Node.js applications or APIs.

Example:

## POST /send-email

{
"id": "email-001",
"email": "kaveemetri@gmail.com",
"subject": "Test Email",
"body": "This is a test message."
}

## Sample Response

{
"id": "email-001",
"status": "success",
"provider": "ProviderA"
}

## Duplicate call:

{
"id": "email-001",
"status": "duplicate"
}

## 8. MOCK PROVIDERS

The system uses two fake/mock email providers for testing:

Provider A: 70% success rate

Provider B: 80% success rate

They are simulated with delays and random failures to test retry and fallback logic.

Location: Providers/MockProviders.js

## 9. RUNNING TESTS

---

The project includes a suite of unit tests using Jest to verify:

- Retry logic on provider failures
- Duplicate email blocking using idempotency
- Rate limiting enforcement
- Successful email delivery tracking
- Fallback provider handling

## Run tests with:

    npm run test

## OR (if you're using ES6 modules):

    node --experimental-vm-modules node_modules/jest/bin/jest.js

## 10. ENVIRONMENT VARIABLES

---

This project uses .env for SendGrid (optional). Currently, mock providers do not require any secrets.

PROVIDER_API_KEY=your-api-key
MAX_EMAILS_PER_MINUTE=5
SENDGRID_API_KEY=your_key_here

## 11.DEPLOYMENT (RENDER)

This service is deployed on Render at:
POST https://your_email_services-example.onrender.com/send-email
Feel free to use Thunder Client, Postman, or curl to test

## 12. CONTRIBUTING GUIDELINES

---

Contributions are welcome! Please follow this workflow:

1. Fork the repository
2. Create a new branch: git checkout -b feature-name
3. Implement your changes
4. Add appropriate unit tests
5. Run `npm test` to verify everything works
6. Commit and push your branch
7. Submit a Pull Request with a clear description

Follow ES6 coding conventions and keep code modular and clean.

## 13. LICENSE

---

This project is licensed under the MIT License. See the LICENSE file for details.

## 14. CONTACT / AUTHOR INFO

---

Author: Kaveri M Metri
Role: Full Stack Developer (MERN)  
Email: kaverimetri07@gmail.com  
LinkedIn: linkedin.com/in/Kaveri07  
GitHub: github.com/KaveriMetri07

==================================================

## Summary:

A Node.js backend email sending microservice with retry, fallback, idempotency, and rate limiting — built with ES6 modules and unit tested using Jest.

==================================================
