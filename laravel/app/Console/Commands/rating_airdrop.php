<?php

namespace App\Console\Commands;

use App\Models\AirdropUser;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class rating_airdrop extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rating_airdrop';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $t = microtime(true);
        $this->getRatingDb();
        $rating = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:rating');
        $rating10 = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:rating10');

        $this->balance0();

        Log::info(VarDumper::dumpAsString([
            $rating10,
            $rating,
            microtime(true) - $t,
        ]));
    }

    private function balance0()
    {
        $count = AirdropUser::query()
            ->where('balance_ap', '>', 0)
            ->orderBy('balance_ap', 'desc')
            ->select(['balance_ap', 'tg_id'])
            ->count();
        Log::info($count);

        $rows = [];
        $c = 0;
        $my = null;
        for ($i = 0; $i < (int)(($count + 999) / 1000); $i++) {
            $rows2 = AirdropUser::query()
                ->where('balance_ap', '>', 0)
                ->orderBy('balance_ap', 'desc')
                ->select(['balance_ap', 'tg_id'])
                ->limit(1000)
                ->offset($i*1000)
                ->get()
                ->toArray();

            foreach ($rows2 as $r) {
                $u = UserTelegram::getByChatId($r['tg_id']);
//                $u = [
//                    'name_last' => '1',
//                    'name_first' => '2',
//                ];
                $rows[] = [
                    'balance_ap' => $r['balance_ap'],
                    'tg_id'      => $r['tg_id'],
                    'name_last'  => $u['name_last'],
                    'name_first' => $u['name_first'],
                    'place'      => $c + 1,
                ];
                $c += 1;
            }
            Log::info($c);
        }
        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:all', $rows);
    }

    /**
     *
     */
    private function getRatingDb()
    {
        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Расчет рейтинга airdrop начат',
            ]);
        }

        // первая десятка
        $users = AirdropUser::where('balance_ap', '>', 0)
            ->select(['tg_id',"balance_ap"])
            ->orderByDesc("balance_ap")
            ->take(10)
            ->get()
            ->toArray()
        ;

        $rows = [];
        $place = 1;
        foreach ($users as $user) {
            $u = UserTelegram::findByTgId($user['tg_id']);
            $user['place'] = $place;
            $user['name_first'] = $u['name_first'];
            $user['name_last'] = $u['name_last'];
            $user['balance_ap'] = $user['balance_ap'];
            $rows[] = $user;
            $place++;
        }
        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:place', 1);
        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:place_list', [
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
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
            2000,
            3000,
            4000,
            5000,
            6000,
            7000,
            8000,
            9000,
            10000,
            50000,
            100000,
            250000,
            500000,
            750000,
            1000000,
            2500000,
            5000000,
            10000000,
            20000000,
        ]);
        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:rating', []);

        AirdropUser::where('balance_ap', '>', 0)
            ->select('balance_ap')
            ->orderByDesc("balance_ap")
            ->chunk(1000, function (Collection $users) {
                $place = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:place');
                $place_list = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:place_list');
                $rating = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:rating');

                foreach ($users as $user) {
                    if (in_array($place, $place_list)) {
                        $rating[] = [
                            'place'   => $place,
                            'balance_ap' => $user['balance_ap'],
                        ];
                    }
                    $place++;
                }

                Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:place', $place);
                Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:rating', $rating);
                Log::info('place='.$place);
            });

        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:rating10', $rows);


        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Расчет рейтинга airdrop завершен',
            ]);
        }
    }
}
