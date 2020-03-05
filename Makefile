IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

yarn:
	yarn

build: yarn
	yarn build
	${DOCKER_COMPOSE} build reviewer-client

start:
	IMAGE_TAG=${IMAGE_TAG} docker-compose up -d

stop:
	docker-compose down

lint: yarn
	yarn lint

test: yarn
	yarn test

setup:
	-@ cp .env.example .env
	-@ if [ ! -e ./config/reviewer-mocks/config.json ] ; then cp config/reviewer-mocks/config.example.json config/reviewer-mocks/config.json ; fi
	-@ if [ ! -e ./config/config.infra.json ] ; then cp config/config.infra.example.json config/config.infra.json ; fi
	-@ if [ ! -e ./config/config.infra.local.json ] ; then cp config/config.infra.local.example.json config/config.infra.local.json ; fi
	-@ if [ ! -e ./config/config.public.json ] ; then cp config/config.public.example.json config/config.public.json ; fi

clean_config:
	-@rm .env 2>/dev/null || true
	-@rm config/reviewer-mocks/config.json 2>/dev/null || true
	-@rm config/config.infra.json 2>/dev/null || true
	-@rm config/config.infra.local.json 2>/dev/null || true
	-@rm config/config.public.json 2>/dev/null || true

test_browser:
	yarn wait-port localhost:9000
	yarn test:browser-headless

run_ci:
	make lint
	make test
	make build
	make setup
	make start
	make test_browser
	make stop

start_dev:
	docker-compose up -d reviewer-mocks
	yarn
	PUBLIC_CONFIG_PATH=config/config.public.json INFRA_CONFIG_PATH=config/config.infra.local.local.json yarn start