<?php


namespace App\Service;


use App\Models\MintQueue;
use App\Models\NftSale;
use App\Models\UserTelegram;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

/**
 */
class Stat
{
    public static function getInstance($fields = [])
    {
        $c = new self();
        foreach ($fields as $field => $value) {
            $c->$field = $value;
        }

        return $c;
    }

    public static function stat_friends($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(ref_count) as s1')
            ->whereRaw('ref_id in (' . join(',', $ids) . ')')
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_mint_ship_details($ids)
    {
        $idsList = self::getUserIds($ids);

        $c = MintQueue::query()
            ->whereIn('tg_id', $idsList)
            ->where('nft_id', 6)
            ->whereIn('item_id', [1,2,3,4,5])
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->count();

        return $c;
    }

    public static function stat_mint_ship_details_ton($ids)
    {
        $idsList = self::getUserIds($ids);

        $first = MintQueue::query()
            ->selectRaw('sum(amount) as s1')
            ->whereIn('tg_id', $idsList)
            ->where('nft_id', 6)
            ->whereIn('item_id', [1,2,3,4,5])
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'] / 1000000000;
    }

    public static function stat_ship_craft_count($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(ship_craft_count) as s1')
            ->whereIn('ref_id', $ids)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_ship_upgrade_count($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(ship_upgrade_count) as s1')
            ->whereIn('ref_id', $ids)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_ship_union_count($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(ship_union_count) as s1')
            ->whereIn('ref_id', $ids)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_user_black_dot($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(black_metka_count) as s1')
            ->whereIn('ref_id', $ids)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_user_shield($ids)
    {
        $first = UserTelegram::query()
            ->selectRaw('sum(shield_count) as s1')
            ->whereIn('ref_id', $ids)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_market_nft_count($ids)
    {
        $idsList = self::getUserIds($ids);

        $count = NftSale::query()
            ->whereIn('tg_id', $idsList)
            ->where('status', 2)
            ->count();

        return $count;
    }

    public static function stat_market_nft_ton($ids)
    {
        $idsList = self::getUserIds($ids);

        $first = NftSale::query()
            ->selectRaw('sum(sale_price) as s1')
            ->whereIn('tg_id', $idsList)
            ->where('status', 2)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'];
    }

    public static function stat_bumpstore_pass_count($ids)
    {
        $idsList = self::getUserIds($ids);

        $c = MintQueue::query()
            ->whereIn('tg_id', $idsList)
            ->where('nft_id', 7)
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->count();

        return $c;
    }

    public static function stat_bumpstore_pass_ton($ids)
    {
        $idsList = self::getUserIds($ids);

        $first = MintQueue::query()
            ->selectRaw('sum(amount) as s1')
            ->whereIn('tg_id', $idsList)
            ->where('nft_id', 7)
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->first();

        return is_null($first['s1']) ? 0 : $first['s1'] / 1000000000;
    }

    private static function getUserIds($ids)
    {
        $json = json_encode($ids);
        $sha256 = hash('sha256', $json, false);
        $v = Cache::get($sha256, null);
        if (is_null($v)) {
            $v = UserTelegram::query()->whereIn('ref_id', $ids)->pluck('chat_id');
            Cache::put($sha256, $v);
        }

        return $v;
    }
}
