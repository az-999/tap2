<?php

namespace App\Console\Commands;

use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;

class booster extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:booster';

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

        $rows = UserTelegram::query()
            ->where('active_booster_finish_at', '<', time())
            ->limit(100)
            ->get()
        ;

        /** @var \App\Models\UserTelegram $row */
        foreach ($rows as $row) {
            $row->active_booster = null;
            $row->active_booster_start_at = null;
            $row->active_booster_finish_at = null;
            $ret = $row->save();
            echo 'UserTelegram id='.$row->chat_id . ' finished' . "\n";
        }

        echo 'finshed t=' . $t - microtime(true) . PHP_EOL;
    }
}
