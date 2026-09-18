<?php


namespace App\Service;


use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use yii\helpers\ArrayHelper;

/**
 */
class VarDumper extends BaseVarDumper
{
    public static function dump($var, $highlight = true, $depth = 10)
    {
        $contentType =  \Illuminate\Support\Facades\Request::header('Content-type');
        if ($contentType == 'application/x-www-form-urlencoded') {
            $highlight = false;
        }
        if (app()->runningInConsole()) {
            $highlight = false;
        }
        if (\Illuminate\Support\Facades\Request::header('accept') == 'application/json') {
            $highlight = false;
        }
        echo parent::dumpAsString($var, 10, $highlight);
        echo $highlight? "<br>":"\n";
        echo $highlight? "<br>":"\n";

        $c = 1;
        foreach (debug_backtrace(2) as $item) {
            $e = $highlight? "<br>":"\n";
            echo '#' . $c . ' ' . Arr::get($item, 'file', '') . ':' . Arr::get($item, 'line', '') . ' ' . Arr::get($item, 'class', '') . Arr::get($item, 'type', '') . Arr::get($item, 'function', '') . $e;
            $c++;
        }



        exit();
    }

    public static function stack(\Throwable $exception)
    {

        $rows = 1;
        $c = 1;
        foreach (debug_backtrace(2) as $item) {
            $rows[] =  '#' . $c . ' ' . Arr::get($item, 'file', '') . ':' . Arr::get($item, 'line', '') . ' ' . Arr::get($item, 'class', '') . Arr::get($item, 'type', '') . Arr::get($item, 'function', '');
            $c++;
        }

        return $rows;
    }
}
