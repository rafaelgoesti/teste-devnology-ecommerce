# 🌐 Deploy do Backend no Heroku

## 📋 Pré-requisitos
- Conta no Heroku (criar em https://heroku.com)
- Heroku CLI instalado
- Conta GitHub (já tem ✅)
- Repositório no GitHub (já tem ✅)

## 🚀 Passo a Passo para Deploy

### 1️⃣ **Instalar Heroku CLI**
```bash
# Windows (PowerShell como Administrador)
winget install Heroku.CLI

# Ou baixar em: https://devcenter.heroku.com/articles/heroku-cli
```

### 2️⃣ **Login no Heroku**
```bash
heroku login
# Será aberta uma página no navegador para login
```

### 3️⃣ **Criar aplicação no Heroku**
```bash
cd backend
heroku create seu-app-name
# Exemplo: heroku create devnology-ecommerce-api
```

### 4️⃣ **Configurar variáveis de ambiente**
```bash
# Configurações básicas
heroku config:set NODE_ENV=production
heroku config:set NPM_CONFIG_PRODUCTION=false

# URL do frontend (depois que hospedar no Vercel)
heroku config:set FRONTEND_URL=https://seu-frontend.vercel.app

# Para banco PostgreSQL (recomendado)
heroku addons:create heroku-postgresql:mini
# Isso criará automaticamente a DATABASE_URL
```

### 5️⃣ **Deploy via Git**
```bash
# Adicionar remote do Heroku
heroku git:remote -a seu-app-name

# Fazer push apenas da pasta backend
git subtree push --prefix=backend heroku main
```

### 6️⃣ **Verificar deploy**
```bash
# Ver logs
heroku logs --tail

# Abrir aplicação
heroku open
```

## 🔧 Arquivos já configurados:

✅ `backend/Procfile` - Comando de inicialização
✅ `backend/package.json` - Versão do Node.js especificada  
✅ `backend/src/main.ts` - Porta dinâmica configurada
✅ `backend/env.example` - Exemplo de variáveis

## 📡 Endpoints da API hospedada:

Depois do deploy, sua API estará disponível em:
- `https://seu-app-name.herokuapp.com/api/products`
- `https://seu-app-name.herokuapp.com/api/orders` 
- `https://seu-app-name.herokuapp.com/api/docs` (Swagger)

## 💰 Custos:

- **Heroku Eco Dyno**: $5/mês
- **PostgreSQL Mini**: $5/mês
- **Total**: ~$10/mês

## 🔄 Deploy automático (Opcional):

### Via Dashboard Heroku:
1. Acesse o dashboard do Heroku
2. Vá para a aba "Deploy"
3. Conecte com GitHub
4. Selecione o repositório
5. Configure "Automatic deploys" da branch main
6. Habilite "Wait for CI to pass"

## 🐛 Troubleshooting:

**Erro de build:**
```bash
# Ver logs detalhados
heroku logs --tail
```

**Erro de porta:**
- ✅ Já configurado no `main.ts` para usar `process.env.PORT`

**Erro de banco:**
```bash
# Verificar se PostgreSQL foi criado
heroku addons

# Ver configurações
heroku config
```

**Deploy de subtree:**
```bash
# Se der erro, force o push
git subtree push --prefix=backend heroku main --force
```

## 🔄 Comandos úteis:

```bash
# Ver status da aplicação
heroku ps

# Reiniciar aplicação
heroku restart

# Ver configurações
heroku config

# Executar comando no servidor
heroku run node --version

# Escalar dynos
heroku ps:scale web=1
```

## 📊 Migração do SQLite para PostgreSQL:

O Heroku não suporta SQLite persistente. O banco PostgreSQL será criado automaticamente. Os dados de exemplo serão recriados na primeira execução.

## 🎯 Próximos passos após deploy:

1. ✅ Backend no Heroku funcionando
2. 🔄 Atualizar frontend para usar nova URL
3. 🔄 Redeploy do frontend no Vercel
4. 🔄 Atualizar Flutter para usar URL de produção
5. ✅ Sistema 100% na nuvem!

---

**🌐 Backend pronto para o Heroku! 🚀**

### URL final será:
`https://seu-app-name.herokuapp.com`
