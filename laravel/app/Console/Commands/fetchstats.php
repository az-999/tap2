<?php

namespace App\Console\Commands;

use App\Models\WalletStats;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class fetchstats extends Command {

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetchstats';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch stats';

    const MINT_OP = "0x158dcbb4";
    const BURN_OP = "0x77159c12";
    const BURN2_OP = "0x04783f33";
    const BUY_OP = "0x00000002";
    const EXCESS_OP = "0xd53276db";
    const GG_SALE_IFC = "nft_sale_getgems_v3";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle() {
        Log::info('fetchstats::start');
        $watch = config('app.watch-addresses');
        $api = new TonApi(false);
        foreach ($watch as $wallet) {
            $address = $wallet['address'];
            Log::info('fetchstats::address: ' . $address);
            $afterLt = 0;
            $lastTx = WalletStats::getLastTx($address);
            if (!$lastTx) {
                Log::info('fetchstats::no last tx');
                // Get first tx in current time for fill it
                $txns = $api->getTransactions($address, 1);
                if (isset($txns['transactions']) && count($txns['transactions']) > 0) {
                    $tx = $txns['transactions'][0];
                    $afterLt = $tx['lt'];
                    $this->checkTx($tx, $api, $address, $tx['hash'], $tx['lt']);
                }
            } else {
                $afterLt = $lastTx->lt;
                Log::info('fetchstats::last tx: ' . $lastTx->lt);
            }

            $txns = $api->getTransactions($address, 100, 0, $afterLt, 'asc');
            if (isset($txns['transactions'])) {
                foreach ($txns['transactions'] as $tx) {
                    Log::info('fetchstats::tx: ' . $tx['lt'] . ' ' . $tx['hash']);
                    if ($tx['lt'] == $afterLt) {
                        Log::info('fetchstats::tx lt == afterLt');
                        continue;
                    }
                    if (!WalletStats::txExists($address, $tx['hash'], $tx['lt'])) {
                        Log::info('fetchstats::new tx: ' . $tx['lt'] . ' ' . $tx['hash']);
                        $this->checkTx($tx, $api, $address, $tx['hash'], $tx['lt']);
                    }
                }
            }
        }
        Log::info('fetchstats::end');
        return 0;
    }

    /**
     * Summary of checkTx
     * @param mixed $tx
     * @param TonApi $api
     * @return void
     */
    public function checkTx($tx, $api, $address, $hash, $lt) {
        $trace = $api->getTraces($tx['hash']);
        $tx = $trace['transaction'];
        if ($tx['in_msg']['value'] == 0 && isset($trace['children']) && count($trace['children']) > 0) {
            $this->checkHighloadTx($trace, $address, $hash, $lt);
        }
    }

    public function checkHighloadTx($tx, $address, $hash, $lt) {
        foreach ($tx['children'] as $child) {
            $type = $this->checkType($child);
            switch ($type) {
            case WalletStats::TYPE_MINT:
                $this->checkMintTx($child, $address, $lt, $hash);
                break;
            case WalletStats::TYPE_BURN:
                $this->checkBurnTx($child, $address, $lt, $hash);
                break;
            case WalletStats::TYPE_ROLYALTY:
                $this->checkBuyTx($child, $address, $lt, $hash);
                break;
            case WalletStats::TYPE_ROLYALTY_GG:
                $this->checkBuyTx($child, $address, $lt, $hash, true);
                break;
            case WalletStats::TYPE_PAYMENT:
                $this->checkPayment($child, $address, $lt, $hash);
                break;
            default:
                Log::info('unknown type: ' . $tx['transaction']['hash']);
                $inValue = $child['transaction']['in_msg']['value'];
                $fees = $child['transaction']['total_fees'];
                WalletStats::create([
                    'address' => $address,
                    'from' => $this->getFrom($tx),
                    'type' => $type,
                    'hash' => $hash,
                    'lt' => $lt,
                    'value' => $inValue,
                    'fees' => $fees,
                    'locked' => 0,
                    'income' => $inValue - $fees,
                ]);
            break;
            }
        }
    }

    private function checkPayment($tx, $address, $lt, $hash) {
        $fees = $this->collectFees($tx);
        if (isset($tx['children']) && count($tx['children']) > 0) {
            if ($tx['transaction']['in_msg']['value'] == 0) {
                $tx = $tx['children'][0];
            }
        }

        $inValue = $tx['transaction']['in_msg']['value'];
        if ($inValue == 0) return;

        $dest = Address::parse($tx['transaction']['in_msg']['destination']['address']);
        $addr = Address::parse($address);

        if ($dest->toTonscanFormat() == $addr->toTonscanFormat()) {
            Log::info('payment to self: ' . $tx['transaction']['hash']);
            WalletStats::create([
                'address' => $address,
                'from' => $this->getFrom($tx),
                'type' => WalletStats::TYPE_PAYMENT,
                'hash' => $hash,
                'lt' => $lt,
                'value' => $inValue,
                'fees' => $fees,
                'locked' => 0,
                'income' => $inValue - $fees,
            ]);
        } else {
            Log::info('payment to other: ' . $tx['transaction']['hash']);
        }
    }

    private function getFrom($tx) {
        if (isset($tx['transaction']['in_msg']['source'])) {
            return $tx['transaction']['in_msg']['source']['address'];
        }

        if (count($tx['children']) > 0) {
            return $this->getFrom($tx['children'][0]);
        }

        return '';
    }

    public function checkMintTx($tx, $address, $lt, $hash) {
        $inValue = $tx['transaction']['in_msg']['value'];
        $fees = $this->collectFees($tx);
        $outValue = $this->findOutValueMint($tx);
        $locked = $inValue - $fees - $outValue;
        $item = WalletStats::create([
            'address' => $address,
            'from' => $tx['transaction']['in_msg']['source']['address'],
            'type' => WalletStats::TYPE_MINT,
            'hash' => $hash,
            'lt' => $lt,
            'value' => $inValue,
            'fees' => $fees,
            'locked' => $locked,
            'income' => $outValue
        ]);

        Log::info('mint tx found and created: ' . $item->id . ' ' . $item->address . ' ' . $item->hash . ' ' . $item->lt);
    }

    public function checkBurnTx($tx, $address, $lt, $hash) {
        if (isset($tx['children']) && count($tx['children']) > 1) {
            Log::info('children more than 1: ' . $tx['transaction']['hash']);
            foreach ($tx['children'] as $child) {
                $this->checkBurnTx($child, $address, $lt, $hash);
            }

            return;
        }

        $inValue = $tx['transaction']['in_msg']['value'];
        $fees = $this->collectFees($tx);
        $outValue = $this->findOutValueBurn($tx, $address);
        if ($outValue == 0)  {
            Log::info('outvalue == 0: ' . $tx['transaction']['hash'] . ' to ' . $address);
            return;
        }

        if ($inValue == $outValue) {
            $outValue = $inValue - $fees;
        }

        $locked = $inValue - $fees - $outValue;
        $item = WalletStats::create([
            'address' => $address,
            'from' => $tx['transaction']['in_msg']['source']['address'],
            'type' => WalletStats::TYPE_BURN,
            'hash' => $hash,
            'lt' => $lt,
            'value' => $inValue,
            'fees' => $fees,
            'locked' => $locked,
            'income' => $outValue
        ]);

        Log::info('burn tx found and created: ' . $item->id . ' ' . $item->address . ' ' . $item->hash . ' ' . $item->lt);
    }

    public function checkBuyTx($tx, $address, $lt, $hash, $isGG = false) {
        $inValue = $tx['transaction']['in_msg']['value'];
        $buyValue = $tx['children'][0]['transaction']['in_msg']['value'];
        $income = $this->findOutToAddress($tx, $address);
        $fees = $this->collectFees($tx);

        $item = WalletStats::create([
            'address' => $address,
            'from' => $tx['transaction']['in_msg']['source']['address'],
            'type' => $isGG ? WalletStats::TYPE_ROLYALTY_GG : WalletStats::TYPE_ROLYALTY,
            'hash' => $hash,
            'lt' => $lt,
            'value' => $inValue,
            'fees' => $fees,
            'locked' => 0,
            'income' => $income,
        ]);

        Log::info('buy tx found and created: ' . $item->id . ' ' . $item->address . ' ' . $item->hash . ' ' . $item->lt . ' getgems: ' . $isGG ? 'yes' : 'no');
    }

    private function findOutToAddress($tx, $address) {
        $addrA = Address::parse($address);
        $addrB = Address::parse($tx['transaction']['in_msg']['destination']['address']);
        Log::info('findOutToAddress: ' . $addrA->toTonscanFormat() . '==' . $addrB->toTonscanFormat());
        if ($addrA->toTonscanFormat() == $addrB->toTonscanFormat()) {
            return $tx['transaction']['in_msg']['value'];
        }

        if (!isset($tx['children']) || count($tx['children']) == 0) {
            return 0;
        }

        foreach ($tx['children'] as $child) {
            $outValue = $this->findOutToAddress($child, $address);
            if ($outValue > 0) {
                return $outValue;
            }
        }

        return 0;
    }

    private function getFirstWithChilds($tx) {
        foreach ($tx['children'] as $child) {
            if (isset($child['children']) && count($child['children']) > 0) {
                return $child;
            }
        }

        return $tx;
    }

    private function findExcessValue($tx) {
        if (!isset($tx['children'])) {
            return 0;
        }

        if (count($tx['children']) == 0) {
            return 0;
        }

        foreach ($tx['children'] as $child) {
            if (isset($child['transaction']['in_msg']['op_code']) && $child['transaction']['in_msg']['op_code'] == self::EXCESS_OP) {
                if (!isset($child['children']) || count($child['children']) == 0) {
                    return $child['transaction']['in_msg']['value'];
                }

                return $child['children'][0]['transaction']['in_msg']['value'];
            }
        }

        return 0;
    }

    private function findOutValueBurn($tx, $address) {
        if (!isset($tx['children'])) {
            $a = Address::parse($address);
            $b = Address::parse($tx['transaction']['in_msg']['destination']['address']);

            if ($a->toTonscanFormat() == $b->toTonscanFormat()) {
                return $tx['transaction']['in_msg']['value'];
            }

            return 0;
        }

        if (count($tx['children']) == 0) {
            $a = Address::parse($address);
            $b = Address::parse($tx['transaction']['in_msg']['destination']['address']);

            if ($a->toTonscanFormat() == $b->toTonscanFormat()) {
                return $tx['transaction']['in_msg']['value'];
            }

            return 0;
        }

        if (count($tx['children']) == 1) {
            return $this->findOutValueBurn($tx['children'][0], $address);
        }

        $value = 0;
        foreach ($tx['children'] as $child) {
            $value += $this->findOutValueBurn($child, $address);
        }

        return $value;
    }

    private function findOutValueMint($tx) {
        if (!isset($tx['children'])) {
            return $tx['transaction']['in_msg']['value'];
        }

        if (count($tx['children']) == 0) {
            return $tx['transaction']['in_msg']['value'];
        }

        return $this->findOutValueMint($tx['children'][0]);
    }

    private function collectFees($tx) {
        $fee = $tx['transaction']['total_fees'];
        if (isset($tx['children']) && count($tx['children']) > 0) {
            foreach ($tx['children'] as $child) {
                $fee += $this->collectFees($child);
            }
        }

        return $fee;
    }

    private function checkType($tx) {
        if (!isset($tx['transaction']['in_msg']['op_code'])) {
            if (!isset($tx['children']) || count($tx['children']) == 0) {
                return WalletStats::TYPE_PAYMENT;
            } else if (count($tx['children']) == 1) {
                return $this->checkType($tx['children'][0]);
            }

            return WalletStats::TYPE_UNKNOWN;
        }

        switch ($tx['transaction']['in_msg']['op_code']) {
        case self::MINT_OP:
            return WalletStats::TYPE_MINT;
        case self::BURN_OP:
        case self::BURN2_OP:
            return WalletStats::TYPE_BURN;
        case self::BUY_OP:
            if (count($tx['interfaces']) > 0) {
                if ($tx['interfaces'][0] == self::GG_SALE_IFC) {
                    return WalletStats::TYPE_ROLYALTY_GG;
                }
            }
            return WalletStats::TYPE_ROLYALTY;
        default:
        break;
        }

        return WalletStats::TYPE_UNKNOWN;
    }
}
