<?php

namespace App\Console\Commands;

use App\Models\MintQueue;
use App\Models\MmproToken;
use App\Models\PirateQueue;
use App\Models\UserNft;
use App\Models\UserTelegram;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class user_has_ope_pay extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:user_has_ope_pay';

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
        $rows = UserTelegram::query()->where('has_one_pay', 2)->limit(1000)->get();
        /** @var UserTelegram $row */
        foreach ($rows as $row) {
            $tg_id = $row['chat_id'];

            self::checkTgId($row);
        }
    }

    /**
     * @param $tg_id
     * @param \App\Models\UserTelegram $row
     * @return bool
     */
    public static function checkTgId($row)
    {
        $tg_id = $row->chat_id;
        $c1 = UserNft::query()->where('tg_id', $tg_id)->where('commit', 1)->count();
        if ($c1 > 0) {
            $row->has_one_pay = 1;
            $row->save();
            Log::info('user_id='.$tg_id . ' payable');
            return true;
        }
        $c2 = MintQueue::query()->where('tg_id', $tg_id)->where('status', 3)->count();
        if ($c2 > 0) {
            $row->has_one_pay = 1;
            $row->save();
            Log::info('user_id='.$tg_id . ' payable');
            return true;
        }
        $c3 = MmproToken::query()->where('tg_id', $tg_id)->where('status', MmproToken::STATUS_SUCCESS)->count();
        if ($c3 > 0) {
            $row->has_one_pay = 1;
            $row->save();
            Log::info('user_id='.$tg_id . ' payable');
            return true;
        }
        $c4 = PirateQueue::query()->where('tg_id', $tg_id)->where('status', PirateQueue::STATUS_VERIFIED)->count();
        if ($c4 > 0) {
            $row->has_one_pay = 1;
            $row->save();
            Log::info('user_id='.$tg_id . ' payable');
            return true;
        }

        Log::info('user_id='.$tg_id . ' no pay');
        $row->has_one_pay = 0;
        $row->save();

        return false;
    }
}
