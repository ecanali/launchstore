<h1 align="center">
    <img alt="Chef" src="./public/assets/launchstore-logo.png" width="300px" />
</h1>

<h1 align="center">Launchstore</h1>

<p align="center">Site de Marketplace</p>

---

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Tecnologias](#-tecnologias)
   * [Funcionalidades](#-funcionalidades)
   * [Layout](#-layout)
   * [Como executar o projeto](#-como-executar-o-projeto)
   * [Licença](#-licenca)
<!--te-->

---

## Sobre o projeto <a name="-sobre-o-projeto" style="text-decoration:none"></a>

Launchstore é um site de marketplace completo, conta com busca e compra de produtos por visitantes e cadastro e venda de produtos por vendedores. Foi desenvolvido com JavaScript em toda a stack e utiliza o banco de dados relacional PostgreSQL. O escopo e as orientações para realização deste projeto são do Bootcamp LaunchBase, da Rocketseat.

---

## Tecnologias <a name="-tecnologias" style="text-decoration:none"></a>

- **[NodeJS](https://nodejs.org/en/)**
- **[Express](https://expressjs.com/)**
- **[Nunjucks](https://github.com/mozilla/nunjucks)**
- **[Lottie](https://github.com/airbnb/lottie-web)**
- **[PG](https://github.com/brianc/node-postgres/tree/master/packages/pg)**
- **[Bcrypt](https://github.com/dcodeIO/bcrypt.js)**
- **[Nodemailer](https://nodemailer.com/about/)**
- **[Faker](https://github.com/Marak/Faker.js#readme)**

---

## Funcionalidades <a name="-funcionalidades" style="text-decoration:none"></a>

- [x] Controle de sessão (login e logout)
- [x] Cadastro, edição e remoção de conta
- [x] Recuperação de senha
- [x] Cadastro, edição e remoção de produtos
- [x] Listagem e pesquisa por filtro de produtos
- [x] Controle de carrinho de compras
- [x] Compra e venda de produtos alertando vendedor dos novos pedidos

---

## Layout <a name="-layout" style="text-decoration:none"></a>

### Seção de acesso público

<h1 align="center">
    <img alt="Gif" src="./public/assets/publicSection.gif" width="800px" />
</h1>

### Seção de acesso privado

<h1 align="center">
    <img alt="Gif Responsividade" src="./public/assets/privateSection.gif" width="800px" />
</h1>

---

## Como executar o projeto <a name="-como-executar-o-projeto" style="text-decoration:none"></a>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/). Para trabalhar com o código, é recomendável o uso de um bom editor, como o [VSCode](https://code.visualstudio.com/).

### O primeiro passo é clonar este repositório

#### Clonando o repositório

```bash

# Clone este repositório
$ git clone https://github.com/ecanali/launchstore

# Acesse a pasta do projeto pelo terminal/cmd
$ cd launchstore

# Instale as dependências
$ npm install

```

### O passo seguinte é configurar o banco de dados

#### Configurando o banco de dados

Instale em seu computador o [PostgreSQL](https://www.postgresql.org/download/) e o [Postbird](https://www.electronjs.org/apps/postbird). Finalizando as instalações, ligue o PostgreSQL. 

No Windows, o processo para ligá-lo segue os seguintes passos:

```bash

# Abra o Powershell como administrador, e navegue até a pasta de instalação
$ cd "C:\Program Files\PostgreSQL\12\bin\"

# Inicie o PostgreSQL com o comando abaixo
$ .\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" start

# Após o uso, o comando para desligá-lo é
$ .\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" stop

```

Depois de ligar o PostgreSQL, acesse o Postbird e crie um banco de dados com o nome de 'launchstoredb'. Feito isso, clique na opção de importar um arquivo .sql e importe o arquivo [database.sql](https://github.com/ecanali/launchbase/blob/master/database.sql) presente neste repositório. Você pode checar se o banco foi importado verificando suas tabelas. Se tudo deu certo até aqui, o seu banco de dados já está criado. 

#### Observações

Você deverá indicar suas informações de usuário e senha do PostgreSQL no arquivo [db.js](https://github.com/ecanali/launchstore/blob/master/src/config/db.js).

#### Populando o banco de dados

Para popular o banco de dados com informações fakes e geradas automaticamente, abra o terminal no diretório do projeto e execute o comando:

```bash

$ node seed.js

```

### Por fim, o último passo é configurar o Mailtrap

O Mailtrap será responsável por simular uma caixa de e-mails para a funcionalidade de compra/venda de um produto, alertando o vendedor com os dados do comprador.

#### Configurando o Mailtrap

Entre no site do [Mailtrap](https://mailtrap.io/) e faça seu cadastro. Quando já estiver cadastrado, acesse a aba Inboxes, crie uma nova inbox com o nome de 'launchstore', entre na menu SMTP Settings e mude Integrations para Nodemailer. Agora copie o código gerado, cole no arquivo [mailer.js](https://github.com/ecanali/launchstore/blob/master/src/lib/mailer.js) e faça algumas pequenas alterações para que fique semelhante a este:

```javascript

const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e22f17fda9016b",
        pass: "0b9b300779cd22"
    }
})

```

É importante que o código preenchido no arquivo mailer.js seja o gerado em sua conta do Mailtrap, caso contrário você não receberá os e-mails corretamente.

### Executar o projeto.

Finalizando todos os passos descritos acima com sucesso, agora podemos executar o projeto.

#### Executando o projeto

```bash

# Acesse a pasta do projeto pelo terminal/cmd
$ cd launchstore

# Execute a aplicação
$ npm start

# O servidor iniciará na porta:3000 - acesse http://localhost:3000

```

#### Observações

Ao acessar *localhost:3000* você estará na parte pública da Launchstore. Para ter acesso a uma conta de usuário entre em *localhost:3000/users/login*, com o Postbird aberto no banco de dados 'launchstoredb' acesse a tabela *"users"* e escolha 1 usuário ali e copie seu e-mail. Todos usuários gerados automaticamente possuem e-mails aleatórios e senha *1111*.

---

## Licença <a name="-licenca" style="text-decoration:none"></a>

Esse repositório está licenciado pela **MIT LICENSE**. Para informações detalhadas, leia o arquivo [LICENSE](https://github.com/ecanali/launchstore/blob/master/LICENSE). 

Made with ♥ by Erick Canali :wave: