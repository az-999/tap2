POSTMAN
https://lively-meadow-957728.postman.co/workspace/Team-Workspace~0e74e634-f56e-4458-8d56-36f4836c0a08/collection/33246314-8f9c23c4-ab06-4054-a284-7e5c54eb4a95?action=share&creator=33246314

url: https://api.tap.fairyland.world
url: https://api.mmbump.pro

# Авторизация

В приложении используется авторизация с применением токена JWT.
Время жизни токена 60 мин.
Первично токен нужно получить через метод `/loginJwt`
После того как он перестанет действовать нужно его обновить при помощи метода `/auth/refresh`.
Возможное время на обновление токена 20160 мин.
В payload data токена зашифрованы в base64 переменные пользователя и токена, в частности время истечения срока действия `exp`.
Для методов требующих авторизации токен нужно передавать в заголовке `Authorization` значение `Bearer {access_token}`.

Если авторизация не прошла то выдается ошибка 401.
```json
{
  "code": 401,
  "message": "token required"
}
```


# /login

https://core.telegram.org/bots/webapps#initializing-mini-apps

method POST

входящие параметры
- initData - string|required

Результат 200:
```json
{
  "token": "$2y$12$gwEh8KtPN4boIx2lAsy5xO.9ZqAmvs1KRP1wFj6N7Fe9zwwlpqViy"
}
```

Результат 400
```json
{
  "code": 403,
  "message": "Валидация не прошла"
}
```

# /loginJwt

method POST

входящие параметры
- initData - string|required

Результат 200:
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmRldi5mYWlyeWxhbmQud29ybGQvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTcxODI1OTA5MywiZXhwIjoxNzE4MjYyNjkzLCJuYmYiOjE3MTgyNTkwOTMsImp0aSI6Im12UTdpMzBNMFJaQmhGQ3MiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVpZCI6MX0.DM00wsPnpHFjsgXeFlC7ufBJAl7ICvEZrMAFa_O4mKA",
    "type": "Bearer",
    "expires_in": 60
}
```

Результат 400
```json
{
  "code": 403,
  "message": "Валидация не прошла"
}
```

# /loginWeb

method POST

входящие параметры
- hash - string|required
- auth_date - string
- photo_url - string
- username - string
- last_name - string
- first_name - string
- id - int|required

Результат 200:
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmRldi5mYWlyeWxhbmQud29ybGQvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTcxODI1OTA5MywiZXhwIjoxNzE4MjYyNjkzLCJuYmYiOjE3MTgyNTkwOTMsImp0aSI6Im12UTdpMzBNMFJaQmhGQ3MiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVpZCI6MX0.DM00wsPnpHFjsgXeFlC7ufBJAl7ICvEZrMAFa_O4mKA",
    "type": "Bearer",
    "expires_in": 60
}
```

Результат 400
```json
{
  "code": 403,
  "message": "Валидация не прошла"
}
```

# /auth/refresh

method POST

Требуется авторизация по токену см. раздел авторизация выше

Результат 200:
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmRldi5mYWlyeWxhbmQud29ybGQvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTcxODI1OTA5MywiZXhwIjoxNzE4MjYyNjkzLCJuYmYiOjE3MTgyNTkwOTMsImp0aSI6Im12UTdpMzBNMFJaQmhGQ3MiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVpZCI6MX0.DM00wsPnpHFjsgXeFlC7ufBJAl7ICvEZrMAFa_O4mKA",
    "type": "Bearer",
    "expires_in": 60
}
```

# /auth/clear-cache

method POST

Сбрасывает кеш для текущего пользователя

Результат 200:
```json
{
  "code": 200
}
```


# /trustwallet

method POST

входящие параметры
- address - string|required - адрес кошелька

Результат:
```json
{
  "code": 200
}
```

# /start

method GET

входящие параметры
[нет]

Результат:
```json
{
  "info": {
    "farm": 1000000,
    "taps": 0,
    "boost": "x2",
    "active_booster_finish_at": 1715773372
  },
  "system_time": 1715773372,
  "balance": "0",
  "balance_block": "0",
  "telegram_id": 12123123,
  "day_grant_first": 1715837855,
  "day_grant_day": 7,
  "day_grant_prize_possible": true,
  "current_nft_id_farming": 1,
  "grant": [
    {
      "id": 11,
      "amount": 1000000,
      "comment": "Доначисление за Зима Банк"
    }
  ],
  "pirate": {      
    "status": "finished",
    "black_metka_finish_at": 1715837855,
    "grant": 10000000,
    "green_metka_finish_at": 1715837855,
    "black_metka_count_all": 1715837855,
    "green_metka_modal_last_show_at": 1715837855,
    "shield_count": 1200,
    "shield_count_all": 1715837855,
    "green_metka_modal_count": 1200,
    "green_metka_modal_flag": 1
  },
  "nft": {
    "market": 1,
    "bumpstore": -1,
    "staking": -1,
    "shipkraft": 1,
    "shiplevelup": 1,
    "shipcombine": 1,
    "spaceshipparts": 1,
    "pirate": 1,
    "voucher": 1,
    "mmprotoken": 1
  },
  "has_wallet": 1,
  "wallet": 1
}
```

Отличие `/start` и `/farming`

| ID        | /start | /farming |
|-----------|--------|----------|
| pirate    | +      | -        |
| session   | -      | +        |
| grant     | +      | -        |
| Остальное | +      | +        |


- `system_time` - системное время, сек, UTC
- `balance_block` - если этот параметр > 0 то запускаем PING проверки на выпуск NFT
- `balance` - Баланс пользователя
- `session.status` - Статус сессии `inProgress` `finished` `await`
- `session.start_at` - Момент времени UTC начала сессии, сек
- `session.moon_time` - Момент времени UTC в который вылетает луна, сек
- `day_grant_first` - момент взятия первой награды. Если ниразу не брал то = null
- `day_grant_day` - кол-во наград (дней) которое забрал пользователь. 1 - забрал первый день, 2 - забрал 1 и 2 день и тд.
- `day_grant_prize_possible` - bool - Можно ли взять GRAND PRIZE, если пользователь не забрал его после 84 дня. 
- `current_nft_id_farming` - id nft, которая фармится
- `grant` - array|required - массив наград для пользователя. В награде все поля обязательные
- `has_wallet` - int|required - флаг, записан у пользователя кошелек в БД? 1 - у пользователя кошелек записан в нашу БД,  0 - у пользователя кошелек не записан в нашу БД
- `wallet` - string|required - флаг, записан у пользователя кошелек в БД? 1 - у пользователя кошелек записан в нашу БД,  0 - у пользователя кошелек не записан в нашу БД
- 
- `nft.market` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.bumpstore` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shipkraft` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shiplevelup` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shipcombine` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.spaceshipparts` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.pirate` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.voucher` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.mmprotoken` - int|required - флаг, включен (1)/выключен (-1) функционал
- 
- `pirate.status` - string|required - Статус сессии `inProgress` `finished` `await`
- `pirate.grant` - int - награда
- `pirate.black_metka_count` - int - если = 1 то есть черная метка, 0 - нету
- `pirate.black_metka_count_all` - int - Сколько меня ограбили всего
- `pirate.black_metka_count_grant_all` - int - Сколько я всего ограбил
- `pirate.shield_count` - int - Сколько я сохранил имея защиту с последнего захода
- `pirate.shield_count_all` - int - Сколько я сохранил имея защиту всего
- `pirate.green_metka_finish_at` - int - Момент окончания зеленой метки, если нет значения то значит нет и защиты
- `pirate.black_metka_finish_at` - int - Момент окончания пиратской миссии, приходит только при `pirate.status` = `inProgress`
- `pirate.green_metka_modal_count` - int - Кол-во монет ограблено с последнего показа модалки (запроса фарминга / входа в приложение)
- `pirate.green_metka_modal_flag` - int - Флаг последнего грабежа 0 - не было, 1 - малый (5%), 2 - средний (10%), 3 - прошло несколько дней
- `pirate.star_wars_oferta` - int - Флаг Принята оферта? 1 - принята, 0 - не принята
- `pirate.green_metka_modal_last_show_at` - int - когда последний раз показывалась модалка (запуск старта)

# /farming

method GET

входящие параметры
[нет]

Результат:
```json
{
  "info": {
    "farm": 1000000,
    "taps": 0,
    "boost": "x2",
    "active_booster_finish_at": 1715773372
  },
  "system_time": 1715773372,
  "balance": "0",
  "balance_block": "0",
  "telegram_id": 12123123,
  "session": {
    "status": "await",
    "start_at": 1715773372,
    "moon_time": 1715773500
  },
  "day_grant_first": 1715837855,
  "day_grant_day": 7,
  "day_grant_prize_possible": true,
  "current_nft_id_farming": 1,
  "nft": {
    "market": 1,
    "bumpstore": -1,
    "shipkraft": 1,
    "shiplevelup": 1,
    "shipcombine": 1
  },
  "has_wallet": 1,
  "wallet": 1
}
```

- `system_time` - системное время, сек, UTC
- `balance_block` - если этот параметр > 0 то запускаем PING проверки на выпуск NFT
- `balance` - Баланс пользователя
- `session.status` - Статус сессии `inProgress` `finished` `await`
- `session.start_at` - Момент времени UTC начала сессии, сек
- `session.moon_time` - Момент времени UTC в который вылетает луна, сек
- `day_grant_first` - момент взятия первой награды. Если ниразу не брал то = null
- `day_grant_day` - кол-во наград (дней) которое забрал пользователь. 1 - забрал первый день, 2 - забрал 1 и 2 день и тд.
- `day_grant_prize_possible` - bool - Можно ли взять GRAND PRIZE, если пользователь не забрал его после 84 дня. 
- `current_nft_id_farming` - id nft, которая фармится
- `has_wallet` - int|required - флаг, записан у пользователя кошелек в БД? 1 - у пользователя кошелек записан в нашу БД,  0 - у пользователя кошелек не записан в нашу БД
- `wallet` - string|required - флаг, записан у пользователя кошелек в БД? 1 - у пользователя кошелек записан в нашу БД,  0 - у пользователя кошелек не записан в нашу БД
- `nft.market` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.bumpstore` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shipkraft` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shiplevelup` - int|required - флаг, включен (1)/выключен (-1) функционал
- `nft.shipcombine` - int|required - флаг, включен (1)/выключен (-1) функционал


