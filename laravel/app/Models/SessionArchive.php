<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int start_at
 * @property int finish_at
 * @property int user_telegram_id
 * @property int amount             сколько пользователь получил по факту завершения сессии
 * @property int taps
 *
 */
class SessionArchive extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'start_at',
        'finish_at',
        'user_telegram_id',
        'amount',
        'taps',
    ];

    protected $table = 'session_archive';
}
