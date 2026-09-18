FROM node:20.14-alpine AS build
ARG CONFIG=prod
WORKDIR /application

COPY react/package.json react/package-lock.json /application/

RUN --mount=type=cache,target=/root/.npm \
  npm install

COPY react /application
