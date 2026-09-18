<?php

namespace App\Service;

class YescoinAPI {

    /**
     * @var string
     */
    private $apiKey;

    /**
     * @var string
     */
    private $baseUrl;

    /**
     * @param string $apiKey
     */
    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = config('yescoin.base_url');
    }

    protected function post(string $url, array $data = []): array
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: ' . $this->apiKey,
            'Content-Type: application/json',
            'Accept: application/json, text/plain, */*',
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $response = curl_exec($ch);

        if ($response === false) {
            throw new \Exception(curl_error($ch), curl_errno($ch));
        }

        curl_close($ch);
        return json_decode($response, true);
    }

    public function completeTask(int $userId, string $taskSlug) {
        $res = $this->post('/api/integrations/completeTask', [
            'taskSlug' => $taskSlug,
            'playerId' => $userId,
        ]);

        if ($res['kind'] === 'error') {
            switch ($res['error']['kind']) {
            case 'task-not-started':
                throw new \Exception('Task not started');
            case 'task-completed-already':
                return true;
            default:
            throw new \Exception('Unknown error');
            }
        } else if ($res['kind'] === 'success') {
            return true;
        }

        throw new \Exception('Unknown error');
    }

    public function playerIsOpenTma(int $userId) {
        $res = $this->post('/api/integrations/checkIfPlayerOpenedTma', [
            'playerId' => $userId,
        ]);

        if ($res['kind'] === 'error') {
            throw new \Exception('Unknown error');
        } else if ($res['kind'] === 'success') {
            return $res['value'];
        }

        throw new \Exception('Unknown error');
    }
}
