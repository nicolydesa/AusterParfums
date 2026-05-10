# Auster Parfums

Plataforma web para descobrir e comparar perfumes: catálogo, marcas, notas olfativas, ferramentas em **Descobrir** e **Comunidade** (fórum e feed de avaliações). A interface usa a marca **Verdara** no produto. Stack em **Next.js** (App Router), **React 19**, **TypeScript** e **Tailwind CSS**; tema claro/escuro.

O **catálogo** (perfumes, marcas, notas) vive em dados mock em `lib/data.ts`. **Usuários, avaliações e tópicos do fórum** são persistidos em **PostgreSQL** via **Prisma**.

## Funcionalidades

- **Catálogo**: listagem, detalhe do perfume, marcas, página de notas com contagens dinâmicas no catálogo.
- **Descobrir**: tradutor de perfume (texto → sugestões por notas/acordes), quiz, montagem por notas, DNA olfativo, similares e outras rotas em `app/discover/`.
- **Comparar**: comparação lado a lado (`/compare`).
- **Comunidade**: fórum por categorias e feed de avaliações recentes (`/community`).
- **Conta**: registro, login, edição de perfil e exclusão de conta (`/perfil`).
- **Lista de desejos**: preferências guardadas no navegador (sem login obrigatório).

## Requisitos

- **Node.js** 18.18+ ou 20+ (LTS recomendado)
- **PostgreSQL** para autenticação, avaliações e fórum

## Instalação

### 1. Dependências

```bash
npm install
```

O `postinstall` roda `prisma generate`. O cliente é gerado em `lib/generated/prisma` (pastas geradas podem estar no `.gitignore`).

### 2. Variáveis de ambiente

Copie o exemplo e edite os valores:

```bash
# Windows (cmd/PowerShell)
copy .env.example .env
```

```bash
# macOS / Linux
cp .env.example .env
```

| Variável        | Descrição |
|-----------------|-----------|
| `DATABASE_URL`  | URL do PostgreSQL (`postgresql://…`) |
| `AUTH_SECRET`   | Segredo para JWT em cookie HTTP-only; **mínimo 32 caracteres**, aleatório em produção |

### 3. Banco de dados

Com o Postgres acessível:

```bash
npm run db:migrate
```

CI/produção sem prompt interativo:

```bash
npx prisma migrate deploy
```

Inspeção visual dos dados:

```bash
npm run db:studio
```

### 4. Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Produção

```bash
npm run build
npm start
```

## Scripts npm

| Comando               | Descrição |
|-----------------------|-----------|
| `npm run dev`         | Servidor de desenvolvimento |
| `npm run build`       | Build de produção |
| `npm start`           | Servidor após `build` |
| `npm run lint`        | ESLint (`eslint-config-next`) |
| `npm run db:migrate`  | Migrações Prisma (dev) |
| `npm run db:push`     | Sincroniza schema sem nova migração (prototipação) |
| `npm run db:studio`   | Prisma Studio |

## Autenticação e perfil

- Rotas em **`/perfil`**: cadastro, login, edição de nome/e-mail/senha, exclusão de conta.
- Senhas com **bcrypt**; sessão com **JWT** (`jose`) em cookie HTTP-only.
- Alterar **e-mail** ou **senha** exige informar a senha atual.

### API (usuário e auth)

| Método | Rota | Uso |
|--------|------|-----|
| `POST` | `/api/auth/register` | Cadastro |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Encerrar sessão |
| `GET`  | `/api/auth/me` | Sessão atual |
| `PATCH` | `/api/user` | Atualizar perfil |
| `DELETE` | `/api/user` | Excluir conta |

### API (conteúdo social)

| Área | Rotas (resumo) |
|------|----------------|
| Avaliações | `GET/POST /api/reviews`, `GET/PATCH/DELETE /api/reviews/[reviewId]`, `POST /api/reviews/[reviewId]/helpful` |
| Fórum | `GET/POST /api/forum/threads`, `GET/PATCH/DELETE /api/forum/threads/[threadId]`, `GET/POST …/replies` |
| Estatísticas agregadas | `GET /api/public-stats` |

## Stack

- **Next.js** 16 (App Router), **React** 19  
- **Tailwind CSS** 4, componentes **Radix** / estilo shadcn  
- **Prisma** 7 + **PostgreSQL** (`pg`, `@prisma/adapter-pg`)  
- **Zod**, **react-hook-form** (formulários e validação onde aplicável)

## Estrutura do repositório

```
app/           # Páginas, layouts e rotas em app/api/*
components/    # UI React reutilizável
lib/           # Prisma client, dados mock, sessão, utilitários (ex.: perfume-images)
prisma/        # schema.prisma e migrations/
public/        # Assets estáticos
```

## Modelo de dados (Prisma)

Entidades persistidas incluem **User**, **PerfumeReview** (referência a `perfumeId` no mock de `lib/data.ts`), **ReviewHelpfulVote**, **ForumThread** e **ForumReply**. Detalhes em `prisma/schema.prisma`.

---

Licença e políticas de produto ficam à escolha do mantenedor deste repositório.
