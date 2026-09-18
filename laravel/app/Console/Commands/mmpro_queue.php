<?php

namespace App\Console\Commands;

use App\Models\MmproToken;
use App\Models\UserTelegram;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use function Laravel\Prompts\select;

class mmpro_queue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mmpro_queue';

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
        $rows = MmproToken::query()->where('status',0)->get();
        $tonApi = TonApi::getInstance();

        /** @var \App\Models\MmproToken $row */
        foreach ($rows as $row) {
            $ret = \App\Http\Controllers\MmproTokenController::checktx($row, $tonApi);
            Log::info(VarDumper::dumpAsString($ret));
            if ($ret[0]) {
                self::success($row);
            } else {
                if ($row->created_at < time() - 15*60) {
                    $row->status = 2;
                    $row->save();
                }
            }
        }
    }

    /**
     * @param \App\Models\MmproToken $row
     * @return void
     */
    public static function success($row)
    {
        $row->status = 1;
        $row->save();
        $u = UserTelegram::getByChatId($row->tg_id);
        $u->has_one_pay = UserTelegram::HAS_ONE_PAY_YES_TRANSACTION;
        $u->save();
    }

}
