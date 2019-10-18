
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

local_ci:
	make build_source lint test build_app push

build_source:
	${DOCKER_COMPOSE} build client_source

lint: build_source
	${DOCKER_COMPOSE} run client_source yarn lint

test: build_source
	${DOCKER_COMPOSE} run client_source yarn test

build_app: build_source
	${DOCKER_COMPOSE} build client_application

build_storybook: build_source
	@echo "build storybook container"

push: lint test build_app
	${PUSH_COMMAND} client_application