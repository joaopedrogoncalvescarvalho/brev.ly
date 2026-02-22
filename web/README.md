# Brev.ly - Frontend

Aplicação frontend para o encurtador de URLs Brev.ly, desenvolvida com React, TypeScript, Vite e TailwindCSS.

## Funcionalidades e Regras

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com encurtamento mal formatado
  - [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados

Regras específicas para o front-end:

- [x] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`
- [x] Siga o mais fielmente possível o layout do Figma
- [x] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação)
- [x] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares

## Páginas

- **Página raiz (`/`)** - Exibe o formulário de cadastro e a listagem dos links cadastrados
- **Página de redirecionamento (`/:url-encurtada`)** - Busca o valor dinâmico da URL e faz a pesquisa na API
- **Página de recurso não encontrado** - Exibida para URLs não encontradas

## Tecnologias Utilizadas

### Obrigatórias

- ✅ TypeScript
- ✅ React
- ✅ Vite (sem framework)
- ✅ React Hook Form
- ✅ TailwindCSS

### Opcionais

- ✅ React Query (@tanstack/react-query)
- ✅ Zod

## Como executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**

   ```bash
   cp .env.example .env.local
   ```

   Edite o arquivo `.env.local` com as URLs corretas:

   ```
   VITE_FRONTEND_URL=http://localhost:3000
   VITE_BACKEND_URL=http://localhost:3333
   ```

3. **Iniciar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Build para produção:**
   ```bash
   npm run build
   ```

## Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── forms/           # Formulários
│   ├── layout/          # Componentes de layout
│   ├── links/           # Componentes relacionados a links
│   └── ui/              # Componentes de UI básicos
├── hooks/               # Custom hooks
├── pages/               # Páginas da aplicação
├── schemas/             # Schemas de validação (Zod)
├── services/            # Serviços de API
├── types/               # Tipos TypeScript
└── utils/               # Utilitários e helpers
```

## Funcionalidades

### Criar Link

- Formulário para inserir URL original
- Opção de personalizar URL encurtada
- Validação de URLs e formato do encurtamento
- Feedback de erro para URLs já existentes

### Listar Links

- Visualização de todos os links criados
- Informações de acesso para cada link
- Ações de copiar, visitar e deletar
- Empty state quando não há links

### Redirecionamento

- Redirecionamento automático para URL original
- Incremento automático do contador de acessos
- Loading state durante o redirecionamento

### Exportar Relatório

- Geração de arquivo CSV com todos os links
- Download automático do relatório

## Design System

O projeto implementa um design system moderno e elegante com:

### 🎨 **Paleta de Cores**

- **Primary**: Tons de roxo/violeta (`#a855f7` - `#581c87`)
- **Accent**: Tons de azul (`#0ea5e9` - `#0c4a6e`)
- **Neutral**: Escalas de cinza balanceadas

### 🎭 **Componentes Visuais**

- **Cards com gradientes sutis** - Efeitos de profundidade
- **Bordas arredondadas modernas** - Border radius de 12-24px
- **Sombras elegantes** - Shadow layers para hierarquia visual
- **Hover effects** - Micro-animações e transformações
- **Backdrop blur** - Efeitos de vidro fosco

### 📝 **Tipografia**

- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 900 (Black)
- **Scale**: Sistema harmonioso de tamanhos
- **Line height**: 1.6 para melhor legibilidade

### 🎯 **Hero Section**

- Gradiente roxo vibrante como background principal
- Layout centrado com call-to-action destacado
- Formulário integrado com backdrop blur
- Iconografia consistente com Lucide React

### 📱 **Responsividade Avançada**

- **Mobile-first approach**
- Grid system flexível
- Breakpoints otimizados (sm, md, lg, xl, 2xl)
- Touch-friendly em dispositivos móveis

## UX/UI Features

- **Loading states** - Indicadores visuais durante operações
- **Empty states** - Estados vazios informativos
- **Error handling** - Tratamento de erros com feedback claro
- **Responsive design** - Layout adaptável para mobile e desktop
- **Accessibility** - Componentes acessíveis com foco visível
