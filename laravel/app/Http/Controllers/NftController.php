<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\PaymentLock;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BaseVarDumper;
use App\Service\BuyNft;
use App\Service\TelegramLogger;
use App\Service\TonApi;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class NftController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {

    }

    public function index(Request $request)
    {
        $nftList = config('app.nft-list');
        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $nfts = UserNft::getUserNfts($user1->chat_id);
        foreach ($nftList as $key => $nft) {
            $nftList[$key]['can_buy'] = $nft['id'] < 6 ? !isset($nfts[$nft['id']]) : true;
            $nftList[$key]['is_soldout'] = isset($nftList[$key]['is_soldout']) ? $nftList[$key]['is_soldout'] : Cache::get('nft_soldout_'.$nft['id'], false);
        }

        usort($nftList, function ($a, $b) {
            if ($a['nft_id'] == $b['nft_id']) {
                if ($a['item_id'] == $b['item_id']) {
                    return 0;
                }

                return ($a['item_id'] < $b['item_id']) ? 1 : -1;
            }

            return ($a['nft_id'] < $b['nft_id']) ? 1 : -1;
        });

        return response()->json($nftList);
    }

    public function transactionStart(Request $request)
    {
        $fields = $request->validate([
            'id'        => ['required'],
            'last_id'   => ['required'],
        ]);

        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        $id = $fields['id'];
        $last_id = $fields['last_id'];
        if (!isset($rows[$id])) {
            return response()->json([
                'code'     => 404,
                'message'  => 'Не найден такой NFT',
            ], 400);
        }

        if ($id < 6 && UserNft::where('tg_id', $user1->chat_id)->where('nft_id', $id)->exists()) {
            return response()->json([
                'code'     => 403,
                'message'  => 'У вас уже есть этот NFT',
            ], 400);
        }

        $nft = $rows[$id];
        $price = $nft['price'];
        Cache::put('nft_soldout_' . $id, $last_id >= $nft['total_supply']);

        if ($user1->balance < $price) {
            return response()->json([
                'code'     => 400,
                'message'  => 'Недостаточно денег',
            ], 400);
        }
        if ($user1->balance_block > 0) {
            return response()->json([
                'code'     => 401,
                'message'  => 'У вас уже висит заблоченная сумма в транзакции',
            ], 400);
        }

        $user1->current_nft_id_farming = $id;
        $user1->balance_block = $price;
        $user1->balanceSub($price,LogBalance::TYPE_NFT_BLOCK);

        UserNft::create([
            'tg_id'    => $user1->chat_id,
            'nft_id'   => $id,
        ]);

        return response()->json([
            'balance'  => $user1->balance,
        ]);
    }

    public function transactionFinish(Request $request)
    {
        $fields = $request->validate([
            'id' => ['required'],
        ]);


        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        $id = $fields['id'];
        if (!isset($rows[$id])) {
            return response()->json([
                'code'     => 404,
                'message'  => 'Не найден такой NFT',
            ], 400);
        }

        $user1->current_nft_id_farming = null;
        $user1->balance_block = 0;
        $user1->save();

        return response()->json([
            'balance'  => $user1->balance,
        ]);
    }

    public function transactionReject(Request $request)
    {
        $fields = $request->validate([
            'id' => ['required'],
        ]);

        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        $id = $fields['id'];
        if (!isset($rows[$id])) {
            return response()->json([
                'code'     => 404,
                'message'  => 'Не найден такой NFT',
            ], 400);
        }
        $nft = $rows[$id];
        $price = $nft['price'];

        $user1->current_nft_id_farming = null;
        $user1->balance_block = 0;
        $user1->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);

        UserNft::where('tg_id', $user1->chat_id)->where('nft_id', $id)->delete();

        return response()->json([
            'balance'  => $user1->balance,
        ]);
    }


    public function onTxSuccess(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => ['required'],
            'txid' => ['required'],
            'address' => ['required'],
            'lock_id' => ['required'],
        ]);

        Log::info('NftController::onTxSuccess', $fields);
        $rows = config('app.nft-list');
        $nftList = BaseArrayHelper::map($rows, 'id', function ($i) { return $i;});
        if (!isset($nftList[$fields['nft_id']])) {
            return response()->json(['code' => 404, 'message' => 'Не найден такой NFT'], 400);
        }

        $id = $fields['nft_id'];
        $nft = $nftList[$fields['nft_id']];
        $user = \App\Http\Middleware\FarmAuth::$user;
        Log::info('NftController::onTxSuccess: check entry', ['tg_id' => $user->chat_id, 'nft_id' => $fields['nft_id']]);
        $locked = PaymentLock::where('tg_id', $user->chat_id)->where('id', $fields['lock_id'])->first();
        if ($locked)  {
            $entry = UserNft::where('tg_id', $user->chat_id)->where('id', $locked->user_nft_id)->first();
            if ($entry){
                $entry->is_send = 1;
                $entry->save();
            }
            $locked->delete();
            Log::info('NftController::onTxSuccess: unlock', ['tg_id' => $user->chat_id, 'nft_id' => $fields['nft_id']]);
        }

        $comission = config('app.nft-price');
        if ($nft['nft_id'] > 6) {
            $comission = $nft['comission'];
        }

        $locked = PaymentLock::where('tg_id', $user->chat_id)->where('user_nft_id', $entry->id)->first();
        if ($locked) {
            $locked->delete();
            Log::info('NftController::onTxSuccess: unlock', ['tg_id' => $user->chat_id, 'nft_id' => $fields['nft_id']]);
        } else {
            Log::warning('NftController::onTxSuccess: unlock not found', ['tg_id' => $user->chat_id, 'nft_id' => $fields['nft_id']]);
        }

        $qi = MintQueue::create([
            'tg_id'    => $user->chat_id,
            'nft_id'   => $nft['nft_id'],
            'item_id'  => $nft['item_id'],
            'address'  => Address::parse($fields['address'])->toString(true, true, false, false),
            'amount'   => $comission,
            'txid'     => $fields['txid'],
            'query_id' => 0,
            'status'   => MintQueue::STATUS_PENDING,
        ]);

        Log::info('NftController::onTxSuccess: send', ['entry' => $entry->toArray(), 'qi' => $qi->toArray()]);
        return response()->json([
            'verify'                 => false,
            'current_nft_id_farming' => $user->current_nft_id_farming,
            'status'                 => (!$entry->is_send && $entry->tries == 0) ? 'wait-tx' : ($entry->tries > 0 ? 'issue' : 'pending'),
            'address'                => config('app.wallet'),
            'price'                  => $comission,
            'balance'                => $user->balance,
            'balance_block'          => $user->balance_block,
        ]);
    }

    public function onTxError(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => ['required'],
            'lock_id' => ['required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        $id = $fields['nft_id'];
        if (!isset($rows[$id])) {
            return response()->json([
                'code'     => 404,
                'message'  => 'Не найден такой NFT',
            ], 400);
        }

        $nft = $rows[$id];
        $price = $nft['price'];
        $locked = PaymentLock::where('tg_id', $user->chat_id)->where('id', $fields['lock_id'])->first();
        if ($locked) {
            $entry = UserNft::where('id', $locked->user_nft_id)->first();
            if ($entry) {
                if (!$entry->is_send) {
                    if ($locked->amount > 0) $user->balanceAdd($price, LogBalance::TYPE_NFT_REJECT);
                    $entry->delete();
                    $locked->delete();
                }
            }
        }

        return response()->json([
            'status'    => 'rejected',
            'balance'   => $user->balance,
            'balance_block' => $user->balance_block,
        ]);
    }


    public function checkStatus(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => ['required'],
        ]);
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        $id = $fields['nft_id'];
        if (!isset($rows[$id])) {
            return response()->json([
                'code'     => 404,
                'message'  => 'Не найден такой NFT',
            ], 400);
        }

        $user = \App\Http\Middleware\FarmAuth::$user;
        $elem = UserNft::where('tg_id', $user->chat_id)->where('nft_id', $id)->first();
        if ($elem) {
            return response()->json([
                'id'                   => $elem->nft_id,
                'buy_in_progress'      => !$elem->commit,
                'address'              => $elem->wallet,
                'transaction_sent'     => $elem->is_send > 0,
                'transaction_received' => $elem->tries ? true : false,
                'nft_completed'        => $elem->commit ? true : false,
                'expires_at'           => date('Y-m-d H:i:s', strtotime($elem->created_at) + 1800),
                'balance'              => $user->balance,
            ]);
        }

        return response()->json([
            'id'                => $id,
            'buy_in_progress'   => false,
        ]);
    }

    public function myNfts(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $nfts = UserNft::getUserNfts($user->chat_id);
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});

        $api = new TonApi(true);
        $result = [];
        foreach ($nfts as $nft) {
            if (!isset($rows[$nft['nft_id']])) {
                continue;
            }

            $n = $rows[$nft['nft_id']];
            $items = $api->getNfts($nft['wallet'], $n['address_base58']);
            $nft['price'] = $n['price'];
            $nft['image'] = $n['image'];
            if (!empty($items['nft_items'])) {
                $item = $items['nft_items'][0];
                $nft['index'] = $item['index'];
                $nft['item_address'] = $item['address'];
                $nft['collection_address'] = $n['address_base58'];
                $nft['name'] = $item['metadata']['name'];
            }

            $result[] = $nft;
        }

        return response()->json($result);
    }

    public function getCurrentNft(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $active = UserNft::where('tg_id', $user->chat_id)->where('commit', false)->first();
        if (!$active) {
            return response()->json([
                'exists'        => false,
                'balance'       => $user->balance,
                'balance_block' => $user->balance_block,
                'address'       => config('app.wallet'),
                'price'         => config('app.nft-price'),
                'status'        => 'none',
                'nft_id'        => 0,
                "expires_at"    => '',
            ]);
        }

        return response()->json([
            'exists'        => true,
            'status'        => (!$active->is_send && $active->tries == 0) ? 'wait-tx' : ($active->tries > 0 ? 'issue' : 'pending'),
            'address'       => config('app.wallet'),
            'price'         => config('app.nft-price'),
            'balance'       => $user->balance,
            'nft_id'        => $active->nft_id,
            'balance_block' => $user->balance_block,
            "expires_at"    => date('Y-m-d H:i:s', strtotime($active->created_at) + 600),
        ]);
    }

    public function onTxAccepted(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => ['required'],
            'item_id' => ['required'],
            'address' => ['required'],
            'txid' => ['required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        MintQueue::create([
            'tg_id'   => $user->chat_id,
            'nft_id'  => $fields['nft_id'],
            'item_id' => $fields['item_id'],
            'address' => $fields['address'],
            'amount'  => config('app.nft-price'),
            'txid'    => $fields['txid'],
            'status'  => MintQueue::STATUS_PENDING,
        ]);

        return response()->json(['status' => 'ok']);
    }

    public function getMintStatus(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => ['required'],
        ]);

        $rows = config('app.nft-list');
        $nftList = BaseArrayHelper::map($rows, 'id', function ($i) { return $i;});
        if (!isset($nftList[$fields['nft_id']])) {
            return response()->json(['code' => 404, 'message' => 'Не найден такой NFT'], 400);
        }

        $nft = $nftList[$fields['nft_id']];
        $userId = \App\Http\Middleware\FarmAuth::$user->chat_id;
        $entry = MintQueue::where('tg_id', $userId)
            ->where('nft_id', $nft['nft_id'])
            ->where('item_id', $nft['item_id'])
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$entry) {
            return response()->json(['code' => 404, 'message' => 'Не найден такой NFT'], 400);
        }

        return response()->json(array_merge($entry->toArray(), ['balance' => \App\Http\Middleware\FarmAuth::$user->balance]));
    }
}
