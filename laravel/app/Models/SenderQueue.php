<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int tg_id
 * @property int send_id
 *
 */
class SenderQueue extends Model
{
    use HasFactory;
//    protected $connection = 'mysql_log';

    public $timestamps = false;

    protected $fillable = [
        'tg_id',
        'send_id',
    ];

    protected $table = 'sender_queue';
}
