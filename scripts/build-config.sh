#!/bin/sh
envsubst ' $${CLIENT_PORT} $${SERVER_PORT} $${CLIENT_API_PROXY_URL} ' \
  < /etc/nginx/nginx.conf.template \
  > /etc/nginx/nginx.conf \
  && cat /etc/nginx/nginx.conf \
  && nginx -g 'daemon off;'

