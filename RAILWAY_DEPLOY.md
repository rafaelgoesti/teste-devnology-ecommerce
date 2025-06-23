# 🚂 Deploy do Backend na Railway

## 📋 Pré-requisitos
- Conta no GitHub (já tem ✅)
- Repositório no GitHub (já tem ✅)
- Código commitado (já tem ✅)

## 🚀 Passo a Passo para Deploy

### 1️⃣ **Criar conta na Railway**
1. Acesse: https://railway.app
2. Clique em "Start a New Project"
3. Faça login com sua conta do GitHub
4. Autorize a Railway a acessar seus repositórios

### 2️⃣ **Criar novo projeto**
1. Clique em "Deploy from GitHub repo"
2. Selecione: `rafaelgoesti/teste-devnology-ecommerce`
3. Escolha a pasta `backend` como root directory
4. A Railway vai detectar automaticamente que é um projeto Node.js

### 3️⃣ **Configurar variáveis de ambiente**
Na aba "Variables" do seu projeto, adicione:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=sqlite:///tmp/ecommerce.db
FRONTEND_URL=https://seu-frontend.vercel.app
```

### 4️⃣ **Deploy automático**
- A Railway vai fazer o build automaticamente
- O deploy será feito usando o arquivo `railway.json` já configurado
- Comando de build: `npm install && npm run build`
- Comando de start: `npm run start:prod`

### 5️⃣ **Obter URL da API**
- Após o deploy, você receberá uma URL como:
- `https://seu-projeto.railway.app`
- Esta será sua nova URL da API

## 🔧 Arquivos já configurados:

✅ `backend/railway.json` - Configuração da Railway
✅ `backend/Procfile` - Comando de inicialização  
✅ `backend/env.example` - Exemplo de variáveis
✅ `backend/src/main.ts` - Porta dinâmica configurada

## 📡 Endpoints da API hospedada:

Depois do deploy, sua API estará disponível em:
- `https://seu-projeto.railway.app/api/products`
- `https://seu-projeto.railway.app/api/orders` 
- `https://seu-projeto.railway.app/api/docs` (Swagger)

## 🔄 Próximos passos:

1. ✅ Deploy do backend na Railway
2. 🔄 Atualizar frontend para usar a nova URL da API
3. 🔄 Redeploy do frontend no Vercel
4. ✅ Sistema funcionando 100% na nuvem!

## 🐛 Troubleshooting:

**Erro de build:**
- Verifique se o `package.json` está correto
- Confirme que o script `start:prod` existe

**Erro de conexão:**
- Confirme que as variáveis de ambiente estão configuradas
- Verifique se a URL da API está correta no frontend

**Banco de dados:**
- SQLite funciona temporariamente
- Para produção, recomendo PostgreSQL (gratuito na Railway)

## 💾 Upgrade para PostgreSQL (Recomendado):

1. Na Railway, clique em "Add Service"
2. Selecione "PostgreSQL"
3. Copie a `DATABASE_URL` gerada
4. Atualize a variável `DATABASE_URL` no backend
5. Redeploy automático

---

**🚂 Pronto! Seu backend estará rodando na Railway! 🎉**
