# 🌐 Deploy do Backend no Heroku com Supabase

## 🎯 **Configuração atual:**
- ✅ Backend NestJS configurado
- ✅ PostgreSQL Supabase conectado
- ✅ Driver `pg` instalado
- ✅ TypeORM configurado para produção

## 📋 **Pré-requisitos**
1. Conta no Heroku (criar em https://heroku.com)
2. Heroku CLI instalado
3. Banco PostgreSQL Supabase (já configurado ✅)

## 🚀 **Deploy no Heroku - Passo a Passo**

### 1️⃣ **Instalar Heroku CLI**
```bash
# Windows (PowerShell como Administrador)
winget install Heroku.CLI

# Ou baixar em: https://devcenter.heroku.com/articles/heroku-cli
```

### 2️⃣ **Login no Heroku**
```bash
heroku login
```

### 3️⃣ **Criar aplicação no Heroku**
```bash
# Na pasta raiz do projeto
heroku create seu-ecommerce-backend

# Ou deixar o Heroku gerar um nome:
heroku create
```

### 4️⃣ **Configurar variáveis de ambiente**
```bash
# Configurar banco Supabase
heroku config:set DATABASE_URL="postgresql://postgres:Rafael#@2030@db.kixueapbpzdjlbszngnn.supabase.co:5432/postgres"

# Configurar ambiente
heroku config:set NODE_ENV=production

# Configurar CORS (após deploy do frontend)
heroku config:set FRONTEND_URL="https://seu-frontend.vercel.app"
```

### 5️⃣ **Deploy usando Git Subtree**
```bash
# Na pasta raiz do projeto (ecommerce-teste)
git subtree push --prefix=backend heroku main

# Se der erro, force:
git push heroku `git subtree split --prefix=backend main`:main --force
```

### 6️⃣ **Verificar deploy**
```bash
# Ver logs
heroku logs --tail

# Abrir aplicação
heroku open
```

## 🔗 **URLs após deploy:**
- **API**: `https://seu-app.herokuapp.com`
- **Docs**: `https://seu-app.herokuapp.com/api/docs`
- **Produtos**: `https://seu-app.herokuapp.com/api/products`

## 🛠️ **Comandos úteis:**

### **Ver logs:**
```bash
heroku logs --tail
```

### **Redeploy:**
```bash
git subtree push --prefix=backend heroku main --force
```

### **Ver configurações:**
```bash
heroku config
```

### **Escalar aplicação:**
```bash
heroku ps:scale web=1
```

## 🐛 **Troubleshooting:**

### **Erro de conexão com banco:**
- Verifique se a `DATABASE_URL` está correta
- Confirme que o Supabase está acessível

### **Erro de build:**
- Verifique se o `package.json` tem `engines` especificado
- Confirme se todas as dependências estão no `dependencies`

### **Erro de CORS:**
- Configure `FRONTEND_URL` corretamente
- Teste endpoints via Postman primeiro

### **Erro ao fazer push:**
```bash
# Se der erro, tente:
git subtree push --prefix=backend heroku main --force

# Ou:
heroku git:remote -a seu-app-name
git push heroku `git subtree split --prefix=backend main`:main --force
```

## 💰 **Custos estimados:**
- **Heroku Dyno Eco**: ~$7/mês
- **Supabase**: Gratuito até 500MB/mês
- **Total**: ~$7/mês

## 🔄 **Próximos passos:**
1. ✅ Deploy do backend no Heroku
2. 🔄 Configurar frontend para usar URL do Heroku
3. 🔄 Deploy do frontend no Vercel  
4. ✅ Sistema completo na nuvem!

## 📝 **Exemplo de .env para produção:**
```env
DATABASE_URL=postgresql://postgres:Rafael#@2030@db.kixueapbpzdjlbszngnn.supabase.co:5432/postgres
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
```

---

**🌐 Backend pronto para produção no Heroku com Supabase! 🎉**
