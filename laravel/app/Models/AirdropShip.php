<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    tg_id
 * @property int    created_at
 * @property text   txid
 */
class AirdropShip extends Model
{
    use HasFactory;

    protected $fillable = [
        'tg_id',
        'created_at',
        'txid',
    ];

    protected $table = 'airdrop_ship';

    public $timestamps = false;
}
