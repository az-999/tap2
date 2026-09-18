<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string content
 *
 */
class Sender extends Model
{
    use HasFactory;

//    protected $connection = 'mysql_log';

    public $timestamps = false;

    protected $fillable = [
        'content',
    ];

    protected $table = 'sender';
}
