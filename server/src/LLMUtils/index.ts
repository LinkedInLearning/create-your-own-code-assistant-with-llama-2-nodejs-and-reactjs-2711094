//import { Ollama as OllamaClient } from 'ollama-node';
//import { Ollama } from "@langchain/community/llms/ollama";

import { ChatOllama } from "@langchain/community/chat_models/ollama"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { 
  SystemMessagePromptTemplate, 
  HumanMessagePromptTemplate, 
  ChatPromptTemplate 
} from "@langchain/core/prompts"
// This might be replaced my langchain
const ollamaUrl = import.meta.env.VITE_OLLAMA_URL; // Use actual env variable name


if (!ollamaUrl) {
  throw new Error('Missing OLLAMA_URL environment variable');
}
const ollama = new ChatOllama({
  baseUrl: ollamaUrl, 
  model: "codellama",
   temperature: 0,
  repeatPenalty: 1,
  verbose: false
});

const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are an expert in computer programming.
     Please make friendly answer for the beginners.
     Add source code examples if you can.
    `), 
      HumanMessagePromptTemplate.fromTemplate(
    `I need a clear explanation regarding my {question}.
     And, please, be structured and precise.
    `
  )
])
// Function to format a prompt for Ollama
export function formatPrompt(promptText): string {
  // Add any necessary formatting or transformations here
  // For example, you might strip HTML tags or normalize encoding
  return promptText.replace(/<[^>]+>/g, ''); // Example: Strip HTML tags
}

// Function to format Ollama's response for display
export function formatOllamaResponse(responseText): string {
  // Apply any desired formatting or highlighting
  // For example, you might highlight code blocks or format lists
  return responseText.replace(/`(.+?)`/gms, '<pre>$1</pre>'); // Example: Format code blocks
}
// helper function to stream response
async function * streamResponse (stream) {

  for await (const chunk of stream) {
  yield formatOllamaResponse(chunk)
  }
}
// Method to send a prompt to Ollama and handle the response
export async function sendPrompt(promptText): Promise<any> {
  try {
   const outputParser = new StringOutputParser();
   const chain = prompt.pipe(ollama).pipe(outputParser) 
     const formattedPrompt = formatPrompt(promptText);
    const stream = await chain.stream(
 {question: formattedPrompt }
);


   return stream;
    
  } catch (error) {
    console.error('Error communicating with Ollama:', error);

    
    throw {ok: false, text: error}; // Re-throw for handling in calling code
  }
}