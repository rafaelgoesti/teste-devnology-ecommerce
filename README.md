# 🛍️ Devnology-E-commerce

🚀 Sistema de e-commerce fullstack completo com design futurista, desenvolvido com React (frontend) e NestJS (backend).

## 📋 Descrição

Sistema completo de e-commerce que integra produtos de múltiplos fornecedores via API, oferecendo uma experiência de compra moderna e intuitiva. O sistema inclui catálogo de produtos, carrinho de compras, checkout, sistema de pedidos e dashboard administrativo.

## 🚀 Funcionalidades

### 💻 Frontend (React)
- **🎨 Interface Futurista** - Design moderno com animações
- **📦 Catálogo de Produtos** - Visualização com busca e filtros
- **🛒 Carrinho de Compras** - Gerenciamento intuitivo de itens
- **💳 Checkout Completo** - Formulário de finalização de compra
- **📋 Histórico de Pedidos** - Acompanhamento de pedidos
- **📱 Responsivo** - Adaptado para mobile e desktop

### ⚙️ Backend (NestJS)
- **🌐 API RESTful** - Endpoints documentados com Swagger
- **🔗 Integração Multi-fornecedores** - Sincronização automática
- **💾 Banco de Dados SQLite** - Persistência com TypeORM
- **📝 Sistema de Pedidos** - Criação e gerenciamento
- **🌍 CORS Configurado** - Integração com frontend

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend
- **⚛️ React** - Biblioteca de interface
- **📝 TypeScript** - Tipagem estática
- **🎨 Material-UI** - Componentes UI
- **🗺️ React Router** - Roteamento
- **🔄 React Query** - Gerenciamento de estado
- **✨ Framer Motion** - Animações
- **🌐 Axios** - Cliente HTTP

### ⚙️ Backend
- **🏗️ NestJS** - Framework Node.js
- **🗃️ TypeORM** - ORM TypeScript
- **💿 SQLite** - Banco de dados
- **📚 Swagger** - Documentação API
- **✅ Class Validator** - Validação

## 📁 Estrutura do Projeto

```
ecommerce-teste/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── entities/       # Entidades do banco
│   │   ├── modules/        # Módulos da aplicação
│   │   └── main.ts         # Entrada da aplicação
│   ├── ecommerce.db        # Banco SQLite
│   └── package.json
│
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   ├── context/        # Contextos React
│   │   └── types/          # Tipos TypeScript
│   ├── public/
│   └── package.json
│
└── README.md               # Este arquivo
```

## 🚀 Como Executar

### 📋 Pré-requisitos
- Node.js (versão 16+)
- npm

### 1️⃣ Clone o repositório
```bash
git clone <url-do-repositorio>
cd ecommerce-teste
```

### 2️⃣ Configure o Backend
```bash
cd backend
npm install
npm run start:dev
```

O backend estará rodando em: http://localhost:3001  
📚 Documentação Swagger: http://localhost:3001/api

### 3️⃣ Configure o Frontend
```bash
cd frontend
npm install
npm start
```

O frontend estará rodando em: http://localhost:3000

## � APIs Integradas

O sistema integra com duas APIs mock de fornecedores:
- **🏭 Fornecedor 1** - Produtos eletrônicos
- **🏭 Fornecedor 2** - Produtos diversos

A sincronização é automática na inicialização do backend.

## 🎨 Design

- **🚀 Tema Futurista** - Cores vibrantes e gradientes
- **✨ Animações Suaves** - Transições com Framer Motion
- **🔤 Tipografia Moderna** - Fonte Orbitron
- **🎯 Interface Intuitiva** - UX otimizada

## 📱 Páginas Disponíveis

- **🏠 Home** - Página inicial com destaque
- **📦 Produtos** - Catálogo com busca e filtros
- **🛒 Carrinho** - Gerenciamento de itens
- **💳 Checkout** - Finalização de compra
- **📋 Pedidos** - Histórico e acompanhamento

## 🔧 Scripts Disponíveis

### ⚙️ Backend
```bash
npm run start       # Produção
npm run start:dev   # Desenvolvimento
npm run test        # Testes
```

### 💻 Frontend
```bash
npm start          # Desenvolvimento
npm run build      # Build produção
npm test           # Testes
```

## � Recursos

- [📚 Documentação NestJS](https://docs.nestjs.com/)
- [⚛️ Documentação React](https://reactjs.org/)
- [🎨 Material-UI](https://mui.com/)
- [🗃️ TypeORM](https://typeorm.io/)

## 🎯 Status do Projeto

✅ Sistema completo e funcional  
✅ Integração com APIs de fornecedores  
✅ Interface traduzida para português  
✅ Design futurista implementado  
✅ Sistema de carrinho e checkout  
✅ Histórico de pedidos  
✅ Documentação completa  

## 📄 Licença

Este projeto está sob a licença MIT.

---

**🛍️ Devnology-E-commerce** - Experiência de Compras da Nova Geração 🚀