# /farming/unblock

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "balance": 1715773500,
  "grant": 5040
}

```
Результат 400
Если сессия еще не открыта
```json
{
  "code": 400,
  "message": "Сессиия еще не открыта"
}
```
Результат 400
Сессиия не закончилась
```json
{
  "code": 400,
  "message": "Сессиия не закончилась"
}
```

# /farming/start

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "status": "inProgress",
  "id": 5,
  "start_at": 1715773372,
  "finish_at": 1715773372,
  "moon_time": 1715773500
}
```
Результат 400
Если сессия еще не открыта
```json
{
  "code": 400,
  "message": "Сессиия не открыта"
}
```
Результат 400
Сессиия не закончилась
```json
{
  "code": 400,
  "message": "Сессиия не закончилась"
}
```

# /farming/finish

method POST

входящие параметры
- tapCount: int|required - тапы, умноженные на boost

Результат:
```json
{
  "status": "finished",
  "balance": 436205937
}
```

# /farming/moon-claim

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "balance": 436205937
}
```

Результат 400

```json
{
  "code": 403,
  "message": "Сессиия не открыта"
}
```

```json
{
  "code": 431,
  "message": "Нельзя забрать награду дважды"
}
```

# /friends

Выдает 

method GET

входящие параметры
- limit: int - кол-во друзей на страницу, по умолчанию 20
- offset: int - стартовый отступ откуда выдавать пользователей, по умолчанию 0

Результат:
```json
{
  "count": 1000,
  "friend_claim": 1000000,
  "list": [
    {
      "chat_id": 436205937,
      "name_first": "Евгений",
      "name_last": "Ефимов",
      "ref_balance": 0
    },
    {
      "chat_id": 305069120,
      "name_first": "Kir",
      "name_last": "P",
      "ref_balance": 0
    }
  ]    
}
```

- `list` - array|required - Список рефералов. Массив объектов FefUser
- `friend_claim` - int - сколько я нафармил с друзей. Выдается если offset=0
- `count` - array - Список рефералов. Массив объектов FefUser. Выдается если offset=0

# /friends/claim

method POST

входящие параметры
[нет]

Результат:
```json
{
  "balance": 305069120,
  "sum": 10000
}
```

# /product-list/buy

method POST

входящие параметры
- id: string|required ['x2','x3','x5']

Результат:
```json
{
  "id": "x2",
  "start_at": 1715837855,
  "finish_at": 1715924255,
  "price": 4000000,
  "balance": 11101003210
}
```

Результат 400
```json
{
  "code": 400,
  "message": "Недостаточно денег"
}
```
Если пользователь пытается купить буст который ниже чет тот который у него уже есть
```json
{
  "code": 401,
  "message": "Нельзя купить меньший буст"
}
```
Если пользователь пытается купить буст который у него уже есть
```json
{
  "code": 402,
  "message": "У вас уже есть этот буст"
}
```

# /product-list/delete

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  
}
```

Результат 400
```json
{
  "code": 400,
  "message": "Нет продукта"
}
```

# /task-list

method GET

входящие параметры
- language - string - язык из телеграмма 
- is_premium - integer - есть ли у пользователя премиум, 0 - нет премиума, 1 - есть премиум. По умолчанию = 0 

Результат:
```json
[
  {
    "id": 1,
    "type": "telegram",
    "name": "Подписаться на группу",
    "grant": 10000,
    "category": "default",
    "url": "",
    "status": "possible",
    "is_active": 1
  },
  {
    "id": 2,
    "type": "telegram",
    "name": "Подписаться на группу2",
    "grant": 20000,
    "category": "default",
    "url": "",
    "status": "done",
    "is_active": 1
  },
  {
    "id": 3,
    "type": "twitter",
    "name": "Подписаться на группу3",
    "grant": 20000,
    "category": "cols",
    "url": "",
    "status": "granted",
    "claimed_at": 1715837855,
    "is_active": 1
  }
]
```

- `type`: "telegram" | "telegram_boost" | "twitter" - depricated
- `status`: "possible" | "done" | "granted"
- `claimed_at`: int|null - выводится если status=granted, null - если старая выполненная задача
- `category`: string|required - категория для вкладок
- `is_active`: integer|required - если таск не активен = 0, то показывается модалка Компания завершена
- `icon`: string|required - полный путь к картинке
- `url`: string|required - ссылка
- `category`: string|required - "cols" | "default"
- `design_id`: integer|nullable - дизайн обложки: 
      null - по умолчанию, 
      1 - tonKepeer, 
      2 - tonStacker, 
      3 - bulls, 
      4 - MeetSafeConnect (без шагов), 
      5 - MeetSafeConnect (с шагами 2),
      6 - Booms,
      7 - TrustWallet,
      8 - MeetSafeConnect (с шагами 3),
- 
- `phone_type`: integer|nullable - фильтр для показа задачи в зависимости от модели телефона. null - показывать всем, 1 - android, 2 - iphone
- `checker_front`: integer|nullable - стратегия проверки задания на фронте,  
    - null - по умолчанию: показать ссылку, после перехода дать возможность проверить таск, отправить на BACK запрос на проверку таски и получить ответ
    - 1 - tonKeeper - проверить подключение кошелька, отправить на BACK запрос на проверку таски и получить ответ

