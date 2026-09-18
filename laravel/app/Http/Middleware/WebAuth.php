<?php

namespace App\Http\Middleware;

use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class WebAuth
{
    /** @var UserTelegram */
    public static $user;

    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard()->check()) {
            return redirect('/dashboard');
        }
        $has_role = in_array(\Illuminate\Support\Facades\Auth::user()->chat_id, config('app.stat_user_list'));
        if (!$has_role) {
            return redirect('/dashboard');
        }

        return $next($request);
    }


}
