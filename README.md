# service-template

## Project Setup

### Install all dependencies

`npm install`

### Add local .env file in {root}/var folder

```conf
JWT_SECRET=$JWT_SECRET
MYSQL_DB_HOST=$MYSQL_DB_HOST
MYSQL_DB_PORT=$MYSQL_DB_PORT
MYSQL_DB_NAME=$MYSQL_DB_NAME
MYSQL_DB_USERNAME=$MYSQL_DB_USERNAME
MYSQL_DB_PASSWORD=$MYSQL_DB_PASSWORD
```

### Run locally

`npm start`

### Run with docker

#### Build docker image

`docker build -t main-service .`

#### Run docker image

`docker run -p 8000:8080 main-service`

Open http://localhost:8000 in your browser

### Run with docker using npm commands

#### Run with local environment (Make sure to have .env file in var folder)

`npm run docker`

Open http://localhost:8080 in your browser to test

## Access API documentation

Open http://localhost:8080/api-docs in browser to see api documentation

## Linting your code

Install these VS code extensions for linting your code:

[jshint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint) by Dirk Baeumer

[TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) by Microsoft

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) by Prettier
