
## Description

Using [Nest](https://github.com/nestjs/nest) framework with TypeScript

## Tech Stack
- NestJs 
- TypeScript
- NestJs Testing Tool
- Neon PostgreSQL
- HTML
- CSS

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## View

UI: `localhost:3000`

- API to return the number of words : `/analyze/words`
- API to return the number of characters : `/analyze/characters`
- API to return the number of sentences : `/analyze/sentences`
- API to return the number of paragraphs : `/analyze/paragraphs`
- API to return the longest words in paragraphs : `/analyze/longest-words`