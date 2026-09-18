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
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Support\Collection;

class RatingController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }

    public function index(Request $request)
    {
        /** @var UserTelegram  $user1 */
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        try {
            $rows = Cache::get( '\App\Console\Commands\rating_calculate::getRatingDb:rating10');
            $my_balance = $user1->balance;
            $my_place = Cache::get( '\App\Console\Commands\rating_calculate::getRatingDb:rating');

            $place = '';
            for ($i=0; $i<count($my_place);$i++) {
                if ($i == (count($my_place)-1)) {
                    $place = $my_place[$i]['place'] . '+';
                } else {
                    if ($my_balance < $my_place[$i]['balance'] && $my_balance > $my_place[$i+1]['balance']) {
                        $place = $my_place[$i]['place'] . '...' . $my_place[$i+1]['place'];
                        break;
                    }
                }
            }

            $is_place_10 = false;
            $is_place_10_place = null;
            foreach ($rows as $user) {
                if ($user['chat_id'] == $user1->chat_id) {
                    $is_place_10 = true;
                    $is_place_10_place = $user['place'];
                }
            }

            $my_place = [
                'is_place_10'    => $is_place_10,
                'balance_farmed' => $user1->balance,
                'friends'        => $user1->ref_count,
            ];
            if ($is_place_10) {
                $my_place['place'] = $is_place_10_place;
                $my_place['place_plus'] = null;
            } else {
                $my_place['place'] = null;
                $my_place['place_plus'] = $place;
            }

            return response()->json([
                'list'     => $rows,
                'my_place' => $my_place,
            ]);

        } catch (\Throwable $e) {

            TelegramLogger::send(\App\Service\VarDumper::dumpAsString([
                $user1,
                $e->getMessage(),
            ]));

            return response()->json([
                'error'     => $e->getMessage(),
                'trace'     => $e->getTraceAsString(),
            ]);

        }
    }

    public function getMyRating($id)
    {
        // нахожу свой рейтинг
        $users = UserTelegram::where('balance_farmed', '>', 0)
            ->select('chat_id', 'ref_count')
            ->orderByDesc("balance_farmed")
            ->get()
            ->toArray()
        ;
        $c = 1;
        foreach ($users as $user) {
            if ($user['chat_id'] == $id) {
                return [
                    'place'   => $c,
                    'friends' => $user['ref_count'],
                ];
            }
            $c++;
        }

        return null;
    }

    private function getRating()
    {
        $rating = 1;
    }

    /**
     *
     * @return array
     * [
     * 'list'     => $rows,
     * 'my_place' => $my_place,
     * ]
     */
    private function getRatingDb()
    {
        // первая десятка
        $users = UserTelegram::where('balance_farmed', '>', 0)
            ->select('chat_id', 'name_first', 'name_last', 'balance_farmed', 'ref_count as friends')
            ->orderByDesc("balance_farmed")
            ->take(10)
            ->get()
            ->toArray()
        ;

        $rows = [];
        $place = 1;
        foreach ($users as $user) {
            $user['place'] = $place;
            $rows[] = $user;
            $place++;
        }
        Cache::set('\App\Http\Controllers\RatingController::getRatingDb:place', 1);
        Cache::set('\App\Http\Controllers\RatingController::getRatingDb:place_list', [
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
            1000,
            10000,
        ]);
        Cache::set('\App\Http\Controllers\RatingController::getRatingDb:rating', []);

        $users = UserTelegram::where('balance_farmed', '>', 0)
            ->select('chat_id', 'name_first', 'name_last', 'balance_farmed', 'ref_count as friends')
            ->orderByDesc("balance_farmed")
            ->chunk(1000, function (Collection $users) {
                $place = Cache::get('\App\Http\Controllers\RatingController::getRatingDb:place');
                $place_list = Cache::get('\App\Http\Controllers\RatingController::getRatingDb:place_list');
                $rating = Cache::set('\App\Http\Controllers\RatingController::getRatingDb:rating', []);

                foreach ($users as $user) {
                    if (in_array($place, $place_list)) {
                        $rating[] = [
                            'place'          => $place,
                            'balance_farmed' => $user['balance_farmed'],
                        ];
                    }
                    $place++;
                }

                Cache::set('\App\Http\Controllers\RatingController::getRatingDb:place', $place);
                Cache::set('\App\Http\Controllers\RatingController::getRatingDb:rating', $rating);
        });

        $my_place = [];

        return [
            'list'     => $rows,
            'my_place' => $my_place,
        ];
    }
}
