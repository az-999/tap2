<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class FriendsController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }

    public function index(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'limit'  => 'required|integer',
            'offset' => 'nullable|integer',
        ]);

        $limit = 20;
        if (isset($fields['limit'])) $limit = $fields['limit'];
        $offset = 0;
        if (isset($fields['offset'])) $offset = $fields['offset'];

        $users = UserTelegram::query()
            ->where('ref_id', $user->chat_id)
            ->select('chat_id', 'name_first', 'name_last', 'ref_balance')
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->toArray()
        ;

        $ret = [
            'list' => $users,
        ];

        if ($offset == 0) {
            $ret['count'] = UserTelegram::query()->where('ref_id', $user->chat_id)->count();
            $ret['friend_claim'] = UserTelegram::query()->where('ref_id', $user->chat_id)->sum('ref_balance');
        }

        return response()->json($ret);
    }

    public function claim(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $sum = UserTelegram::where('ref_id', $user->chat_id)->sum('ref_balance');

        $user->balanceAdd($sum, LogBalance::TYPE_FRIEND);

        // получить ids откуда вычистить рефку
        $rows = DB::table('user_telegram')->select('id')->where('ref_id', $user->chat_id)->get()->toArray();
        foreach ($rows as $o) {
            Cache::forget("user." . $o->id);
        }
        UserTelegram::query()->where('ref_id', $user->chat_id)->update(['ref_balance' => 0]);

        return response()->json([
            'balance' => $user->balance,
            'sum'     => $sum,
        ]);
    }

}
