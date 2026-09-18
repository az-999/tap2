<?php

use App\Models\UserTask;
use App\Models\UserTelegram;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (false) {
            $key = '2024_06_25_125504_tasks.php';
            $data = [];
            $t = microtime(true);

            \Illuminate\Support\Facades\Cache::put($key, $data);
            UserTelegram::chunk(10000, function (Collection $users) {
                $data = \Illuminate\Support\Facades\Cache::get('2024_06_25_125504_tasks.php');
                $t1 = microtime(true);
                foreach ($users as $user) {
                    $tasks = [];
                    $rows = UserTask::where('chat_id', $user['chat_id'])->get();
                    foreach ($rows as $row) {
                        $i = $row['task_id'];
                        if ($row['is_claimed']) {
                            $i = '+'.$i;
                        }
                        $tasks[] = $i;
                    }
                    if (count($tasks) > 0) {
                        $user->task_list = join(',', $tasks);
                        $user->save();
                    }
                }

                $data[] = microtime(true) - $t1;
                \Illuminate\Support\Facades\Cache::put('2024_06_25_125504_tasks.php', $data);
            });

            $data = \Illuminate\Support\Facades\Cache::get('2024_06_25_125504_tasks.php');
            $data['all'] = microtime(true) - $t;
            \Illuminate\Support\Facades\Cache::put($key, $data);
            Log::info($data);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
