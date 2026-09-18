<?php

namespace App\Models;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 * @property int $id
 * @property string $address
 * @property string $from
 * @property string $type
 * @property string $hash
 * @property int $lt
 * @property int $value
 * @property int $fees
 * @property int $locked
 * @property int $income
 * @property int $created_at
 */
class WalletStats extends Model {
    use HasFactory;

    const TYPE_MINT = 'mint';
    const TYPE_BURN = 'burn';
    const TYPE_PAYMENT = 'payment';
    const TYPE_ROLYALTY = 'royalty';
    const TYPE_ROLYALTY_GG = 'royalty_getgems';
    const TYPE_UNKNOWN = 'unknown';

    protected $fillable = [
        'address',
        'from',
        'type',
        'hash',
        'lt',
        'value',
        'fees',
        'locked',
        'income',
        'created_at',
    ];

    protected $table = 'wallet_stats';
    public $timestamps = false;

    public static function getLastTx($address) {
        return self::where('address', $address)->orderBy('lt', 'desc')->first();
    }

    public static function txExists($address, $hash, $lt) {
        return self::where('address', $address)->where('hash', $hash)->where('lt', $lt)->exists();
    }

    // SELECT address, type, SUM(CAST(value AS DOUBLE)/1000000000) as total_value, SUM(CAST(fees AS DOUBLE)/1000000000) as total_fees, SUM(CAST(income AS DOUBLE)/1000000000) as total_income, SUM(CAST(locked AS DOUBLE)/1000000000) as total_locked FROM wallet_stats GROUP BY address, type;
    public static function getStatsSummary() {
        return self::select('address', 'type',
            DB::raw('SUM(CAST(value AS DOUBLE)/1000000000) as total_value'),
            DB::raw('SUM(CAST(fees AS DOUBLE)/1000000000) as total_fees'),
            DB::raw('SUM(CAST(income AS DOUBLE)/1000000000) as total_income'),
            DB::raw('SUM(CAST(locked AS DOUBLE)/1000000000) as total_locked'),
            DB::raw('COUNT(*) as count'))->groupBy('address', 'type')->get()->toArray();
    }

    public static function getBounds() {
        return self::select(DB::raw('MIN(created_at) as date_from, MAX(created_at) as date_to'))->first();
    }
}
