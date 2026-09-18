<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class deploy_test2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:deploy_test2';

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
        try {
            Telegram::sendMessage([
                'chat_id'    => -1002236224993,
                'parse_mode' => 'HTML',
                'text'       => 'Деплой на <a href="https://t.me/mmbump_test2_bot/app">TEST2</a> успешно завершен 🙌',
            ]);
        } catch (\Throwable $e) {
            Log::info($e->getMessage());
        }
    }
}
