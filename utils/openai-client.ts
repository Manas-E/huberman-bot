import { OpenAI } from "langchain/llms/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Credentials");
}

export const openai = process.env.USE_CUSTOM_MODEL
  ? new OpenAI({
      model: process.env.OPENAI_MODEL,
      temperature: 0,
      maxTokens: 500,
    })
  : new OpenAI({
      temperature: 0,
      maxTokens: 500,
    });