# /task-list/complete

method POST

входящие параметры
- id - int|required

Результат 200 - Задача выполнена:
```json
{
  "task": {
    "id": 2,
    "name": "Подписаться на группу2",
    "grant": 20000,
    "url": "",
    "status": "done"
  },
  "balance": 11101003210
}
```
Результат 200 - Задача не выполнена:
```json
{
  "task": {
    "id": 2,
    "name": "Подписаться на группу2",
    "grant": 20000,
    "url": "",
    "status": "possible"
  },
  "balance": 11101003210
}
```

Результат 400
```json
{
  "code": 400,
  "message": "Эта задача уже выполнена"
}
```

Результат 400
```json
{
  "code": 403,
  "message": "Чат не найден, добавьте бота для проверки в группу {url}"
}
```


# /task-list/claim

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "balance": 11101003210
}
```
- `balance` - обновленный баланс

Результат 400
```json
{
  "code": 400,
  "message": "Нет задач для claim"
}
```


# /task-list/drop-all

method POST

входящие параметры
[нет]

Результат 200:
```json
{
}
```

# /rating

method GET

входящие параметры
[нет]

Результат 200:
```json
{
  "list": [
    {
      "chat_id": 1021215,
      "friends": 1,
      "place": 1,
      "name_first": "name_first",
      "name_last": "name_last",
      "balance_farmed": 112222222
    }
  ],
  "my_place": {
    "is_place_10": true,
    "place": 154,
    "place_plus": "100+",
    "friends": 154,
    "balance_farmed": 112222222
  }
}
```
- my_place.balance_farmed - показываетя баланс пользователя
- list[i].balance_farmed - показываетя баланс пользователя


```php
if (my_place.is_place_10 == true) {
    // выводим рейтинг my_place.place
} else {
    // выводим my_place.place_plus (place_plus = "100+")
    // значение будет my_place.place_plus = "100+"
}
```

# /nft

method GET

входящие параметры
[нет]

Результат 200:
```json
[
  {
    "id": 1,
    "name": "Voucher Tier 1 - 10%",
    "price": 100000000,
    "address_base58": "EQB7x_FVrtXqvoHuFRKsjIv1-2gIvc9wamuv48_rnCq8cWTR",
    "address_hex": "0:23423423432"
  }
]
```

# /nft/buy

method POST

входящие параметры
```json
{
  "nft_id": 1
}
```

Результат 200 - требуется проверка капчи:
```json
{
  "verify": true,
  "captcha": "data:image/jpeg;base64...",
  "up": "data:image/gif;base64...",
  "down": "data:image/gif;base64..."
}
```

Результат 200 - покупка в процессе:

```json
{
    "verify": false,
    "status": "wait-tx|pending|issue",
    "address": "EQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElIHE",
    "price": 800000000,
    "balance": 12433399847,
    "balance_block": 12433399847
}
```

# /nft/verify

method POST

входящие параметры
```json
{
    "position": 1250,
    "captcha": "uSX2qL",
    "wallet": "0QB3VqWU_DXlRxN9Exf_7sfsNOWT99V1gWedmUi18DZbuUhE",
    "nft_id": 1
}
```

Результат 200:

```json
{
    "address": "EQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElIHE",
    "price": 1000000000,
    "balance": 1243339984700000000,
    "status": "wait-tx|pending|issue",
    "balance_block": 12433399847
}
```

# /nft/check

method POST

входящие параметры
```json
{
    "nft_id": 1
}
```

Результат 200:
```json
{
    "id": 1,
    "exists": true,
    "address": "EQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElIHE",
    "transaction_sent": true,
    "transaction_received": true,
    "nft_issued": true,
    "expires_at": "2022-01-01 00:00:00"
}
```

# /nft/sent

method POST

входящие параметры
```json
{
  "nft_id": 1
}
```

Результат 200:

```json
{
    "verify": false,
    "status": "wait-tx|pending|issue",
    "address": "EQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElIHE",
    "price": 800000000,
    "balance": 12433399847,
    "balance_block": 12433399847
}
```

# /nft/reject

method POST

входящие параметры
```json
{
  "status": "rejected",
  "balance": 100000000,
  "balance_block": 0
}
```

# /nft/current

method POST

входящие параметры
```json
{}
```

Результат 200:
```json
{
    "exists": true,
    "balance": 100000000,
    "balance_block": 0,
    "nft_id": 1,
    "expires_at": "2022-01-01 00:00:00",
    "address": "EQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElIHE",
    "price": 800000000,
    "status": "wait-tx|pending|issue|none"
}
```

# /grant-day/reset
method POST

# /grant-day/claim

method POST

Забирает награду за текущий день

входящие параметры
[нет]

Результат 200:
```json
{
    "balance": 111111000,
    "day_grant_first": 111111000,
    "day_grant_day": 1
}
```

# /grant-day/prize

method POST

Забирает GRAND PRIZE

входящие параметры
[нет]

Результат 200:
```json
{
    "balance": 111111000
}
```
Результат 400:
```json
{
    "code": 403,
    "message": "You can't pick up the reward ahead of time"
}
```

# /grant

method POST

Получить список наград

входящие параметры
[нет]

Результат 200:
```json
[
  {
    "id": 11,
    "amount": 1000000,
    "comment": "Доначисление за Зима Банк"
  }
]
```

# /grant/accept

method POST

Забирает награду

входящие параметры
- request_id - string|required - заявка на награду которая передавалась в `/farming`

Результат 200:
```json
{
  "balance": 111111000
}
```

# /grant/reject

method POST

Отклонить награду

входящие параметры
- request_id - string|required - заявка на награду которая передавалась в `/farming`

Результат 200:
```json
{
  "balance": 111111000
}
```

# /wallet

method POST

Записывает кошелек пользователя

входящие параметры
- address - string|required - кошелек пользователя или `-` чтобы удалить

Результат 200:
```json
{
    "code": 200
}
```

Результат 400:
```json
{
    "code": 401,
    "message": "this wallet has already exist",
    "user_list": [
          {
               "username": "username",
               "chat_id": 123,
               "name_first": "name_first",
               "name_last": "name_last"
          }
    ]
}
```

# /nft/market

method POST

Выводит список нфт на маркетплейсе

входящие параметры
- next - integer - id следующей записи
- limit - integer - кол-во записей
- sort - string - сортировка (id-asc|id-desc)
- address - string - адрес владельца нфт
- name - string - поиск по названию

Результат 200:
```json
{
    "items": [
        {
            "id": 1,
            "tg_id": 930168893,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "sale_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
            "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
            "sale_price": "0.5",
            "created_at": "2024-07-26 18:21:52",
            "deployed_at": "2024-07-26 18:30:58",
            "completed_at": null,
            "status": 1,
            "name": "Voucher Tier 1 - 10%",
            "description": "Voucher Tier 1 - 10%",
            "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ"
        }
    ],
    "next": -1
}
```

# /nft/market/collections

method POST

Выводит список коллекций на маркетплейсе

Результат 200:
```json
{
    "collections": [
        "0:b95e118b379c241107227f3b22c8ea4fbc37c0a8b073430b1f104655452ecb03",
        "0:8bc4eb5443ba2ec8d76a9f3c5c1ae0a1b6ac5c6cb2aac51b119942ac4199e3c2",
        "0:c25378c53e27c0d0ca29b410eac92e1377c4cab8d378330d4df805bf5461cacf",
        "0:f536170199b56035815132d9520d57567304139af57860d9054b2743dc568e3d",
        "0:aff593dd43d2d0ae79566e043b6ed0f9aa0cb38b5b96a9bf6dae03667522f57a",
        "0:a5261daebcee8d8cfbeaedef4d731f108e631276983bdf14e8df6e3fd1324f16"
    ]
}
```

# /nft/market/put

method POST

Запрос продажи нфт на маркетплейсе

входящие параметры
- nft_id - integer|required - id коллекции
- price - string|required - цена
- nft_address - string|required - адрес нфт
- owner - string|required - владелец
- name - string - название нфт
- description - string - Описание нфт
- image - string - картинка нфт

Результат 200:
```json
{
    "item": {
        "tg_id": 930168893,
        "nft_id": 1,
        "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
        "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
        "sale_address": "",
        "sale_price": "0.5",
        "status": 0,
        "name": "Voucher Tier 1 - 10%",
        "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ",
        "id": 1
    },
    "payload": "te6cckECFAEABMgAAq9fzD0UAAAAAAAAAACAAT8gpxiLWgjXqSFagl3mBAEdeqHLzbIDfBg2AMcNEi7wAUCXxAKBcanBT18o7daSC41y5sufgus5ekRvbtOYsPTggX14QAAfwdvQAgEAGAAAAAEAAAGQ7zZSdQIBNAUDAfEzUfSgQACfkFOMRa0Ea9SQrUEu8wIAjr1Q5ebZAb4MGwBjhokXeAFpiz2uSr1o0wYd8lQUuaDGNPfOFaTNA2HQhoLBOTa6lQAUCXxAKBcanBT18o7daSC41y5sufgus5ekRvbtOYsPThB3NZQAAAAAAAAAAAAAAAACBACPgAE/IKcYi1oI16khWoJd5gQBHXqhy82yA3wYNgDHDRIu4QAoV8Ur2c6BkP+cPp3Gk92Zusej+Cwzk2usNVkkvQFj9RAF9eECART/APSkE/S88sgLBgIBYgoHAgEgCQgAgb7l72omhpgGmP/SB9IH0gfQBqaY/pn5gBaH0gfQB9IH0AGCmxUJDQ4ID5aM0U/SItlH0iLZH9Ii2F4ACFiBqqiUAIe84WdqJoaYBpj/0gfSB9IH0AammP6Z+YLeh9IH0AfSB9ABgpoVCQ0OCA+WjMk/0iLZN9Ii2R/SItwQgjJKwoBWAAqsBAICzQ0LAdFmCEAX14QBSYKBSML7y4cIk0PpA+gD6QPoAMFOSoSGhUIehFqBSkCH6RFtwgBDIywVQA88WAfoCy2rJcfsAJcIAJddJwgKwjhtQRSH6RFtwgBDIywVQA88WAfoCy2rJcfsAECOSNDTiWoMAOwh+kRbcIAQyMsFUAPPFgH6AstqyXH7AHAgghBfzD0UyMsfUjDLPyTPFlAEzxYTygCCCcnDgPoCEsoAyXGAGMjLBSfPFnD6AstqzCX6RFvJgwb7AHFVYPgjAQjIywAXyx9QBc8WUAPPFgHPFgH6AszLH8s/ye1UAvfQDoaYGAuNhJL4JwfSAYdqJoaYBpj/0gfSB9IH0AammP6Z+YGDgphWOAYABKmIVpj4XvEOGAShgFaZ/HCMWzGwtzGytkFmOCyTmZbygF8RXgAMkvh3AS66ThARZAgRXdFeAAkVnY2Cnk44LYcYEVYAD5aMoWQQg2NhBAXUEw4E8FPHxwWwjl0TXwMyNzc3NwT6APoA+gAwUyGhIaHBAfLRmAXQ+kD6APpA+gAwMMgyAs8WWPoCAc8WUAT6AslwIBBIEDcQRRA0CMjLABfLH1AFzxZQA88WAc8WAfoCzMsfyz/J7VTgs+MCMDE3KMAD4wIowADjAgjAAhIREA8AIJhVRBAkECPwBeBfCoQP8vAAGDY3EDhHZRRDMHDwBQDiODmCEAX14QAYvvLhyVNGxwVRUscFFbHy4cpwIIIQX8w9FCGAEMjLBSjPFiH6Astqyx8Vyz8nzxYnzxYUygAj+gITygDJgwb7AHFwVBcAXjMQNBAjCMjLABfLH1AFzxZQA88WAc8WAfoCzMsfyz/J7VQAhjU7O1N0xwWSXwvgUXPHBfLh9IIQBRONkRi68uH1+kAwEEgQN1UyCMjLABfLH1AFzxZQA88WAc8WAfoCzMsfyz/J7VQAZDAxbLLUMNDTByGAILDy0ZUiwwCOFIECWPgjU0GhvAT4IwKguROw8tGWkTLiAdQwAfsAp5vf3w==",
    "to_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
    "value": 300000000
}
```

Действия после получния payload:


```js
import { Cell } from '@ton/core';

