# Configuration

Configuration of the served js assets happens through the use of environment variables at deploy time. 

## Local

When running the app locally, the `.env` file is used to store both build time and runtime config variables. 

### Development mode

When running the application in development mode on your local machine (`yarn start`), the `dotenv` library sets the environment variables from the `.env` file and webpack assigns them to a globally accessible `CONFIG` object through the `./config.ts` file. 

### Container

The production nginx docker image created when running `make build_application` has a start command that writes specified environment varliables to the webpack generated `config.[hash].js` file. This file declares a `CONFIG` object in the global scope that the SPA files can access. The `config.[hash].js` file is loaded into the head tag of the served index.html file.

## Adding new config

To add or edit a config variable you will need to change:

- `.env.example` - eg: `CLIENT_PORT=9000`
- `config.ts` - config values are represented in string format so env variable `CLIENT_PORT` would be assignable as `"${CLIENT_PORT}"`
- `/scripts/build-config.sh` - edit the string argument being passed to the `envsubst` that outputs to `$CONFIG_FILENAME`. This should be in the format `$${CLIENT_PORT}`
- `docker-compose.yml` - here we need to map our `.env` file variables to the containers environment. 

- Once the new config makes it into master, the reviewer repo's `dockr-compose.yml` will need updating as it uses the latest tagged image 