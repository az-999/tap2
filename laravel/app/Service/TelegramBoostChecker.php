<?php

namespace App\Service;


use Illuminate\Support\Facades\Http;

/**
 *
 */
class TelegramBoostChecker
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
        $token = config('telegram.bots.mybot.token');
        $url = 'https://api.telegram.org/bot' . $token . '/getUserChatBoosts';

        // Проверка выполнения задания
        try {
            $response = Http::post($url , [
                'chat_id' => $this->chat_id,
                'user_id' => $this->user_id,
            ]);
            if ($response->status() == 200) {
                $data = json_decode($response->body());
                if ($data->ok) {
                    $c = count($data->result->boosts);
                    if ($c > 0) {
                        return true;
                    }
                }

            }

        } catch (\Throwable $e) {
            // Бот не добавлен админом в проверяемую группу
            return false;
        }

        return false;
    }
}