// ...
try {
  const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages:[{
          address: response.to_address,
          amount: response.value,
          payload: response.payload
      }]
  }
  const result = await tonConnectUI.sendTransaction(tx, {returnStrategy: 'back'});
  const hash = await Cell.fromBase64(result.boc).hash();
  const txid = hash.toString('hex');

  // Затем запрашиваем у ton api данные по нфт по адресу https://tonapi.io/v2/nfts/{nft_address}
  // пока в ответе не появится поле sale
  // оттуда берем значение поля sale.address

  const saleAddress = nftinfo.sale.address;
  // и отправляем эти данные в /put/confirm
} catch (e) {
  // вызываем /put/reject
}
```

# /nft/market/put/confirm

method POST

Подтверждение выставления нфт на продажу

входящие параметры
- id - integer|required - id сейла
- sale_address - string|required - адрес сейла
- user_address - string|required - адрес пользователя
- txid - string|required - id транзакции

Результат 200:
```json
{
    "item": {
        "id": 1,
        "tg_id": 930168893,
        "nft_id": 1,
        "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
        "sale_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
        "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
        "sale_price": "0.5",
        "created_at": "2024-07-26 18:21:52",
        "deployed_at": "2024-07-26 18:30:58",
        "completed_at": null,
        "name": "Voucher Tier 1 - 10%",
        "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ",
        "status": 1
    }
}
```

# /nft/market/put/reject

method POST

Отклонение выставления нфт на продажу

входящие параметры
- id - integer|required - id сейла

Результат 200:
```json
{
  "success": true
}
```

# /nft/market/change/price

method POST

Изменение цены нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла
- price - string|required - новая цена

Результат 200:
```json
{
    "payload": "te6ccsEBAQEAGAAYACtsbCCAAAAAAAAAAABBfXhAAEATEtAIUyamXg==",
    "to_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
    "value": 300000000
}
```

# /nft/market/change/price/confirm

method POST

Подтверждение изменения цены нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла
- price - string|required - новая цена
- txid - string|required - id транзакции

Результат 200:
```json
{
    "item": {
        "id": 1,
        "tg_id": 930168893,
        "nft_id": 1,
        "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
        "sale_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
        "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
        "sale_price": "0.4",
        "created_at": "2024-07-26 18:21:52",
        "deployed_at": "2024-07-26 18:30:58",
        "completed_at": null,
        "name": "Voucher Tier 1 - 10%",
        "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ",
        "status": 1
    }
}
```

# /nft/market/cancel

method POST

Отмена выставления нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла

Результат 200:
```json
{
    "payload": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
    "to_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
    "value": 300000000
}
```

# /nft/market/cancel/confirm

method POST

Подтверждение отмены выставления нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла
- txid - string|required - id транзакции
- owner - string|required - владелец

Результат 200:
```json
{
    "id": 1,
    "txid": "eca6a57d8be587270b76666906559a832880abf6fc8b78d3eae9ebcc73b56e99",
    "owner": "UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx"
}
```

# /nft/market/buy

method POST

Купить нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла

Результат 200:
```json
{
    "payload": "te6ccsEBAQEADgAOABgAAAACAAAAAAAAAAAib1iS",
    "to_address": "EQDfDEbWPuFakRhWKB5MBQq2Ypq-3cKXF04RWuCpCv3WubvJ",
    "value": 800000000
}
```

# /nft/market/buy/confirm

method POST

Подтверждение покупки нфт на маркетплейсе

входящие параметры
- id - integer|required - id сейла
- txid - string|required - id транзакции
- new_owner - string|required - новый владелец

Результат 200:
```json
{
    "item": {
        "id": 5,
        "tg_id": 930168893,
        "nft_id": 1,
        "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
        "sale_address": "EQDfDEbWPuFakRhWKB5MBQq2Ypq-3cKXF04RWuCpCv3WubvJ",
        "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
        "sale_price": "0.5",
        "created_at": "2024-07-26 19:06:25",
        "deployed_at": "2024-07-26 19:08:58",
        "completed_at": "2024-07-26 19:12:28",
        "name": "Voucher Tier 1 - 10%",
        "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ",
        "status": 2
    }
}
``` 

# /nft/market/history

method POST

Получить историю выставления нфт на маркетплейсе

входящие параметры
- address - string|required - адрес нфт
- next - integer - id следующей записи
- limit - integer - кол-во записей

Результат 200:
```json
{
    "items": [
        {
            "id": 1,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "action": 0,
            "to_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
            "from_address": "UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx",
            "price": "0.5",
            "created_at": "2024-07-26 18:30:58",
            "txid": "466fc5a6c87579eec730e24dfe4bd31eedaf9e773d34ee11f5a848e5ac9f64e6"
        },
        {
            "id": 2,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "action": 3,
            "to_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
            "from_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
            "price": "0.4",
            "created_at": "2024-07-26 18:51:04",
            "txid": "f47f4f9238a186e2cfa012958d7674ae17ee1401bf3f29a453b7c6b0e3faf4b8"
        },
        {
            "id": 3,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "action": 2,
            "to_address": "UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx",
            "from_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
            "price": "0.4",
            "created_at": "2024-07-26 19:04:13",
            "txid": "eca6a57d8be587270b76666906559a832880abf6fc8b78d3eae9ebcc73b56e99"
        },
        {
            "id": 4,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "action": 0,
            "to_address": "EQDfDEbWPuFakRhWKB5MBQq2Ypq-3cKXF04RWuCpCv3WubvJ",
            "from_address": "UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx",
            "price": "0.5",
            "created_at": "2024-07-26 19:08:58",
            "txid": "a80e0c1296a09f992081d9aec534bff6f43c46bb3f8c23f80a9bf85306f9e25d"
        },
        {
            "id": 5,
            "nft_id": 1,
            "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
            "action": 1,
            "to_address": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
            "from_address": "EQDfDEbWPuFakRhWKB5MBQq2Ypq-3cKXF04RWuCpCv3WubvJ",
            "price": "0.5",
            "created_at": "2024-07-26 19:12:28",
            "txid": "59460edc82bdc8b3cb49e84a7e4bcbdb3567d831dd6b26f15c699e32515e794f"
        }
    ],
    "next": 5
}
```

# /nft/market/get

method GET

Получить активный сейл по адресу нфт

входящие параметры
- address - адрес нфт

Результат 200:
```json
{
  "item": {
    "id": 1,
    "tg_id": 930168893,
    "nft_id": 1,
    "nft_address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
    "sale_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
    "owner": "UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy",
    "sale_price": "0.4",
    "created_at": "2024-07-26 18:21:52",
    "deployed_at": "2024-07-26 18:30:58",
    "completed_at": null,
    "name": "Voucher Tier 1 - 10%",
    "image": "https://ipfs.io/ipfs/QmTtCqkTqHJqjJ9GJmYJNwT5xHJ5s7RfPwXWQqYJnT5wZaQ",
    "status": 1
  }
}
```

# /nft/market/cancel/payload

method POST

Отменить выставленный сейл

входящие параметры
- address - адрес сейла

Результат 200:
```json
{
    "payload": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
    "to_address": "EQBS7uDsTnit8yjE8m3RxEwPIRKVZmCFuqeFEEGxkfhB4fzR",
    "value": 300000000
}
```

Статусы сейла

| ID  | Название   |
| --- | ---------- |
|  0  | Новый      |
|  1  | Выставлен  |
|  2  | Продан     |
|  3  | Отменен    |

Действия в истории

| ID  | Название               |
| --- | ---------------------- |
|  0  | Выставление на продажу |
|  1  | Покупка                |
|  2  | Отмена выставления     |
|  3  | Изменение цены         |


# /nft/mint/register

method POST

Регистрация оплаты комиссии за минт нфт

входящие параметры
- nft_id - integer|required - id коллекции
- item_id - integer|required - доп. id нфт, для коллекции с несколькими вариантами нфт
- address - string|required - адрес кошелька пользователя
- txid - string|required - id транзакции с оплатой комиссии

Результат 200:
```json
{
    "status": "ok"
}
```

# /nft/mint/check

method POST

Проверка статуса минта нфт

входящие параметры
- nft_id - integer|required - id коллекции
- item_id - integer|required - доп. id нфт, для коллекции с несколькими вариантами нфт

Результат 200:
```json
{
    "id": 1,
    "tg_id": 930168893,
    "nft_id": 1,
    "item_id": 0,
    "address": "EQC0xZ7XJV60aYMO-SoKXNBjGnvnCtJmgbDoQ0FgnJtdSocp",
    "amount": 800000000,
    "txid": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
    "query_id": 213213,
    "created_at": "2024-07-26 18:21:52",
    "deployed_at": "2024-07-26 18:21:52",
    "completed_at": null,
    "status": 0,
    "error": null
}
```

Статусы:

| ID  | Название               |
| --- | ---------------------- |
|  0  | Новый                  |
|  1  | Ожидает минта          |
|  2  | Ожидает подтверждения  |
|  3  | Успешно выпущен        |
|  4  | Ошибка                 |

# /nft-ship/kraft

method POST

Сбока корабля

входящие параметры
- nft1 - string|required - Адрес NFT
- nft2 - string|required - Адрес NFT
- nft3 - string|required - Адрес NFT
- nft4 - string|required - Адрес NFT
- nft5 - string|required - Адрес NFT
- nft6 - string|required - Адрес NFT
- ship_level - integer|required - Уровень корабля, первый, начальный = 1

Результат 200:
```json
{
  "address": "EQClpOiXxMFzEMTlGEtDGYCZCtafEz_K9YLyJugT6wxZv31n",
  "value": "0.3",
  "body": "te6cckEBAgEAsgAB2YAEgPM0TmjsAFv8PqyemDLxpE0/grUyk70Cs7GjUUTkbBAAkB5mic0dgAt/h9WT0wZeNImn8FamUnegVnY0aiicjYIAEgPM0TmjsAFv8PqyemDLxpE0/grUyk70Cs7GjUUTkbAAAAAAAAAAAMABAIAI7NlAt/RsQLiWbYDNgn5O+xoXypjBKD12RrthbitmCTF69v5Rz/XzmIaUrLsdvHWrRxH6WjomV9tgNIEMvgkJzLqFYQ==",
  "signature": "08ecd940b7f46c40b8966d80cd827e4efb1a17ca98c1283d7646bb616e2b6609317af6fe51cff5f3988694acbb1dbc75ab4711fa5a3a2657db6034810cbe0909",
  "publicKey": "a7a86f5282c07a64e5f5183be251bbf0b75b115fed11511a0894dde5b55ca2f3"
}
```

`signature` - подпись 
`publicKey` - публичный ключ 
`body` - payload для контракта 

Результат 400:
```json
{
  "status": false,
  "message": "nft on GetGems market on sale",
  "errors": [
    {
      "address_hex": "0:d1afe03bad3d2a9a0619f853eff03ab4afca308d24337c413b1ff04d97bea4c8",
      "address_base58": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "url_getgems": "https://getgems.io/collection/EQCiqaHaScaQFjX1kwTDx5KHROVPt54cms2rYHBm1Ug6E19e/EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "metadata": {
        "project": "MMPro BUMP",
        "attributes": [
          {
            "trait_type": "Module",
            "value": "Ship Nose"
          },
          {
            "trait_type": "Rarity",
            "value": "Epic"
          }
        ],
        "description": "The aerodynamic nose section, equipped with navigation systems and advanced sensors for obstacle detection. Integrated lasers can clear a path through space debris. Collect all parts to combine them into a single spaceship.",
        "name": "Ship Nose Module",
        "image": "https://ipfs.filebase.io/ipfs/QmSV5MGVChKj8ktg1MsTDDW7RA4wECdkHLhg2Nn34Uj2hd"
      },
      "previews": [
        {
          "resolution": "5x5",
          "url": "https://cache.tonapi.io/imgproxy/0j-nc_9yw3Vgdu55ubS71Gmb1BGpxS7yeJZ9bEwHBPo/rs:fill:5:5:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "100x100",
          "url": "https://cache.tonapi.io/imgproxy/5RH3N2VvuhNU9BVp9J1ZLN049wCKlIEqbRhHQCvgNy4/rs:fill:100:100:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "500x500",
          "url": "https://cache.tonapi.io/imgproxy/MV63p7CEWUc2XPq7UeUThynrdtEGS1zw4modI-ldujo/rs:fill:500:500:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "1500x1500",
          "url": "https://cache.tonapi.io/imgproxy/AeqVnH28dzbC-jApaut77QNvWGc4dJq5LUpBAf-YMNo/rs:fill:1500:1500:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        }
      ]
    }
  ]
}
```
`address_base58` - Френдли адрес

# /nft-ship/upgrade

method POST

Сбока корабля

входящие параметры
- nft1 - string|required - Адрес NFT
- nft2 - string|required - Адрес NFT
- nft3 - string|required - Адрес NFT
- nft4 - string|required - Адрес NFT
- nft5 - string|required - Адрес NFT
- nft6 - string|required - Адрес NFT
- nft7 - string|required - Адрес NFT корабля
- ship_level - integer|required - Уровень корабля, первый, начальный = 1

Результат 200:
```json
{
  "address": "EQClpOiXxMFzEMTlGEtDGYCZCtafEz_K9YLyJugT6wxZv31n",
  "value": "0.4",
  "body": "te6cckEBAgEAsgAB2YAEgPM0TmjsAFv8PqyemDLxpE0/grUyk70Cs7GjUUTkbBAAkB5mic0dgAt/h9WT0wZeNImn8FamUnegVnY0aiicjYIAEgPM0TmjsAFv8PqyemDLxpE0/grUyk70Cs7GjUUTkbAAAAAAAAAAAMABAIAI7NlAt/RsQLiWbYDNgn5O+xoXypjBKD12RrthbitmCTF69v5Rz/XzmIaUrLsdvHWrRxH6WjomV9tgNIEMvgkJzLqFYQ==",
  "signature": "08ecd940b7f46c40b8966d80cd827e4efb1a17ca98c1283d7646bb616e2b6609317af6fe51cff5f3988694acbb1dbc75ab4711fa5a3a2657db6034810cbe0909",
  "publicKey": "a7a86f5282c07a64e5f5183be251bbf0b75b115fed11511a0894dde5b55ca2f3"
}
```

`address` - Адрес контракта для вызова
`value` - кол-во тонов для оплаты транзакции
`signature` - подпись 
`publicKey` - публичный ключ 
`body` - payload для контракта 

Результат 400:
```json
{
  "status": false,
  "message": "nft on GetGems market on sale",
  "errors": [
    {
      "address_hex": "0:d1afe03bad3d2a9a0619f853eff03ab4afca308d24337c413b1ff04d97bea4c8",
      "address_base58": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "url_getgems": "https://getgems.io/collection/EQCiqaHaScaQFjX1kwTDx5KHROVPt54cms2rYHBm1Ug6E19e/EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "metadata": {
        "project": "MMPro BUMP",
        "attributes": [
          {
            "trait_type": "Module",
            "value": "Ship Nose"
          },
          {
            "trait_type": "Rarity",
            "value": "Epic"
          }
        ],
        "description": "The aerodynamic nose section, equipped with navigation systems and advanced sensors for obstacle detection. Integrated lasers can clear a path through space debris. Collect all parts to combine them into a single spaceship.",
        "name": "Ship Nose Module",
        "image": "https://ipfs.filebase.io/ipfs/QmSV5MGVChKj8ktg1MsTDDW7RA4wECdkHLhg2Nn34Uj2hd"
      },
      "previews": [
        {
          "resolution": "5x5",
          "url": "https://cache.tonapi.io/imgproxy/0j-nc_9yw3Vgdu55ubS71Gmb1BGpxS7yeJZ9bEwHBPo/rs:fill:5:5:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "100x100",
          "url": "https://cache.tonapi.io/imgproxy/5RH3N2VvuhNU9BVp9J1ZLN049wCKlIEqbRhHQCvgNy4/rs:fill:100:100:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "500x500",
          "url": "https://cache.tonapi.io/imgproxy/MV63p7CEWUc2XPq7UeUThynrdtEGS1zw4modI-ldujo/rs:fill:500:500:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        },
        {
          "resolution": "1500x1500",
          "url": "https://cache.tonapi.io/imgproxy/AeqVnH28dzbC-jApaut77QNvWGc4dJq5LUpBAf-YMNo/rs:fill:1500:1500:1/g:no/aHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1TVjVNR1ZDaEtqOGt0ZzFNc1RERFc3UkE0d0VDZGtITGhnMk5uMzRVajJoZA.webp"
        }
      ]
    }
  ]
}
```

# /pirate/oferta-accept

method POST

Принимает оферту звездный войн, если нет денег то начисляется 1Bpoint.

входящие параметры
[нет]

Результат 200:
```json
{
  "balance": 1000000000
}
```
- `balance` - обновленный баланс

# /pirate/info

method GET

входящие параметры
[нет]

Результат:
```json
{
  "pirate": {      
    "status": "finished",
    "black_metka_finish_at": 1715837855,
    "grant": 10000000,
    "green_metka_finish_at": 1715837855,
    "black_metka_count_all": 1715837855,
    "green_metka_modal_last_show_at": 1715837855,
    "shield_count": 1200,
    "shield_count_all": 1715837855,
    "green_metka_modal_count": 1200,
    "green_metka_modal_flag": 1
  }
}
```

- `pirate.status` - string|required - Статус сессии `inProgress` `finished` `await`
- `pirate.grant` - int - награда
- `pirate.black_metka_count` - int - если = 1 то есть черная метка, 0 - нету
- `pirate.black_metka_count_all` - int - Сколько меня ограбили всего
- `pirate.black_metka_count_grant_all` - int - Сколько я всего ограбил
- `pirate.shield_count` - int - Сколько я сохранил имея защиту с последнего захода
- `pirate.shield_count_all` - int - Сколько я сохранил имея защиту всего
- `pirate.green_metka_finish_at` - int - Момент окончания зеленой метки, если нет значения то значит нет и защиты
- `pirate.black_metka_finish_at` - int - Момент окончания пиратской миссии, приходит только при `pirate.status` = `inProgress`
- `pirate.green_metka_modal_count` - int - Кол-во монет ограблено с последнего показа модалки (запроса фарминга / входа в приложение)
- `pirate.green_metka_modal_flag` - int - Флаг последнего грабежа 0 - не было, 1 - малый (5%), 2 - средний (10%), 3 - прошло несколько дней
- `pirate.star_wars_oferta` - int - Флаг Принята оферта? 1 - принята, 0 - не принята
- `pirate.green_metka_modal_last_show_at` - int - когда последний раз показывалась модалка (запуск старта)

# /pirate/start

method POST

Старт миссии

входящие параметры
[нет]

Результат 200:
```json
{
  "black_metka_start_at": 1715773372,
  "black_metka_finish_at": 1715773372
}
```

Результат 400:
```json
{
  "code": 400,
  "message": "You haven't bought a black label yet"
}
```

# /pirate/finish

method POST

Финиш миссии

входящие параметры
[нет]

Результат 200:
```json
{
  "balance": 10000000000,
  "grant": 1000000,
  "black_metka_count_grant_all": 1000000
}
```
- balance - int - обновленный баланс
- grant - int - сколько выдано приза за грабеж/миссию
- black_metka_count_grant_all - int - обновленный баланс: сколько я всего награбил


Результат 400:
```json
{
  "code": 400,
  "message": "The mission is not over yet"
}
```

# /pirate/buy

method POST

Купить пиратскую метку

входящие параметры
- address - string|required - адрес кошелька с которого отправлена транзакция
- txid - string|required - хеш транзакции
- product_id - string|required - идентификатор продукта 1 - черная метка, 2 - защита
- amount - integer|required - кол-во нанотонов

Результат 200:
```json
{
  "request_id": 200
}
```

# /pirate/buy-info

method POST

Купить пиратскую метку

входящие параметры
- request_id - integer|required - идентификатор заявки из запроса `/pirate/buy`

- Результат 200:
```json
{
  "request": {
    "tg_id": 11,
    "address": "0:000",
    "txid": "ad312",
    "product_id": 1,
    "amount": 1,
    "created_at": 1,
    "status": 1,
    "error": ""
  }
}
```

`request.status` - int - статус заявки. 0 - создана, 1 - выполнена, 2 - отклонена, ошибка в поле `error`

# /nft-ship/union

Объединение кораблей. То же что и `/nft-ship/upgrade`


# /mmpro-token/buy

method POST

Купить токен MMPRO

входящие параметры
- address - string|required - адрес кошелька с которого отправлена транзакция и куда будут начисляться токены
- txid - string|required - хеш транзакции
- ton - string|required - пакет тонов 1,10,50

Результат 200:
```json
{
      "request_id": 1,
      "status": true,
      "amount": 658.557,
      "amount_last_order": 58.557,
      "kurs": {
            "ton": 6.57,
            "mmpro": 0.068
      }
}
```

`amount` - float - баланс, сколько всего купил за все время токенов
`amount_last_order` - float - токенов MMPRO последняя покупка

# /mmpro-token/check

method POST

Купить токен MMPRO

входящие параметры
- request_id - int|required - идентификатор запроса из метода `/mmpro-token/buy`

Результат 200:
```json
{
      "request_id": 1,
      "result": 1,
      "amount": 658.557,
      "amount_last_order": 58.557,
      "kurs": {
            "ton": 6.57,
            "mmpro": 0.068
      }
}
```

`amount` - float - баланс, сколько всего купил за все время токенов
`result` - int - статус проверки 0 - в процессе, 1 - успешно, 2 - ошибка
`amount_last_1order` - float - токенов MMPRO последняя покупка

# /mmpro-token/info

method POST

Выводит информацию о монетах и курсе

входящие параметры
нет

Результат 200:
```json
{
  "amount": 658.557,
  "kurs": {
    "ton": 6.57,
    "mmpro": 0.068
  } 
}
```
`amount` - float - баланс, сколько всего купил за все время токенов

# /lootboxes

method POST

Выводит список доступных лутбоксов

входящие параметры
нет

Результат 200:
```json
[{
  "id": 2,
  "name": "DriveCore Beta",
  "price": 1000,
  "months": 3,
  "reward": 278.3,
  "apy": 20,
  "nft_count": 4,
  "duration": 2592000,
  "max_claim": 3
}]
```

# /lootboxes/list

method POST

Выводит список лутбоксов, купленных пользователем

входящие параметры
- offset - int|required - смещение
- limit - int|required - лимит

Результат 200:
```json
{
  "list": [
    {
      "id": 1,
      "tg_id": 123,
      "lootbox_id": 2,
      "lootbox": {
        "id": 2,
        "name": "DriveCore Beta",
        "price": 1000,
        "months": 3,
        "reward": 278.3,
        "apy": 20,
        "nft_count": 4,
        "duration": 2592000,
        "max_claim": 3
      },
      "amount": 1000,
      "out_amount": 10000,
      "mint_count": 3,
      "duration": 12312321,
      "max_claims": 5,
      "claims": 1,
      "address": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "owner": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
      "txid": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
      "status": 1,
      "created_at": 123213221,
      "next_claim": 12312312,
      "last_claim": 2131231,
      "finished_at": null,
      "end_time": 12312312,
      "error": ""
    }
  ],
  "total": 0
}
```
- out_amount - сколько токенов получу за 1 клейм (Monthly Reward);
- mint_count - сколько запчастей будет начислено пользователю после клейма (месячная награда);
- max_claims - кол-во месяцев стейкинга всего;
- claims - сколько раз клеймил;
- next_claim - время взятия следующего клейма
- status - 0 - создан, 1 - застейкан, 2 - стейк завершен

# /lootboxes/stake

method POST

Получить данные для покупки лутбокса через tonconnect

входящие параметры:
- id - int|required - id лутбокса
- address - string|required - адрес кошелька пользователя

Результат 200:
```json
{
  "id": 12,
  "body": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
  "to": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
  "value": "0.44"
}
```

# /lootboxes/stake/confirm

method POST

Подтвердить покупку лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса
- txid - string|required - id транзакции
- address - string|required - адрес лутбокса

Результат 200:
```json
{
  "id": 12,
  "claims": 1,
  "max_claims": 5,
  "next_claim": 12312312,
  "end_time": 12312312,
  "status": 1
}
```
Результат 408:
```json
{
  "error": true,
  "message": "Timeout waiting for stake confirmation",
  "code": 408
}
```
# /lootboxes/stake/error

method POST

Сообщить о ошибке покупки лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса
- error - string|required - текст ошибки

Результат 200:
```json
{
  "id": 12,
  "status": 4
}
```

# /lootboxes/claim

method POST

Получить данные для получения награды лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса

Результат 200:
```json
{
  "id": 12,
  "body": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
  "to": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
  "value": "0.44"
}
```

# /lootboxes/claim/confirm

method POST

Подтвердить получение награды лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса
- txid - string|required - id транзакции

Результат 200:
```json
{
  "id": 12,
  "status": 2,
  "claims": 1,
  "max_claims": 5,
  "minted": [{
    "id": 10,
    "nft_id": 6,
    "item_id": 4,
    "name": "Ship Nose Module",
    "price": 1000000000,
    "comission": 100000000,
    "image": "/img/Ship_Nose.png",
    "address_base58": "EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi",
    "address_hex": "0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4",
    "total_supply": 1000000
  }],
  "reward": "21"
}
```

# /lootboxes/restake

method POST

Получить данные для повторной покупки лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса

Результат 200:
```json
{
  "id": 12,
  "body": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
  "to": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
  "value": "0.44"
}
```

# /lootboxes/restake/confirm

method POST

Подтвердить повторную покупку лутбокса через tonconnect

входящие параметры: 
- id - int|required - id купленного лутбокса
- txid - string|required - id транзакции

Результат 200:
```json
{
  "id": 12,
  "status": 1,
  "claims": 1,
  "max_claims": 5
}
```

# /lootboxes/withdraw

method POST

Получить данные для вывода лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса

Результат 200:
```json
{
  "id": 12,
  "body": "te6ccsEBAQEADgAOABgAAAADAAAAAAAAAABquWZm",
  "to": "EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u",
  "value": "0.44"
}
```

# /lootboxes/withdraw/confirm

method POST

Подтвердить вывод лутбокса через tonconnect

входящие параметры:
- id - int|required - id купленного лутбокса
- txid - string|required - id транзакции

Результат 200:
```json
{
  "id": 12,
  "status": 3,
  "claims": 1,
  "max_claims": 5
}
```

# /lootboxes/sync

method POST

Синхронизировать данные о лутбоксе с блокчейном

входящие параметры:
- id - int|required - id купленного лутбокса

Результат 200:
```json
{
  "success": true,
  "id": 12,
  "status": 1,
  "claims": 1,
  "max_claims": 5,
  "next_claim": 0
}
```


# /airdrop/start

method POST

Акцептует оферту и стартует сезон для пользователя

входящие параметры:
- нет

Результат 200:
```json
{
  "airdrop_is_oferta_start": 1727721231
}
```

`airdrop_is_oferta_start` - когда оферта стартовала

# /airdrop

method POST

Выдает актуальные таски для пользователя

входящие параметры:
- нет

Результат 200:
```json
{
  "balance_ap": 1000,
  "balance_token_rank": 1000,
  "task1": {
        "request": {
              "status": 1
        }
  },
  "task2": {
      "total_earned":110, 
      "first_time":11, 
      "day":2 
  },
  "task3": {
      "status": 1
  },
  "task4": {
      "count": 1
  },
  "task5": {
      "id5": {
            "status": 0
      },
      "id6": {
            "status": 0
      },
      "id7": {
            "status": 1
      },
      "id8": {
            "status": 0
      },
      "id9": {
            "status": 0
      }
  }
}
```

Если заявка не отправлена, то объекта `request` нет

`task1.request.status`
CONST STATUS_CREATED = 0;
CONST STATUS_SUCCESS = 1;
CONST STATUS_REJECT = 2;
CONST STATUS_FINISHED = 3;

`task2.first_time` - Первый раз когда взял награду за ежедневную таску
`task2.day` - Порядковый номер дня за которую взял награду

`task3.status` - Статус выполнения задания корабль 3 уровня 0 - нет, 1 - выполнено

`task4.count` - Кол-во Kols тасок которые выполнены и за которые можно взять награду

`task5.id{}.status` группа задач 5-10
0 - не выполнена
1 - выполнена но не склеймлена
2 - выполнена и склеймлена

`task6` - задача Reward for every 5,000,000 MMPRO points
`task7` - задача Mint NFT Ship Parts
`task8` - задача Reward for Every 3 Friends Invited
`task9` - задача Buy Protection Marks
`task10` - задача Mint OG Passes
`task11` - задача Mint NFT Spaceships
`task12` - задача Buy Pirate Mark
`task13` - задача Monetag



Идентификатор задач:

| ID | Название                                | Название в BUMP KOLS                         |      |
|----|-----------------------------------------|----------------------------------------------|------|
| 1  | whitebit                                |                                              |      |
| 2  | check daily                             |                                              |      |
| 3  | ship3 level                             |                                              |      |
| 4  | kols                                    |                                              |      |
| 5  | Subscribe to the BUMP Telegram channel  | Subscribe to channel MMPro on Telegram       | 2    |
| 6  | Visit the BUMP website                  |                                              | 622  |
| 7  | Follow BUMP on X                        | Follow Market Making Pro on Twitter (X)      | 5    |
| 8  | Subscribe to the Trust Telegram channel | Subscribe to channel MMPro Trust on Telegram | 3    |
| 9  | Follow Trust on X                       | Follow MMPro Trust on Twitter (X)            | 4    |  
| 10 | Subscribe to the BUMP YouTube channel   | Subscribe to Bump by MMPro Group on YouTube  | 42   |

# /airdrop/complete-ship3

method POST

Проверяет выполнение таски

Результат 200:
```json
{
  "balance_ap": 1000,
  "grant": 1
}
```

`balance_ap` - обновленный баланс

Результат 400: - если не найден такой корабль
```json
{
  "code": 400,
  "message": "no ship"
}
```

# /airdrop/save-ship-craft

method POST

входящие параметры:
- txid - string|required - 

Сохраняет транзакцию сделанного(craft) корабля

Результат 200:
```json
{
  "code": 200
}
```

Результат 400: - если не найден такой корабль
```json
{
  "code": 400,
  "message": "no ship"
}
```

Результат 400: - Таск уже выполнен
```json
{
  "code": 400,
  "message": "already done"
}
```

# /airdrop/complete-kols

method POST

Проверяет выполнение таски

Результат 200:
```json
{
  "balance_ap": 1000
}
```

# /airdrop/complete-daily

method POST

Проверяет выполнение таски

Результат 200:
```json
{
  "balance_ap": 1000,
  "grant": 1
}
```

# /airdrop/complete-task6

method POST

Проверяет выполнение таски

Результат 200:
```json
{
  "balance_ap": 1000,
  "grant": 1,
  "balance": 1,
  "total_earned": 1
}
```

# /airdrop/complete-task7

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 1,
      "total_earned": 1
}
```

