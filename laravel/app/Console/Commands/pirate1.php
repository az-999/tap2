<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

class pirate1 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:pirate1';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Грабеж начат',
            ]);
        }


        $users = UserTelegram::query()
            ->where('chat_id', 480552237)
            ->get();

        $this->GrabCycle($users,0, 1, 10, UserTelegram::GREEN_METKA_GRAB10);

        if (config('app.env') == 'prod') {
            Telegram::sendMessage([
                'chat_id' => -1002236224993,
                'text'    => 'Грабеж завершен',
            ]);
        }
    }


    /**
     * @param $users
     * @param $start
     * @param $finish
     * @param int $percent кол-во процентов
     * @param int $flag флаг грабежа малый или средний
     * @return void
     */
    private function GrabCycle($users, $start, $finish, $percent, $flag)
    {
        for ($i = $start; $i < $finish; $i++) {
            /** @var UserTelegram $u */
            $u = $users[$i];
            $grab = (int)($u->balance * ($percent/100));
            Log::info('has_green='.VarDumper::dumpAsString($this->hasGreenMetka($u)));
            if ($this->hasGreenMetka($u)) {
                $u->shield_count += $grab;
                $u->shield_count_all += $grab;
                Log::info('save='.$grab.' chat_id='.$u->chat_id);
            } else {
                if ($u->balance > 0) {
                    $u->balanceSub($grab, LogBalance::TYPE_PIRATE_GRAB);
                    $u->green_metka_modal_flag = $flag;
                    $u->black_metka_count_all += $grab;
                    $u->green_metka_modal_count += $grab;
                    Log::info('user '.$u->chat_id . ' grab '.$grab);
                }
            }
            $u->save();
        }
    }

    /**
     * Имеет пользователь активную защиту?
     * @param UserTelegram $u
     * @return bool
     */
    private function hasGreenMetka($u)
    {
        if (is_null($u->shield_finish_at)) return false;

        return $u->shield_finish_at > time();
    }
}
