<?php

namespace App\Service;


class YescoinChecker {
    public $userId;
    public $partnerId;

    protected $api;

    public function __construct($userId, $partnerId)
    {
        $this->userId = $userId;
        $this->partnerId = $partnerId;
        $this->api = new YescoinAPI(config('yescoin.api_key'));
    }

    public function check()
    {
        try {
            if ($this->api->playerIsOpenTma($this->userId)) {
                return true;
            }
        } catch (\Throwable $e) {
            return false;
        }

        return false;
    }
}
