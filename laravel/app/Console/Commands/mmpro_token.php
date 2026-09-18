<?php

namespace App\Console\Commands;

use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class mmpro_token extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mmpro_token';

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
        $response =
            Http::get('https://api.coingecko.com/api/v3/simple/price', [
                'ids'           => 'market-making-pro,the-open-network',
                'vs_currencies' => 'usd',
            ]);
        $data = json_decode($response->body(), true);
        Cache::put('mmpro_token_kurs', [
            'ton'   => $data['the-open-network']['usd'],
            'mmpro' => $data['market-making-pro']['usd'],
        ]);
        Log::info(VarDumper::dumpAsString([
            'ton'   => $data['the-open-network']['usd'],
            'mmpro' => $data['market-making-pro']['usd'],
        ]));
    }
}
