<?php

namespace App\Console\Commands;

use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\MintTx;
use App\Models\PaymentLock;
use App\Models\UserNft;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\TonApi;
use App\Service\VarDumper;
use Cache;
use Catchain\Ton\Address\Address;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class mint extends Command
{
    const MINT_TX_LIMIT = 1000;

    // Время в сек периуда до которого ошибка (TX NOT FOUNT) от TONAPI не засчитывается, мы считаем ее задержавшейся
    const TONAPI_TX_NOTFOUNT_LIFE_SEC = 120;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mint';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        $nftUrl = config('app.nft-url');
        $token = hash('sha256', config('jwt.secret'));
        $buyNft = new BuyNft($nftUrl, $token, null, null);
        $tonApi = new TonApi(false);
        Log::info('Command: mint');

        $this->verifyTxns($tonApi);
        $this->issue($tonApi, $buyNft);
        $this->checkIssue($buyNft);
        $this->releaseStuckPoints();
    }

    private function verifyTxns(TonApi $tonApi)
    {
        Log::info('verifyTxns: start');
        $unverified = MintQueue::listUnverified();
        $wallet = config('app.highload');
        $tonApi = new TonApi(false);
        Log::info(VarDumper::dumpAsString([
            'unverified count' => count($unverified),
        ]));

        /** @var MintQueue $row */
        foreach ($unverified as $row) {
            try {
                $txid = $row->txid;
                Log::info('Verify: ' . $txid);

                $tx = $tonApi->get('v2/blockchain/transactions/' . $txid);
                $locked = PaymentLock::where('tg_id', $row->tg_id)->where('user_nft_id', $row->id)->first();
                if ($locked) { // cleanup lock if is exists
                    Log::warning('locked: ' . $row->tg_id . ' ' . $row->id);
                    $locked->delete();
                }

                if (isset($tx['error'])) {
                    $is_set_error = false;
                    if ($tx['error'] == 'entity not found') {
                        $c = new \DateTime($row->created_at);
                        if (time() - $c->format('U') > self::TONAPI_TX_NOTFOUNT_LIFE_SEC)  {
                            $is_set_error = true;
                        }
                    } else {
                        $is_set_error = true;
                    }

                    if ($is_set_error) {
                        Log::info('Verify: error: ' . $tx['error']);
                        $row->error = $tx['error'];
                        $row->status = MintQueue::STATUS_ERROR;
                        if ($row->save()) {
                            Log::info('Verify: saved');
                        } else {
                            Log::info('Verify: not saved');
                        }

                        $nftList = config('app.nft-list');
                        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
                        $nft = $rows[$row->nft_id];
                        $price = $nft['price'];
                        $entry = UserNft::where('tg_id', $row->tg_id)->where('nft_id', $row->nft_id)->first();
                        if (!is_null($entry)) $entry->delete();
                        $user = UserTelegram::findByTgId($row->tg_id);
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);
                        if (!$user->save()) {
                            Log::info('Verify: not saved user');
                        }

                        if (time() - strtotime($row->created_at) > 60 * 60) {
                            $row->status = MintQueue::STATUS_ERROR;
                            $row->error = 'Transaction not found';
                            if ($row->save()) {
                                Log::info('Verify: saved');
                            } else {
                                Log::info('Verify: not saved');
                            }
                        }
                    }
                } else {
                    if (!$tx['success']) {
                        Log::info('Verify: failed');
                        $row->status = MintQueue::STATUS_ERROR;
                        $row->error = 'Transaction failed';
                        if ($row->save()) {
                            Log::info('Verify: saved');
                        } else {
                            Log::info('Verify: not saved');
                        }

                        $nftList = config('app.nft-list');
                        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
                        $nft = $rows[$row->nft_id];
                        $price = $nft['price'];
                        $entry = UserNft::where('tg_id', $row->tg_id)->where('nft_id', $row->nft_id)->first();
                        if (!is_null($entry)) $entry->delete();
                        $user = UserTelegram::findByTgId($row->tg_id);
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);
                        $user->save();

                        continue;
                    }

                    Log::info(VarDumper::dumpAsString([
                        'time()'     => time(),
                        '$tx[utime]' => $tx['utime'],
                        'diff'       => time() - $tx['utime'],
                        'bool'       => time() - $tx['utime'] > 3600 * 1000,
                    ]));
                    if (time() - $tx['utime'] > 3600 * 1000) {
                        Log::info('Verify: expired');
                        $row->status = MintQueue::STATUS_ERROR;
                        $row->error = 'Transaction expired';
                        if ($row->save()) {
                            Log::info('Verify: saved');
                        } else {
                            Log::info('Verify: not saved');
                        }

                        $nftList = config('app.nft-list');
                        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
                        $nft = $rows[$row->nft_id];
                        $price = $nft['price'];
                        $entry = UserNft::where('tg_id', $row->tg_id)->where('nft_id', $row->nft_id)->first();
                        if (!is_null($entry)) $entry->delete();
                        $user = UserTelegram::findByTgId($row->tg_id);
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);
                        $user->save();

                        continue;
                    }

                    $sourceAddress = Address::parse($tx['account']['address'])->toString(true, true, false, false);
                    if ($sourceAddress != $row['address']) {
                        $row->status = MintQueue::STATUS_ERROR;
                        $row->error = 'Wrong source address';
                        if ($row->save()) {
                            Log::info('Verify: saved');
                        } else {
                            Log::info('Verify: not saved');
                        }

                        $nftList = config('app.nft-list');
                        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
                        $nft = $rows[$row->nft_id];
                        $price = $nft['price'];
                        $entry = UserNft::where('tg_id', $row->tg_id)->where('nft_id', $row->nft_id)->first();
                        if (!is_null($entry)) $entry->delete();
                        $user = UserTelegram::findByTgId($row->tg_id);
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);
                        $user->save();

                        continue;
                    }

                    $found = false;
                    foreach($tx['out_msgs'] as $msg) {
                        $destAddress = Address::parse($msg['destination']['address'])->toString(true, true, false, false);
                        Log::info(VarDumper::dumpAsString([
                            'DestHex'      => $msg['destination']['address'],
                            '$destAddress' => $destAddress,
                            '$wallet'      => $wallet,
                            'bool'         => $destAddress == $wallet,
                        ]));

                        if ($destAddress == $wallet) {
                            if ($msg['value'] === $row->amount) {
                                $found = true;
                                break;
                            }
                        }
                    }

                    if ($found) {
                        self::success($row);
                    } else {
                        $row->status = MintQueue::STATUS_ERROR;
                        $row->error = 'Wrong destination address or value';
                        if ($row->save()) {
                            Log::info('Verify: saved');
                        } else {
                            Log::info('Verify: not saved');
                        }

                        $nftList = config('app.nft-list');
                        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
                        $nft = $rows[$row->nft_id];
                        $price = $nft['price'];
                        $entry = UserNft::where('tg_id', $row->tg_id)->where('nft_id', $row->nft_id)->first();
                        if (!is_null($entry)) $entry->delete();
                        $user = UserTelegram::findByTgId($row->tg_id);
                        $user->current_nft_id_farming = null;
                        $user->balance_block = 0;
                        $user->balanceAdd($price,LogBalance::TYPE_NFT_REJECT);
                        $user->save();
                    }
                }
            } catch(Exception $e) {
                Log::error($e->getMessage());
            }
        }

        Log::info('verify: done');
    }

    /**
     * @param \App\Models\MintQueue $row
     * @return void
     */
    public static function success($row)
    {
        $row->status = MintQueue::STATUS_VERIFIED;
        $row->verified_at = date('Y-m-d H:i:s');
        if ($row->save()) {
            Log::info('Verify: saved');
        } else {
            Log::info('Verify: not saved');
        }
        $u = UserTelegram::getByChatId($row->tg_id);
        $u->has_one_pay = UserTelegram::HAS_ONE_PAY_YES_TRANSACTION;
        $u->save();
    }

    public function issue(TonApi $tonApi, BuyNft $buyNft)
    {
        Log::info('issue: start');
        $wallet = config('app.highload');
        $verified = MintQueue::listVerified();
        Log::info('issue: verified: ' . count($verified));
        $toMint = [];
        $toTransfer = [];
        $walletNfts = $tonApi->getNfts($wallet);

        $candidates = [];
        $counter = 0;

        /** @var \App\Models\MintQueue $row */
        foreach ($verified as $row) {
            $address = Address::parse($row->address);
            $ownerAddressHex = $address->toString(userFriendly: false);
            $mintNeeded = !$this->hasNftItem($walletNfts, $ownerAddressHex);

//            if (isset($nftsByCollectionAddress[$row->address])) {
//                foreach ($nftsByCollectionAddress[$row->address] as $nft) {
//                    $toTransfer[] = [
//                        'address' => $nft['address'], // NFT item address base58
//                        'nft_id'  => $nft['id'],
//                        'item_id' => $row->item_id,
//                        'dest'    => $row->address,
//                    ];
//
//                    $mintNeeded = false;
//                    break;
//                }
//            }

            if ($mintNeeded) {
                $toMint[] = [
                    'nft_id'  => $row->nft_id,
                    'item_id' => $row->item_id,
                    'address' => $row->address, // Адрес получателя base58
                ];

                $candidates[] = $row;
                $counter++;
                if ($counter > self::MINT_TX_LIMIT) {
                    break;
                }
            }
        }

        Log::info('issue: mint: ' . count($toMint));
        if (count($toMint) > 0) {
            $result = $buyNft->nftIssue(['mint' => $toMint, 'transfer' => $toTransfer]);

            Log::info(VarDumper::dumpAsString($result));

            $queryId = $result['queryId'];

            foreach ($candidates as $row) {
                $row->status = MintQueue::STATUS_ISSUED;
                $row->query_id = $queryId;
                $row->verified_at = date('Y-m-d H:i:s');
                if ($row->save()) {
                    Log::info('Verify: saved');
                } else {
                    Log::info('Verify: not saved');
                }
            }
        }

        Log::info('issue: done');
    }

    public function checkIssue(BuyNft $buyNft)
    {
        Log::info('checkIssue: start');
        $issued = MintQueue::listIssued();
        Log::info('checkIssue: issued: ' . count($issued));
        $issuedByQueryId = [];
        foreach ($issued as $row) {
            $issuedByQueryId[$row->query_id][] = $row;
        }

        $nftList = config('app.nft-list');
        $nfts = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});

        foreach ($issuedByQueryId as $queryId => $rows) {
            $result = $buyNft->checkIssue($queryId);
            Log::info(VarDumper::dumpAsString($result));
            if ($result['result']) {
                foreach ($rows as $row) {
                    $row->status = MintQueue::STATUS_COMPLETED;
                    $row->completed_at = date('Y-m-d H:i:s');
                    if ($row->save()) {
                        Log::info('Verify: saved');
                    } else {
                        Log::info('Verify: not saved');
                    }

                    /** @var UserTelegram $user */
                    $user = UserTelegram::findByTgId($row->tg_id);
                    if ($user) {
                        if ($user->balance_block > 0) {
                            $user->balance_block = 0;
                            $user->current_nft_id_farming = null;
                        }

                        if ($row->nft_id == 6) { // ship module
                            $user->ship_module_count++;
                        } else if ($row->nft_id == 7) { // og pass
                            $user->balanceAdd(config('app.ogpass_reward'), LogBalance::TYPE_MINT_REWARD);
                        }
                        $user->save();
                    }

                    $nftrec = UserNft::query()->where('nft_id', $row->nft_id)->where('tg_id', $row->tg_id)->first();
                    if (!$nftrec) continue;
                    $nftrec->is_send = true;
                    $nftrec->commit = true;
                    $nftrec->save();
                }
            } else {
                foreach ($rows as $row) {
                    if (time() - strtotime($row->verified_at) > 1800) { // retry after 30min
                        Log::info('checkIssue: retry');
                        $row->status = MintQueue::STATUS_VERIFIED;
                        $row->verified_at = date('Y-m-d H:i:s');
                        $row->save();
                    }
                }
            }
        }

        Log::info('checkIssue: done');
    }

    private function releaseStuckPoints() {
        $locks = PaymentLock::getUncommited();
        Log::info('releaseStuckPoints: ' . count($locks));
        foreach ($locks as $lock) {
            Log::info('releaseStuckPoints: ' . $lock->tg_id . ' ' . $lock->amount);
            $entry = UserNft::where('id', $lock->user_nft_id)->first();
            if (!$entry) { // is released
                Log::warning('releaseStuckPoints: entry not found: ' . $lock->user_nft_id);
                $lock->delete();
                continue;
            }

            $user = UserTelegram::findByTgId($lock->tg_id);
            if ($user) {
                $user->balanceAdd($lock->amount, LogBalance::TYPE_NFT_REJECT);
                $lock->delete();
                Log::info('releaseStuckPoints: release: ' . $lock->tg_id . ' ' . $lock->amount);
            } else {
                Log::warning('releaseStuckPoints: user not found: ' . $lock->tg_id);
                $lock->delete();
                continue;
            }
        }
    }

    private function hasNftItem($walletNfts, $ownerAddressHex)
    {
        foreach ($walletNfts['nft_items'] as $nft) {
            if ($nft['owner']['address'] == $ownerAddressHex) {
                return $nft;
            }
        }

        return null;
    }

}
