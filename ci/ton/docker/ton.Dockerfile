FROM node:18.16-alpine

WORKDIR /application

COPY ci/ton/docker/entrypoint.sh /entrypoint.sh

RUN apk add gettext bash

COPY ton/package.json ton/package-lock.json /application/

RUN --mount=type=cache,target=/root/.npm \
  npm install --force

COPY ton/ /application/
COPY ci/ton/docker/env.example /application/env.example
COPY version.json /application/version.json

ENTRYPOINT [ "/entrypoint.sh" ]

CMD ["yarn", "api"]
