FROM nginx:1.27.0-alpine

ENV PHP_HOST=localhost
ENV PHP_PORT=9000
ENV NGINX_PORT=80
ENV NGINX_ROOT_PATH=/application/public
ENV NGINX_INDEX_FILE=index.php
ENV NGINX_RESOLVER=127.0.0.1

WORKDIR /application
EXPOSE 80
COPY ci/php/docker/nginx.conf /etc/nginx/nginx.conf
COPY ci/php/docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY laravel /application
COPY version.json /application/version.json
