<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\TxIndex;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\TonApi;
use App\Service\TonhubAPI;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Log;

class check_txns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check_txns';

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
        // TODO: надо зарефакторить, делал на скорую руку
        $uncommited = UserNft::getUncommited();
        if (empty($uncommited)) {
            Log::info('No waiting transactions');
            return;
        }

        $token = hash('sha256', config('jwt.secret'));
        $wallet = config('app.wallet');
        $tonApi = new TonApi(false);
        $nftUrl = config('app.nft-url');
        $head = $this->getHead();

        $addrInfo = $tonApi->getAccount($wallet);
        Log::info(VarDumper::dumpAsString($addrInfo));
        $newHead = ['hash' => $head['hash'], 'lt' => $head['lt']];
        $checkTxns = true;
        if ($addrInfo['last_transaction_lt'] === 0) {
            Log::info('No transactions on this wallet');
            $checkTxns = false;
        }

        if ($addrInfo['last_transaction_lt'] === $head['lt']) {
            Log::info('No new transactions');
            $checkTxns = false;
        }

        $nftList = config('app.nft-list');
        $first = true;
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        if ($checkTxns) {
            $txlist = $tonApi->getTransactions($wallet, 1000)['transactions'];
            Log::info('Found ' . count($txlist) . ' transactions');
            $isLast = false;
            $prevLt = "";
            $prevHash = "";
            $newTxs = [];
            while(!$isLast) {
                foreach ($txlist as $tx) {
                    $data = $this->decodeTransaction($tx);
                    Log::info(VarDumper::dumpAsString($data));
                    if ($first) {
                        $newHead = ['hash' => $data['hash'], 'lt' => $data['lt']];
                        $first = false;
                    }

                    if ($prevLt == $data['lt'] && $prevHash == $data['hash']) {
                        $isLast = true;
                        Log::info('No new transactions: prevLt and prevHash are equal');
                        break;
                    }

                    if ($data['lt'] === $head['lt'] && $data['hash'] === $head['hash']) {
                        $isLast = true;
                        Log::info('No new transactions: head is equal');
                        break;
                    }

                    if (TxIndex::isExists($data['hash'], $data['lt'])) {
                        $isLast = true;
                        Log::info('No new transactions: exists');
                        break;
                    }

                    if ($data['internal']) {
                        $newTxs[] = $data;
                    }

                    $prevLt = $data['lt'];
                    $prevHash = $data['hash'];
                }

                if (!$isLast) {
                    $txlist = $tonApi->getTransactions($wallet, 1000, $prevLt)['transactions'];
                }

                if (empty($txlist)) {
                    $isLast = true;
                    Log::info('No new transactions: empty');
                }
            }

            array_reverse($newTxs);
            foreach ($newTxs as $tx) {
                Log::info(VarDumper::dumpAsString($tx));
                if (isset($uncommited[$tx['from']])) {
                    $entry = $uncommited[$tx['from']];
                    Log::info('Found uncommited: ' . VarDumper::dumpAsString($entry));
                    $id = $entry['nft_id'];
                    $nft = $rows[$id];

                    if ($tx['value'] !== $nft['comission']) {
                        Log::info('Wrong price: ' . VarDumper::dumpAsString($tx) . ' ' . VarDumper::dumpAsString($nft));
                        continue;
                    }

                    UserNft::incTries($entry['id']);
                    $user = UserTelegram::where('chat_id', $entry['tg_id'])->first();
                    try {
                        $this->buyNft($nftUrl, $nft, $token, $id, $entry, $user);
                    } catch (\Exception $e) {
                        Log::error('Error on buy: ' . VarDumper::dumpAsString($e));
                    }

                    unset($uncommited[$tx['from']]);
                }

                TxIndex::add($tx['hash'], $tx['lt']);
            }
        }

        Log::info('Uncommited: ' . VarDumper::dumpAsString($uncommited));
        foreach ($uncommited as $entry) {
            $user = UserTelegram::where('chat_id', $entry['tg_id'])->first();
            $id = $entry['nft_id'];
            $nft = $rows[$id];
            if ($entry['tries'] > 0) {
                UserNft::incTries($entry['id']);
                try {
                    $nft = $rows[$id];
                    $this->buyNft($nftUrl, $nft, $token, $id, $entry, $user);
                } catch (\Exception $e) {
                    Log::error('Error on retry: ' . VarDumper::dumpAsString($e));
                }
            } else {
                Log::info('Check: ' . $entry['created_at'] . ' ' . strtotime($entry['created_at']) . '<' . (time() - 600));
                if (strtotime($entry['created_at']) < (time() - 600)) {
                    if ($user) {
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($nft['price'], LogBalance::TYPE_NFT_REJECT);
                    }

                    UserNft::where('tg_id', $user->chat_id)->where('nft_id', $id)->delete();
                }
            }
        }

        Cache::forever('nft_last_tx', $newHead);
    }

    private function buyNft($nftUrl, $nft, $token, $id, $entry, $user) {
        $result = (new BuyNft($nftUrl, $token, $entry['wallet'], $id))->send();
        $body = json_decode($result->getBody(), true);
        if ($result->getStatusCode() == 200) {
            $body = json_decode($result->getBody(), true);

            Cache::put('nft_soldout_' . $id, (int)$body['index'] >= $nft['total_supply']);
            UserNft::commit($entry['id']);
            if ($user) {
                $user->current_nft_id_farming = null;
                $user->balance_block = 0;
                $user->save();
            }
        } else {
            Log::error('Error on retry: ' . $result->getBody());
        }
    }

    private function getHead() {
        $head = Cache::get('nft_last_tx');
        if (!$head) {
            $head = TxIndex::getLast();
            if (!$head) {
                $head = ['hash' => '', 'lt' => 0];
            }
            Cache::forever('nft_last_tx', $head);
        }

        return $head;
    }

    private function decodeTransaction($tx) {
        $hash = $tx['hash'];
        $lt = $tx['lt'];
        $internal = empty($tx['out_msg']);
        $from = '';
        $value = 0;
        if ($internal) {
            if (!isset($tx['in_msg']['source'])) {
                $internal = false;
            } else {
                $from = Address::parse($tx['in_msg']['source']['address'])->toString(true, true, false, false);
                $value = (int)$tx['in_msg']['value'];
            }
        }

        return ['hash' => $hash, 'lt' => $lt, 'internal' => $internal, 'from' => $from, 'value' => $value];
    }
}
