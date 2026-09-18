
# Отключение функционала

Для хранения статуса включения раздела Маркетплейс служит переменная в memcache `\App\Http\Controllers\DashboardController::nftFunctional:market`
Для хранения статуса включения раздела BumpStore служит переменная в memcache `\App\Http\Controllers\DashboardController::nftFunctional:bumpstore`
Для хранения статуса включения раздела ShipCraft служит переменная в memcache `\App\Http\Controllers\DashboardController::nftFunctional:shipkraft`
Значение 1 - включено
Значение -1 - выключено

# Блокировка аккаунта

У пользователя ставится флаг `is_blocked`.
По умолчанию 0

# BEST PRACTICE

правило именования контроллеров/URL/функций
URL лучше строить двусоставным `<controller>/<action>`
в url применять маленькие буквы и дефис
URL controller `name` = class CamelCase `NameController`
URL action `name-name2` = function CamelCase `nameName2`

# Пиратские метки

black_metka_count - 1 - есть черная метка, null - нет черной метки
black_metka_count_grant_all - Сколько я всего ограбил
black_metka_count_all - Сколько меня ограбили всего
black_metka_finish_at - время окончания миссии
black_metka_grant - приз за грабеж в млн (*10e6)
shield_finish_at - Время окончания защиты
shield_count - Сколько я сохранил имея защиту с последнего захода
shield_count_all - Сколько я сохранил имея защиту всего
green_metka_modal_last_show_at - int - когда последний раз показывалась модалка
green_metka_modal_flag - int - какой тип грабежа был последний раз, 1 - малый (5%), 2 - средний (10%)
green_metka_modal_count - int - кол-во ограбленных поинтов у пользователя со времени последней модалки
star_wars_oferta - int - флаг, принята ли оферта


Проверка транзакций происходит в методе `app:pirate_queue`
Грабеж с пользователей происходит в методе `app:pirate`

Если миссия закончилась то `black_metka_grant` устанавливается в route `farming/index`

# Покупка MMPRO токена

Пользователь отправляет тоны на кошелек хайлоад и пингует транзакцию до ее подтверждения.

После подтверждения транзакции она отправляется на бек `/mmpro-token/buy`
там она записывается в таблицу `mmpro_token`.

Если пользователь отправил несколько транзакций то они все суммируются.

При этом записываются курсы валют ton и mmpro в кеше под индексом `mmpro_token_kurs`

```php
[
    'ton'   => 'сколько ton стоит в USD' 
    'mmpro' => 'сколько mmpro стоит в USD'
]
```

Цена берется из coingecko в консольной команде `app:mmpro_token`

`php artisan app:mmpro_token`

# Фильтр одна продажа

```php
$u = UserTelegram::getByChatId($row->tg_id);
$u->has_one_pay = UserTelegram::HAS_ONE_PAY_YES_TRANSACTION;
$u->save();
```
Сделал:
mmprotoken

# Рассылка

Как делать?
Сделать таблицу с очередью
`sender_queue`
- id
- tg_id
- send_id

`sender`
- id
- text
