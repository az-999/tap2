<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

/**
 * @property int    id
 * @property string message
 * @property int    created_at
 */
class LogError extends Model
{
    use HasFactory;

    protected $connection = 'mysql_log';

    public $timestamps = false;


    protected $fillable = [
        'message',
        'created_at',
    ];

    protected $table = 'log_error';

    public static function add($fields)
    {
        if (is_string($fields)) {
            $fields = [
                'message'    => $fields,
                'created_at' => time(),
            ];
        }
        if (is_array($fields)) {
            if (!isset($fields['created_at'])) {
                $fields['created_at'] = time();
            }
        }

        self::query()->create($fields);
    }

}

