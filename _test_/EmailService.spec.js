import { jest } from "@jest/globals";
import { EmailService } from "../EmailServices.js";

describe("EmailService", () => {
  test("should exist", () => {
    expect(EmailService).toBeDefined();
  });

  test("should retry when the provider fails once", async () => {
    let callCount = 0;

    const failingProvider = async (emailData) => {
      callCount++;
      console.log(`MockProvider call #${callCount}`);
      if (callCount === 1) {
        throw new Error("Simulated failure");
      }
      return { success: true, provider: "MockProvider" };
    };

    const service = new EmailService([failingProvider]);

    const status = await service.sendEmail({
      email: "test@example.com",
      content: "Hello",
      id: "retry-test",
    });
    console.log("STATUS RETURNED FROM sendEmail:", status);
    expect(callCount).toBeGreaterThan(1);
    expect(status.status).toBe("success");
    expect(status.provider).toBe("MockProvider");
  });
  test("should not send duplicate emails with the same ID", async () => {
    let callCount = 0;

    const mockProvider = async (emailData) => {
      callCount++;
      return { success: true, provider: "MockProvider" };
    };

    const service = new EmailService([mockProvider]);

    const emailData = {
      email: "test@example.com",
      content: "Hello again",
      id: "unique-id-123",
    };

    await service.sendEmail(emailData); // First time — should work
    await service.sendEmail(emailData); // Second time — should be skipped

    const status = service.getStatus();
    expect(callCount).toBe(1); // Should only call once
    expect(status.length).toBe(1);
    expect(status[0]).toEqual({
      id: "unique-id-123",
      status: "success",
      provider: "MockProvider",
    });
  });
  test("should mark email as failed when all providers fail", async () => {
    const alwaysFailingProvider = async () => {
      throw new Error("Provider failed");
    };

    const service = new EmailService([
      alwaysFailingProvider,
      alwaysFailingProvider,
    ]);

    const emailData = {
      email: "fail@example.com",
      content: "This will fail",
      id: "fail-test-id",
    };

    await service.sendEmail(emailData);

    const status = service.getStatus().find((s) => s.id === "fail-test-id");
    expect(status).toBeDefined();
    expect(status.status).toBe("failed");
  });
  test("should throw rate limit error after 5 emails in a minute", async () => {
    const mockProvider = jest.fn(async () => {
      return { success: true, provider: "MockProvider" };
    });

    const service = new EmailService([mockProvider]);

    for (let i = 0; i < 5; i++) {
      await service.sendEmail({
        email: `test${i}@example.com`,
        content: "Hello",
        id: `rate-limit-${i}`,
      });
    }

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await service.sendEmail({
      email: "test6@example.com",
      content: "Should fail",
      id: "rate-limit-6",
    });

    const status = service.getStatus().find((s) => s.id === "rate-limit-6");
    expect(status).toBeUndefined(); // Should not be in status log
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Rate limit")
    );

    consoleSpy.mockRestore();
  });
});
