
# Telegram

https://github.com/mihailgok/telegramwebapps/blob/main/index.html


# Бот


call-back
https://api.mmbump.pro/telegram/webhook

бот
https://t.me/tap_test999_bot


`curl -F "url=https://api.mmbump.pro/telegram/webhook" "https://api.telegram.org/bot/setwebhook"`
`curl "https://api.telegram.org/bot/getWebhookInfo"`


# SSL

https://habr.com/ru/articles/318952/
certbot certonly -d example.com

```
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

    ssl_stapling on;
    ssl_stapling_verify on;
```
тип задачи
tweeter подписаться
https://medium.com/@gtm-assistant/how-to-setup-twitter-pixel-on-your-shopify-store-16c9dc1b5b11
https://developer.x.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions
https://docs.replug.io/article/148-how-to-find-my-twitter-pixel-id
рефералка - копилка
Рейтинг - макс еще ответит

# twitter

https://www.positronx.io/laravel-socialite-oauth-login-with-twitter-example-tutorial/
создать APP twitter
https://developer.twitter.com/en/portal/projects-and-apps
https://developer.x.com/en/portal/dashboard


https://developer.x.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions
Недавно делал похожее. Единственный нормальный способ проверить, что пользователь подписался/твитнул - запросить OAuth от него и сделать твит/подписку самостоятельно с полученным от пользователя токеном.

Альтернатива - GET statuses/retweets/:id. API
Без Twitter API не разобраться

Как сделать проверку подписки на группу в twitter через свой сайт
user_name: Svyat999177934
user_id: 28826803

# TON

https://wallet.ton.org/?testnet=true
https://testnet.tonscan.org/


адрес коллекции
EQDAlAI6ZGe7xTBELbenPM4bnkMyb28bBVCg21TZM7cGKSWA

https://docs.tonconsole.com/tonapi/api-v2

/v2/blockchain/accounts/{account_id}/transactions

docker exec tap_mysql mysqldump -uroot -ppassword tap | gzip > /root/tap/db/tap.sql.gz

# Redis

https://skillbox.ru/media/code/redis_dlya_keshirovaniya_uskoryaem_vzaimodeystvie_s_osnovnoy_bazoy/
https://habr.com/ru/companies/wunderfund/articles/685894/

https://habr.com/ru/articles/134974/

# Ежедневные награды
1 endpoint

/grant-day
{
    "day_grant_first": 12312241234,
    "days": 3
}

Если человек еще ничего не брал то `day_grant_first` = null
Если взял первый раз то `day_grant_first` = момент взятия
