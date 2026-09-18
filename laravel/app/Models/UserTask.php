<?php

namespace App\Models;

use App\Service\BaseVarDumper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int chat_id
 * @property int task_id
 * @property int is_claimed
 * @property int claimed_at
 */
class UserTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'task_id',
        'is_claimed',
        'claimed_at',
    ];

    protected $table = 'user_task';

    public $timestamps = false;
}

