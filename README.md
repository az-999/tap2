# tap

# Установка

docker-compose up -d
docker exec -it tap_php_fpm composer update

Сгенерировать ключ приложения
docker exec -it tap_php_fpm php artisan key:generate

Установить права на папку для записи кеша
chmod -R 777 ./laravel/storage
chmod -R 777 update.sh


Создать БД
docker exec -it tap_mysql mysql -u root -ppassword
docker exec -i tap_mysql mysql -u root -ppassword < db/init.sql

# Обслуживание приложения

Сделать миграцию
docker exec -it tap_php_fpm php artisan make:migration user

Сделать команду
docker exec -it tap_php_fpm php artisan make:command fix_stake
docker exec -it tap_php_fpm php artisan app:fix_stake

Применить миграции
docker exec -it tap_php_fpm php artisan migrate


# Точки входа 
https://api.tap.fairyland.world

Чтобы проверять на наличие человека в группе, нужно бота добавить в эти группы

# Окружения

51.159.190.178 - это тестовый сервер
51.158.227.52 - это прод

bumpstore.app

## PROD

1. По любому push собриается докер образы
2. Для заливки на front.test.mmbump.pro необходимо прожать job в своей ветке из своей ветки ( создавайте MR для наглядности)
3. Для заливки на прод необходимо в main создать тег в main v****   и по нему уже будет создан deploy
4. Для отката изменений - нужно будет создать pipeline в main и проставить 3 переменных
```
FRONT_VERSION:
  description: Set version for front( v1.*.* related on tags)
PHP_VERSION:
  description: Set version for php( v1.*.* related on tags)
TON_VERSION:
  description: Set version for ton( v1.*.* related on tags)
```

### Добавить переменную окружения на стенд LARAVEL
### Добавить переменную окружения на стенд REACT
### Добавить переменную окружения на стенд TON

## TEST



https://front.test.mmbump.pro
https://api.test.mmbump.pro
https://apiton.test.mmbump.pro

https://front.test2.mmbump.pro
https://api.test2.mmbump.pro
https://apiton.test2.mmbump.pro

Заливается по комиту в фича ветку

Бот:
https://t.me/tap_test999_bot
https://t.me/mmbump_test_bot
https://t.me/mmbump_test2_bot

Тесты для LARAVEL
Запуск тестов:
docker exec -it tap_php_fpm php artisan test

База данных для тестов:

Тесты для REACT

docker exec -it tap_react npm ran test

### Добавить переменную окружения на стенд LARAVEL

ci/docker-compose.yaml
ci/php/helm/values.yaml:env/fpm
ci/php/docker/env.template


### Добавить переменную окружения на стенд REACT

https://gitlab.com/mmpro1/tap/-/settings/ci_cd
git lab `ENV_TEST_FRONT`

### Добавить переменную окружения на стенд TON

https://gitlab.com/mmpro1/tap/-/settings/ci_cd
git lab `ENV_TEST_FRONT`



# Покупка NFT

При покупке запускается сначала блок монет `/nft/transaction-start` и потом после завершения их полное списание `/nft/transaction-finish`.

Блок монет происходит в пол
е `user_telegram.balance_block`  

# Дебаг

chrome://inspect#devices

https://developer.chrome.com/docs/devtools/remote-debugging?hl=ru

https://docs.telegram-mini-apps.com/platform/debugging

https://telegra.ph/Kak-vklyuchit-otladchik-console-01-17

ссылка для дебага Святослав
https://front3.tap.fairyland.world/?hash=%242y%2412%24kfzFYBLPJ5ROHo7ed.8amuKoALTCgtoxUb%2FgF%2FC50z5mIXgWmIkMm

Тестовая странца
https://api.tap.fairyland.world/tg

https://react-tap-app-only.vercel.app/

docker exec tap_php_fpm php artisan app:booster
docker exec tap_php_fpm php artisan schedule:run
docker exec -it tap_php_fpm php artisan app:rating
docker exec -it tap_php_fpm php artisan app:deploy_prod
docker exec -it tap_php_fpm php artisan app:deploy_test

# S3

https://www.scaleway.com/en/docs/storage/object/api-cli/object-operations/#putobjectacl

