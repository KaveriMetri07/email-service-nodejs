==================================================
EMAIL SENDING SERVICE - NODE.JS BACKEND PROJECT
==================================================

1. PROJECT TITLE
----------------
Email Sending Service - Reliable Node.js Microservice

2. DESCRIPTION
--------------
This project is a production-ready email sending service built with Node.js.
It ensures reliable and efficient email delivery by implementing industry best practices:

- Retry logic with exponential backoff on failed sends
- Fallback to alternative email providers if one fails
- Idempotency support to prevent duplicate emails using unique email IDs
- Rate limiting to prevent abuse (maximum 5 emails per minute)
- In-memory status tracking of all email send attempts

The goal is to create a scalable, fault-tolerant microservice suitable for real-world backend communication needs.

3. FEATURES
-----------
- Retries failed emails automatically with exponential backoff
- Switches to backup providers on failures to maximize delivery chances
- Blocks duplicate emails based on unique IDs (idempotency)
- Tracks status of every email send in memory (no external database)
- Limits email sends to 5 per minute to protect from spamming
- Comprehensive unit tests using Jest
- Clean, modular ES6+ codebase for maintainability and scalability

4. TECH STACK
-------------
- Node.js (v18 or higher)
- JavaScript (ES6 Modules)
- Jest (for unit testing)
- Console-based logging (can be extended to production logging tools)
- No external database; in-memory data structures only for demo purposes

5. FOLDER STRUCTURE
-------------------
email-service/
│
├── EmailService.js              # Core email service logic implementing retry, fallback, idempotency, and rate limiting
├── _test_/                      # Contains all test files
│   └── EmailService.spec.js     # Unit tests for EmailService class
├── package.json                 # Project dependencies and npm scripts
├── .gitignore                   # Git ignore rules
└── README.txt                   # This documentation file

6. GETTING STARTED
------------------
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

7. USAGE
--------
The EmailService class is designed to be imported and used in other Node.js applications or APIs.

Example:

   import EmailService from './EmailService.js';

   const providers = [
     async function MockProvider(email) {
       // Simulated email provider returning success
       return { status: 'success', provider: 'MockProvider' };
     }
   ];

   const emailService = new EmailService(providers);

   emailService.sendEmail({
     id: 'unique-id-123',
     email: 'user@example.com',
     subject: 'Hello!',
     body: 'This is a test email.'
   }).then(console.log);

8. RUNNING TESTS
----------------
The project includes a suite of unit tests using Jest to verify:

- Retry logic on provider failures
- Duplicate email blocking using idempotency
- Rate limiting enforcement
- Successful email delivery tracking
- Fallback provider handling

Run tests with:

   npm test

9. ENVIRONMENT VARIABLES
------------------------
Currently, all configurations are in-memory and hardcoded for demonstration.

You can extend the service in the future to support environment variables such as:

   PROVIDER_API_KEY=your-api-key
   MAX_EMAILS_PER_MINUTE=5

10. CONTRIBUTING GUIDELINES
---------------------------
Contributions are welcome! Please follow this workflow:

1. Fork the repository
2. Create a new branch: git checkout -b feature-name
3. Implement your changes
4. Add appropriate unit tests
5. Run `npm test` to verify everything works
6. Commit and push your branch
7. Submit a Pull Request with a clear description

Follow ES6 coding conventions and keep code modular and clean.

11. LICENSE
-----------
This project is licensed under the MIT License. See the LICENSE file for details.

12. CONTACT / AUTHOR INFO
-------------------------
Author: Kaveri M Metri 
Role: Full Stack Developer (MERN)  
Email: kaverimetri07@gmail.com  
LinkedIn: linkedin.com/in/Kaveri07  
GitHub: github.com/KaveriMetri07

==================================================
Summary:  
A Node.js backend email sending microservice with retry, fallback, idempotency, and rate limiting — built with ES6 modules and unit tested using Jest.

==================================================
