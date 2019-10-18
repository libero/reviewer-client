
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

local_ci:
	make build lint test push

build:
	${DOCKER_COMPOSE} build

lint: build
	${DOCKER_COMPOSE} run client_build yarn lint

test: build
	${DOCKER_COMPOSE} run client_build yarn test

push: lint test
	${PUSH_COMMAND} reviewer_application