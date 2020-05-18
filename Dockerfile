FROM node:12-alpine@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d AS node
ARG image_tag=latest
ENV NODE_OPTIONS --unhandled-rejections=strict
WORKDIR /app
EXPOSE 9000
COPY LICENSE .
HEALTHCHECK --interval=5s --timeout=1s \
	CMD echo -e "GET /health\n\n" | nc localhost:9000

COPY package.json \
    yarn.lock \
    globals.d.ts \
    index.ejs \
    index.tsx \
    .eslintrc.js \
    .eslintignore \
    .prettierrc.js \
    babel.config.json \
    webpack.parts.js \
    jest.config.js \
    tsconfig.json \
    webpack.config.js \
    ./
COPY tests/ tests/
COPY test-utils/ test-utils/
COPY src/ src/
COPY webpack/ webpack/

#
# Stage: Production NPM install
#
FROM node AS yarn-prod

RUN yarn install --production
RUN yarn run build

#
# Stage: Development environment
#
FROM node AS dev

RUN yarn install
CMD ["yarn", "run", "start:dev"]

#
# Stage: Production environment
#
FROM nginx:stable-alpine@sha256:0dfc8450deb8c7f06fbaac27e453ac3262df7d3a93639c4e2f48ee39434ec017 as prod

LABEL maintainer="eLife Reviewer Product Team <reviewer-product@elifesciences.org>"

COPY --from=yarn-prod /app/ .
COPY --from=yarn-prod /app/dist/ dist/
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=5s --timeout=1s \
	CMD echo -e "GET /health\n\n" | nc localhost:80

CMD ["nginx", "-g", "daemon off;"]
