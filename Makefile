
DOCKER_COMPOSE = IMAGE_TAG=local docker-compose -f docker-compose.build.yml

local_ci:
	make build lint test push

build:
	${DOCKER_COMPOSE} build

lint: build
	${DOCKER_COMPOSE} run client_build yarn lint

test: build
	${DOCKER_COMPOSE} run client_build yarn test

push: lint test
	@echo "Pushing client image"