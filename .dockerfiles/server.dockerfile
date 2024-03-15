# Use a Node.js 18-alpine image as the base
FROM node:21-alpine AS builder

# Set the working directory in the Docker image
WORKDIR /app

# Copy the package.json and package-lock.json files to the Docker image
COPY server/package.json ./

# Install the @rollup/pluginutils package
#RUN npm install @rollup/pluginutils --legacy-peer-deps

# Install the dependencies in the Docker image
RUN ["npm", "install", "--legacy-peer-deps"] 

# Copy the rest of the server code to the Docker image
COPY server/src ./src
COPY server/vite.config.ts ./vite.config.ts
# Build the application
RUN npm run build

# Start a new stage to create a smaller final image
FROM node:21-alpine

# Set the working directory in the Docker image
WORKDIR /app

# Copy the node_modules and built files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port that Fastify is running on
EXPOSE 3000

# Start the Fastify server
CMD ["npm", "start"]