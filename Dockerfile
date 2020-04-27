FROM node:12-alpine@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d AS node
ARG image_tag=latest
ENV NODE_OPTIONS --unhandled-rejections=strict
WORKDIR /app

LABEL maintainer="eLife Reviewer Product Team <reviewer-product@elifesciences.org>"

#
# Stage: Production NPM install
#
FROM node AS yarn-prod

COPY package.json \
    yarn.lock \
    ./

RUN yarn install --production


#
# Stage: Development NPM install
#
FROM yarn-prod AS yarn-dev

RUN yarn install



#
# Stage: Base environment
#
FROM node AS base
EXPOSE 9000

COPY LICENSE .

HEALTHCHECK --interval=5s --timeout=1s \
	CMD echo -e "GET /health\n\n" | nc localhost:9000

#
# Stage: Development environment
#
FROM base AS dev
ENV NODE_ENV=development

COPY globals.d.ts \
    index.ejs \
    index.tsx \
    .babelrc \
    .eslintrc.js \
    .eslintignore \
    .prettierrc.js \
    webpack.parts.js \
    jest.config.js \
    tsconfig.json \
    webpack.config.js \
    ./
COPY --from=yarn-dev /app/ .
COPY tests/ tests/
COPY test-utils/ test-utils/
COPY src/ src/
COPY webpack/ webpack/

CMD ["yarn", "run", "start:dev"]



#
# Stage: Production build
#
FROM dev AS build-prod
ENV NODE_ENV=production

RUN yarn run build



#
# Stage: Production environment
#
FROM nginx:stable-alpine@sha256:0dfc8450deb8c7f06fbaac27e453ac3262df7d3a93639c4e2f48ee39434ec017 as prod
ENV NODE_ENV=production

COPY --from=yarn-prod /app/ .
COPY --from=build-prod /app/dist/ dist/

CMD ["/bin/sh", "/app/build-config.sh"]
