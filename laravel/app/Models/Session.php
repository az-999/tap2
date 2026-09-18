<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int start_at
 * @property int finish_at
 * @property int status
 * @property int user_telegram_id
 * @property int amount             сколько пользователь получил по факту завершения сессии
 * @property int taps
 * @property int moon_time
 * @property int moon_claimed
 *
 */
class Session extends Model
{
    use HasFactory;

    public $timestamps = false;

    const STATUS_IN_PROGRESS = 1;
    const STATUS_FINISHED = 2;
    const STATUS_CLOSED = 3;

    public $statusList = [
        self::STATUS_IN_PROGRESS => 'inProgress',
        self::STATUS_FINISHED    => 'finished',
    ];

    protected $fillable = [
        'start_at',
        'finish_at',
        'status',
        'user_telegram_id',
        'amount',
        'taps',
        'moon_time',
        'moon_claimed',
    ];

    protected $table = 'session';
}
