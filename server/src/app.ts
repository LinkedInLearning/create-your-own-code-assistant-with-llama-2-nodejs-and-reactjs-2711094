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
    // @ts-ignore
    const message = request.body["question"]; // parse chat message data

    // Format chat message into Ollama prompt (e.g., extract code, add context)
    const responseStream = await sendPrompt(message);

    reply.header('Content-Type', 'application/octet-stream')
    reply.code(200).send(responseStream)
  });

  return fastify
}