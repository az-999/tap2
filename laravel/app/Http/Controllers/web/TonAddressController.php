<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\LogBalance;
use App\Models\UserNft;
use App\Service\BaseArrayHelper;
use App\Service\Captcha;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TonAddressController extends Controller
{

    public function index(Request $request)
    {
        $fields = $request->validate([
            'address'      => 'string',
            'userFriendly' => 'integer',
            'testOnly'     => 'integer',
            'urlSafe'      => 'integer',
            'bounceable'   => 'integer',
            'phparray'     => 'integer',
        ]);

        $result = '';
        $address = '';

        if (isset($fields['address'])) {
            if ($fields['address']) {
                $address = $fields['address'];
                $rows = explode("\n", $address);

                $res = [];
                foreach ($rows as $row) {
                    $row = trim($row);

                    $userFriendly = false;
                    if (isset($fields['userFriendly'])) {
                        if ($fields['userFriendly']) {
                            if ($fields['userFriendly'] == 1) {
                                $userFriendly = true;
                            }
                        }
                    }

                    $urlSafe = false;
                    if (isset($fields['urlSafe'])) {
                        if ($fields['urlSafe']) {
                            if ($fields['urlSafe'] == 1) {
                                $urlSafe = true;
                            }
                        }
                    }

                    $bounceable = false;
                    if (isset($fields['bounceable'])) {
                        if ($fields['bounceable']) {
                            if ($fields['bounceable'] == 1) {
                                $bounceable = true;
                            }
                        }
                    }

                    $testOnly = false;
                    if (isset($fields['testOnly'])) {
                        if ($fields['testOnly']) {
                            if ($fields['testOnly'] == 1) {
                                $testOnly = true;
                            }
                        }
                    }

                    $tempAddress = Address::parse($row)->toString($userFriendly, $urlSafe, $bounceable, $testOnly);
                    if (isset($fields['phparray'])) {
                        if ($fields['phparray']) {
                            if ($fields['phparray'] == 1) {
                                $tempAddress = "'". $tempAddress."',";
                            }
                        }
                    }

                    $res[] = $tempAddress;
                }
                $result = join("\n", $res);
            }
        }

        return view('ton-address/index', [
            'result'       => $result,
            'address'      => $address,
            'userFriendly' => isset($fields['userFriendly']) ? $fields['userFriendly'] : null,
            'testOnly'     => isset($fields['testOnly']) ? $fields['testOnly'] : null,
            'urlSafe'      => isset($fields['urlSafe']) ? $fields['urlSafe'] : null,
            'bounceable'   => isset($fields['bounceable']) ? $fields['bounceable'] : null,
            'phparray'     => isset($fields['phparray']) ? $fields['phparray'] : null,
        ]);
    }

}
