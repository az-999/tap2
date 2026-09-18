<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 *
 * @property int    id
 * @property int    tg_id
 * @property int    product_id      идентификатор продукта 1 - черная метка, 2 - защита
 * @property string address        Адрес получателя hex
 * @property int    amount
 * @property string txid           hex
 * @property string created_at
 * @property string verified_at
 * @property int    status
 * @property string error
 */
class PirateQueue extends Model
{
    use HasFactory;

    const STATUS_PENDING = 0;
    const STATUS_VERIFIED = 1;
    const STATUS_ISSUED = 2;
    const STATUS_COMPLETED = 3;
    const STATUS_ERROR = 4;

    const PRODUCT_BLACK_METKA = 1;
    const PRODUCT_GREEN_METKA = 2;


    protected $table = 'pirate_queue';

    protected $fillable = [
        'tg_id',
        'product_id',
        'address',
        'amount',
        'txid',
        'created_at',
        'verified_at',
        'status',
        'error',
    ];

    public $timestamps = false;

}
