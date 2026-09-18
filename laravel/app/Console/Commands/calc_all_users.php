<?php

namespace App\Console\Commands;

use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class calc_all_users extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:calc_all_users';

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
        $count = UserTelegram::count();
        Cache::store('memcached')->put('\App\Console\Commands\calc_all_users::all_users:memcached', $count);
        Cache::put('\App\Console\Commands\calc_all_users::all_users', $count);
        Log::info($count);
    }


    public function saveStat()
    {
        $stat = Cache::get('all_users.stat', []);
        if (count($stat) < 20) {
            $stat[] = date('Y-m-d H:i:s');
        } else {
            $rows = [];
            $c = 0;
            foreach ($stat as $item) {
                if ($c > 0) {
                    $rows[] = $item;
                }
                $c++;
            }
            $rows[] = date('Y-m-d H:i:s');
            $stat = $rows;
        }
        Cache::put('all_users.stat', $stat);
    }

}
