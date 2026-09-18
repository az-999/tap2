<?php

namespace App\Console\Commands;

use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class rating_calculate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rating_calculate';

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
        $rating = Cache::get('\App\Console\Commands\rating_calculate::getRatingDb:rating');
        $rating10 = Cache::get('\App\Console\Commands\rating_calculate::getRatingDb:rating10');
        Log::info(VarDumper::dumpAsString([
            $rating10,
            $rating,
            microtime(true) - $t,
        ]));
    }

    /**
     *
     */
    private function getRatingDb()
    {
        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Расчет рейтинга начат',
            ]);
        }

        // первая десятка
        $users = UserTelegram::where('balance', '>', 0)
            ->select('chat_id', 'name_first', 'name_last', 'balance as balance_farmed', 'ref_count as friends')
            ->orderByDesc("balance")
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
        Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:place', 1);
        Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:place_list', [
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
        Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:rating', []);

        UserTelegram::where('balance', '>', 0)
            ->select('balance')
            ->orderByDesc("balance")
            ->chunk(1000, function (Collection $users) {
                $place = Cache::store('memcached')->get('\App\Console\Commands\rating_calculate::getRatingDb:place');
                $place_list = Cache::store('memcached')->get('\App\Console\Commands\rating_calculate::getRatingDb:place_list');
                $rating = Cache::store('memcached')->get('\App\Console\Commands\rating_calculate::getRatingDb:rating');

                foreach ($users as $user) {
                    if (in_array($place, $place_list)) {
                        $rating[] = [
                            'place'   => $place,
                            'balance' => $user['balance'],
                        ];
                    }
                    $place++;
                }

                Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:place', $place);
                Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:rating', $rating);
                Log::info('place='.$place);
            });

        Cache::store('memcached')->put('\App\Console\Commands\rating_calculate::getRatingDb:rating10', $rows);

        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Расчет рейтинга завершен',
            ]);
        }
    }
}
