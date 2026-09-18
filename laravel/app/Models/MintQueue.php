<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * Mint Queue
 *
 * @property int    $id
 * @property int    $tg_id
 * @property int    $nft_id
 * @property int    $item_id
 * @property string $address        Адрес получателя base58
 * @property int    $amount
 * @property string $txid           hex
 * @property string $query_id
 * @property string $created_at
 * @property string $verified_at
 * @property string $completed_at
 * @property int    $status
 * @property string $error
 */
class MintQueue extends Model
{
    use HasFactory;

    const STATUS_PENDING = 0;
    const STATUS_VERIFIED = 1;
    const STATUS_ISSUED = 2;
    const STATUS_COMPLETED = 3;
    const STATUS_ERROR = 4;

    protected $table = 'mint_queue';

    protected $fillable = [
        'tg_id',
        'nft_id',
        'item_id',
        'address',
        'amount',
        'txid',
        'query_id',
        'created_at',
        'verified_at',
        'completed_at',
        'status',
        'error',
    ];

    public $timestamps = false;

    public static function listUnverified() {
        return self::where('status', self::STATUS_PENDING)->orderBy('id', 'asc')->limit(200)->get();
    }

    public static function listVerified() {
        return self::where('status', self::STATUS_VERIFIED)->orderBy('id', 'asc')->limit(200)->get();
    }

    public static function listIssued() {
        return self::where('status', self::STATUS_ISSUED)->orderBy('id', 'asc')->limit(200)->get();
    }
}
