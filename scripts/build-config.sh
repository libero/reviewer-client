#!/bin/sh
envsubst ' $${CLIENT_PORT} $${SERVER_PORT} $${CLIENT_API_PROXY_URL} ' \
  < /etc/nginx/nginx.conf.template \
  > /etc/nginx/nginx.conf \
  && envsubst ' $${CONTINUUM_LOGIN_URL} $${CONTINUUM_LOGIN_PORT} $${CLIENT_PORT} $${CLIENT_API_URL} ' \
  < /usr/share/nginx/html/config-template.js \
  > /usr/share/nginx/html/config.js \
  && nginx -g 'daemon off;'