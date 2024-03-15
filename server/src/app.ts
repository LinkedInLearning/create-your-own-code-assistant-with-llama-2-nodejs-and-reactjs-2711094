import { fastify as Fastify, FastifyServerOptions } from 'fastify'
import { formatPrompt, formattOllamaResponse } from '@/LLMUtils';
import { sendPrompt } from './LLMUtils';
export default (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts)
  type ChatMessage = {
    // Define the structure of your chat message object
    // (e.g., text, author, codeSnippet)
  };
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  fastify.post('/chat', async (request, reply) => {
    const message = request.body; // parse chat message data

    // Format chat message into Ollama prompt (e.g., extract code, add context)
    const response = await sendPrompt(message);

    // Handle potential errors or timeouts
    if (!response?.ok) {
      const error = new Error(`Ollama API error: ${response.text}`);
      reply.code(500).send(error.message);
      return;
    }

    // Send formatted response back to VS Code extension
    reply.code(200).send(response.text);
  });

  return fastify
}