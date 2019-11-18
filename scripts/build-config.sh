#!/bin/sh

CONFIG_FILENAME=$(find /usr/share/nginx/html/ -name "config.*.js")

envsubst ' $${CLIENT_PORT} $${SERVER_PORT} $${CLIENT_API_PROXY_URL} ' \
  < /etc/nginx/nginx.conf.template \
  > /etc/nginx/nginx.conf \
  && cp $CONFIG_FILENAME config-temp.js \
  && envsubst ' $${CONTINUUM_LOGIN_URL} $${CLIENT_PORT} $${CLIENT_API_URL} ' \
  < config-temp.js \
  > $CONFIG_FILENAME \
  && rm config-temp.js \
  && nginx -g 'daemon off;'