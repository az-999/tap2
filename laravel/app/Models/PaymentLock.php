<?php


namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int $id
 * @property int $tg_id
 * @property int $user_nft_id
 * @property int $amount
 * @property int $created_at
 */
class PaymentLock extends Model
{
    use HasFactory;


    protected $table = 'payment_lock';

    protected $fillable = [
        'tg_id',
        'user_nft_id',
        'amount',
    ];

    public $timestamps = false;

    public static function getUncommited()
    {
        return self::where('created_at', '<', date('Y-m-d H:i:s', time() - 1800))->get(); // 30 minutes
    }
}
