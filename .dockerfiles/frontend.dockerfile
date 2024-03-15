# Dockerfile

# 1. Base stage
FROM node:14 as base
WORKDIR /frontend
COPY package*.json ./

# 2. Build stage
FROM base as build
RUN npm install
COPY . .
RUN npm run build

# 3. Production stage
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]