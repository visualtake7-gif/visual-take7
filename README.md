# Visual Take7 🎬

Site profissional de produção audiovisual. Stack: React + Vite + Supabase.

## Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Supabase
Copie `.env.example` para `.env.local` e preencha suas credenciais:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 3. Criar tabela no Supabase
No SQL Editor do Supabase, execute:
```sql
create table portfolio (
  id bigint generated always as identity primary key,
  titulo text not null,
  imagem text,
  created_at timestamptz default now()
);

-- Habilitar Row Level Security
alter table portfolio enable row level security;

-- Leitura pública (para exibir o portfólio sem login)
create policy "public read" on portfolio
  for select using (true);

-- Somente usuários autenticados podem inserir/deletar
create policy "auth insert" on portfolio
  for insert with check (auth.role() = 'authenticated');

create policy "auth delete" on portfolio
  for delete using (auth.role() = 'authenticated');
```

### 4. Criar usuário admin
No painel do Supabase → Authentication → Users → Invite User
(ou use o método signUp via código)

### 5. Rodar o projeto
```bash
npm run dev
```

## Estrutura
```
visual-take7/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── supabase.js
    └── style.css
```

## Funcionalidades
- ✅ Home com hero section animada
- ✅ Portfólio carregado do Supabase
- ✅ Login com email/senha via Supabase Auth
- ✅ Área admin: adicionar e remover projetos
- ✅ Navbar responsiva com mobile menu
- ✅ Tema dark + roxo neon (#a855f7)
- ✅ Skeleton loading, hover effects, animações
- ✅ Feedback visual de erros e sucesso
"# visual-take7" 
