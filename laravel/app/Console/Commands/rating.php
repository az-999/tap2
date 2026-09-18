<?php

namespace App\Console\Commands;

use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class rating extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rating';

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
        $rows = [];
        $place_list = [
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
        ];

        $length = 1000;
        $offset = 0;
        while (true) {
            $list = UserTelegram::query()
                ->select('balance')
                ->limit($length)
                ->offset($offset)
                ->get()
                ->toArray();

            foreach ($list as $user) {
                $rows[] = $user['balance'];
            }
            Log::info('count='.count($rows) . ' offset='.$offset);
            $offset += $length;
            if (count($list) < $length) break;
        }

        array_multisort($rows,SORT_DESC);
        $rating = [];
        $place = 1;
        foreach ($rows as $row) {
            if (in_array($place, $place_list)) {
                $rating[] = [
                    'place'   => $place,
                    'balance' => $row,
                ];
            }
            $place++;
        }
        Log::info(VarDumper::dumpAsString($rating));
    }
}
