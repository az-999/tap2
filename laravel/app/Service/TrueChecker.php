<?php

namespace App\Service;

/**
 *
 */
class TrueChecker
{
    public $chat_id;
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
        return true;
    }
}
