<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class save_log_balance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:save_log_balance';

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
        $key = \App\Models\LogBalance::$cache_key;
        $list = Cache::get($key);

        $end = count($list) - 1;
        for ($i = 0; $i < $end; $i++) {
            $item = $list[$i];

            $rows = Cache::get($key . '_' . $item);
            $data = [];
            foreach ($rows as $row) {
                $data[] = [
                    'telegram_chat_id' => $row[0],
                    'created_at'       => $row[1],
                    'type'             => $row[2],
                    'amount'           => $row[3],
                ];
            }
            LogBalance::insert($data);
        }
        // Обновляю счетчик индексов
        Cache::put($key, $list);
    }
}