# /airdrop/complete-task8

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 10,
      "total_earned": 1
}
```

# /airdrop/complete-task9

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 10
}
```

# /airdrop/complete-task10

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 10,
      "total_earned": 1
}
```

# /airdrop/complete-task11

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 10,
      "total_earned": 1
}
```

# /airdrop/complete-task12

method POST

Проверяет выполнение таски

Результат 200:
```json
{
      "balance_ap": 1000,
      "grant": 10
}
```

# /airdrop/complete

method POST

Проверяет выполнение таски

входящие параметры:
- id - int|required - идентификатор задачи 

Результат 200:
```json
{
      "balance_ap": 1000,
      "balance": 100000000000,
      "grant": 1,
      "grant_point": 1
}
```

`balance` - баланс обновленный кошелька в POINTS

Если таск выполнен ранее то grant=1 grant_point=0. если

Результат 400:
```json
{
   "code": 400,
   "message": "Эта задача не активна"
}
```
```json
{
   "code": 401,
   "message": "Не успешный запрос на проверку"
}
```
```json
{
   "code": 402,
   "message": "Задание не выполнено"
}
```

# /airdrop/white-bit-nik

method POST

Принимает от пользователя ник в WHITEBIT и создает заявку

входящие параметры:
- nik - string|required - идентификатор задачи

