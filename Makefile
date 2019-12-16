IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

get_deps:
	yarn

build:
	yarn build
	${DOCKER_COMPOSE} build reviewer-client

start:
	IMAGE_TAG=${IMAGE_TAG} docker-compose up -d

stop:
	docker-compose down

lint:
	yarn lint

test:
	yarn test

setup:
	- cp .env.example .env
	- cp config/reviewer-mocks/config.example.json config/reviewer-mocks/config.json
	- cp config/config.infra.docker.example.json config/config.infra.json
	- cp config/config.public.example.json config/config.public.json

test_browser:
	yarn wait-port localhost:9000
	yarn test:browser-headless

run_ci:
	make get_deps
	make lint
	make test
	make build
	make setup
	make start
	make test_browser
	make stop
