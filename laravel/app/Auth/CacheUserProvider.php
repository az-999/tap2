<?php

namespace App\Auth;

use App\Models\User;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;


/**
 * Class CacheUserProvider
 * @package App\Auth
 */
class CacheUserProvider extends EloquentUserProvider
{
    /**
     * CacheUserProvider constructor.
     * @param HasherContract $hasher
     */
    public function __construct(HasherContract $hasher)
    {
        parent::__construct($hasher, UserTelegram::class);
    }

    /**
     * @param mixed $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        $user = Cache::get("user.$identifier");
        if (is_null($user)) {
            Log::info('user find in DB');
            $user = parent::retrieveById($identifier);
        }

        return $user;
    }
}
