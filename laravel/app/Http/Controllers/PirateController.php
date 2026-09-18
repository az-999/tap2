<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\NftHistory;
use App\Models\NftSale;
use App\Models\PirateQueue;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\Captcha;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 */
class PirateController extends Controller
{
    public function info(Request $request)
    {
        $data = [];
        $data = \App\Http\Controllers\StartController::setPirate($data);

        return response()->json($data);
    }

    public function start(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        if ($user->black_metka_count == 0) {
            return response()->json([
                'code'    => 400,
                'message' => 'You haven\'t bought a black label yet',
            ], 400);
        }
        $black_metka_period = config('app.pirate.black_metka_period');
        $user->black_metka_finish_at = time() + $black_metka_period;


        $user->black_metka_grant = 0;
        $user->save();

        return response()->json([
            'black_metka_start_at'  => $user->black_metka_finish_at - $black_metka_period,
            'black_metka_finish_at' => $user->black_metka_finish_at,
        ]);
    }

    public function ofertaAccept(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $user->star_wars_oferta = 1;
        $user->balanceAdd(1000000000, LogBalance::TYPE_PIRATE_GRANT);

        return response()->json([
            'balance'  => $user->balance,
        ]);
    }

    public function finish(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $wallet = $user->token;

        if ($user->black_metka_finish_at > time() and $user->black_metka_grant > 0) {
            return response()->json([
                'code'    => 400,
                'message' => 'The mission is not over yet',
            ], 400);
        }

        $grant = $user->black_metka_grant  * 1000000;

        $user->black_metka_count_grant_all += $grant;
        $user->black_metka_finish_at = null;
        $user->black_metka_grant = 0;
        $user->balanceAdd($grant, LogBalance::TYPE_PIRATE_GRANT);

        return response()->json([
            'balance'                     => $user->balance,
            'grant'                       => $grant,
            'black_metka_count_grant_all' => $user->black_metka_count_grant_all,
        ]);
    }


    public function buy(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $params = $request->validate([
            'address'    => ['string', 'required'],
            'txid'       => ['string', 'required'],
            'product_id' => ['integer', 'required'],
            'amount'     => ['integer', 'required'],
        ]);

        /** @var \App\Models\PirateQueue $queueItem */
        $queueItem = PirateQueue::query()->create([
            'tg_id'      => $user->chat_id,
            'address'    => Address::parse($params['address'])->toString(false),
            'txid'       => $params['txid'],
            'product_id' => $params['product_id'],
            'amount'     => $params['amount'],
            'created_at' => time(),
            'status'     => 0,
        ]);


        $ret = \App\Console\Commands\pirate_queue::check($queueItem, TonApi::getInstance());

        return response()->json([
            'request_id' => $queueItem->id,
        ]);
    }

    public function buyInfo(Request $request)
    {
        $params = $request->validate([
            'request_id' => ['integer', 'required'],
        ]);

        /** @var \App\Models\PirateQueue $queueItem */
        $queueItem = PirateQueue::query()->find($params['request_id']);

        return response()->json([
            'request' => $queueItem,
        ]);
    }

    public static function getMaxLevelShip($wallet)
    {
        $data = \App\Service\TonApi::getInstance()->get('v2/accounts/' . $wallet . '/nfts', [
            'collection'         => config('app.ship_kraft_collection'),
            'limit'              => 1000,
            'offset'             => 0,
            'indirect_ownership' => 'false',
        ]);

        $max = 0;
        foreach ($data['nft_items'] as $item) {
            if ($item['metadata']['ship_level'] > $max) {
                $max = $item['metadata']['ship_level'];
            }
        }

        return $max;
    }
}
