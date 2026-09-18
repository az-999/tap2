#!/bin/env bash
cd /application

envsubst < .env.template > .env

SLEEP="${PHP_SLEEP:-45}"
while true;
do
  TIME=$(date)
  echo "${TIME} : Run schedule"
  php artisan schedule:run
  TIME2=$(date)
  echo "${TIME2} : Sleep ${SLEEP} sec"
  sleep "${SLEEP}"

done
