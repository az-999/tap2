<?php


namespace App\Http\Controllers;

use App\Models\Stake;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class LootboxController extends Controller {
    private $apiton;

    public function __construct()
    {
        $token = hash('sha256', config('jwt.secret'));
        $nftUrl = config('app.nft-url');
        $this->apiton = new BuyNft($nftUrl, $token, null, null);
    }

    public function index(Request $request) {
        return response()->json(config('app.lootboxes'));
    }

    public function list(Request $request) {
        $fields = $request->validate([
            'offset' => ['integer'],
            'limit'  => ['integer'],
        ]);

        $limit = $fields['limit'] > 0 ? $fields['limit'] : 10;
        $user = \App\Http\Middleware\FarmAuth::$user;
        $resp = Stake::listActiveForUser($user->chat_id, $fields['offset'], $limit);

        $lootboxes = config('app.lootboxes');
        $rows = BaseArrayHelper::map($lootboxes, 'id', function ($i) { return $i;});

        foreach ($resp['list'] as $item) {
            $item->lootbox = $rows[$item->lootbox_id];
        }

        return response()->json($resp);
    }

    public function stake(Request $request) {
        try {
            logger()->info('Starting stake process', [
                'request_data' => $request->all()
            ]);
            
            $fields = $request->validate([
                'id' => ['required', 'integer'],
                'address' => ['required', 'string'],
            ]);
            
            logger()->info('Stake request validated', [
                'fields' => $fields
            ]);

            $user = \App\Http\Middleware\FarmAuth::$user;
            $id = $fields['id'];

            $lootboxes = config('app.lootboxes');
            $rows = BaseArrayHelper::map($lootboxes, 'id', function ($i) { return $i;});
            if (!isset($rows[$id])) {
                return $this->error(404, 'Invalid lootbox ID');
            }

            $lootbox = $rows[$id];
            $item = Stake::create([
                'tg_id'       => $user->chat_id,
                'lootbox_id'  => $id,
                'amount'      => $lootbox['price'],
                'out_amount'  => $lootbox['reward'],
                'mint_count'  => $lootbox['nft_count'],
                'duration'    => $lootbox['duration'],
                'max_claims'  => $lootbox['max_claim'],
                'claims'      => 0,
                'address'     => '',
                'owner'       => $fields['address'],
                'txid'        => '',
                'status'      => Stake::STATUS_CREATED,
                'created_at'  => time(),
                'last_claim'  => 0,
                'next_claim'  => time() + $lootbox['duration'],
                'finished_at' => 0,
                'end_time'    => time() + $lootbox['duration'],
                'error'       => '',
            ]);

            logger()->info('Created stake record', [
                'stake_id' => $item->id,
                'lootbox_id' => $id,
                'owner' => $fields['address']
            ]);

            $payload = $this->apiton->stake($item);
            
            logger()->info('Generated stake payload', [
                'stake_id' => $item->id,
                'payload' => $payload
            ]);

            return response()->json([
                'id'    => $item->id,
                'body'  => $payload['body'],
                'to'    => $payload['to'],
                'value' => $payload['value'],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Stake validation error: ' . $e->getMessage(), [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            return $this->error(422, 'Validation error: ' . $e->getMessage());
        } catch (\Throwable $e) {
            \Log::error('Stake error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            
            logger()->debug('Stake error', [
                'error' => 'Stake error',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            
            $debug = [
                'error' => 'Stake error',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ];
            
            return response()->json([
                'error' => true,
                'message' => 'Internal server error occurred',
                'code' => 500,
                'debug' => $debug
            ], 500);
        }
    }

    public function stakeConfirm(Request $request) {
        logger()->info('Starting stake confirmation', [
            'request_data' => $request->all()
        ]);

        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'txid' => ['required', 'string'],
            'address' => ['required', 'string'],
        ]);

        logger()->info('Stake confirmation request validated', [
            'fields' => $fields
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != Stake::STATUS_CREATED) {
            logger()->error('Invalid stake status for confirmation', [
                'stake_id' => $item->id,
                'current_status' => $item->status,
                'expected_status' => Stake::STATUS_CREATED
            ]);
            return $this->error(400, 'Wrong status');
        }


        $maxAttempts = 3;
        $attempt = 0;
        $delay = 10;

        while ($attempt < $maxAttempts) {
            try {
                $info = $this->apiton->getStakeDetails($fields['address']);
                logger()->debug('Stake details from contract', [
                    'stake_id' => $item->id,
                    'attempt' => $attempt + 1,
                    'contract_next_claim' => $info['next_claim'],
                    'current_time' => time(),
                    'diff_seconds' => (int)$info['next_claim'] - time()
                ]);
                $item->next_claim = (int)$info['next_claim'] + 60;

                $start = $item->next_claim - $item->duration;
                $item->end_time = $start + ($item->duration * $item->max_claims) + 300; // +5 min reserve
                $item->txid = $fields['txid'];
                $item->address = $fields['address'];
                $item->status = Stake::STATUS_ACTIVE;
                $item->save();
                
                logger()->info('Stake confirmed successfully', [
                    'stake_id' => $item->id,
                    'status' => $item->status,
                    'address' => $item->address,
                    'next_claim' => $item->next_claim,
                    'end_time' => $item->end_time
                ]);

                return response()->json([
                    'id'         => $item->id,
                    'status'     => $item->status,
                    'claims'     => $item->claims,
                    'max_claims' => $item->max_claims,
                    'next_claim' => $item->next_claim,
                    'end_time'   => $item->end_time,
                ]);
            } catch (\Throwable $e) {
                logger()->warning('Stake confirm attempt failed', [
                    'stake_id' => $item->id,
                    'attempt' => $attempt + 1,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'contract_address' => $fields['address']
                ]);
                
                $attempt++;
                if ($attempt < $maxAttempts) {
                    sleep($delay);
                }
            }
        }

        return $this->error(408, 'Timeout waiting for stake confirmation');
    }

    public function stakeError(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'error' => ['required', 'string'],
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        $item->error = $fields['error'];
        $item->status = Stake::STATUS_ERROR;
        $item->save();

        return response()->json([
            'id' => $item->id,
            'status' => $item->status
        ]);
    }

    public function claim(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != Stake::STATUS_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        if (time() < $item->next_claim) {
            return $this->error(400, 'Too early');
        }

        $payload = $this->apiton->claim($item->address, $item->owner, $item->id);
        return response()->json([
            'id' => $item->id,
            'body' => $payload['body'],
            'to' => $payload['to'],
            'value' => $payload['value'],
        ]);
    }

    public function claimConfirm(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'txid' => ['required', 'string'],
            'owner_address' => ['required', 'string'],
        ]);

        Log::info('Claim confirm request received', [
            'fields' => $fields
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != Stake::STATUS_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        $tonapi = new TonApi(false);
        $mintedMetadata = $tonapi->getMintedNftsImages($fields['txid']);
        $minted = [];
        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});

        $mdmap = config('app.nft_item_id_by_metadata');
        Log::info('mdmap: ' . VarDumper::dumpAsString($mdmap));
        foreach ($mintedMetadata as $metadata) {
            Log::info('metadata: ' . VarDumper::dumpAsString($metadata));
            if (isset($mdmap[$metadata])) {
                Log::info('mdmap: ' . VarDumper::dumpAsString($mdmap[$metadata]));
                $id = $mdmap[$metadata];
                $minted[] = $rows[$id];
            }
        }

        $item->txid = $fields['txid'];

        $info = $this->apiton->getStakeDetails($item->address, $item->id, $fields['owner_address']);
        Log::info('Stake details received', [
            'info' => $info
        ]);
        $item->claims = (int)$info['claims_count'];
        $item->last_claim = time();
        if ( $item->claims >= $item->max_claims) {
            $item->status = Stake::STATUS_CLAIMED;
            $item->finished_at = time();
        } else {
            $item->next_claim = (int)$info['next_claim'];
            $item->status = Stake::STATUS_ACTIVE;
        }

        $problematicIds = [
            "5", "33", "97", "113", "118", "127", "131", "137", "156", "163", "173", "179", "185", "191", "202", "206", "207", "211", "212", "214",
            "222", "239", "243", "262", "272", "273", "276", "281", "284", "289", "290", "291", "292", "294", "298", "299", "300", "301", "308", "309",
            "310", "311", "312", "313", "314", "315", "316", "317", "321", "325", "326", "328", "333", "334", "343", "376", "381", "382", "385", "394",
            "398", "417", "435", "452", "479", "493", "502", "534", "542", "545", "553", "558", "567", "568", "572", "586", "587", "589", "595", "608",
            "614", "621", "629", "630", "632", "634", "635", "636", "638", "651", "685", "686", "688", "689", "690", "692", "732", "739", "751", "771",
            "809"
        ];
        if (in_array((string)$item->id, $problematicIds)) {
            $item->status = Stake::STATUS_CLOSED;
        }

        $item->save();

        return response()->json([
            'id' => $item->id,
            'status' => $item->status,
            'claims' => $item->claims,
            'max_claims' => $item->max_claims,
            'minted' => $minted,
            'reward' => $item->out_amount,
        ]);
    }

    public function restake(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'owner_address' => ['required', 'string'],
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != Stake::STATUS_CLAIMED) {
            return $this->error(400, 'Wrong status');
        }

        $result = $this->apiton->restake($item->address, $fields['owner_address'], $item->id);

        return response()->json([
            'id'    => $item->id,
            'body'  => $result['body'],
            'to'    => $result['to'],
            'value' => $result['value'],
        ]);
    }

    public function restakeConfirm(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'txid' => ['required', 'string'],
            'owner_address' => ['required', 'string'],
        ]);

        Log::info('Restake confirm request received', [
            'fields' => $fields
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != Stake::STATUS_CLAIMED) {
            return $this->error(400, 'Wrong status');
        }

        $info = $this->apiton->getStakeDetails($item->address, $item->id, $fields['owner_address']);

        // Check if enough claims have been made
        if ($item->claims >= $item->max_claims) {
            Log::info('Claims check passed for restake', [
                'claims' => $item->claims,
                'max_claims' => $item->max_claims,
                'stake_id' => $item->id
            ]);
        } else {
            Log::error('Not enough claims for restake', [
                'claims' => $item->claims,
                'max_claims' => $item->max_claims,
                'stake_id' => $item->id
            ]);
            return $this->error(400, 'Not enough claims to restake. Must complete all claims first.');
        }
        $item->txid = $fields['txid'];
        $item->created_at = time();
        $item->status = Stake::STATUS_ACTIVE;
        $item->claims = (int) $info['claims_count'];
        $item->last_claim = 0;
        $item->finished_at = 0;
        $item->next_claim =(int) $info['next_claim'];
        $item->save();

        return response()->json([
            'id' => $item->id,
            'status' => $item->status,
            'claims' => $item->claims,
            'max_claims' => $item->max_claims
        ]);
    }

    public function withdraw(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'owner_address' => ['required', 'string'],
        ]);

        Log::info('Withdraw request received:', [
            'request_id' => $fields['id'],
            'owner_address' => $fields['owner_address']
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            Log::error('Stake not found:', ['id' => $fields['id']]);
            return $this->error(404, 'Not found');
        }

        Log::info('Stake found:', [
            'id' => $item->id,
            'address' => $item->address,
            'status' => $item->status
        ]);

        if ($item->status != Stake::STATUS_CLAIMED) {
            Log::error('Wrong stake status:', [
                'id' => $item->id,
                'current_status' => $item->status,
                'expected_status' => Stake::STATUS_CLAIMED
            ]);
            return $this->error(400, 'Wrong status');
        }

        try {
            $result = $this->apiton->stakeWithdraw($item->address, $fields['owner_address'], $item->id);
            Log::info('Withdraw response received:', [
                'id' => $item->id,
                'to' => $result['to'],
                'value' => $result['value'],
                'body_length' => strlen($result['body'])
            ]);

            return response()->json([
                'id' => $item->id,
                'body' => $result['body'],
                'to' => $result['to'],
                'value' => $result['value'],
            ]);
        } catch (\Exception $e) {
            Log::error('Withdraw error:', [
                'id' => $item->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function withdrawConfirm(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
            'txid' => ['required', 'string'],
        ]);

        Log::info('Withdraw confirm start', [
            'id' => $fields['id'],
            'txid' => $fields['txid']
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }
        
        if ($item->status != Stake::STATUS_CLAIMED) {
            Log::info('Stake found', [
                'id' => $item->id,
                'current_status' => $item->status,
                'is_claimed' => $item->status == Stake::STATUS_CLAIMED
            ]);
            return $this->error(400, 'Wrong status');
        }

        $item->txid = $fields['txid'];
        $item->status = Stake::STATUS_CLOSED;
        $item->save();

        return response()->json([
            'id' => $item->id,
            'status' => $item->status,
        ]);
    }

    public function sync(Request $request) {
        $fields = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $item = Stake::find($fields['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status == Stake::STATUS_CREATED) {
            return response()->json([
                'success' => false,
                'id' => $item->id,
                'status' => $item->status,
                'claims' => $item->claims,
                'max_claims' => $item->max_claims,
                'next_claim' => $item->next_claim
            ]);
        }

        $details = $this->apiton->getStakeDetails($item->address);
        $claimsOld = $item->claims;
        $item->claims = (int) $details['claims_count'];

        if ($claimsOld == $item->claims) {
            return response()->json([
                'success' => false,
                'id' => $item->id,
                'status' => $item->status,
                'claims' => $item->claims,
                'max_claims' => $item->max_claims,
                'next_claim' => $item->next_claim
            ]);
        }

        $item->next_claim = (int) $details['next_claim'];
        if ($item->status == Stake::STATUS_ACTIVE) {
            if ($item->claims >= $item->max_claims) {
                $item->status = Stake::STATUS_CLAIMED;
            }

            $item->last_claim = time();
        }

        $item->save();

        return response()->json([
            'success' => true,
            'id' => $item->id,
            'status' => $item->status,
            'claims' => $item->claims,
            'max_claims' => $item->max_claims,
            'next_claim' => $item->next_claim
        ]);
    }

    private function error(int $code, string $message)
    {
        return response()->json([
            'code'      => $code,
            'message'   => $message
        ], 400);
    }
}
