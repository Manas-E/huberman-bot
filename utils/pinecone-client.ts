import { PineconeClient } from "@pinecone-database/pinecone";

console.log(process.env.PINECONE_ENVIRONMENT, "==");
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error("Pinecone environment or api key vars missing");
}

async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY ?? "",
      environment: process.env.PINECONE_ENVIRONMENT ?? "",
    });

    return pinecone;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export const pinecone = await initPinecone();
