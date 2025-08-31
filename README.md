## Descrição

Microserviço TCP de backend com:
- O CRUD de Lançamentos Financeiros.

## Setup do projeto

```bash
$ npm install
```

## Compilar e rodar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodar os testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Rodar as migrações e seed de dados

```bash
# Migrações
$ npx knex migrate:latest

# Seed de dados
$ npx knex seed:run
```
