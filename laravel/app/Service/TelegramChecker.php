<?php

namespace App\Service;


/**
 *
 */
class TelegramChecker
{
    public $chat_id;
    public $user_id;

    public function __construct($chat_id, $user_id)
    {
        $this->chat_id = $chat_id;
        $this->user_id = $user_id;
    }

    /**
     * @return bool
     */
    public function check()
    {
        $telegram = new \Telegram\Bot\Api(config('telegram.bots.mybot.token'));

        // Проверка выполнения задания
        try {
            $chatMember = $telegram->getChatMember([
                'chat_id' => $this->chat_id,
                'user_id' => $this->user_id,
            ]);
        } catch (\Throwable $e) {
            // Бот не добавлен админом в проверяемую группу
            throw $e;
        }

        return in_array($chatMember->status, ['member', 'creator', 'administrator'], true);
    }
}
