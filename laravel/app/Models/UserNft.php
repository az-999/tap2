<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int $id
 * @property int $tg_id
 * @property int $nft_id
 * @property string $wallet
 * @property bool $commit
 * @property int $created_at
 * @property int $tries
 * @property bool $is_send
 */
class UserNft extends Model
{
    use HasFactory;


    protected $table = 'user_nft';

    protected $fillable = [
        'tg_id',
        'nft_id',
        'wallet',
        'commit',
        'created_at',
        'tries',
        'is_send'
    ];

    public $timestamps = false;

    public static function getUserNfts($tg_id)
    {
        $rows = UserNft::where('tg_id', $tg_id)->where('commit', true)->where('nft_id', '<', 6)->get()->toArray();
        return BaseArrayHelper::map($rows, 'nft_id', function ($i) { return $i;});
    }

    public static function getUncommited()
    {
        $rows = UserNft::where('commit', false)->get()->toArray();
        return BaseArrayHelper::map($rows, 'wallet', function ($i) { return $i;});
    }

    public static function commit($id)
    {
        UserNft::where('id', $id)->update(['commit' => true]);
    }

    public static function incTries($id)
    {
        UserNft::where('id', $id)->increment('tries');
    }

    public static function totalLocked($id)
    {
        return self::where('nft_id', $id)->where('commit', false)->count();
    }

    public static function clearOutdated()
    {
        UserNft::where('commit', false)->where('created_at', '<', date('Y-m-d H:i:s', time() - 1800))->delete();
    }

    public static function isWalletExists($wallet)
    {
        return self::where('wallet', $wallet)->where('commit', false)->exists();
    }
}
