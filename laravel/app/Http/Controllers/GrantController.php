<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserGrant;
use App\Models\UserNft;
use App\Models\UserProfit;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BaseVarDumper;
use App\Service\BuyNft;
use App\Service\TelegramLogger;
use App\Service\TonApi;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class GrantController extends Controller
{


    public function index(Request $request)
    {
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $request1 = UserGrant::query()
            ->where('tg_id', $user1->chat_id)
            ->select(['id', 'amount', 'comment'])
            ->get();

        return response()->json($request1);
    }


    public function accept(Request $request)
    {
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'request_id' => 'required|string',
        ]);
        $ids = explode(',', $fields['request_id']);
        foreach ($ids as $id) {
            /** @var \App\Models\UserGrant $request */
            $request1 = UserGrant::query()->find($id);
            $log = $user1->balanceAdd($request1->amount, LogBalance::TYPE_MANUAL);

            UserProfit::create([
                'tg_id'     => $request1['tg_id'],
                'author_id' => $request1['author_id'],
                'amount'    => $request1['amount'],
                'time'      => $request1['time'],
                'comment'   => $request1['comment'],
                'log_id'    => is_null($log) ? null : $log->id,
            ]);
            $request1->delete();
        }

        return response()->json([
            'balance' => $user1->balance,
        ]);
    }

    public function reject(Request $request)
    {
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'request_id' => 'required|string',
        ]);
        $ids = explode(',', $fields['request_id']);
        foreach ($ids as $id) {
            /** @var \App\Models\UserGrant $request */
            $request1 = UserGrant::query()->find($id);
            $request1->delete();
        }

        return response()->json([
            'balance' => $user1->balance,
        ]);
    }

}
