<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\PaymentLock;
use App\Models\Session;
use App\Models\Transaction;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BaseVarDumper;
use App\Service\BuyNft;
use App\Service\TelegramLogger;
use App\Service\TonApi;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class MmproTokenController extends Controller
{
    const TONAPI_TX_NOTFOUNT_LIFE_SEC = 120;

    public function info(Request $request)
    {
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $item = \App\Models\MmproToken::query()->where('tg_id', $user1->chat_id)->selectRaw('sum(amount) as s1')->first()->toArray();
        $kurs = Cache::get('mmpro_token_kurs');

        return response()->json([
            'amount'     => (double)$item['s1'],
            'kurs' => [
                'ton'   => $kurs['ton'],
                'mmpro' => $kurs['mmpro'],
            ]
        ]);
    }

    public function buy(Request $request)
    {
        $fields = $request->validate([
            'address' => 'string|required',
            'txid'    => 'string|required',
            'ton'     => 'integer|required',
        ]);

        return response()->json(['code' => 403, 'message' => 'sale finished']);

        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $kurs = Cache::get('mmpro_token_kurs');
        if (is_null($kurs)) {
            return response()->json([
                'code'    => 522,
                'message' => 'Курс монеты не найден',
            ], 522);
        }

        // Проврека на добавление повтора
        $row = \App\Models\MmproToken::query()->where('txid', $fields['txid'])->first();
        if (!is_null($row)) {
            return response()->json([
                'code'    => 400,
                'message' => 'TX already exist',
            ], 400);
        }

        $amount = $fields['ton'] * $kurs['ton'] / $kurs['mmpro'];

        $params = [
            'address'    => Address::parse($fields['address'])->toString(false),
            'txid'       => $fields['txid'],
            'ton'        => $fields['ton'],
            'tg_id'      => $user1->chat_id,
            'created_at' => time(),
            'amount'     => $amount,
            'kurs_ton'   => $kurs['ton'],
            'kurs_mmpro' => $kurs['mmpro'],
        ];

        /** @var \App\Models\MmproToken $item  */
        $item1 = \App\Models\MmproToken::query()->create($params);

        // Вычисляю всю сумму
        $item = \App\Models\MmproToken::query()->where('tg_id', $user1->chat_id)->selectRaw('sum(amount) as s1')->first()->toArray();

        $ret1 = [
            'request_id'        => $item1->id,
            'amount'            => (double)$item['s1'],
            'amount_last_order' => (double)$item1->amount,
            'kurs'              => [
                'ton'   => $kurs['ton'],
                'mmpro' => $kurs['mmpro'],
            ],
        ];

        // Проверка транзакции
        $ret = self::checktx($params, TonApi::getInstance());
        $ret1['status'] = $ret[0];

        return response()->json($ret1);
    }

    public function check(Request $request)
    {
        $user1 = \App\Http\Middleware\FarmAuth::$user;
        $fields = $request->validate([
            'request_id'     => 'integer|required',
        ]);

        /** @var \App\Models\MmproToken $item1 */
        $item1 = \App\Models\MmproToken::query()->find($fields['request_id']);

        // Вычисляю всю сумму
        $item = \App\Models\MmproToken::query()->where('tg_id', $user1->chat_id)->selectRaw('sum(amount) as s1')->first()->toArray();
        $kurs = Cache::get('mmpro_token_kurs');

        return response()->json([
            'request_id'        => $item1->id,
            'result'            => $item1->status,
            'amount'            => (double)$item['s1'],
            'amount_last_order' => (double)$item1->amount,
            'kurs'              => [
                'ton'   => $kurs['ton'],
                'mmpro' => $kurs['mmpro'],
            ],
        ]);
    }

    /**
     * @param array $row
     * @param \App\Service\TonApi $tonApi
     * @return array
     */
    public static function checktx($row, $tonApi)
    {
        $wallet = config('app.highload');

        try {
            $txid = $row['txid'];
            Log::info('Verify: ' . $txid);

            $tx = $tonApi->get('v2/blockchain/transactions/' . $txid);

            if (isset($tx['error'])) {
                return [false, 'TON: ' . $tx['error']];
            } else {
                if (!$tx['success']) {
                    return [false,'Transaction failed'];
                }

                if (time() - $tx['utime'] > 3600 * 1000) {
                    return [false,'Transaction expired'];
                }

                $sourceAddress = Address::parse($tx['account']['address'])->toString(false);
                if ($sourceAddress != $row['address']) {
                    return [false, 'Wrong source address'];
                }

                $found = false;
                foreach($tx['out_msgs'] as $msg) {
                    $walletHex = Address::parse($wallet)->toString(false);

                    if ($msg['destination']['address'] == $walletHex) {

                        if ($msg['value'] == ($row['ton'] * 1000000000)) {
                            $found = true;
                            break;
                        }
                    }
                }

                if ($found) {
                    return [true];
                }

                return [false, 'Wrong destination address or value'];
            }
        } catch(\Throwable $e) {
            Log::error($e->getMessage());
            return [false, $e->getMessage()];
        }
    }

}
