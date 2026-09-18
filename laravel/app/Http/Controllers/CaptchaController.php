<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\PaymentLock;
use App\Models\UserNft;
use App\Service\BaseArrayHelper;
use App\Service\Captcha;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CaptchaController extends Controller
{
    public $captcha;
    public $captcha2;
    public $ok;
    public $error;


    public function __construct()
    {
        $this->captcha = new Captcha();
        $this->captcha2 = new Captcha();
        $this->ok = false;
        $this->error = null;
    }


    public function index()
    {
        session()->put('captcha', $this->captcha->phrase);
        session()->put('captcha_position', $this->captcha->position);

        return $this->view();
    }

    public function view()
    {
        return view('captcha')->with('captcha', $this->captcha)->with('ok', $this->ok)->with('error', $this->error);
    }

    public function check(Request $request)
    {
        $data = $request->validate([
            'guess' => 'required|integer',
            'captcha' => 'required|string',
        ]);

        $captcha = session()->get('captcha');
        $captcha_position = session()->get('captcha_position');

        if ($data['captcha'] != $captcha) {
            $this->error = 'Invalid phrase';
        }

        if ($data['guess'] != $captcha_position) {
            $this->error = 'Invalid image position';
        }

        if ($this->error) {
            session()->put('captcha', $this->captcha->phrase);
            session()->put('captcha_position', $this->captcha->position);
            return $this->view();
        }

        $this->ok = true;

        return $this->view();
    }

    public function getChallenge(Request $request)
    {
        $fields = $request->validate([
            'nft_id' => 'required|integer',
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        Log::info('getChallenge: ' . $user->chat_id . ' ' . $fields['nft_id']);
        $id = $fields['nft_id'];
        $old = UserNft::where('tg_id', $user->chat_id)->where('nft_id', $id)->first();
        if ($old && $id < 6) {
            if ($old->commit) {
                return $this->error(420, 'У вас уже есть NFT');
            }

            return response()->json([
                'verify'        => false,
                'status'        => (!$old->is_send && $old->tries == 0) ? 'wait-tx' : ($old->tries > 0 ? 'issue' : 'pending'),
                'address'       => config('app.highload'),
                'price'         => config('app.nft-price'),
                'balance'       => $user->balance,
                'balance_block' => $user->balance_block,
            ]);
        }

        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        if (!isset($rows[$id])) {
            return $this->error(404, 'Invalid NFT ID');
        }

        $nft = $rows[$id];
        $price = $nft['price'];
        if ($user->balance < $price) {
            return $this->error(420, 'Недостаточно средств');
        }

        // if ($user->balance_block > 0) {
        //     return $this->error(401, 'У вас уже висит заблоченная сумма в транзакции');
        // }

        Log::info('NFT: ' . $id . ' price: ' . $price);
        Cache::put('captcha_' . $user->id, [
            'phrase'    => $this->captcha->phrase,
            'position'  => $this->captcha->position,
            'position2' => $this->captcha2->position,
        ], 6000);

        // Log::info('captcha: ' . $this->captcha->phrase);
        Log::info('captcha position: ' . $this->captcha->position);
        Log::info('captcha position2: ' . $this->captcha2->position);

        return response()->json([
            'verify' => true,
            // 'captcha'   => $this->captcha->builder->inline(),
            'up'     => $this->captcha->top->toGif()->toDataUri(),
            'down'   => $this->captcha->bottom->toGif()->toDataUri(),
            'up2'    => $this->captcha2->top->toGif()->toDataUri(),
            'down2'  => $this->captcha2->bottom->toGif()->toDataUri(),
        ]);
    }

    public function verify(Request $request)
    {
        $data = $request->validate([
            // 'captcha' => 'required|string',
            'position'  => 'required|integer',
            'position2' => 'required|integer',
            'wallet'    => 'required|string',
            'nft_id'    => 'required|integer',
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        Log::info('getChallenge: ' . $user->chat_id . ' ' . $data['nft_id']);
        $cached = Cache::get('captcha_' . $user->id);
        if (!$cached) {
            return $this->error(420, 'Captcha expired');
        }

        Cache::forget('captcha_' . $user->id);
        $captcha = $cached['phrase'];
        $captcha_position = $cached['position'];
        $captcha2_position = $cached['position2'];

        Log::info('captcha: ' . $captcha);
        Log::info('captcha position: ' . $captcha_position);
        Log::info('captcha position2: ' . $captcha2_position);


        if ($data['position'] != $captcha_position) {
            return $this->error(422, 'Invalid image position');
        }

        if ($data['position2'] != $captcha2_position) {
            return $this->error(423, 'Invalid image position 2');
        }

        $id = $data['nft_id'];
        $wallet = Address::parse($data['wallet'])->toString(true, true, false, false);

        if ($id < 6 && UserNft::isWalletExists($wallet)) {
            return $this->error(424, 'Cannot issue on this wallet, plase try again later');
        }

        $nftList = config('app.nft-list');
        $rows = BaseArrayHelper::map($nftList, 'id', function ($i) { return $i;});
        if (!isset($rows[$id])) {
            return $this->error(404, 'Invalid NFT ID');
        }

        $nft = $rows[$id];
        $price = $nft['price'];
        $comission = config('app.nft-price');
        if ($id > 6) $comission = $nft['comission'];

        $old = UserNft::where('tg_id', $user->chat_id)->where('nft_id', $id)->first();
        if ($old && $id < 6) {
            if ($old->commit) {
                return $this->error(420, 'У вас уже есть NFT');
            } else {
                return response()->json([
                    'address'       => config('app.highload'),
                    'price'         => $comission,
                    'balance'       => $user->balance,
                    'balance_block' => $user->balance_block,
                    'status'        => (!$old->is_send && $old->tries == 0) ? 'wait-tx' : ($old->tries > 0 ? 'issue' : 'pending'),
                ]);
            }
        } else if ($old) {
            Log::info('NFT old found: ' . $id . ' price: ' . $price);
            $locked = PaymentLock::where('user_nft_id', $old->id)->first();
            if ($locked) {
                if (!$old->commit) {
                    return response()->json([
                        'address'       => config('app.highload'),
                        'price'         => config('app.nft-price'),
                        'lock_id'       => $locked->id,
                        'balance'       => $user->balance,
                        'balance_block' => $user->balance_block,
                        'status'        => (!$old->is_send && $old->tries == 0) ? 'wait-tx' : ($old->tries > 0 ? 'issue' : 'pending'),
                    ]);
                }
            }
        }

        if ($user->balance < $price) {
            return $this->error(400, 'Недостаточно денег');
        }

        if ($price > 0) $user->balanceSub($price,LogBalance::TYPE_NFT_BLOCK);

        $un = UserNft::create([
            'tg_id'  => $user->chat_id,
            'nft_id' => $id,
            'wallet' => $wallet,
            'commit' => false,
        ]);

        $locked = PaymentLock::create([
            'tg_id'  => $user->chat_id,
            'user_nft_id' => $un->id,
            'amount' => $price,
        ]);

        Log::info('locked: ' . $locked->id . ' ' . $locked->amount);

        return response()->json([
            'address'       => config('app.highload'),
            'lock_id'       => $locked->id,
            'price'         => $comission,
            'balance'       => $user->balance,
            'balance_block' => $user->balance_block,
            'status'        => 'wait-tx',
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
