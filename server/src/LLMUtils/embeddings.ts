/**
 * This is the file that will generate and save our embeddings
 * 
 */
import { PrismaVectorStore } from '@langchain/community/vectorstores/prisma';
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const embeddings = new OllamaEmbeddings({
  model: "llama2", // default value
  baseUrl: "http://localhost:11434", // default value
});
