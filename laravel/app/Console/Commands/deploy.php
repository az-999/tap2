<?php

namespace App\Console\Commands;

use App\Models\AirdropUser;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class deploy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:deploy';

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
        $rows = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:allBP');

        $c = 0;
        foreach ($rows as $r) {
            AirdropUser::query()->where('tg_id', $r['tg_id'])->update(['balance_bp' => $r['balance_bp']]);
            $c++;
            if ($c % 10 == 0) Log::info($c);
        }

    }
}
