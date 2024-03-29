.DEFAULT_GOAL := help
.PHONY: help yarn build_dev build_test build_prod start_dev start_test start_ci stop lint test setup test_browser run_ci

IMAGE_TAG ?= "local"
DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose
DOCKER_COMPOSE_TEST = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_CI = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.ci.yml
DOCKER_COMPOSE_BUILD = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

export SAUCE_JOB=reviewer-client
export SAUCE_BUILD ?= "local-$(shell date -u +%Y%m%d.%H%M)"
export SAUCE_API_HOST=eu-central-1.saucelabs.com

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: ## perform setup tasks
	-@ git submodule update --init --recursive
	-@ docker network create reviewer > /dev/null 2>&1 || true

install: ## install dependencies
	yarn

build_dev: install ## build client for running in development with non mocked api and continuum-adaptor
	${DOCKER_COMPOSE} build reviewer-client

build_test: install ## build client for running in development with mocked api and continuum-adaptor
	${DOCKER_COMPOSE_TEST} build reviewer-client

build_prod: ## build client for production
	${DOCKER_COMPOSE_BUILD} build reviewer-client

build_browsertest:
	docker build . -f browsertests.Dockerfile --tag libero/reviewer-browsertests:${IMAGE_TAG}

start_dev: ## start with dev build image, with reviewer-mocks mocking continuum
	${DOCKER_COMPOSE} pull reviewer-mocks nginx
	$(MAKE) build_dev
	${DOCKER_COMPOSE} up -d reviewer-client reviewer-mocks
	./.scripts/docker/wait-healthy.sh reviewer-client_app 210
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 20
	${DOCKER_COMPOSE} up -d nginx
	${DOCKER_COMPOSE} logs -f reviewer-client

start_test: ## start with dev build image, reviewer-mocks mocking api, continuum-adaptor and continuum
	${DOCKER_COMPOSE_TEST} pull reviewer-mocks nginx
	$(MAKE) build_test
	${DOCKER_COMPOSE_TEST} up -d reviewer-client reviewer-mocks
	./.scripts/docker/wait-healthy.sh reviewer-client_app 210
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 20
	${DOCKER_COMPOSE_TEST} up -d nginx
	${DOCKER_COMPOSE} logs -f reviewer-client

start_ci: ## start with production build, everything mocked and reachable inside docker network for containerized browsertest 
	${DOCKER_COMPOSE_CI} pull reviewer-mocks
	${DOCKER_COMPOSE_CI} up -d reviewer-mocks reviewer-client nginx
	./.scripts/docker/wait-healthy.sh reviewer-client_app 60
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 60

start_ci_localhost: ## start with production build, everything mocked and exposed on localhost
	${DOCKER_COMPOSE_CI} pull reviewer-mocks
	${DOCKER_COMPOSE_CI} -f docker-compose.ci.localhost.yml up -d reviewer-mocks reviewer-client nginx
	./.scripts/docker/wait-healthy.sh reviewer-client_app 60
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 60

stop: ## stop all services
	${DOCKER_COMPOSE} down

lint: install ## lint code
	yarn lint

test: yarn ## run unit tests
	yarn test

test_browser: ## run browser tests with local chrome
	yarn wait-port localhost:9000
	yarn test:browser-headless

test_chromium:
	docker run --network reviewer \
		-e BASE_URL="reviewer-client_nginx:9000" \
		-e TEST_ARGS \
		libero/reviewer-browsertests:${IMAGE_TAG}

test_firefox:
	docker run --network reviewer \
		-e BASE_URL="reviewer-client_nginx:9000" \
		--entrypoint testcafe \
		libero/reviewer-browsertests:${IMAGE_TAG} \
		--assertion-timeout 15000 --skip-js-errors \
		"firefox:headless --no-sandbox --disable-dev-shm-usage" 'tests/**/*.browser.ts'

test_browser_containerized: build_browsertest test_chromium 

test_browser_saucelabs: yarn  # browsers run during ci are set in .github/workflows/ci.yml
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Chrome@latest:Windows 10','saucelabs:Firefox@latest:Windows 10','saucelabs:MicrosoftEdge@latest:Windows 10','saucelabs:Safari@latest:macOS Catalina','saucelabs:Safari@latest:macOS 10.14','saucelabs:Safari@latest:macOS 10.13' 'tests/**/*.browser.ts'

test_browser_saucelabs_serial: yarn  # browsers run during ci are set in .github/workflows/ci.yml
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Chrome@latest:Windows 10' 'tests/**/*.browser.ts'
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Firefox@latest:Windows 10' 'tests/**/*.browser.ts'
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:MicrosoftEdge@latest:Windows 10' 'tests/**/*.browser.ts'
	# old edge doesn't work, see https://github.com/libero/reviewer/issues/982
	#yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:MicrosoftEdge@18.17763:Windows 10' 'tests/**/*.browser.ts'
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Safari@13:macOS 10.13' 'tests/**/*.browser.ts'
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Safari@12.0:macOS 10.14' 'tests/**/*.browser.ts'
	yarn testcafe --assertion-timeout 15000 --skip-js-errors 'saucelabs:Safari@11.0:macOS 10.12' 'tests/**/*.browser.ts'

run_ci: ## run as if in ci
	make lint
	make test
	make build_prod
	make start_ci
	make test_browser_containerized
	make stop
