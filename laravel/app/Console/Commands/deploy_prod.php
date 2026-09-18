<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class deploy_prod extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:deploy_prod';

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

            $text = [
                'Деплой на PROD успешно завершен 🙌'
            ];
            $file = '/application/version.json';
            $content = json_decode(file_get_contents($file), true);
            $last = $content['change_log'][0]['update'];
            $v = $content['change_log'][0]['version'];
            $text[] = $v;
            $text[] = 'Обновлено:';
            $arr = array_merge($text, $last);
            $text = join("\n", $arr);

            Telegram::sendMessage([
                'chat_id' => -1002042569635, // MMPRO TAP
                'text'    => $text,
            ]);

            Telegram::sendMessage([
                'chat_id' => -1002236224993, // FW - Тапалка
                'text'    => $text,
            ]);
        } catch (\Throwable $e) {
            Log::info($e->getMessage());
        }
    }
}
