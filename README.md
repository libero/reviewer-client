# reviewer-client

The client for "libero reviewer".

## Running

### Run in docker
To run the application in the testing environment use the following commands.
```
make build
make setup
make start
```

this will start the application in a docker container with a mocked backend and authentication system.

### Run client locally on host

To run localy, first change the `config/config.infra.json` file to have the following settings:
```json
{
    "client_api_proxy_url": "http://localhost:3003/graphql",
    "client_token_exchange_proxy_url": "http://localhost:3003/authenticate/",
}
```
Then run the following commands:

```
docker-compose up -d reviewer-mocks
yarn
yarn start
```
this will start the client using the webpack dev server with no other services running.

### Run like in CI

To run a sumulacrum of the CI you can use the
```
make run_ci
```
command which will run all of the build and test steps and tear down the serves afterwards.

