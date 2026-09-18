<?php


namespace App\Service;


use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramLogger
{
    public $telegram;
    public $chat_id = 122605414;

    public static function getInstance()
    {
        $i = new static();
        $i->telegram = new \Telegram\Bot\Api(config('telegram.bots.mybot.token'));

        return $i;
    }

    /**
     */
    public static function send($message)
    {
        if (!is_string($message)) {
            $message = BaseVarDumper::dumpAsString($message);
        }
        $post_data = [
            'chat_id' => 122605414,
            'text'    => $message,
        ];

//        Telegram::sendMessage($post_data);
    }
}
