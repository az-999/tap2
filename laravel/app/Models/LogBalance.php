<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

/**
 * @property int    id
 * @property int    telegram_chat_id
 * @property int    type
 * @property int    amount
 * @property int    created_at
 */
class LogBalance extends Model
{
    use HasFactory;

    protected $connection = 'mysql_log';

    public $timestamps = false;

    const TYPE_FARMING = 1;
    const TYPE_TAPS = 2;
    const TYPE_TASK = 3;
    const TYPE_FRIEND = 4;
    const TYPE_BOOST = 5;
    const TYPE_MANUAL = 6;
    const TYPE_MOON = 7;
    const TYPE_DAYS = 8;
    const TYPE_DAYS_PRIZE = 12;
    const TYPE_NFT_BLOCK = 9;
    const TYPE_NFT_REJECT = 10;
    const TYPE_FERMER_CUT = 11; // срезание баланса фермеров
    const TYPE_FARMING_UNLOCK = 12;
    const TYPE_MINT_REWARD = 13;
    const TYPE_PIRATE_GRANT = 14;
    const TYPE_PIRATE_GRAB = 15;

    public static $cache_key = 'log_balance_list';
    public static $cache_key_is_active = 'log_balance:is_active';

    protected $fillable = [
        'telegram_chat_id',
        'type',
        'amount',
        'created_at',
    ];

    protected $table = 'log_balance';

    public static function add($fields)
    {
        $key = \App\Models\LogBalance::$cache_key;

        // список всех индексов
        $list = Cache::get($key);
        $index = (int)(time() / 100);
        $key_index = $key . '_' . $index;

        if (Arr::has($list, $index)) {
            $rows = Cache::get($key_index);

        } else {
            $rows = [];
            $list[] = $index;
            Cache::put($list, $key);
        }

        $rows[] = [
            $fields['telegram_chat_id'],
            $fields['created_at'],
            $fields['type'],
            $fields['amount'],
        ];
        Cache::put($rows, $key_index);
    }

}

