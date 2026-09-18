git pull
docker-compose up -d --build react
docker-compose up -d --build ton
docker image prune -f
docker exec -i tap_php_fpm php artisan migrate
docker exec -i tap_php_fpm php artisan app:deploy
