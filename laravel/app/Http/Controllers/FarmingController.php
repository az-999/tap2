<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Airdrop;
use App\Models\AirdropUser;
use App\Models\LogBalance;
use App\Models\Session;
use App\Models\SessionArchive;
use App\Models\Transaction;
use App\Models\UserGrant;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use DateTimeImmutable;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class FarmingController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }


    public function index(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = \App\Http\Controllers\StartController::getData();

        /** @var \App\Models\Session $session */
        $session = Session::where('status', [Session::STATUS_IN_PROGRESS, Session::STATUS_FINISHED])->where('user_telegram_id', $user->chat_id)->first();
        if ($session) {
            $data['session'] = [
                'start_at'  => $session['start_at'],
                'status'    => $session->statusList[$session['status']],
                'moon_time' => $session['moon_time'],
            ];
            $data['info']['taps'] = $session['taps'];
        } else {
            $data['session'] = [
                'status'   => 'await',
            ];
        }

        return response()->json($data);
    }

    public function start(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        if (Session::where('status', [Session::STATUS_IN_PROGRESS, Session::STATUS_FINISHED])->where('user_telegram_id', $user->chat_id)->first()) {
            return response()->json([
                'code'     => 403,
                'message'  => 'Сессиия уже открыта',
            ], 403);
        }
        $start_at = time();
        $finish_at = config('app.farming.length') + time();
        $moon_time = rand($start_at, $finish_at);

        $session = Session::create([
            'start_at'          => $start_at,
            'finish_at'         => $finish_at,
            'status'            => Session::STATUS_IN_PROGRESS,
            'user_telegram_id'  => $user->chat_id,
            'moon_time'         => $moon_time,
        ]);

        return response()->json([
            'status'    => 'inProgress',
            'id'        => $session->id,
            'start_at'  => $session->start_at,
            'finish_at' => $session->finish_at,
            'moon_time' => $moon_time,
        ]);
    }

    public function unblock(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        /** @var \App\Models\Session $session */
        $session = Session::where('status', [Session::STATUS_IN_PROGRESS, Session::STATUS_FINISHED])->where('user_telegram_id', $user->chat_id)->first();
        if (!$session) {
            return response()->json([
                'code'     => 403,
                'message'  => 'Сессиия еще не открыта',
            ], 403);
        }
        $finish_at = config('app.farming.length') + time();

        // Валидация на время сессии
        {
            $sessionFinishAt = $session->finish_at;
            $now = time();

            if ($now > $sessionFinishAt) {
                return response()->json([
                    'code'     => 431,
                    'message'  => 'Нельзя закрыть сессию после окончания',
                ], 400);
            }
        }
        $grant1 = rand(10, 1000);
        $grant = $grant1 * 8;
        if ($user->active_booster) {
            $grant = $grant * $user->active_booster;
        }
        $user->balanceAdd($grant, \App\Models\LogBalance::TYPE_FARMING_UNLOCK);

        return response()->json([
            'balance' => $user->balance,
            'grant' => $grant,
        ]);
    }

    public function finish(Request $request)
    {
        try {
            $fields = $request->validate([
                'tapCount' => 'required|integer',
            ]);

            $user = \App\Http\Middleware\FarmAuth::$user;

            /** @var Session $session */
            $session = Session::where('status', [Session::STATUS_IN_PROGRESS, Session::STATUS_FINISHED])->where('user_telegram_id', $user->chat_id)->first();

            if (is_null($session)) {
                return response()->json([
                    'code'     => 403,
                    'message'  => 'Сессиия не открыта',
                ], 400);
            }

            // Валидация на время сессии
            {
                $sessionStartAt = $session->start_at;
                $sessionFinishAt = time();
                if (!$sessionStartAt) {
                    throw new Exception('Time error');
                }
                if ($sessionFinishAt <= $sessionStartAt) {
                    throw new Exception('Time error');
                }
                $timeDiffInSeconds = $sessionFinishAt - $sessionStartAt;
                if ($timeDiffInSeconds < config('app.farming.length')) {
                    return response()->json([
                        'code'     => 431,
                        'message'  => 'Нельзя закрыть сессию раньше времени',
                    ], 400);
                }
            }

            // Валидация на кол-во тапов
            {
                $maxTapPerSecond = config('app.max-tap-per-second', 20);
                $maxTapCount = $maxTapPerSecond * $timeDiffInSeconds;

                if ($user->active_booster) {
                    $maxTapCount = $maxTapCount * $user->active_booster;
                }

                $tapCount = $fields['tapCount'];
                if ($tapCount > $maxTapCount) {
                    $tapCount = $maxTapCount;
                }
            }

            $price = config('app.farming.price');

            $session->taps = $tapCount;
            $session->amount = $price;
            $session->status = Session::STATUS_CLOSED;
            $session->finish_at = $sessionFinishAt;

            $data = $session->getAttributes();

            $session->delete();

            $amount_farmed = $price;

            if ($user->active_booster) {
                $amount_farmed = $amount_farmed * $user->active_booster;
            }

            $user->balance_farmed = $user->balance_farmed + $amount_farmed;
            $user->save();

            // Начисляю на счет
            $user->balanceAdd($amount_farmed, LogBalance::TYPE_FARMING);
            $user->balanceAdd($session->taps, LogBalance::TYPE_TAPS);

            $AirdropUser = AirdropUser::findByTgId($user->chat_id);
            if ($AirdropUser) {
                $AirdropUser->task6_balance += ($session->taps + $amount_farmed);
                $AirdropUser->save();
            }

            if ($user->ref_id > 0) {
                $user->sendRefTransactions($amount_farmed + $session->taps);
            }

            return response()->json([
                'session' => $data,
                'balance' => $user->balance,
            ]);

        } catch (\Throwable $e) {
            Log::error($e->getMessage() . "\n" . $e->getTraceAsString());
            \App\Service\TelegramLogger::send($e->getMessage());

            return response()->json([
                'code'    => 400,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function moonClaim(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        try {
            $grant = 50000000;

            /** @var \App\Models\Session $session */
            $session = Session::where('status', [Session::STATUS_IN_PROGRESS, Session::STATUS_FINISHED])->where('user_telegram_id', $user->chat_id)->first();
            if (is_null($session)) {
                return response()->json([
                    'code'     => 403,
                    'message'  => 'Сессиия не открыта',
                ], 400);
            }
            if ($session->moon_claimed) {
                return response()->json([
                    'code'     => 431,
                    'message'  => 'Нельзя забрать награду дважды',
                ], 400);
            }

            if (!($session->moon_time < (time() + 10) && $session->moon_time > (time() - 10))) {
                return response()->json([
                    'code'     => 400,
                    'message'  => 'Нельзя забрать награду вне обозначенного времени',
                ], 400);
            }

            $session->moon_claimed = 1;
            $session->save();

            // Начисляю на счет
            $user->balanceAdd($grant, LogBalance::TYPE_MOON);

            return response()->json([
                'balance' => $user->balance,
            ]);

        } catch (\Throwable $e) {
            Log::error($e->getMessage() . "\n" . $e->getTraceAsString());
            \App\Service\TelegramLogger::send($e->getMessage());

            return response()->json([
                'code'     => 400,
                'message'  => $e->getMessage(),
            ], 400);
        }
    }


}
