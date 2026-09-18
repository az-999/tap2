# Логирование

## Логи баланса

Хранятся в таблице `log_balance`

Сначала логи пишутся в `memcache`

пишутся в массивы каждые 100 сек

в переменной `log_balance_list` хранится список массивов
Например 
```php
[
    17195795,
    17195796,
]
```

Элемент массива содержит массив ключей на строки БД
Ключ строки `log_balance_list_row_{random_string}`
Например
```php
$log_balance_list[17195795] = [
    'log_balance_list_row_13123123123',
    'log_balance_list_row_waeq2133423',
    'log_balance_list_row_fdsdfgesdas',
];
```

В ключе `log_balance_list_row_13123123123` Хранится массив строки таблицы `log_balance`

`[122605414,1719579322,1,1000000]`

Консольная команда будет писать в БД раз в 5 мин

`docker exec -it tap_php_fpm php artisan app:save_log_balance`

## Включение и выключение логирования

Переменная отвечает 
`log_balance:is_active`
