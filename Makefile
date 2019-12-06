
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

get_deps:
	yarn

lint: get_deps
	yarn lint

test: get_deps
	yarn test

build:
	yarn build
	${DOCKER_COMPOSE} build reviewer-client

test_browser:
	docker-compose up -d
	yarn wait-port localhost:9000
	yarn test:browser

push:
	${PUSH_COMMAND} reviewer-client


#ci:
#	make build_source lint test build_application push_application

#build_source:
#	${DOCKER_COMPOSE} build client_source

#lint: build_source
#	${DOCKER_COMPOSE} run client_source yarn lint

#test: build_source
#	${DOCKER_COMPOSE} run client_source yarn test

#build_application: build_source
#	${DOCKER_COMPOSE} build reviewer-client

#push_application: lint test build_application
#	${PUSH_COMMAND} reviewer-client
