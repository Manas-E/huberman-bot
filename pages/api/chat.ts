import type { NextApiRequest, NextApiResponse } from "next";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { openai } from "../../utils/openai-client";
import { pinecone } from "../../utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "../../config/pinecone";
import { ConversationalRetrievalQAChain } from "langchain/chains";

import * as mockData from "./mock.json";
import { CombineChatHistory } from "../../utils/combineChatHistory";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, chatHistory } = req.body;

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

    // Normal similarity search on vector store

    // create the chain

    if (process?.env?.USE_CONTEXT === "true") {
      console.log("context QA chain");

      const combinedChatHistory = CombineChatHistory(chatHistory?.slice(1));
      const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        { returnSourceDocuments: true }
      );
      console.log(combinedChatHistory, "==");
      const response = await chain.call({
        question: sanitizedQuestion,
        chat_history: combinedChatHistory,
      });

      return res.status(200).json(response);
    } else {
      console.log("simple QA chain");
      const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
        k: 1,
        returnSourceDocuments: true,
      });

      // Ask a question
      const response = await chain.call({
        query: sanitizedQuestion,
      });

      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log("error ", error, "<<<");
    res.status(error.status).json({ error: error.message });
  }
}
