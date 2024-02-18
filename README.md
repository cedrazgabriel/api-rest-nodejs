# API Node JS (Controle de finanças pessoais)
Uma aplicação backend simples, utilizando Node JS com Fatify, para cadastrar lançamentos de despesas (debit) e lucros (credit) para obter o seu resumo.

 ## Tecnologias

 Esse projeto foi desenvolvido com as seguintes tecnologias:

 - [Node.js](https://nodejs.org/en/) 
 - [Fastify](https://fastify.dev/)
 - [Knex](https://knexjs.org/)
 - [Zod](https://zod.dev/)
 - [Vitest](https://vitest.dev/)
 - [Supertest](https://www.npmjs.com/package/supertest)
 - [Typescript](https://www.typescriptlang.org/)

 ## Como rodar o projeto.
 Para conseguir executar esse projeto em sua máquina, é necessário seguir os seguintes passos

 ```bash
npm install
```

Após instalar as dependências, rodar o comando abaixo para executar as migrations do banco de dados disponíveis e criar um banco local para uso próprio

```bash
npm run knex -- migrate:latest
```

Por fim, para executar a api e fazer requisições, rode o comando:

```bash
npm run dev
```

Se desejar, pode ser necessário executar os testes end-to-end criados no projeto, para isso, rode o comando:

```bash
npm run test
```

 ## Em construção:
- Criar documentação no Swagger para ajudar a detalhar os endpoints disponíveis
- Criar rota de resumo por mês, data e/ou dia.

## Dúvidas
Se tiver alguma dúvida ou sugestão para esse projeto, pode criar alguma issue ou então entrar em contato direto comigo aqui no GitHub ou então no Linkedin. :)
