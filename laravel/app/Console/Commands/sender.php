<?php

namespace App\Console\Commands;

use App\Models\SenderQueue;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class sender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sender';

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
        $row = \App\Models\Sender::query()->first();
        if (is_null($row)) {
            Log::info('no send item');
            return;
        }

        $content = $row->content;

        Cache::set('\App\Console\Commands\sender', $content);
        $users = SenderQueue::where('send_id', $row->id)
            ->select('tg_id', 'id')
            ->limit(1500)
            ->get();

        $ids = [];
        if (count($users)>0) {
            Telegram::sendMessage([
                'chat_id' => 122605414,
                'text'    => 'start',
            ]);
            foreach ($users as $u) {
                try {
                    Telegram::sendMessage([
                        'chat_id' => $u['tg_id'],
                        'text'    => $content,
                    ]);
                } catch (\Throwable $e) {

                }
                $ids[] = $u['id'];

                Log::info($u['tg_id']);
            }
        }

        SenderQueue::query()->whereIn('id', $ids)->delete();
    }
}
