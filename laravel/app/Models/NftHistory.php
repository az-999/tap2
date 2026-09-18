<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int $id
 * @property int $nft_id
 * @property string $nft_address
 * @property int $action
 * @property string $to_address
 * @property string $from_address
 * @property string $price
 */
class NftHistory extends Model
{
    use HasFactory;

    const ACT_PUT_ON_MARKET = 0;
    const ACT_SELL = 1;
    const ACT_CANCEL_SALE = 2;
    const ACT_PRICE_CHANGE = 3;


    protected $table = 'nft_history';

    protected $fillable = [
        'nft_id',
        'nft_address',
        'action',
        'to_address',
        'from_address',
        'txid',
        'price',
    ];

    public $timestamps = false;

    static public function listByAddress($address, $next, $limit)
    {
        return self::where('nft_address', $address)->where('id', '>', $next)->orderBy('id', 'asc')->limit($limit)->get()->toArray();
    }
}
