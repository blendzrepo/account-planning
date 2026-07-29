# Account Business Plan

Aplicação para gerenciar o planejamento de contas (Account Business Plan), substituindo o modelo em PPT. Cada cliente tem uma única página com todas as informações do plano, navegável por um menu lateral com as 9 seções:

1. Análise da situação atual
2. Mapa de stakeholders
3. Objetivos e metas
4. Oportunidades e pipeline
5. Riscos e plano de churn
6. Análise SWOT da conta
7. Proposta de valor
8. Plano de ação
9. Métricas e governança

Todas as informações são editáveis diretamente na tela (clique para editar campos, adicione/edite/remova linhas nas tabelas).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- SQLite via Prisma ORM (arquivo local `dev.db`, sem necessidade de servidor de banco)

## Setup

```bash
npm install
cp .env.example .env
npm run db:migrate   # cria o banco local e aplica as migrations
npm run db:seed      # (opcional) popula com dois clientes de exemplo
npm run dev
```

Abra http://localhost:3000 — a página inicial redireciona para o primeiro cliente cadastrado (ou para a criação de um novo cliente, se ainda não houver nenhum).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` / `npm run start` — build e execução em produção
- `npm run db:migrate` — aplica migrations do Prisma
- `npm run db:seed` — repovoa o banco com os clientes de exemplo (Azul e Vivo)
- `npm run db:studio` — abre o Prisma Studio para inspecionar o banco
