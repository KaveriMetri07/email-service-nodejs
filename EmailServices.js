import { providerA, providerB } from "./Providers/MockProviders.js";

export class EmailService {
  constructor(providers) {
    this.providers = providers || [providerA, providerB]; // Try providerA first, then fallback to providerB
    this.sentEmails = new Set(); // For idempotency
    this.status = []; // Track send attempts
    this.rateLimit = {
      maxPerMinute: 5,
      timestamps: [],
    };
  }

  //  Rate Limiting
  checkRateLimit() {
    const now = Date.now();
    // Keep only the timestamps from last 60 seconds
    this.rateLimit.timestamps = this.rateLimit.timestamps.filter(
      (ts) => now - ts < 60000
    );
    if (this.rateLimit.timestamps.length >= this.rateLimit.maxPerMinute) {
      throw new Error("Rate limit exceeded");
    }
    this.rateLimit.timestamps.push(now);
  }

  //  Idempotency check
  isDuplicate(id) {
    return this.sentEmails.has(id);
  }

  markSent(id) {
    this.sentEmails.add(id);
  }

  //  Main send method
  // Inside EmailService class
  async sendEmail(emailData) {
    const { id } = emailData;

    if (this.isDuplicate(id)) {
      console.log(`Duplicate email blocked: ${id}`);
      return { id, status: "duplicate" }; // Return some object
    }

    try {
      this.checkRateLimit();
    } catch (err) {
      console.error(`Rate limit: ${err.message}`);
      return { id, status: "rate-limited" }; // Also return some object
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        const result = await this.retryWithBackoff(() => {
          // If provider is a function, call directly
          if (typeof provider === "function") {
            return provider(emailData);
          }
          // If it's an object with .send(), use that
          if (typeof provider.send === "function") {
            return provider.send(emailData);
          }
          throw new Error(
            "Invalid provider: must be function or have .send() method"
          );
        });

        this.markSent(id);
        const successStatus = {
          id,
          status: "success",
          provider: result.provider || "unknown",
        };
        this.status.push(successStatus);
        console.log(`Email sent using ${result.provider}`);
        return successStatus; //  Must return
      } catch (err) {
        console.warn(`Provider ${i + 1} failed:`, err.error || err.message);
      }
    }

    const failStatus = { id, status: "failed" };
    this.status.push(failStatus);
    console.error(`All providers failed for email ID ${id}`);
    return failStatus; //  Must return
  }

  //  Retry with exponential backoff
  async retryWithBackoff(fn, retries = 3) {
    let delay = 500;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === retries - 1) throw err;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }

  //  Get status of sent emails
  getStatus() {
    return this.status;
  }
}
