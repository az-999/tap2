<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use App\Service\TelegramLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Support\Collection;

class WalletController extends Controller
{


    public function index(Request $request)
    {
        /** @var UserTelegram  $user1 */
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'address' => ['required', 'string'],
        ]);

        if ($fields['address'] == '-') {
            $user1->token = null;
            $user1->save();

            return response()->json([
                'code'     => 200,
            ]);
        }


        $user1->token = $fields['address'];
        $res = $user1->save();
        Log::info($res);
        Log::info($user1);
        Log::info($fields);

        $u = UserTelegram::query()
            ->select(['chat_id', 'username', 'name_first', 'name_last'])
            ->where('token', $fields['address'])
            ->where('chat_id','!=', $user1->chat_id)
            ->get()
            ->toArray()
        ;

        if (count($u) > 0) {
            return response()->json([
                'code'     => 401,
                'message'  => 'this wallet has already exist',
                'user_list' => $u,
                'res'       => $res,
                'fields'    => $fields,
                'user'      => $user1,
            ], 400);
        }


        return response()->json([
            'code'     => 200,
        ]);
    }

}
