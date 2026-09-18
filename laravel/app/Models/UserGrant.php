<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    tg_id
 * @property int    author_id
 * @property int    amount
 * @property int    time
 * @property string comment
 */
class UserGrant extends Model
{
    use HasFactory;

    protected $table = 'user_grant';

    public $timestamps = false;

    protected $fillable = ['tg_id', 'author_id', 'amount', 'time', 'comment'];
}

