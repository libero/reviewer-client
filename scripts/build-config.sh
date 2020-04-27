#!/bin/sh

cp /etc/nginx/nginx.conf.template /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_PORT}~$CLIENT_PORT~g" /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_API_PROXY_URL}~$CLIENT_API_PROXY_URL~g" /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_TOKEN_EXCHANGE_PROXY_URL}~$CLIENT_TOKEN_EXCHANGE_PROXY_URL~g" /etc/nginx/nginx.conf

env
cat /etc/nginx/nginx.conf

nginx -g 'daemon off;';
