<?php

namespace App\Http\Middleware;

use App\Models\AirdropUser;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Airdrop
{
    /** @var AirdropUser $AirdropUser */
    public static $AirdropUser;

    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $AirdropUser = AirdropUser::findByTgId(\App\Http\Middleware\ApiAuth::$user->chat_id);
        if (is_null($AirdropUser)) {
            return \response()->json([
                'code'    => 403,
                'message' => 'Oferta required'
            ], 403);
        }
        self::$AirdropUser = $AirdropUser;

        return $next($request);
    }


}
