IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose
DOCKER_COMPOSE_TEST = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_BUILD = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

yarn:
	yarn

build_dev: yarn
	${DOCKER_COMPOSE} build reviewer-client

build_test: yarn
	${DOCKER_COMPOSE_TEST} build reviewer-client

build_prod: yarn
	yarn build
	${DOCKER_COMPOSE_BUILD} build reviewer-client

# start tests with reviewer-mocks mocking continuum
start_dev:
	${DOCKER_COMPOSE} pull reviewer-mocks nginx
	$(MAKE) build_dev
	${DOCKER_COMPOSE} up -d reviewer-client reviewer-mocks
	./.scripts/docker/wait-healthy.sh reviewer-client_app 210
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 20
	${DOCKER_COMPOSE} up -d nginx
	${DOCKER_COMPOSE} logs -f reviewer-client

# start tests with reviewer-mocks mocking api, continuum-adaptor and continuum
start_test:
	${DOCKER_COMPOSE_TEST} pull reviewer-mocks nginx
	$(MAKE) build_test
	${DOCKER_COMPOSE_TEST} -d reviewer-client reviewer-mocks
	./.scripts/docker/wait-healthy.sh reviewer-client_app 210
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 20
	${DOCKER_COMPOSE_TEST} up -d nginx

start_ci:
	${DOCKER_COMPOSE_TEST} pull reviewer-mocks nginx
	${DOCKER_COMPOSE_TEST} up -d reviewer-mocks
	${DOCKER_COMPOSE_BUILD } up -d reviewer-client 
	./.scripts/docker/wait-healthy.sh reviewer-client_app 210
	./.scripts/docker/wait-healthy.sh reviewer-client_mocks 20
	${DOCKER_COMPOSE_TEST} up -d nginx

stop:
	docker-compose down

lint: yarn
	yarn lint

test: yarn
	yarn test

setup:
	-@ git submodule update --init --recursive
	-@ docker network create reviewer > /dev/null 2>&1 || true

test_browser:
	yarn wait-port localhost:9000
	yarn test:browser-headless

run_ci:
	make lint
	make test
	make build_prod
	make start_ci
	make test_browser
	make stop