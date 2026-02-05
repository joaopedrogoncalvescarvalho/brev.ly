# Brev.ly - API de Encurtador de URLs

Uma API para encurtamento de URLs desenvolvida com TypeScript, Fastify, Drizzle ORM e PostgreSQL.

## ✨ Funcionalidades

### Implementadas

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Cloudflare R2)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## 🚀 Tecnologias

- **TypeScript** - Tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe
- **PostgreSQL** - Banco de dados relacional
- **Cloudflare R2** - Armazenamento de arquivos (CDN)
- **Docker** - Containerização

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL (ou Docker)
- Conta Cloudflare R2 (para CSV export)

## 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd brev.ly/server
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas configurações:

   ```env
   PORT=3333
   DATABASE_URL="postgresql://username:password@localhost:5432/brevly"

   CLOUDFLARE_ACCOUNT_ID="seu-account-id"
   CLOUDFLARE_ACCESS_KEY_ID="sua-access-key"
   CLOUDFLARE_SECRET_ACCESS_KEY="sua-secret-key"
   CLOUDFLARE_BUCKET="seu-bucket"
   CLOUDFLARE_PUBLIC_URL="https://seu-dominio.r2.dev"
   ```

4. **Execute as migrações**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Inicie a aplicação**
   ```bash
   npm run dev
   ```

## 🐳 Docker

### Desenvolvimento com Docker Compose

```bash
# Subir todos os serviços (PostgreSQL + API)
docker-compose up -d

# Executar migrações
docker-compose exec app npm run db:migrate

# Ver logs
docker-compose logs -f app
```

### Build da imagem

```bash
# Build da imagem
docker build -t brevly-api .

# Executar container
docker run -p 3333:3333 --env-file .env brevly-api
```

## 📡 API Endpoints

### Links

- `POST /links` - Criar novo link
- `GET /links` - Listar todos os links
- `GET /links/:shortUrl` - Obter link por URL encurtada
- `DELETE /links/:shortUrl` - Deletar link
- `PATCH /links/:shortUrl/increment` - Incrementar contador de acessos

### Redirecionamento

- `GET /:shortUrl` - Redirecionar para URL original

### Export

- `GET /export/csv` - Exportar links em CSV

### Utilitários

- `GET /health` - Health check

## 📝 Exemplos de Uso

### Criar um link

```bash
curl -X POST http://localhost:3333/links \
  -H "Content-Type: application/json" \
  -d '{
    "originalUrl": "https://rocketseat.com.br",
    "shortUrl": "rocket"
  }'
```

### Listar links

```bash
curl http://localhost:3333/links
```

### Acessar link encurtado

```bash
curl -L http://localhost:3333/rocket
```

### Exportar CSV

```bash
curl http://localhost:3333/export/csv
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Iniciar em modo desenvolvimento
- `npm run build` - Compilar para produção
- `npm run start` - Iniciar aplicação compilada
- `npm run db:generate` - Gerar migrações
- `npm run db:migrate` - Executar migrações
- `npm run db:studio` - Abrir Drizzle Studio

## 📁 Estrutura do Projeto

```
server/
├── drizzle/                # Migrações do banco
│   ├── 0001_initial.sql
│   └── meta/
├── src/
│   ├── db/
│   │   ├── connection.ts   # Conexão com banco
│   │   └── schema.ts       # Esquemas Drizzle
│   ├── providers/
│   │   └── storage.ts      # Provider para Cloudflare R2
│   ├── routes/
│   │   ├── links.ts        # Rotas dos links
│   │   └── export.ts       # Rotas de exportação
│   ├── utils/
│   │   └── url-validation.ts # Validação de URLs
│   ├── env.ts              # Validação de env vars
│   └── server.ts           # Servidor principal
├── Dockerfile              # Container Docker
├── drizzle.config.ts       # Configuração Drizzle
├── healthcheck.js          # Health check do container
├── package.json            # Dependências do projeto
└── tsconfig.json          # Configuração TypeScript
```
