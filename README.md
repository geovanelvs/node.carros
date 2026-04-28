# Projeto Node.js - Revenda de Carros

API RESTful desenvolvida com Node.js para gerenciamento de estoque de uma revenda de carros.

## Descrição

Este projeto permite o controle de um estoque de veículos, realizando operações de CRUD (Criar, Ler, Atualizar e Deletar) por meio de requisições HTTP, armazenando os dados em um banco de dados local SQLite.

## Funcionalidades

- Cadastro de novos carros no estoque
- Listagem de todos os carros ou busca por ID
- Atualização de informações (marca, modelo, ano, preço, etc.)
- Remoção de carros do banco de dados

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- SQLite3

## Estrutura do projeto

node.carros/
├── app.js
├── package.json
├── package-lock.json
├── revenda_carros.db (gerado ao rodar o projeto)
└── node_modules/ (gerado na instalação)


## Como executar o projeto

1. Clone o repositório:
```
git clone https://github.com/geovanelvs/node.carros.git
```

2. Acesse a pasta do projeto:
```
cd node.carros
```

3. Instale as dependências:
```
npm install
```

4. Inicie o servidor:
```
node app.js
```

5. A API estará rodando no endereço:
```
http://localhost:3000/
```

## Rotas da API

Para interagir com o banco de dados, utilize um cliente HTTP (como Thunder Client, Insomnia ou Postman) nos seguintes endpoints:

- **GET** `/carros` - Lista todos os veículos
- **GET** `/carros/:id` - Busca um veículo específico
- **POST** `/carros` - Cadastra um novo veículo
- **PUT** `/carros/:id` - Atualiza os dados do veículo
- **DELETE** `/carros/:id` - Remove o veículo

## Autor

Geovane Alves
