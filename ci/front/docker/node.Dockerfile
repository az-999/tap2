ARG IMAGE_FROM=

FROM node:20.14-alpine AS build
ARG CONFIG=prod
WORKDIR /application

COPY react/package.json react/package-lock.json /application/

RUN --mount=type=cache,target=/root/.npm \
  npm install

COPY react /application

RUN npm run build

FROM nginx:1.27.0-alpine AS run

ENV NGINX_ROOT_PATH=/application
ENV NGINX_INDEX_FILE=index.html
WORKDIR /application

EXPOSE 3000

COPY ci/front/docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /application/build /application
COPY version.json /application/version.json
