<?php


namespace App\Http\Controllers;

use App\Http\Middleware\Airdrop;
use App\Models\AirdropKols;
use App\Models\AirdropShip;
use App\Models\AirdropTask;
use App\Models\AirdropTaskUser;
use App\Models\AirdropUser;
use App\Models\AirdropWhitebitReq1uest;
use App\Models\AirdropWhitebitRequest;
use App\Models\Config;
use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\PirateQueue;
use App\Models\Stake;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\TelegramLogger;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AirdropController extends Controller
{
    public static $taskList = [
        5  => 2,
        6  => 622,
        7  => 5,
        8  => 3,
        9  => 4,
        10 => 42,
    ];

    public function __construct()
    {

    }

    public function index(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        // whitebit
        $rows = AirdropWhitebitRequest::query()
            ->where('tg_id', $user->chat_id)
            ->get()
            ->toArray()
        ;

        if (count($rows) > 0) {
            $item = $rows[count($rows) - 1];
            $task1 = [
                'request' => [
                    'status' => $item['status'],
                ],
            ];
        } else {
            $task1 = null;
        }

        // TASK 2 daily
        {
            $task2 = [
                'total_earned'  => Airdrop::$AirdropUser->task2_total_earned,
                'first_time'    => Airdrop::$AirdropUser->task2_first_time,
                'day'           => Airdrop::$AirdropUser->task2_day,
            ];
        }

        // KOLS
        {
            $kols = AirdropKols::findOrCreate($user->chat_id);
            $ids_airdrop = $kols->getIds();
            $ids_kols = UserTask::query()
                ->where('chat_id', $user->chat_id)
                ->select('task_id')
                ->pluck('task_id')
                ->toArray()
            ;
            $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($ids_airdrop,$ids_kols);
            $task4_count = count($intersect['add']);
            $task4 = [
                'count'              => $task4_count, // сколько можно слеймить тасок
                'task4_total_earned' => Airdrop::$AirdropUser->task4_total_earned,
            ];
        }

        // TASK5
        {
            $taskList = self::$taskList;

            $userTask = UserTask::query()->where('chat_id', $user->chat_id)->whereIn('task_id', $taskList)->get();
            $task5 = [];
            $taskClaim = Airdrop::$AirdropUser->getTask5Status();
            foreach ($taskList as $k => $v) {
                if (in_array($v, $taskClaim)) {
                    $task5['id'.$k] = ['status' => 2];
                } else {
                    foreach ($userTask as $task) {
                        if ($task['task_id'] == $v) {
                            $task5['id'.$k] = ['status' => 1];
                        }
                    }
                    if (!isset($task5['id'.$k])) {
                        $task5['id'.$k] = ['status' => 0];
                    }
                }
            }
        }

        // TASK6
        {
            $task6 = [
                'total_earned'  => Airdrop::$AirdropUser->task6_total_earned,
                'accamulated'   => Airdrop::$AirdropUser->task6_balance,
            ];
        }

        // TASK7
        {
            $task7_nft_address_list = Airdrop::$AirdropUser->getTask7List();
            $list = MintQueue::query()
                ->where('tg_id', $user->chat_id)
                ->where('nft_id', 6)
                ->where('status', MintQueue::STATUS_COMPLETED)
                ->pluck('id')
                ->toArray()
            ;

            $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task7_nft_address_list, $list);

            $task7 = [
                'total_earned' => Airdrop::$AirdropUser->task7_total_earned,
                'is_exist'     => count($intersect['add']) > 0,
            ];
        }

        // TASK8
        {
            $task8_list = Airdrop::$AirdropUser->getTask8List();
            $list = UserTelegram::query()
                ->where('ref_id', $user->chat_id)
                ->pluck('chat_id')
                ->toArray()
            ;
            $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task8_list, $list);
            $n3 = (int) (count($intersect['add']) /3);

            $task8 = [
                'total_earned' => Airdrop::$AirdropUser->task8_total_earned,
                'is_exist'     => $n3 > 0,
            ];
        }

        // TASK9
        {
            $task9 = [
                'is_get'     => Airdrop::$AirdropUser->task9_is_get == 1,
            ];
        }

        // TASK10
        {
            $task10_list = Airdrop::$AirdropUser->getTask10List();
            $list = MintQueue::query()
                ->where('tg_id', $user->chat_id)
                ->where('nft_id', 7)
                ->where('status', MintQueue::STATUS_COMPLETED)
                ->pluck('id')
                ->toArray()
            ;
            $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task10_list, $list);

            $task10 = [
                'total_earned' => Airdrop::$AirdropUser->task10_total_earned,
                'is_exist'     => count($intersect['add']) > 0,
            ];
        }

        // TASK11
        {
            $task11_list = Airdrop::$AirdropUser->getTask11List();
            $list = AirdropShip::query()
                ->where('tg_id', $user->chat_id)
                ->pluck('id')
                ->toArray()
            ;
            $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task11_list, $list);

            $task11 = [
                'total_earned' => Airdrop::$AirdropUser->task11_total_earned,
                'is_exist'     => count($intersect['add']) > 0,
            ];
        }

        // TASK12
        {
            $task12 = [
                'is_get'     => Airdrop::$AirdropUser->task12_is_get == 1,
            ];
        }

        // TASK13
        {
            $task13 = [
                'is_closed'     => Airdrop::$AirdropUser->task13_is_closed == 1,
            ];
        }

        $balance_token_rank = null;

        return response()->json([
            'balance_ap'         => Airdrop::$AirdropUser->balance_ap,
            'balance_token_rank' => $balance_token_rank,
            'task1'              => $task1,
            'task2'              => $task2,
            'task3'              => [
                'status' => Airdrop::$AirdropUser->task2_is_done,
            ],
            'task4'              => $task4,
            'task5'              => $task5,
            'task6'              => $task6,
            'task7'              => $task7,
            'task8'              => $task8,
            'task9'              => $task9,
            'task10'             => $task10,
            'task11'             => $task11,
            'task12'             => $task12,
//            'task13'             => $task13,
        ]);
    }

    public static function calculate_token_rank()
    {
        $users = AirdropUser::query()->get();


        foreach ($users as $user) {

        }
    }

    public function start(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $AirdropUser = AirdropUser::findOrCreate($user->chat_id);

        if (is_null($AirdropUser->airdrop_is_oferta_start)) {
            $AirdropUser->airdrop_is_oferta_start = time();
            $AirdropUser->save();
        }

        return response()->json([
            'airdrop_is_oferta_start' => $AirdropUser->airdrop_is_oferta_start,
        ]);
    }

    public function complete(Request $request)
    {
        $data = $request->validate([
            'id'   => 'required|integer',
        ]);

        $c = new \App\Http\Actions\AirdropCompleteTask(['id' => $data['id']]);


        return $c->run();
    }

    public function completeShip3(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $wallet = $user->token;

        if (!$wallet) {
            return response()->json([
                'code'    => 400,
                'message' => 'no wallet',
            ], 400);
        }

        if (Airdrop::$AirdropUser->task2_is_done == 1) {
            return response()->json([
                'code'    => 400,
                'message' => 'already done',
            ], 400);
        }

        if (!self::isHasLevel3Ship($wallet, Airdrop::$AirdropUser)) {
            return response()->json([
                'code'    => 400,
                'message' => 'no ship',
            ], 400);
        }
        $grant = 1000;

        Airdrop::$AirdropUser->task2_is_done = 1;
        Airdrop::$AirdropUser->balance_ap += $grant;
        Airdrop::$AirdropUser->save();

        return response()->json([
            'balance_ap' => Airdrop::$AirdropUser->balance_ap,
            'grant'      => $grant,
        ]);
    }

    public function completeTask7(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;
        $task7_nft_address_list = Airdrop::$AirdropUser->getTask7List();
        $list = MintQueue::query()
            ->where('tg_id', $user->chat_id)
            ->where('nft_id', 6)
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->pluck('id')
            ->toArray()
        ;

        $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task7_nft_address_list, $list);

        if (count($intersect['add']) > 0) {
            $grant = 10;
            $grant = $grant * count($intersect['add']);

            Airdrop::$AirdropUser->balance_ap += $grant;
            Airdrop::$AirdropUser->task7_total_earned += $grant;
            Airdrop::$AirdropUser->addTask7List($intersect['add']);
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
            'total_earned' => Airdrop::$AirdropUser->task7_total_earned,
        ]);
    }

    public function completeTask10(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;
        $task10_list = Airdrop::$AirdropUser->getTask10List();
        $list = MintQueue::query()
            ->where('tg_id', $user->chat_id)
            ->where('nft_id', 7)
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->pluck('id')
            ->toArray()
        ;


        $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task10_list, $list);

        if (count($intersect['add']) > 0) {
            $grant = 100;
            $grant *= count($intersect['add']);

            Airdrop::$AirdropUser->balance_ap += $grant;
            Airdrop::$AirdropUser->task10_total_earned += $grant;
            Airdrop::$AirdropUser->addTask10List($intersect['add']);
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
            'total_earned' => Airdrop::$AirdropUser->task10_total_earned,
        ]);
    }

    public function completeTask8(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;
        $task8_list = Airdrop::$AirdropUser->getTask8List();
        $list = UserTelegram::query()
            ->where('ref_id', $user->chat_id)
            ->pluck('chat_id')
            ->toArray()
        ;

        $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task8_list, $list);

        if (count($intersect['add']) >= 3) {
            $grant = 10;
            $count = (int)(count($intersect['add']) / 3);
            $grant = $grant * $count;

            Airdrop::$AirdropUser->balance_ap += $grant;
            Airdrop::$AirdropUser->task8_total_earned += $grant;
            Airdrop::$AirdropUser->addTask8List($intersect['add']);
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
            'total_earned' => Airdrop::$AirdropUser->task8_total_earned,
        ]);
    }

    public function completeTask9(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;

        if (Airdrop::$AirdropUser->task9_is_first) {
            $n = PirateQueue::query()
                ->where('tg_id', $user->chat_id)
                ->where('product_id', PirateQueue::PRODUCT_GREEN_METKA)
                ->where('status', PirateQueue::STATUS_VERIFIED)
                ->count();

            if ($n > 0) {
                $grant = 10;
                $grant = $grant * $n;

                Airdrop::$AirdropUser->balance_ap += $grant;
                Airdrop::$AirdropUser->task9_is_first = 0;
                Airdrop::$AirdropUser->task9_is_get = 1;
                Airdrop::$AirdropUser->save();
            }
        } else {
            if (!is_null($user->shield_finish_at)) {
                if ($user->shield_finish_at < (time() + 60*60*24*30)) {
                    $grant = 10;

                    Airdrop::$AirdropUser->balance_ap += $grant;
                    Airdrop::$AirdropUser->task9_is_get = 1;
                    Airdrop::$AirdropUser->save();
                }
            }
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
        ]);
    }

    public function completeTask11(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;
        $task11_list = Airdrop::$AirdropUser->getTask11List();
        $list = AirdropShip::query()
            ->where('tg_id', $user->chat_id)
            ->pluck('id')
            ->toArray()
        ;

        $intersect = \App\Http\Actions\AirdropCompleteKols::arrayIntersect($task11_list, $list);

        if (count($intersect['add']) > 0) {
            $grant = 100;
            $grant *= count($intersect['add']);

            Airdrop::$AirdropUser->balance_ap += $grant;
            Airdrop::$AirdropUser->task11_total_earned += $grant;
            Airdrop::$AirdropUser->addTask11List($intersect['add']);
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
            'total_earned' => Airdrop::$AirdropUser->task11_total_earned,
        ]);
    }

    public function completeTask12(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;



        $grant = 0;

        if ($user->black_metka_count == 1) {
            if (Airdrop::$AirdropUser->task12_is_get != 1) {
                $grant = 100;

                Airdrop::$AirdropUser->balance_ap += $grant;
                Airdrop::$AirdropUser->task12_is_get = 1;
                Airdrop::$AirdropUser->save();
            }
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
        ]);
    }

    public function completeTask13(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 10000000;
        $user->balanceAdd($grant, LogBalance::TYPE_TASK);

        return response()->json([
            'balance'   => $user->balance,
            'grant'     => $grant,
        ]);
    }

    public function completeDaily(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $time = time();
        $user = Airdrop::$AirdropUser;
        if ($user->task2_day == 0) {
            $user->task2_first_time = time();
            $user->task2_day = 1;
        } else {
            $start = $user->task2_first_time + $user->task2_day * 60 * 60 * 24;
            if ($time < $start) {
                return response()->json([
                    'code'     => 400,
                    'message'  => 'Нельзя забрать награду ранее суток',
                ], 400);
            }
            if ($time > $start + 60 * 60 * 24 * 3) {
                $user->task2_first_time = null;
                $user->task2_day = 0;
                $user->save();

                return response()->json([
                    'code'     => 403,
                    'message'  => 'Нельзя забрать награду позже 3 суток, ваш счетчик обнулен',
                ], 400);
            }
            $user->task2_day++;
        }
        if (in_array($user->task2_day, [10,20,30])) {
            $grant = $user->task2_day;
        } else {
            $grant = 1;
        }
        $user->balance_ap += $grant;
        $user->task2_total_earned += $grant;
        $user->save();

        return response()->json([
            'balance_ap' => Airdrop::$AirdropUser->balance_ap,
            'grant'      => $grant,
        ]);
    }

    public function saveShipCraft(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = $request->validate([
            'txid' => 'required|string',
        ]);

        AirdropShip::query()->create([
            'tg_id'      => $user->chat_id,
            'txid'       => $data['txid'],
            'created_at' => time(),
        ]);

        return response()->json([
            'code' => 200,
        ]);
    }

    public function result(Request $request)
    {
        $user1 = \App\Http\Middleware\Airdrop::$AirdropUser;

        $season1_is_end = Config::get('season1_is_end', 0);
        if (!$season1_is_end) {
            response()->json([
                'season1_is_end'   => $season1_is_end,
            ]);
        }

        return response()->json([
            'season1_is_end' => 1,
            'data'           => [
                'balance_ap' => $user1->balance_ap,
                'balance_bp' => $user1->balance_bp,
                'rating'     => $user1->rating,
            ],
        ]);
    }

    public function rating(Request $request)
    {
        $user1 = \App\Http\Middleware\Airdrop::$AirdropUser;

        try {
            $rows = Cache::get( '\App\Console\Commands\rating_airdrop::getRatingDb:rating10');
            $my_balance = $user1->balance_ap;
            $my_place = Cache::get( '\App\Console\Commands\rating_airdrop::getRatingDb:rating');

            $place = '';
            for ($i=0; $i<count($my_place);$i++) {
                if ($i == (count($my_place)-1)) {
                    $place = $my_place[$i]['place'] . '+';
                } else {
                    if ($my_balance < $my_place[$i]['balance_ap'] && $my_balance > $my_place[$i+1]['balance_ap']) {
                        $place = $my_place[$i]['place'] . '...' . $my_place[$i+1]['place'];
                        break;
                    }
                }
            }

            $is_place_10 = false;
            $is_place_10_place = null;
            foreach ($rows as $user) {
                if ($user['tg_id'] == $user1['tg_id']) {
                    $is_place_10 = true;
                    $is_place_10_place = $user['place'];
                }
            }

            $my_place = [
                'is_place_10'    => $is_place_10,
                'balance_ap'     => $user1->balance_ap,
            ];
            if ($is_place_10) {
                $my_place['place'] = $is_place_10_place;
                $my_place['place_plus'] = null;
            } else {
                $my_place['place'] = null;
                $my_place['place_plus'] = $place;
            }

            return response()->json([
                'list'       => $this->rating200(),
                'list10'     => $rows,
                'my_place'   => $my_place,
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

    private function rating200()
    {
        $user1 = \App\Http\Middleware\Airdrop::$AirdropUser;
        $rows = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:all');
        $count = count($rows);

        $c = 0;
        $my = null;
        foreach ($rows as $r) {
            if ($r['tg_id'] == $user1['tg_id']) {
                $my = $c;
            }
            $c++;
        }
        if (is_null($my)) {
            $my = $count;
        }

        $top_start = $my - 150;
        $top_finish = $my - 1;
        if ($top_start < 0) $top_start = 0;
        if ($top_finish < 0) $top_finish = 0;

        $bottom_start = $my + 1;
        $bottom_finish = $my + 50;
        if ($bottom_start > $count) $bottom_start = $count - 1;
        if ($bottom_finish > $count) $bottom_finish = $count - 1;

        $result = [];
        for($i = $top_start; $i < $bottom_finish; $i++) {

            if ($user1['tg_id'] == $rows[$i]['tg_id']) {
                $result[] = [
                    'balance_ap' => $rows[$i]['balance_ap'],
                    'tg_id'      => $rows[$i]['tg_id'],
                    'name_last'  => $rows[$i]['name_last'],
                    'name_first' => $rows[$i]['name_first'],
                    'place'      => $rows[$i]['place'],
                    'is_my'      => 1,
                ];
            } else {
                $result[] = $rows[$i];
            }
        }

        return $result;
    }

    public function completeTask6(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $grant = 0;
        // если пользователь первый раз берет
        if (Airdrop::$AirdropUser->task6_total_earned == 0) {
            if (Airdrop::$AirdropUser->task6_balance > 50000000) {
                $grant = 10;

                $n = (int)(Airdrop::$AirdropUser->task6_balance / 50000000);
                $grant = $grant * $n;

                Airdrop::$AirdropUser->balance_ap += $grant;
                Airdrop::$AirdropUser->task6_balance = 0;
                Airdrop::$AirdropUser->task6_total_earned += $grant;
                Airdrop::$AirdropUser->save();
            } else {
                if ($user->balance > 500000000) {
                    $grant = 10;

                    $n = (int)($user->balance / 500000000);
                    $grant = $grant * $n;

                    Airdrop::$AirdropUser->balance_ap += $grant;
                    Airdrop::$AirdropUser->task6_balance = 0;
                    Airdrop::$AirdropUser->task6_total_earned += $grant;
                    Airdrop::$AirdropUser->save();
                }
            }
        } else {
            if (Airdrop::$AirdropUser->task6_balance > 50000000) {
                $grant = 10;

                $n = (int)(Airdrop::$AirdropUser->task6_balance / 50000000);
                $grant = $grant * $n;

                Airdrop::$AirdropUser->balance_ap += $grant;
                Airdrop::$AirdropUser->task6_balance = 0;
                Airdrop::$AirdropUser->task6_total_earned += $grant;
                Airdrop::$AirdropUser->save();
            }
        }

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $grant,
            'balance'      => Airdrop::$AirdropUser->task6_balance,
            'total_earned' => Airdrop::$AirdropUser->task6_total_earned,
        ]);
    }

    public function completeKols(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $c = new \App\Http\Actions\AirdropCompleteKols();

        return $c->run();
    }

    public function whiteBitClaim(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        $row = AirdropWhitebitRequest::query()
            ->where('tg_id', $user->chat_id)
            ->orderBy('id', 'desc')
            ->first()
        ;

        if (is_null($row)) {
            return response()->json([
                'code'    => 400,
                'message' => 'нет ни одной заявки',
            ], 400);
        }
        if ($row['status'] == AirdropWhitebitRequest::STATUS_CLAIMED) {
            return response()->json([
                'code'    => 401,
                'message' => 'Уже взята награда',
            ], 400);
        }

        if ($row['status'] != AirdropWhitebitRequest::STATUS_SUCCESS) {
            return response()->json([
                'code'    => 402,
                'message' => 'нет одобренной заявки',
            ], 400);
        }
        $grant = 1000;
        Airdrop::$AirdropUser->balance_ap += $grant;
        Airdrop::$AirdropUser->save();

        $row->status = AirdropWhitebitRequest::STATUS_CLAIMED;
        $row->save();

        return response()->json([
            'balance_ap' => Airdrop::$AirdropUser->balance_ap,
            'grant'      => $grant,
        ]);
    }

    /**
     * @param $wallet
     * @param AirdropUser $user
     * @return int|mixed
     */
    public static function isHasLevel3Ship($wallet, $AirdropUser)
    {
        $data = \App\Service\TonApi::getInstance()->get('v2/accounts/' . $wallet . '/nfts', [
            'collection'         => config('app.ship_kraft_collection'),
            'limit'              => 1000,
            'offset'             => 0,
            'indirect_ownership' => 'false',
        ]);

        $max = 0;
        foreach ($data['nft_items'] as $item) {
            if ($item['metadata']['ship_level'] >= 3) {
                // Проверяю время создания
                $max = $item['metadata']['ship_level'];
                $data = \App\Service\TonApi::getInstance()->get('v2/blockchain/accounts/' . $item['address'] . '/transactions', [
                    'limit'      => 1,
                    'sort_order' => 'asc',
                ]);
                if ($data['transactions'][0]['utime'] > $AirdropUser->airdrop_is_oferta_start) {
                    return true;
                }
            }
        }

        return false;
    }


    public function whiteBitNik(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = $request->validate([
            'nik'   => 'required|string',
        ]);

        // Добавляю заявку
        $rows = AirdropWhitebitRequest::query()
            ->where('tg_id', $user->chat_id)
            ->get()
            ->toArray()
        ;

        if (count($rows) > 0) {
            $item = $rows[count($rows) - 1];
            if ($item['status'] == 0) {
                return response()->json([
                    'code'    => 403,
                    'message' => 'Уже есть открытая заявка',
                ], 403);
            }
            if ($item['status'] == AirdropWhitebitRequest::STATUS_SUCCESS) {
                return response()->json([
                    'code'    => 403,
                    'message' => 'Заявка уже одобрена',
                ], 403);
            }
        }

        $row = AirdropWhitebitRequest::query()->create([
            'tg_id'       => $user->chat_id,
            'nik'         => $data['nik'],
            'description' => '',
            'created_at'  => time(),
            'status'      => 0,
        ]);

        return response()->json([
            'code' => 200,
        ]);
    }


}
