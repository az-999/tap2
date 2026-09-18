<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

/**
 * Stake model
 * @property int    $id
 * @property int    $tg_id
 * @property int    $lootbox_id
 * @property string $amount
 * @property string $out_amount
 * @property int    $mint_count
 * @property int    $duration
 * @property int    $max_claims
 * @property int    $claims
 * @property string $address
 * @property string $owner
 * @property string $txid
 * @property int    $status
 * @property int    $created_at
 * @property int    $next_claim
 * @property int    $last_claim
 * @property int    $finished_at
 * @property int    $end_time
 * @property string $error
 */
class Stake extends Model
{
    use HasFactory;

    protected $fillable = [
        'tg_id',
        'lootbox_id',
        'amount',
        'out_amount',
        'mint_count',
        'duration',
        'max_claims',
        'claims',
        'address',
        'owner',
        'txid',
        'status',
        'created_at',
        'next_claim',
        'last_claim',
        'finished_at',
        'end_time',
        'error',
    ];

    protected $table = 'stake';
    public $timestamps = false;

    const STATUS_CREATED = 0;
    const STATUS_ACTIVE = 1;
    const STATUS_CLOSED = 2;
    const STATUS_ERROR = 3;
    const STATUS_CLAIMED = 4;


    public static function listActiveForUser($id, $offset, $count)
    {
        $query = self::where('status', '!=', self::STATUS_CREATED)->
                        where('status', '!=', self::STATUS_ERROR)->
                        where('status', '!=', self::STATUS_CLOSED)->
                        where('tg_id', $id);

        $total = $query->count();
        $list = $query->orderBy('created_at', 'desc')->offset($offset)->limit($count)->get();
        return [
            'list' => $list,
            'total' => $total,
        ];
    }
}
