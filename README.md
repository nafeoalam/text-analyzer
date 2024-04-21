
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

- API to return the number of words : `GET /analyze/words`
- API to return the number of characters : `GET /analyze/characters`
- API to return the number of sentences : `GET /analyze/sentences`
- API to return the number of paragraphs : `GET /analyze/paragraphs`
- API to return the longest words in paragraphs : `GET /analyze/longest-words`

- API to upload a text file and which returns an analysis of the text content. : 
    - `POST /analyze/upload`
    - `Payload: textFile (type: file)`

- API to retrieve all previously analyzed text records. : `GET /analyze/all-records`