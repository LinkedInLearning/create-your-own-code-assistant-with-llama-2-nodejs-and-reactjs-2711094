


import envSchema from 'env-schema'
import fastify from './app'
import logger from '@utils/logger'

const app = fastify({
  logger,
  pluginTimeout: 50000,
  bodyLimit: 15485760
})


// Start server
if (import.meta.env.PROD) {
  try {
    // Get port from .env or 3000
    const { PORT } = envSchema({
      dotenv: true,
      schema: {
        type: 'object',
        required: ['PORT'],
        properties: {
          PORT: {
            type: 'string',
            default: 3000
          }
        }
      }
    })

    app.listen({ port: PORT as number, host: '0.0.0.0' })
    console.log(`Server started on 0.0.0.0:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
} 

export { app as viteNodeApp };

/* First install fasify deps
npm install fastify @types/node @types/fastify
npm install node-fetch or maybe ollama langchain
npm install typescript

install types
npm i -D @types/node

create src/server.ts

fill in */ 

