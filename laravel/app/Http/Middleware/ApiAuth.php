<?php

namespace App\Http\Middleware;

use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAuth
{
    /** @var UserTelegram */
    public static $user;
    public static $token;

    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard('api')->check()) {
            return \response()->json([
                'code'    => 401,
                'message' => 'token required'
            ], 401);
        }
        \App\Http\Middleware\FarmAuth::$user = Auth::guard('api')->user();
        self::$user = Auth::guard('api')->user();
        self::$token = substr($request->header('Authorization'),7);

        return $next($request);
    }


}
