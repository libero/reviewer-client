
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

ci:
	make build_source lint test build_application push_application

build_source:
	${DOCKER_COMPOSE} build client_source

lint: build_source
	${DOCKER_COMPOSE} run client_source yarn lint

test: build_source
	${DOCKER_COMPOSE} run client_source yarn test

build_application: build_source
	${DOCKER_COMPOSE} build reviewer_client

push_application: lint test build_application
	${PUSH_COMMAND} reviewer_client
