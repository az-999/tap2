<?php
namespace App\Observers;

use App\Models\UserTelegram;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * User observer
 */
class UserTelegramObserver
{
    /**
     * @param User $user
     */
    public function saved(User $user)
    {
        //Debugbar::info("saved user.".$user->id);
        Cache::put("user.{$user->id}", $user, config('app.user_cache'));
    }

    /**
     * @param User $user
     */
    public function deleted(User $user)
    {
        //Debugbar::info("deleted user.".$user->id);
        Cache::forget("user.{$user->id}");
    }

    /**
     * @param User $user
     */
    public function restored(User $user)
    {
        //Debugbar::info("restored user.".$user->id);
        Cache::put("user.{$user->id}", $user, config('app.user_cache'));
    }

    /**
     * @param User $user
     */
    public function retrieved(User $user)
    {
        //Debugbar::info("retrieved user.".$user->id);
        Cache::add("user.{$user->id}", $user, config('app.user_cache'));
    }
}
