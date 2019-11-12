# Configuration

Configuration of the served js assets happens through the use of environment variables at deploy time. 

## Local

When running the app locally, the `.env` file is used to store both build time and runtime config variables. 

### Development mode

When running the application in development mode on your local machine (`yarn start`), the `dotenv` library sets the environment variables from the `.env` file and webpack assigns them to a globally accessible `CONFIG` object through the use of `webpack.DefinePlugin`. 

When adding a new config variable, webpack will need to know how to map the newly added environment variable to a `CONFIG` property. This can be done by editing the `parts.configVars` function exported by `./webpack.parts.js`

### Container

The production nginx docker image created when running `make build_application` has a start command that writes specified environment varliables to a `config.js` file. This file declares a `CONFIG` object in the global scope that the SPA files can access. The `config.js` file is loaded into the head tag of the served index.html file.

When adding a new variable, the `config.js` file needs to know how to map the newly added environment variable to a `CONFIG` property. This can be done by editing the file `/deployment/config-template.js` and by adding the new variable to the `build-config.sh` found in `/scripts`. The docker-compose files environment values should also be updated if you want to test the container out locally.
