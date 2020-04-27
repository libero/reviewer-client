# reviewer-client

The client for "libero reviewer".

## Running

Setup with:
```sh
make setup
```

The Makefile provides some commands to run the client in various scenarios

### Run with reviewer mocks only mocking continuum

This is to run with reviewer-mocks only providing continuum functionality. You will
need to run the reviewer-submission and continuum-adaptor services on your host machine

```sh
make start_dev
```

### Run with reviewer-mocks running all backend services

This is to run with reviewer-mocks providing functionality for continuum as well as reviewer-submission and
continuum-adaptor. You don't need to run any other services on your host machine

```
make start_test
```

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