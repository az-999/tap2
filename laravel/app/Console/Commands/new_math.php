<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class new_math extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:new_math';

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
        $data = [
            6035702117 => 3500000000,
            6278607193 => 4500000000,
            2071490753 => 4500000000,
            6905067043 => 2800000000,
            113566842  => 2800000000,
            874270074  => 4500000000,
            376905749  => 2800000000,
            1923234422 => 2800000000,
            351348580  => 2800000000,
            402467182  => 2800000000,
            438234715  => 2800000000,
            6289321975 => 2800000000,
            5151151844 => 4500000000,
        ];

        /** @var UserTelegram $user */
        foreach ($data as $chat_id => $balance) {

            DB::update(sprintf('UPDATE user_telegram SET ref_balance = 0 WHERE ref_id = %s', $chat_id));
            $user = UserTelegram::query()->where('chat_id', $chat_id)->first();
            if (!is_null($user)) {
                $balanceUser = $user->balance;
                if ($balanceUser > $balance) {
                    $subBalance = bcsub($balanceUser, $balance);
                    $user->balanceSub($subBalance, LogBalance::TYPE_FERMER_CUT);
                    Log::info('user update id='.$user->id . ' balance before = ' . $balanceUser . ' balance after = '.$user->balance);
                } else {
                    Log::info('user balance norm id='.$user->id);
                }
            } else {
                Log::info('user skip chat_id='.$chat_id);
            }
        }
    }
}
