<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\PaymentLock;
use App\Models\PirateQueue;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use function Laravel\Prompts\select;

class pirate_queue extends Command
{

    // Время в сек периуда до которого ошибка (TX NOT FOUNT) от TONAPI не засчитывается, мы считаем ее задержавшейся
    const TONAPI_TX_NOTFOUNT_LIFE_SEC = 120;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:pirate_queue';

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
        $tonApi = new TonApi(false);

        $this->verifyTxns($tonApi);

    }


    private function verifyTxns(TonApi $tonApi)
    {
        Log::info('verifyTxns: start');
        $unverified = PirateQueue::query()->where('status', 0)->limit(200)->get();
        $wallet = config('app.wallet_pirate');
        $tonApi = new TonApi(false);
        Log::info(VarDumper::dumpAsString([
            'unverified count' => count($unverified),
        ]));

        /** @var PirateQueue $row */
        foreach ($unverified as $row) {
            self::check($row, $tonApi);
        }

        Log::info('verify: done');
    }

    /**
     * @param \App\Models\PirateQueue $row
     * @param \App\Service\TonApi $tonApi
     * @return false|void
     */
    public static function check($row, $tonApi)
    {
        $wallet = config('app.highload');

        try {
            $txid = $row->txid;
            Log::info('Verify: ' . $txid);

            $tx = $tonApi->get('v2/blockchain/transactions/' . $txid);

            if (isset($tx['error'])) {
                $is_set_error = false;
                if ($tx['error'] == 'entity not found') {
                    if (time() - $row->created_at > self::TONAPI_TX_NOTFOUNT_LIFE_SEC)  {
                        $is_set_error = true;
                    }
                } else {
                    $is_set_error = true;
                }

                if ($is_set_error) {
                    self::error2($row,'TON: ' . $tx['error']);
                    return false;
                }
            } else {
                if (!$tx['success']) {
                    self::error2($row,'Transaction failed');
                    return false;
                }

                if (time() - $tx['utime'] > 3600 * 1000) {
                    self::error2($row,'Transaction expired');
                    return false;

                }

                $sourceAddress = Address::parse($tx['account']['address'])->toString(false);
                if ($sourceAddress != $row['address']) {
                    self::error2($row,'Wrong source address');
                    return false;

                }

                $found = false;
                foreach($tx['out_msgs'] as $msg) {
                    $destAddress = Address::parse($msg['destination']['address'])->toString(true, true, false, false);

                    if ($destAddress == $wallet) {
                        Log::info(VarDumper::dumpAsString([
                            $msg['value'],
                            $row->amount,
                        ]));
                        if ($msg['value'] == $row->amount) {
                            $found = true;
                            break;
                        }
                    }
                }

                if ($found) {
                    $row->status = PirateQueue::STATUS_VERIFIED;
                    $row->verified_at = time();
                    $row->save();

                    self::action($row);

                } else {
                    self::error2($row, 'Wrong destination address or value');
                    return false;

                }
            }
        } catch(\Throwable $e) {
            Log::error($e->getMessage());
        }
    }



    /**
     * @param PirateQueue $item
     * @param string $message
     * @return void
     */
    public static function error2($item, $message)
    {
        $item->status = 2;
        $item->error = $message;
        $item->save();
    }

    /**
     * @param \App\Models\PirateQueue $item
     * @return void
     */
    public static function action($item)
    {
        $u = UserTelegram::findByTgId($item->tg_id);
        switch ($item->product_id) {
            case PirateQueue::PRODUCT_BLACK_METKA:
                $u->black_metka_count = 1;
                Log::info("user id=".$item->tg_id." success black metka");
                break;
            case PirateQueue::PRODUCT_GREEN_METKA:
                $u->shield_finish_at = time() + 60*60*24*30;
                Log::info("user id=".$item->tg_id." success green metka");
                break;
        }
        $u->has_one_pay = 1;
        $u->save();
    }

}
