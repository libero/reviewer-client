
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

get_deps:
	yarn

lint: get_deps
	yarn lint

test: get_deps
	yarn test

setup: get_deps
	cp .env.example .env
	cp config/reviewer-mocks/config.example.json config/reviewer-mocks/config.json
	cp config/config.infra.docker.example.json config/config.infra.json
	cp config/config.public.example.json config/config.public.json

build:
	yarn build
	${DOCKER_COMPOSE} build reviewer-client

test_browser:
	docker-compose up -d
	yarn wait-port localhost:9000
	yarn test:browser-headless

push:
	${PUSH_COMMAND} reviewer-client

