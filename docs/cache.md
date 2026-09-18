# Кеширование пользователей

https://paulund.co.uk/laravel-cache-authuser

Пользователь хранится по ключу `user.{id}` или `user.chat_id.{chat_id}`.

Время на которое сохраняется пользователь задается в параметрое `app.user_cache` в секундах.

`\App\Auth\CacheUserProvider` - провайдер кеширования, который вызывается функцией `Auth::guard('api')->user()`

Для получения пользователя пользоваться методами:

`\App\Models\UserTelegram::findById()`
`\App\Models\UserTelegram::findByChatId()`

они из кеша берут пользователя
лучше ими пользоваться
