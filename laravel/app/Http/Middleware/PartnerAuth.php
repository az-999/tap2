<?php

namespace App\Http\Middleware;

use App\Models\Partner;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class PartnerAuth {
    /** @var Partner $partner */
    public static $partner;

    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response {
        $token = $request->header('Authorization', false);
        if (!$token) {
            return response()->json([
                'code' => 400,
                'message' => 'token required'
            ], 400);
        }

        $partner = Cache::store('memcached')->get('task_check_partner_'.$token);
        if (!$partner) {
            $partner = Partner::where('key', $token)->first();
            if (!$partner) {
                return response()->json([
                    'code' => 400,
                    'message' => 'token invalid'
                ], 400);
            }

            Cache::store('memcached')->set('task_check_partner_'.$token, $partner);
        }

        self::$partner = $partner;
        $request->merge([
            'partner' => self::$partner,
        ]);

        return $next($request);
    }
}
