# World Clock API

### Project dependencies

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)

### Project setup

1. Make sure you are using the correct Nodejs version: `nvm install`
2. Install project dependencies: `npm install`
3. Create the `.env` file and adjust it to match your needs: `cp .env.sample .env`
4. Start the server with docker: `docker-compose up`

### Running tests

- With Docker Compose: `docker-compose run api npm test`
- Without Docker Compose: `npm test`