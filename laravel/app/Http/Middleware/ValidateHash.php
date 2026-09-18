<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Closure;

class ValidateHash {

    const MAC_HEADER = 'X-REQUEST-SIGN';
    const MAC_KEY = 'hash';

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) {
        $params = $request->all();
        $expect = '';
        if (config('app.sign.method') == 'header') {
            $expect = $request->header(self::MAC_HEADER);
        } else {
            $expect = $params[self::MAC_KEY];
            unset($params[self::MAC_KEY]);
        }

        if (!$expect) {
            return \response()->json([
                'code'    => 401,
                'message' => 'invalid signature'
            ], 401);
        }

        $params['time'] = ceil(time() / 60);
        $str = $this->paramsToString($params);
        $sign = hash_hmac('sha256', $str, config('app.sign.key'));
        if ($sign !== $expect) {
            return \response()->json([
                'code'    => 401,
                'message' => 'invalid signature'
            ], 401);
        }

        return $next($request);
    }

    private function paramsToString($params)
    {
        $str = '';
        ksort($params, SORT_STRING);
        foreach ($params as $key => $value) {
            $str .= $key.'='.$value . '&';
        }

        if (strlen($str) > 0) {
            $str = substr($str, 0, -1);
        }

        return $str;
    }
}
