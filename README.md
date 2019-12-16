# reviewer-client

The client for "libero reviewer".

## Running
To run the application in the testing environment use the following commands.
```
make build
make setup
make start
```
this will start the application in a docker container with a mocked backend and authentication system.

To run localy run these commands:
```
yarn
yarn start
```
this will start the client using the webpack dev server with no other services running.

To run a sumulacrum of the CI you can use the
```
make run_ci
```
command which will run all of the build and test steps and tear down the serves afterwards.

