# Use a imagem oficial do Node.js Alpine (menor e mais segura)
FROM node:20-alpine AS base

# Instalar dependências necessárias e criar usuário em uma única camada
RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Build stage
FROM base AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo dev) e limpar cache
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Compilar aplicação
RUN npm run build

# Production stage - usar imagem ainda menor
FROM node:20-alpine AS runner

# Instalar apenas o dumb-init e criar usuário
RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar apenas dependências de produção e limpar tudo desnecessário
RUN npm ci --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/* /root/.npm

# Copiar apenas os arquivos necessários da build
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/drizzle.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/healthcheck.js ./

# Usar usuário não-root
USER nextjs

# Expor porta
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Usar dumb-init para lidar com sinais
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar aplicação
CMD ["node", "dist/server.js"]