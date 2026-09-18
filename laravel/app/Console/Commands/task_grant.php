<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class task_grant extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:task_grant';

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
        UserTask::where('is_claimed', 0)
            ->chunk(1000, function (Collection $rows) {
                $taskList = config('app.task-list');
                $keys = Arr::keyBy($taskList, 'id');

                foreach ($rows as $row) {
                    $row['is_claimed'] = 1;
                    $row['claimed_at'] = time();
                    $row->save();

                    // начисляю баланс пользователю
                    $task = $keys[$row['task_id']];
                    $user = UserTelegram::query()->where('chat_id', $row['chat_id'])->first();
                    $user->balanceAdd($task['grant'], LogBalance::TYPE_TASK);

                    Log::info('user chat_id='.$row['chat_id'].' task_id='.$row['task_id']);
                }
            });
    }
}
