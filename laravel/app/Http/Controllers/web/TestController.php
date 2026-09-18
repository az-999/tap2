<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\LogBalance;
use App\Models\LogError;
use App\Models\Task;
use App\Models\UserNft;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\Captcha;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client;

class TestController extends Controller
{


    public function index(Request $request)
    {
        $ids_kols = UserTask::query()
            ->where('chat_id', 6968584579)
            ->select('task_id')
            ->pluck('task_id')
            ->toArray()
        ;
        VarDumper::dump($ids_kols);
    }

    public function f1($task)
    {
        if (is_array($task['geo_target'])) {
            if (count($task['geo_target']) > 0) {
                $country_user = \App\Http\Controllers\TaskListController::getUserCountry();
                if (in_array($country_user, $task['geo_target']) == false) return false;
            }
        }
        if (is_array($task['geo_target_except'])) {
            if (count($task['geo_target_except']) > 0) {
                $country_user = \App\Http\Controllers\TaskListController::getUserCountry();
                if (in_array($country_user, $task['geo_target_except']) == true) return false;
            }
        }

        return true;
    }

    public function task317(Request $request)
    {
        $arr = Task::getAll2();
        $arr2 = Arr::keyBy($arr, 'id');
        $task = $arr2[317];
        $country_user = \App\Http\Controllers\TaskListController::getUserCountry();

        VarDumper::dump([
            'task' => $task,
            'country_user' => $country_user,
            'ip' => \App\Http\Controllers\TaskListController::getUserIP(),
            'validate' => $this->f1($task),
            'all' => $arr,
        ]);
    }

    public function server(Request $request)
    {
        VarDumper::dump($_SERVER);
    }

    public function index2(Request $request)
    {
        $params = [
            'nft1' => 'EQAEKUHcBP45wjBpu5OeNoVvIIdr0XOl3036VEXtlrYLMvl2',
            'nft2' => 'EQBdzDHBGbGIwZIs8VwkkcRcS88RFPAYQF7KsNNx6sXIQUIP',
            'nft3' => 'EQB1e-uD9h3UIBQyr90VVMGCsmrI_8Q3O66EUbbjZTn0PxvJ',
            'nft4' => 'EQAm37ke4N7WgAk15Q1XKgdDHAdVqqZ0oSb9bYPsq_rI-qH0',
            'nft5' => 'EQB1e-uD9h3UIBQyr90VVMGCsmrI_8Q3O66EUbbjZTn0PxvJ',
            'nft6' => 'EQDRr-A7rT0qmgYZ-FPv8Dq0r8owjSQzfEE7H_BNl76kyC7u',
            'nft7' => 'EQB1e-uD9h3UIBQyr90VVMGCsmrI_8Q3O66EUbbjZTn0PxvJ',
            'ship_level' => 1,
        ];
        $result = \App\Service\ValidatorNft::getInstance()->checkGetGemsSale($params);
//        if (!$result['status']) {
//            return response()->json(['code' => 400, 'message' => $result['message']], 400);
//        }

        VarDumper::dump($result);


    }

    public function ships100(Request $request)
    {
//        for($i=51;$i<=100;$i++) {
//            $path = '/application/storage/framework/cache';
//            $file = $path . '/' . $i . '.json';
//            file_put_contents($file, json_encode([
//                "name"        => "Voyager-MMP-R".$i."0",
//                "description" => "Modular spaceship with upgrade capabilities! Collect new parts, enhance your performance, and conquer the depths of space. Start your journey now!",
//                "image"       => "https://ipfs.filebase.io/ipfs/QmYkdzwxiViJ3Ceqx3iXX6VTqGKkuhVqEecgiiF5nvJe7j",
//                "project"     => "MMPro BUMP",
//                "ship_level"  => (string)$i,
//                "attributes"  => [
//                    [
//                        "trait_type" => "Rarity",
//                        "value"      => "Epic",
//                    ],
//                ],
//            ], JSON_PRETTY_PRINT));
//        }
        $rows = [];
        for($i=51;$i<=100;$i++) {
            $rows[] = '"https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/'.$i.'.json", // ' . $i;
        }

        return VarDumper::export(join("\n",$rows));


    }

    function listMyBuckets($s3)
    {
        print("\nMy buckets now are:\n");

        $promise = $s3->listBucketsAsync();

        $result = $promise->wait();

        return $result;
    }

    function listMyFiles($s3)
    {
        $promise = $s3->listBucketsAsync();

        $result = $promise->wait();

        foreach ($result['Buckets'] as $bucket) {
            $this->listBucketFiles($s3, $bucket['Name']);
        }
    }

    function listBucketFiles($s3, $bucket)
    {
        print("Files in Bucket ". $bucket . "\n");

        try {
            $results = $s3->getPaginator('ListObjects', [
                'Bucket' => $bucket,
            ]);

            foreach ($results as $result) {
                foreach ($result['Contents'] as $object) {
                    echo $object['Key'] . PHP_EOL;
                    echo $s3->getObjectUrl($bucket, $object['Key']) . PHP_EOL;

                }
            }
        } catch (S3Exception $e) {
            echo $e->getMessage() . PHP_EOL;
        }
    }

}