Результат 200:
```json
{
  "code": 200
}
```
# /airdrop/white-bit-claim

method POST

Выдает деньги по выполненной таске

входящие параметры:
нет

Результат 200:
```json
{
  "balance_ap": 1200,
  "grant": 1000
}
```

Ошибки:
400 - нет ни одной заявки
401 - Уже взята награда
402 - нет одобренной заявки

# /airdrop/rating

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "list10": [
    {
      "tg_id": 1021215,
      "place": 1,
      "name_first": "name_first",
      "name_last": "name_last",
      "balance_ap": 112222222
    }
  ],
  "list": [
    {
      "tg_id": 1021215,
      "place": 1,
      "name_first": "name_first",
      "name_last": "name_last",
      "balance_ap": 112222222
    }
  ],
  "my_place": {
    "is_place_10": true,
    "place": 154,
    "place_plus": "100+",
    "balance_ap": 112222222
  }
}
```
- my_place.balance_ap - показываетя баланс пользователя AP
- list[i].balance_ap - показываетя баланс пользователя AP
- list10 - первая десятка
- list - двести записей

```php
if (my_place.is_place_10 == true) {
    // выводим рейтинг my_place.place
} else {
    // выводим my_place.place_plus (place_plus = "100+")
    // значение будет my_place.place_plus = "100+"
}
```


# /airdrop/result

method POST

входящие параметры
[нет]

Результат 200:
```json
{
  "season1_is_end": 1,
  "data": {
        "balance_ap": 1021215,
        "balance_bp": 1,
        "rating": 1
  }
}
```


