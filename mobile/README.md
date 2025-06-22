# mobile

# 📱 Devnology E-commerce - Mobile App

🚀 Aplicativo móvel Flutter para o sistema de e-commerce Devnology.

## 📋 Descrição

Aplicativo móvel desenvolvido em Flutter que se conecta à API do e-commerce Devnology, oferecendo uma experiência de compra otimizada para dispositivos móveis.

## ✨ Funcionalidades

- **🏠 Tela Inicial** - Apresentação do app e funcionalidades
- **📦 Catálogo de Produtos** - Visualização com busca e filtros
- **🛒 Carrinho de Compras** - Gerenciamento intuitivo de itens
- **💳 Checkout** - Processo de finalização de compra
- **📋 Histórico de Pedidos** - Acompanhamento de status
- **🎨 Design Responsivo** - Interface adaptativa
- **⚡ Performance Otimizada** - Carregamento rápido

## 🛠️ Tecnologias Utilizadas

- **🎯 Flutter** - Framework para desenvolvimento mobile
- **🎨 Material Design** - Componentes de interface
- **🔄 Provider** - Gerenciamento de estado
- **🌐 HTTP** - Requisições para API
- **🖼️ Cached Network Image** - Cache de imagens
- **💾 Shared Preferences** - Armazenamento local
- **🎭 Lottie** - Animações

## 📁 Estrutura do Projeto

```
lib/
├── models/             # Modelos de dados (Product, Order, CartItem)
├── providers/          # Gerenciamento de estado (CartProvider)
├── screens/            # Telas da aplicação
│   ├── home_screen.dart       # Tela inicial
│   ├── products_screen.dart   # Catálogo de produtos
│   ├── cart_screen.dart       # Carrinho de compras
│   ├── checkout_screen.dart   # Finalização de compra
│   └── orders_screen.dart     # Histórico de pedidos
├── services/           # Serviços de API
└── main.dart          # Ponto de entrada da aplicação
```

## ⚙️ Configuração e Execução

### 📋 Pré-requisitos
- Flutter SDK (versão 3.5.1+)
- Dart SDK
- Android Studio / VS Code
- Dispositivo Android/iOS ou emulador

### 1️⃣ Instalação das Dependências
```bash
flutter pub get
```

### 2️⃣ Configuração da API
Certifique-se de que o backend está rodando em `http://localhost:3001`

### 3️⃣ Execução
```bash
# Desenvolvimento
flutter run

# Build para Android
flutter build apk

# Build para iOS
flutter build ios
```

## 📱 Telas do Aplicativo

### 🏠 **Home Screen**
- Apresentação do app Devnology E-commerce
- Cards com funcionalidades principais
- Navegação para explorar produtos

### 📦 **Products Screen**
- Lista de produtos com imagens
- Barra de busca por nome/descrição
- Filtros por categoria
- Botão para adicionar ao carrinho
- Indicador visual de itens no carrinho

### 🛒 **Cart Screen**
- Lista de produtos no carrinho
- Controles de quantidade (+/-)
- Remoção de itens
- Cálculo automático do total
- Botão para checkout

### 💳 **Checkout Screen**
- Formulário de dados do cliente
- Resumo do pedido
- Validação de campos obrigatórios
- Finalização da compra

### 📋 **Orders Screen**
- Lista de pedidos realizados
- Status de cada pedido com cores
- Detalhes expandíveis
- Informações de entrega e itens

## 🎨 Design e UX

- **🎨 Material Design** - Interface moderna e intuitiva
- **🌈 Cores Temáticas** - Paleta consistente com a marca
- **📱 Responsivo** - Adaptado para diferentes tamanhos
- **⚡ Performance** - Carregamento otimizado de imagens
- **✨ Animações** - Transições suaves entre telas
- **🎯 Usabilidade** - Navegação intuitiva

## 🔗 Integração com Backend

O app se conecta com a API NestJS através dos endpoints:

- `GET /api/products` - Listar produtos
- `POST /api/orders` - Criar pedido  
- `GET /api/orders` - Listar pedidos

### 📡 Configuração de URL Automática

O app detecta automaticamente a plataforma:
- **Flutter Web**: `http://localhost:3001/api/*`
- **Mobile (Android/iOS)**: `http://192.168.1.155:3001/api/*`

## 📊 Gerenciamento de Estado

Utiliza o padrão **Provider** para:
- 🛒 Estado do carrinho (CartProvider)
- 📦 Quantidade de itens
- 💰 Cálculo de totais
- 🔄 Atualizações reativas

## 🚀 Funcionalidades Futuras

- 📧 Notificações push
- 💳 Múltiplas formas de pagamento
- 👤 Sistema de login/cadastro
- ⭐ Avaliações de produtos
- 📍 Rastreamento de entrega
- 🔍 Busca avançada
- 💾 Modo offline

## 🐛 Troubleshooting

### Problemas Comuns:

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Erro de conexão com API:**
   - **Flutter Web**: Verifique se o backend está rodando em `http://localhost:3001`
   - **Mobile**: Confirme que celular e PC estão na mesma rede Wi-Fi
   - **IP**: Use `192.168.1.155:3001` para dispositivos móveis
   - Teste: `http://192.168.1.155:3001/api/docs` no navegador do celular

2. **CORS Error no Flutter Web:**
   - Backend já configurado com CORS
   - Se persistir, execute: `flutter run -d chrome --web-renderer html`

3. **Produtos não carregam:**
   - Verifique logs no console do Flutter: `🔄 Fazendo requisição...`
   - Teste a API diretamente: `curl http://localhost:3001/api/products`

2. **Dependências não encontradas:**
   ```bash
   flutter clean
   flutter pub get
   ```

3. **Problemas de build:**
   ```bash
   flutter doctor
   ```

## 📖 Recursos

- [📚 Documentação Flutter](https://flutter.dev/docs)
- [🎨 Material Design](https://material.io/design)
- [🔄 Provider Pattern](https://pub.dev/packages/provider)
- [🌐 HTTP Package](https://pub.dev/packages/http)

---

**📱 Devnology E-commerce Mobile** - Compras na palma da sua mão! 🛍️

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
