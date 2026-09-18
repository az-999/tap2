<?php

namespace App\Http\Actions;

use App\Http\Middleware\Airdrop;
use App\Models\AirdropKols;
use App\Models\LogBalance;
use App\Models\Task;
use App\Models\UserTask;
use App\Service\BaseArrayHelper;
use App\Service\VarDumper;
use Illuminate\Support\Arr;

class AirdropCompleteTask
{
    public $id;

    public function __construct($params)
    {
        foreach ($params as $k => $v)
        {
            $this->$k = $v;
        }
    }


    public function run()
    {
        $grant = 1;

        $user = \App\Http\Middleware\FarmAuth::$user;
        $fields = [
            'id' => \App\Http\Controllers\AirdropController::$taskList[$this->id],
        ];

        // Валидация
        $userTask = UserTask::where('chat_id', $user->chat_id)->where('task_id', $fields['id'])->first();
        if (!is_null($userTask)) {
            if ($userTask->is_claimed == 1) {
                Airdrop::$AirdropUser->balance_ap += $grant;
                Airdrop::$AirdropUser->addTask5($fields['id']);
                Airdrop::$AirdropUser->save();

                return response()->json([
                    'balance_ap'  => Airdrop::$AirdropUser->balance_ap,
                    'grant'       => $grant,
                    'grant_point' => 0,
                ]);
            }
        }

        $task = Task::query()->find($fields['id']);

        {   // Проверяю задание
            $checker_options = json_decode($task['checker_options'], 1);
            $className = $task['checker'];

            // генерирую объект для проверки
            switch ($className) {
                case \App\Service\TelegramChecker::class:
                    $checkerObject = new $className($checker_options['chat_id'], $user->chat_id);
                    break;

                case \App\Service\TrueChecker::class:
                    $params = BaseArrayHelper::merge($checker_options, ['user_id' => $user->chat_id]);
                    $checkerObject = new $className($params);
                    break;

            }

            if (config('app.env') == 'prod') {
                try {
                    $result = $checkerObject->check();
                } catch (\Throwable $e) {
                    return response()->json([
                        'code'     => 401,
                        'message'  => 'Не успешный запрос на проверку',
                    ], 400);
                }

                // Если не выполнил?
                if (!$result) {
                    return response()->json([
                        'code'     => 402,
                        'message'  => 'Задание не выполнено',
                    ], 400);
                } else {
                    $task['status'] = 'granted';
                }
            }
        }

        unset($task['checker']);
        $task['grant'] = $task['price'];
        unset($task['price']);

        if (!$userTask) {
            UserTask::create([
                'chat_id'    => $user->chat_id,
                'task_id'    => $fields['id'],
                'is_claimed' => 1,
                'claimed_at' => time(),
            ]);
        } else {
            $userTask->is_claimed = 1;
            $userTask->claimed_at = time();
            $userTask->save();
        }

        $price = $task['grant'];
        $user->balanceAdd($price, LogBalance::TYPE_TASK);
        Airdrop::$AirdropUser->balance_ap += $grant;
        Airdrop::$AirdropUser->addTask5($fields['id']);
        Airdrop::$AirdropUser->save();

        return response()->json([
            'balance_ap'  => Airdrop::$AirdropUser->balance_ap,
            'balance'     => $user->balance,
            'grant'       => $grant,
            'grant_point' => $price,
        ]);
    }


}
