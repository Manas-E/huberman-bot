import type { NextApiRequest, NextApiResponse } from "next";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { openai } from "../../utils/openai-client";
import { pinecone } from "../../utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "../../config/pinecone";
import * as mockData from "./mock.json";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question } = req.body;

  const shouldMockTheRes = false;

  if (!question) {
    return res.status(400).json({ message: "No question in the request" });
  }

  if (shouldMockTheRes) return res.status(200).json(mockData);

  try {
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const index = pinecone.Index(PINECONE_INDEX_NAME);
    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: process.env.AI_TEMP,
      }),
      {
        pineconeIndex: index,
      }
    );

    const model = openai;
    // create the chain
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });

    //Ask a question
    const response = await chain.call({ query: sanitizedQuestion });

    console.log("response", response);

    res.status(200).json(response);
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error?.message || "Unknown error." });
  }
}
