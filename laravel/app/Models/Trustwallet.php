<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int    tg_id
 * @property string address
 */
class Trustwallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'tg_id',
        'address',
    ];

    protected $table = 'trustwallet';

    public $timestamps = false;
}
