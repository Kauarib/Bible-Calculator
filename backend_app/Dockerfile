# backend_app/Dockerfile

# --- Estágio 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Estágio 2: Produção ---
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3001
CMD [ "node", "server.js" ]