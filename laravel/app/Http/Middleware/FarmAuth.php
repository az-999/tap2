<?php

namespace App\Http\Middleware;

use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FarmAuth
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
        $token = $request->header('Authorization', $request->get('hash'));

        if (!$token) {
            return \response()->json([
                'data'   => null,
                'errors' => 'token required'
            ], 400);
        }

        $one = UserTelegram::where('token', $token)->first();

        if (!$one) {
            return \response()->json([
                'data'   => null,
                'errors' => 'You are unauthorized'
            ], 401);
        }

        self::$user = $one;
        self::$token = $token;

        $request->merge([
            'user' => $one
        ]);

        return $next($request);
    }


}
