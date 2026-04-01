# RSVP Cyberpunk

Base full-stack em Next.js (App Router) + Supabase, preparada para evoluir o design de `cyberpunk-rsvp.pen`.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- `tailwind-merge` + `tailwind-variants` (componentes estilo shadcn)
- Supabase (`@supabase/supabase-js` + `@supabase/ssr`)

## Começando

1. Instale dependências:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env.local
```

Preencha:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

3. Rode em desenvolvimento:

```bash
npm run dev
```

## Banco de dados (Supabase)

Para habilitar persistência do RSVP, aplique a migration:

- Arquivo: `supabase/migrations/202604011715_create_rsvp_confirmations.sql`
- No Supabase SQL Editor, cole e execute o conteúdo do arquivo

Isso cria a tabela `public.rsvp_confirmations`, índices e política RLS para insert via `anon/authenticated`.

## Scripts

- `npm run dev` - ambiente local
- `npm run lint` - lint com ESLint
- `npm run typecheck` - checagem TypeScript
- `npm run build` - build de produção

## Estrutura base

- `src/app` - rotas App Router, página pública e handlers (`/api/health`)
- `src/actions` - Server Actions
- `src/components/ui` - componentes reutilizáveis com variants
- `src/lib/supabase` - clientes browser/server/admin + atualização de sessão
- `proxy.ts` - integração de sessão Supabase no pipeline de request
