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

In config.public.json, set the `client_api_url` to:
```json
"client_api_url": "http://localhost:3003"
```
this will connect the client directly to the reviewer-mocks for api requests

```
make start_dev
```
this will start the client using the webpack dev server with no other services running.

### Run like in CI

To run a sumulacrum of the CI you can use the
```
make run_ci
```
command which will run all of the build and test steps and tear down the serves afterwards.


### Stopping services

To stop any docker services running, run
```
make stop
```