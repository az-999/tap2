#!/bin/env bash
cd /application

envsubst < .env.template > .env

exec "$@"
