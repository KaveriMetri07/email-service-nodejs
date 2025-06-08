// providers.js

const getRandomDelay = () => Math.floor(Math.random() * 1000) + 500; // 500ms - 1500ms

// Provider A - 70% success rate
export const providerA = async (emailData) => {
  await new Promise((res) => setTimeout(res, getRandomDelay()));
  const success = Math.random() < 0.7;
  if (success) {
    return { provider: "ProviderA", status: "sent" };
  } else {
    throw { provider: "ProviderA", error: "Failed to send email" };
  }
};

// Provider B - 80% success rate
export const providerB = async (emailData) => {
  await new Promise((res) => setTimeout(res, getRandomDelay()));
  const success = Math.random() < 0.8;
  if (success) {
    return { provider: "ProviderB", status: "sent" };
  } else {
    throw { provider: "ProviderB", error: "Failed to send email" };
  }
};
