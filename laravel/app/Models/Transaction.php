<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property float  amount
 * @property string hash
 * @property int    from
 * @property int    to
 * @property int    created_at
 * @property int    updated_at
 */
class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'hash',
        'from',
        'to',
    ];

    protected $table = 'transaction';
}
