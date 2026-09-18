<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Models\UserTask;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class check_task_limit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check_task_limit';

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
        $taskList = Task::getAllFromCache();
        $isClearCache = false;
        foreach ($taskList as $task) {
            if ($task['is_active'] == 1) {
                if ($task['limit']) {
                    $now_count = UserTask::query()->where('task_id', $task['id'])->count();
                    if ($now_count >= $task['limit']) {
                        Task::query()->where('id', $task['id'])->update(['is_active' => 0]);
                        $isClearCache = true;
                        Log::info('task id='.$task['id'].' deactivate');

                        $this->notifyTelegram($task);
                    }
                }
            }
        }
        if ($isClearCache) {
            Task::clearCache();
        }
    }

    /**
     * @param  array $task
     * @return void
     */
    public function notifyTelegram($task)
    {
        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002042569635, // MMPRO TAP
                'text'    => sprintf('Задание %s достигло лимита %s', $task['name'], $task['limit']),
            ]);
        } else {
            Telegram::sendMessage([
                'chat_id' => -4252420723,
                'text'    => sprintf('Задание %s достигло лимита %s', $task['name'], $task['limit']),
            ]);
        }
    }

    public function saveStat()
    {
        $stat = Cache::get('task_list_count.stat', []);
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
        Cache::put('task_list_count.stat', $stat);
    }
}
