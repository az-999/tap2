<?php

namespace App\Console\Commands;

use App\Models\UserTelegram;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class clear_token extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear_token';

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
        $batch = 1000;

        $c = 1;
        $all = UserTelegram::query()->count();
        while ($c <= $all) {
            UserTelegram::query()
                ->where('id', '>=', $c)
                ->where('id', '<', $c+$batch)
                ->whereRaw("SUBSTRING(token,1,1)='$'")
                ->update(['token' => null]);
            Log::info('update id '. $c .' to ' . $c + $batch);
            $c += $batch;
        }
    }
}
