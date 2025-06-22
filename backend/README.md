# 🛍️ Devnology-E-commerce - Backend

🚀 Backend da aplicação de e-commerce desenvolvido com NestJS, TypeORM e SQLite.

## 📋 Descrição

API RESTful para sistema de e-commerce que integra produtos de múltiplos fornecedores, gerencia carrinho de compras e processa pedidos.

## ✨ Funcionalidades

- **🔗 Integração com APIs de Fornecedores** - Sincronização automática de produtos
- **📦 Gerenciamento de Produtos** - CRUD completo com busca e filtros
- **📝 Sistema de Pedidos** - Criação e acompanhamento de pedidos
- **💾 Banco de Dados SQLite** - Persistência local com TypeORM
- **📚 Documentação Swagger** - API documentada automaticamente
- **🌐 CORS Configurado** - Integração com frontend React

## 🛠️ Tecnologias Utilizadas

- **🏗️ NestJS** - Framework Node.js progressivo
- **🗃️ TypeORM** - ORM para TypeScript e JavaScript
- **💿 SQLite** - Banco de dados SQL incorporado
- **📖 Swagger** - Documentação automática da API
- **✅ Class Validator** - Validação de dados
- **🔄 Class Transformer** - Transformação de objetos

## ⚙️ Configuração do Projeto

```bash
$ npm install
```

## 🚀 Compilar e Executar

```bash
# desenvolvimento
$ npm run start

# modo watch (recarrega automaticamente)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## 🧪 Executar Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## 📁 Estrutura do Projeto

```
src/
├── entities/           # Entidades do banco de dados
│   ├── product.entity.ts
│   ├── order.entity.ts
│   └── order-item.entity.ts
├── modules/
│   ├── products/       # Módulo de produtos
│   ├── orders/         # Módulo de pedidos
│   └── providers/      # Módulo de fornecedores
├── app.module.ts       # Módulo principal
└── main.ts            # Ponto de entrada da aplicação
```

## 🌐 Endpoints da API

### 📦 Produtos
- `GET /products` - Listar produtos com filtros
- `GET /products/:id` - Obter produto por ID
- `POST /products/sync` - Sincronizar produtos dos fornecedores

### 📝 Pedidos
- `POST /orders` - Criar novo pedido
- `GET /orders` - Listar pedidos
- `GET /orders/:id` - Obter pedido por ID

### 🏭 Fornecedores
- `GET /providers/sync` - Sincronizar dados dos fornecedores

## 💾 Configuração do Banco de Dados

O projeto utiliza SQLite com TypeORM. O banco de dados é criado automaticamente em `ecommerce.db`.

### 🗂️ Entidades

- **📦 Product** - Produtos do catálogo
- **📝 Order** - Pedidos dos clientes
- **📋 OrderItem** - Itens dos pedidos

## 🔗 APIs de Fornecedores Integradas

- **🏭 Fornecedor 1**: Mock API com produtos eletrônicos
- **🏭 Fornecedor 2**: Mock API com produtos diversos

## 📚 Documentação da API

Acesse a documentação Swagger em: http://localhost:3001/api

## 🌍 Variáveis de Ambiente

```bash
PORT=3001
NODE_ENV=development
```

## 🚀 Deploy

Para deploy em produção, consulte a [documentação do NestJS](https://docs.nestjs.com/deployment).

## 📖 Recursos

- [📚 Documentação do NestJS](https://docs.nestjs.com)
- [🗃️ Documentação do TypeORM](https://typeorm.io)
- [💬 Discord do NestJS](https://discord.gg/G7Qnnhy)
