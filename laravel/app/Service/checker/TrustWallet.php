<?php

namespace App\Service\checker;

use App\Models\UserTask;
use App\Service\VarDumper;
use Extraton\TonClient\Exception\LogicException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 *
 */
class TrustWallet
{
    public $user_id;

    public function __construct($params)
    {
        foreach ($params as $key => $value) {
            $this->$key = $value;
        }
    }

    /**
     * @return bool
     */
    public function check()
    {
        $task_id = 89;

        $w = UserTask::query()
            ->where('chat_id', $this->user_id)
            ->where('task_id', $task_id)
            ->first();

        $is_exist = !is_null($w);

        return $is_exist;
    }
}
