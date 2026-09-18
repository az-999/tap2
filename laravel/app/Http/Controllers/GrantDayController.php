<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\VarDumper\VarDumper;

class GrantDayController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }

    public function claim(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $time = time();

        $data = [
            1 => 400000,
            2 => 500000,
            3 => 600000,
            4 => 700000,
            5 => 800000,
            6 => 900000,
            7 => 1000000,

            8 => 400000,
            9 => 500000,
            10 => 600000,
            11 => 700000,
            12 => 800000,
            13 => 900000,
            14 => 5000000,

            15 => 400000,
            16 => 500000,
            17 => 600000,
            18 => 700000,
            19 => 800000,
            20 => 900000,
            21 => 7000000,

            22 => 400000,
            23 => 500000,
            24 => 600000,
            25 => 700000,
            26 => 800000,
            27 => 900000,
            28 => 100000000,

            29 => 400000,
            30 => 500000,
            31 => 600000,
            32 => 700000,
            33 => 800000,
            34 => 900000,
            35 => 1000000,

            36 => 400000,
            37 => 500000,
            38 => 600000,
            39 => 700000,
            40 => 800000,
            41 => 900000,
            42 => 5000000,

            43 => 400000,
            44 => 500000,
            45 => 600000,
            46 => 700000,
            47 => 800000,
            48 => 900000,
            49 => 7000000,

            50 => 400000,
            51 => 500000,
            52 => 600000,
            53 => 700000,
            54 => 800000,
            55 => 900000,
            56 => 100000000,

            57 => 400000,
            58 => 500000,
            59 => 600000,
            60 => 700000,
            61 => 800000,
            62 => 900000,
            63 => 1000000,

            64 => 400000,
            65 => 500000,
            66 => 600000,
            67 => 700000,
            68 => 800000,
            69 => 900000,
            70 => 5000000,

            71 => 400000,
            72 => 500000,
            73 => 600000,
            74 => 700000,
            75 => 800000,
            76 => 900000,
            77 => 7000000,

            78 => 400000,
            79 => 500000,
            80 => 600000,
            81 => 700000,
            82 => 800000,
            83 => 900000,
            84 => 100000000,
        ];

        if (is_null($user->day_grant_first)) {
            $user->day_grant_first = time();
            $user->day_grant_day = 1;
        } else {
            $start = $user->day_grant_first + $user->day_grant_day * 60 * 60 * 24;
            if ($time < $start) {
                return response()->json([
                    'code'     => 400,
                    'message'  => 'Нельзя забрать награду ранее суток',
                ], 400);
            }
            if ($time > $start + 60 * 60 * 24 * 3) {
                $user->day_grant_first = null;
                $user->day_grant_day = null;
                $user->save();

                return response()->json([
                    'code'     => 403,
                    'message'  => 'Нельзя забрать награду позже 3 суток, ваш счетчик обнулен',
                ], 400);
            }
            $user->day_grant_day++;
        }
        $i = $user->day_grant_day % 84;
        if ($i == 0) $i = 84;
        $claim = $data[$i];

        $user->balanceAdd($claim, LogBalance::TYPE_DAYS);

        return response()->json([
            'balance'         => $user->balance,
            'day_grant_first' => $user->day_grant_first,
            'day_grant_day'   => $user->day_grant_day,
        ]);
    }

    public static function calcAmount($days)
    {
        $data = [
            1 => 400000,
            2 => 500000,
            3 => 600000,
            4 => 700000,
            5 => 800000,
            6 => 900000,
            7 => 1000000,

            8 => 400000,
            9 => 500000,
            10 => 600000,
            11 => 700000,
            12 => 800000,
            13 => 900000,
            14 => 5000000,

            15 => 400000,
            16 => 500000,
            17 => 600000,
            18 => 700000,
            19 => 800000,
            20 => 900000,
            21 => 7000000,

            22 => 400000,
            23 => 500000,
            24 => 600000,
            25 => 700000,
            26 => 800000,
            27 => 900000,
            28 => 100000000,

            29 => 400000,
            30 => 500000,
            31 => 600000,
            32 => 700000,
            33 => 800000,
            34 => 900000,
            35 => 1000000,

            36 => 400000,
            37 => 500000,
            38 => 600000,
            39 => 700000,
            40 => 800000,
            41 => 900000,
            42 => 5000000,

            43 => 400000,
            44 => 500000,
            45 => 600000,
            46 => 700000,
            47 => 800000,
            48 => 900000,
            49 => 7000000,

            50 => 400000,
            51 => 500000,
            52 => 600000,
            53 => 700000,
            54 => 800000,
            55 => 900000,
            56 => 100000000,

            57 => 400000,
            58 => 500000,
            59 => 600000,
            60 => 700000,
            61 => 800000,
            62 => 900000,
            63 => 1000000,

            64 => 400000,
            65 => 500000,
            66 => 600000,
            67 => 700000,
            68 => 800000,
            69 => 900000,
            70 => 5000000,

            71 => 400000,
            72 => 500000,
            73 => 600000,
            74 => 700000,
            75 => 800000,
            76 => 900000,
            77 => 7000000,

            78 => 400000,
            79 => 500000,
            80 => 600000,
            81 => 700000,
            82 => 800000,
            83 => 900000,
            84 => 100000000,
        ];
        $sum = 0;

        for ($i = 1; $i <= $days; $i++) {
            if ($i > 84) {
                $j = $i % 84;
                if ($j == 0) $j = 84;
            } else {
                $j = $i;
            }

            $sum += $data[$j];
        }

        return $sum;
    }

    public function prize(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        if ($user->day_grant_day >= ($user->day_grant_prize_round * 84) + 84) {
            $n = (int)(($user->day_grant_day - ($user->day_grant_prize_round * 84)) / 84) ;
            $user->day_grant_prize_round += $n;
            $user->balanceAdd(10000000000 * $n, LogBalance::TYPE_DAYS_PRIZE);
        } else {
            return response()->json([
                'code'     => 403,
                'message'  => 'You can\'t pick up the reward ahead of time',
            ], 400);
        }

        return response()->json([
            'balance' => $user->balance,
        ]);
    }

    public function reset(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $user->day_grant_first = null;
        $user->day_grant_day = null;
        $user->save();

        return response()->json([]);
    }


}
