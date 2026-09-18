#!/bin/bash

envsubst < env.example > .env

exec "$@"
