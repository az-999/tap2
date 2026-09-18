<?php

namespace App\Http\Middleware;

use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AppStoreTracker
{
    public $whiteIplist = [
        '*',
        '135.148.138.79',
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isApproveAccess = false;
        foreach ($this->whiteIplist as $whiteIp) {
            if ($whiteIp == '*') {
                $isApproveAccess = true;
                break;
            }
            if ($request->ip() == $whiteIp) {
                $isApproveAccess = true;
                break;
            }
        }
        if (!$isApproveAccess) {
            return \response()->json([
                'code'    => 403,
                'message' => 'Не верный IP'
            ], 403);
        }

        return $next($request);
    }


}
