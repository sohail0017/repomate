import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKeyNames = Array.from(
  { length: 7 },
  (_, index) => `GEMINI_API_KEY_${index + 1}`,
);

let nextApiKeyIndex = 0;

function getConfiguredApiKeys() {
  return geminiApiKeyNames
    .map((name) => process.env[name]?.trim())
    .filter(Boolean);
}

export function getNextGeminiApiKey() {
  const apiKeys = getConfiguredApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      "No Gemini API keys are configured. Set GEMINI_API_KEY_1 through GEMINI_API_KEY_7.",
    );
  }

  const apiKey = apiKeys[nextApiKeyIndex % apiKeys.length];
  nextApiKeyIndex = (nextApiKeyIndex + 1) % apiKeys.length;

  return apiKey;
}

export function getGeminiClient() {
  return new GoogleGenAI({
    apiKey: getNextGeminiApiKey(),
  });
}
