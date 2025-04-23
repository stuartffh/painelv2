# Use Node.js LTS
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Imagem de produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["node", "server.js"]