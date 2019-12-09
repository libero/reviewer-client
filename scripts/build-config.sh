#!/bin/sh

if [ "$INFRA_CONFIG_PATH" == '' ]
then
  INFRA_CONFIG_PATH=/etc/reviewer/config.infra.json
fi

if [ "$PUBLIC_CONFIG_PATH" == '' ]
then
  PUBLIC_CONFIG_PATH=/etc/reviewer/config.public.json
fi

client_port=$(cat $INFRA_CONFIG_PATH | jq '.port')
client_api_proxy_url=$(cat $INFRA_CONFIG_PATH | jq '.client_api_proxy_url')
client_auth_proxy_url=$(cat $INFRA_CONFIG_PATH | jq '.client_token_exchange_proxy_url')

cp /etc/nginx/nginx.conf.template /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_PORT}~$client_port~g" /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_API_PROXY_URL}~$client_api_proxy_url~g" /etc/nginx/nginx.conf
sed -i "s~\${CLIENT_AUTH_PROXY_URL}~$client_auth_proxy_url~g" /etc/nginx/nginx.conf
sed -i "s~\${PUBLIC_CONFIG_PATH}~$PUBLIC_CONFIG_PATH~g" /etc/nginx/nginx.conf

nginx -g 'daemon off;';
