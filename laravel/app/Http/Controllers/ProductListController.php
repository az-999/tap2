<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\VarDumper\VarDumper;

class ProductListController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }

    public function buy(Request $request)
    {
        $fields = $request->validate([
            'id' => ['required'],
        ]);
        $id = $fields['id'];
        $product = config('app.product-list.'.$id);
        $price = $product['price'];
        $user = \App\Http\Middleware\FarmAuth::$user;

        if (bccomp($user->balance, $price) < 1) {
            return response()->json([
                'code'     => 400,
                'message'  => 'Недостаточно денег',
            ], 400);
        }
        $num = substr($id,1);
        if ($user->active_booster > $num) {
            return response()->json([
                'code'     => 401,
                'message'  => 'Нельзя купить меньший буст',
            ], 400);
        }
        if ($user->active_booster == $num) {
            return response()->json([
                'code'     => 402,
                'message'  => 'У вас уже есть этот буст',
            ], 400);
        }

        $user->active_booster = substr($id, 1);
        $user->active_booster_start_at = time();
        $user->active_booster_finish_at = time() + $product['length'] * 60*60*24;

        // Списываю деньги
        $user->balanceSub($product['price'], LogBalance::TYPE_BOOST);

        return response()->json([
            'id'        => $id,
            'start_at'  => $user->active_booster_start_at,
            'finish_at' => $user->active_booster_finish_at,
            'price'     => $product['price'],
            'balance'   => $user->balance,
        ]);
    }

    public function delete(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        if (!$user->active_booster) {
            return response()->json([
                'code'     => 400,
                'message'  => 'Нет продукта',
            ], 400);
        }

        $user->active_booster = null;
        $user->save();

        return response()->json(['code' => 200]);
    }

}
