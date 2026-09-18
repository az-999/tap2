<?php

namespace App\Service;


use App\Models\UserTask;

/**
 *
 */
class AppStoreTrackerChecker
{
    public $task_id;
    public $user_id;
    public $user_task;

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
        return !is_null($this->user_task);
    }
}