https://tap-static.s3.nl-ams.scw.cloud/
https://tap-static.s3.nl-ams.scw.cloud/image_2024-08-16_14-59-01.png

# NFT

NFT лимит в контракте 1000

http://localhost:3100/telegram-widget?id=122605414&first_name=%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D1%81%D0%BB%D0%B0%D0%B2&last_name=%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9&username=ArhangelSky999&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FJbrKG4C33Y-WZVXT-o6uhcXPq8XY_tguOZ_tsMswGGg.jpg&auth_date=1719492725&hash=24c4abf947f3155e8a5036e6e404dbed7aa52b55994b7a7f41fecc0d8b44556a
https://api.test.mmbump.pro/telegram-widget?id=122605414&first_name=%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D1%81%D0%BB%D0%B0%D0%B2&last_name=%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9&username=ArhangelSky999&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FJbrKG4C33Y-WZVXT-o6uhcXPq8XY_tguOZ_tsMswGGg.jpg&auth_date=1719492725&hash=24c4abf947f3155e8a5036e6e404dbed7aa52b55994b7a7f41fecc0d8b44556a

cookies from https://oauth.telegram.org may have been blocked due to third party cookie phaseout

docker exec -it tap_php_fpm php artisan mint
docker exec -it tap_php_fpm php artisan app:new_math
docker exec -it tap_php_fpm php artisan app:check_task_limit


nft_sale.description
user_telegram.ship_module_count

# MINT
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id >=116 and id <=121
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id >=138 and id <=143
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id >=144 and id <=149
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id >=171 and id <=177

UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 134 # 0
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 136 # 1
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 129 # 2
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 131 # 3
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 132 # 4
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 157 # 5

UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 135 # 0
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 137 # 1
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 155 # 2
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 154 # 3
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 152 # 4
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 153 # 5


UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 128 # 0
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 130 # 1
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 156 # 3
UPDATE `mint_queue` SET status = 1,address='UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m' WHERE id= 133 # 5


0 150
1 151

update mint_queue set status=1 where id in ( 106,193, 187,67, 186,64, 181,107, 162,178, 36,177 ); // Vladimir

Что нужно доделать?
docker exec -it tap_ton yarn api_deploy trusted EQAAefRSgWhgxV-9QbTaxHw40a4YvehIVpb7Zfl0938qgxSp EQBd88MPSoUJNmGAmjBFHxt4Nm2BAsEjQRbzZay6RPRtKN2A

docker 4e40fb4e4c57 cp ~/.env2 4e40fb4e4c57:/appication/.env

/home/gitlab-runner/builds/FmuLoSsH9/0/mmpro1/tap/ci


# upgrade коллекции запчастей

EQCSGP4uWzQEcognoLxJtL-bbPlvw2bXlT94ieqpJrj8TBfp
EQDZdyHjLsdcVKoA9A-HSaLWCh8-hvbHRZ8xGLrTGEZ4Luu1
EQCQh0cXgskgH16oofvd-d552921mRzubK4qey3p9LCzVLvG
EQAr84xM4c286kgUEXy_AdPQOoysRlgxwpfH9F8mZJ8jlNs6
EQCms5awEaWuApGPY3zptU4QEDW_IkMKeTFZuEHBTie9sYWF
EQAxvB-SCO4dwrrZLHswj3k2SXhql3a6UW83Wv85_9JBzpYz

SELECT count(*), status FROM `mint_queue` GROUP by status

GET https://tonapi.io/v2/blockchain/transactions/94764206ba03128a01b55ed73851f5f14109aa3077277fb045a1dfb880cb0e2c

вывод

UQB0kGB5ogyHJMLFFSqs0BUBi9LiyMYlcEQ3gkwFW_pG725p

docker exec -it tap_ton yarn api_deploy withdraw-ton EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi UQB0kGB5ogyHJMLFFSqs0BUBi9LiyMYlcEQ3gkwFW_pG725p 0.1

# MMPRO
SELECT sum(amount) FROM mmpro_token WHERE id in (SELECT min(id) FROM `mmpro_token` GROUP by txid) and status=1;