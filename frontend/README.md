# 🛍️ Devnology-E-commerce - Frontend

⚛️ Frontend da aplicação de e-commerce desenvolvido com React e Material-UI.

## 📋 Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

A página será recarregada se você fizer edições.\
Você também verá erros de lint no console.

### `npm test`

Executa o executor de testes em modo interativo.\
Veja a seção sobre [executar testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Constrói a aplicação para produção na pasta `build`.\
Empacota corretamente o React em modo de produção e otimiza a build para melhor performance.

A build é minificada e os nomes dos arquivos incluem hashes.\
Sua aplicação está pronta para deploy!

Veja a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**⚠️ Nota: esta é uma operação sem volta. Uma vez que você faça `eject`, não poderá voltar!**

Se você não estiver satisfeito com as ferramentas de build e configurações, você pode fazer `eject` a qualquer momento. Este comando removerá a dependência única de build do seu projeto.

Em vez disso, copiará todos os arquivos de configuração e dependências transitivas (webpack, Babel, ESLint, etc) diretamente para o seu projeto para que você tenha controle total sobre eles. Todos os comandos exceto `eject` ainda funcionarão, mas apontarão para os scripts copiados para que você possa ajustá-los. A partir deste ponto você estará por conta própria.

Você não precisa usar `eject`. O conjunto de recursos curado é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar este recurso.

## 📚 Saiba Mais

Você pode aprender mais na [documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a [documentação do React](https://reactjs.org/).

## 🛠️ Tecnologias Utilizadas

- **⚛️ React** - Biblioteca para construção de interfaces
- **🎨 Material-UI** - Biblioteca de componentes UI
- **🗺️ React Router** - Roteamento da aplicação
- **🔄 React Query** - Gerenciamento de estado e cache
- **✨ Framer Motion** - Animações
- **📝 TypeScript** - Tipagem estática
- **🌐 Axios** - Cliente HTTP

## ✨ Funcionalidades

- **📦 Catálogo de Produtos** - Visualização e busca de produtos
- **🛒 Carrinho de Compras** - Adicionar/remover produtos
- **💳 Checkout** - Finalização de pedidos
- **📋 Histórico de Pedidos** - Visualização de pedidos realizados
- **📱 Design Responsivo** - Interface adaptativa para diferentes dispositivos
- **🚀 Tema Futurista** - Design moderno com animações

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
├── context/           # Contextos React (CartContext)
├── pages/             # Páginas da aplicação
├── services/          # Serviços de API
├── types/             # Definições de tipos TypeScript
└── App.tsx           # Componente principal
```

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute a aplicação:
   ```bash
   npm start
   ```

3. Acesse http://localhost:3000 no seu navegador
