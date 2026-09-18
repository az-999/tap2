<?php

namespace App\Console\Commands;

use App\Models\MmproToken;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class fix_mmpro extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix_mmpro';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = [
            [6207318444, 'https://tonviewer.com/transaction/42d9d89fbb2dd21bcf48b1f5467cacf0c8a372c3c278a38cae06f31ac171f235'],
            [7418914051, 'https://tonviewer.com/transaction/8ea210361fcad612df2a66d2b10aed5de30eeeea2cc94efa2635a5f2a8fa1eae'],
            [5294705197, 'https://tonviewer.com/transaction/1bd38167ad939f8ef79ec86aa877e8d361ac9caa1deea8b952476752b2ba4854'],
            [321089665, 'https://tonviewer.com/transaction/959e8ff0acdbc3fade95ed41b30b40a5ecc2e5537307193e0bfd091d2baec911'],
            [439393443, 'https://tonviewer.com/transaction/6f73367303695acb1472fb070363bbf19def34cadd793cdf9961d3128a23ced0'],
            [253575034, 'https://tonviewer.com/transaction/ec0cb1ba0b2a21b06d3196a005a12d4f37b02d70052aa5744a82f67145d27bd0'],
            [5557435139, 'https://tonviewer.com/transaction/b8997e9a5f83d37241b810a2ea97b10b5dd1b67aeb6e28007a63dc9ba05f4992'],
            [6701911845, 'https://tonviewer.com/transaction/5c31f4dd6aa6d6cd6a9fc9cdcae21c15bea9c46c4bd9edd54ddf37d6fe224c66'],
            [6701911845, 'https://tonviewer.com/transaction/f0edf650b46141a35b415e6004233972f345e4497b96b265aa0cc18680f982b6'],
            [5984635844, 'https://tonviewer.com/transaction/ad8d578b79482ddcacc6b084936067599cd3cd99ebeb408d8c7b452d7e206089'],
            [833167443, 'https://tonviewer.com/transaction/faba3553aa1fc9591d2fafcfa8303aca21ba172349b90911ffd645e8c5c87bd8'],

            [1747416803,'https://tonviewer.com/transaction/2b07cdd016cc8a768fbc7d27a1dd9840d67a03e85082683da423171b9cfbea9f',],
            [1327611100,'https://tonviewer.com/transaction/50092e17e6a8a8b1f315457a3b83f8e78cb655f39ce2afdb885807ac921661d6',],
            [1121245175,'https://tonviewer.com/transaction/39e673faf70eb22d80f3acd0c9792fbcc5d3dc9bda6af90dbd23e251a31cf54a',],
            [6425287429,'https://tonviewer.com/transaction/75f904dddb9dbd70c1ec61a306cda36c842bfe5370d02df63b56863066585891',],
            [2061616642,'https://tonviewer.com/transaction/5c73d4dab8565dad2f0d5eb57907ee56aed6937daf0b9dc2c3fdf3b6b797c01a',],
            [833167443,'https://tonviewer.com/transaction/faba3553aa1fc9591d2fafcfa8303aca21ba172349b90911ffd645e8c5c87bd8',],
            [105584318,'https://tonviewer.com/transaction/828eee0e2710473ecbd6a77134a6eeddbee4e51a78d604af1c17c20b62f23f44',],
            [105584318,'https://tonviewer.com/transaction/38a9009cac7aceff61416a2a11c24c0cd2ab49d21ded876bcd892710817c3fb3',],
            [105584318,'https://tonviewer.com/transaction/4699f9a46eea294b6f6d4a95f2617f98b463792e9241f37e1f824018c0ff7224',],
            [105584318,'https://tonviewer.com/transaction/714e180ebf849ceebad93483541e2a14d34814b373ef1efb88b43f72d3e74c0c',],
            [105584318,'https://tonviewer.com/transaction/c0963b6bfd4becc1b0b727c66ccca4ac1d5e3fbfa1e4231be023a780c7b749c5',],
            [103105342,'https://tonviewer.com/transaction/c36a03e5efdc4f4b6120faca972e028261bc38ccea06c26b27920c8456a82f48',],
            [103105342,'https://tonviewer.com/transaction/a723ecda9c656f117831dbbb88631272f1c912c871afa09eff646921bb2648d0',],
            [103105342,'https://tonviewer.com/transaction/517c1a1c0ce4b0af7ada228906209fa6d1c2ee72eb606f8147443bb5ab53ce1d',],
            [5899255627,'https://tonviewer.com/transaction/b6d1d5e8ccb3b2f6d69d107743ec54a8d6a27434f16e9704187b780a01deb9b8',],
            [5899255627,'https://tonviewer.com/transaction/b6096262cfc389671cfd3222f51491314af77bc0d8ce2a1d301a7eb2da8cb355',],
            [367926888,'https://tonviewer.com/transaction/d7f0643924490560b75b7a93d6fde3c8a6b2616f0839391e619e74b2e608c79e',],
            [1967673016,'https://tonviewer.com/transaction/a1af3a1237338d95dbbfa4d46db26a2ecaf8a094aeb32a04553f0df2c5e4b531',],
            [7134064444,'https://tonviewer.com/transaction/29b681616cd6cd08bb1b896d0d1ee0dc3ab0ff3eca5b8736efcfea40e4d40f5a',],
            [898137846,'https://tonviewer.com/transaction/cbec7e559a451f4e35a5557c24a9f357d6f64b7196e639678aaf517cfc76c0d4',],
            [898137846,'https://tonviewer.com/transaction/009bef2e26279e181858bc8102c71805bc5ad084d1668dcd763a015e1132870f',],
            [1808357349,'https://tonviewer.com/transaction/dbf3e0f6ce762535d1fc6fed26cbe5287ee3cddbafb0ac5a033d1269de47f1c3',],
            [7178469397,'https://tonviewer.com/transaction/61de673e5b28435bbef24a8a22101359ab956bb852201da496a486e2ef8f6b83',],
            [6784326316,'https://tonviewer.com/transaction/f3d1b14de5d41a2dcefcf5bfd74ba114c844f706e871c02053d21999a83b522a',],
            [7005687918,'https://tonviewer.com/transaction/b77cc7b38df1abb33643d212868d45f9225f99c0f77a7c8a1bb6416273ad9daf',],
            [1967673016,'https://tonviewer.com/transaction/a1af3a1237338d95dbbfa4d46db26a2ecaf8a094aeb32a04553f0df2c5e4b531',],
            [7030709999,'https://tonviewer.com/transaction/213fbcb4883bc5b4fc06e89df572563951a110ef2e922c4ebba75c98f6432d4f',],
            [74189309,'https://tonviewer.com/transaction/b658424cb75214168e5d25e0d04516a8c5e66675086d19709c941f2645efc7d1',],
            [97767447,'https://tonviewer.com/transaction/cae546d12c72c52d38b510fb8a49b8234cc86f004f0685780b6bef7421bc1cc7',],
            [2062043297,'https://tonviewer.com/transaction/d2c60b988c11f1a17194b6dc50b4e5e31603aab92fde0ba11a106f7a8bc2c3f8',],
            [5180454326,'https://tonviewer.com/transaction/d2c60b988c11f1a17194b6dc50b4e5e31603aab92fde0ba11a106f7a8bc2c3f8',],
            [1949110850,'https://tonviewer.com/transaction/91c574f7328ff12ca20b1ebc7f512ed61145ca6685165b55bc6bd16f7dfa5a10',],
            [2129742703,'https://tonviewer.com/transaction/3b0a690e42edea6513df1fc0f3430d8cc55caefeb0ee36c713fa6dbbb22394e8',],
            [2129742703,'https://tonviewer.com/transaction/1deef35b96768360a94ca877b49d8c80e598fed547233fb5274818c8e6a740db',],
            [669998151,'https://tonviewer.com/transaction/0b3e5e915b96cea64a6d3b5a61525475f8981922784c5eca3887a42ce93ace3f',],
            [6178913980,'https://tonviewer.com/transaction/e7eb3334445f0882a9d7be20a62fd1d1790c2c27680409568f04e3d3da6e8480',],
            [1967673016,'https://tonviewer.com/transaction/a1af3a1237338d95dbbfa4d46db26a2ecaf8a094aeb32a04553f0df2c5e4b531',],
            [1095553281,'https://tonviewer.com/transaction/7841b4717e8f0ad038d51628489ba386c95d0b4fb3aac2d0f2cc67d6d6d8406e',],
            [1095553281,'https://tonviewer.com/transaction/e62a5e9b5ca0a8e69038262815cab3c32a2e8745af3f482b6f4db324b14c9342',],
            [716846335,'https://tonviewer.com/transaction/c07ea97e49c03eb730d1216ae94b58b1632cdcc492b3b2172ca4d6ae13719ba3',],
            [1125801270,'https://tonviewer.com/transaction/82ab7f948b4ce69810215c079acb703ccb118775c4a2a8ab02ed9497b7a9731f',],
            [6874786878,'https://tonviewer.com/transaction/c1965130c074ca1ca60ece13a40317184e392d93b40f275d8ecf86c9fa09a771',],
            [6526659404,'https://tonviewer.com/transaction/32f898feceef823eb021277b78ca5d02097602bf8f95119f37a7d90145d1b820',],
            [6592374648,'https://tonviewer.com/transaction/6b007424fd34745f177bc3b611ef15f009e6b14a60f09f978b954fbe7782ff9f',],
            [1518731461,'https://tonviewer.com/transaction/55cf7c1d90b36570b2f1346f8832d780fe40dc07a46b1acb190a52e95e76b464',],
            [102221570,'https://tonviewer.com/transaction/ada7a2e3f1ccee74bd3b8c7b126e77c5f2ba6ea269d2323a06f9378a6970d04a',],
            [1819185914,'https://tonviewer.com/transaction/614a773a92e85c8da8cc4b8b2a0b4bed4003e18213ff65a6705db80dd6f8dcdb',],
            [611456329,'https://tonviewer.com/transaction/61294d7be84ea207804fc952f3be1fadb0bbcd06fc5d6dba7caaa6076bbecb26',],
            [611456329,'https://tonviewer.com/transaction/f0edf650b46141a35b415e6004233972f345e4497b96b265aa0cc18680f982b6',],
            [2033193757,'https://tonviewer.com/transaction/f298b8d40d0a1a6854af4bed91171ae89b29f3b62af2e42592bd80b3f4a83bc2',],
            [2033193757,'https://tonviewer.com/transaction/b5227c81c7fb9df936ba1d4e9d24594696e414a3f8fbfd836202eeb02f810a60',],
            [797401686,'https://tonviewer.com/transaction/90b2e3fe36574001c9e29134fb95f50b35600830a528fb57ed946a38492e1561',],
            [624704418,'https://tonviewer.com/transaction/f1d9706a75a13534233910e3033407103a969ee6fe8de358f281110865d3b73e',],
            [624704418,'https://tonviewer.com/transaction/825b0aa3ea996333f0dd83c41b1990a2a34703dd2a893b8a29b0f854b0dbde0c',],
            [624704418,'https://tonviewer.com/transaction/2426d35f0e84df7e4ce3c6f27362c1a7444d6ab78a452232590737298dc9289c',],
            [201666352,'https://tonviewer.com/transaction/51caf761b95f438e644b9341fea1790fc51511dacdbdbbaca5fb05bd4627ccd4',],
            [201666352,'https://tonviewer.com/transaction/92af78aed30ae9ee3547e8736d10b1d4f1c012ac792346da9909fa90293e64a4',],
            [97767447,'https://tonviewer.com/transaction/cae546d12c72c52d38b510fb8a49b8234cc86f004f0685780b6bef7421bc1cc7',],
            [6059643716,'https://tonviewer.com/transaction/a703f7f3ada3626bde74c7bbef880073f1d273354cc7e0e0dbe2c481456dbe47',],
            [5492829921,'https://tonviewer.com/transaction/a0e23ae289c3b23fc15615fa2e365f9e6c0c375e286dcdaa4bb77cbc74d41ae3',],
            [1542932783,'https://tonviewer.com/transaction/0a3ca8fa06d62c01c7c2bddf317b0b72172d5d6bf75ec801227a9e9f7c25f327',],
            [185367300,'https://tonviewer.com/transaction/f08c35ee8ab10cdd45494adb021402c5838fa0377d1fbede1ae21a3475c5b23d',],
            [5492829921,'https://tonviewer.com/transaction/a0e23ae289c3b23fc15615fa2e365f9e6c0c375e286dcdaa4bb77cbc74d41ae3',],
            [518151495,'https://tonviewer.com/transaction/f93a06b5b09a9bc31cffb9843732b5fb8aab01d53b430ac0cd16c64403a84d98',],
            [105236762,'https://tonviewer.com/transaction/55fd807a94c83ca4e8386f9f9731435db755ec474fe7d6d8e84c9631e3390181',],
            [215977659,'https://tonviewer.com/transaction/9c2780243eba179704ed2e55fba0eba2704369b2b268548e750ef0957bf55c38',],
            [6207318444,'https://tonviewer.com/transaction/42d9d89fbb2dd21bcf48b1f5467cacf0c8a372c3c278a38cae06f31ac171f235',],
            [6207318444,'https://tonviewer.com/transaction/b6096262cfc389671cfd3222f51491314af77bc0d8ce2a1d301a7eb2da8cb355',],
            [5106436406,'https://tonviewer.com/transaction/31d5450f66fe3203680182935e7a51e66be65f5ccde4ab4886b51abee1e1a223',],
            [5492829921,'https://tonviewer.com/transaction/a0e23ae289c3b23fc15615fa2e365f9e6c0c375e286dcdaa4bb77cbc74d41ae3',],
            [576637177,'https://tonviewer.com/transaction/288465220b4e0b97fb679836386ce217e9770e6a3e2e25165f1966ed1806b58a',],
            [576637177,'https://tonviewer.com/transaction/9473775bb551e1c1b30920aef58e1c85862c0b49f576060f7acc41c670665030',],
            [6059643716,'https://tonviewer.com/transaction/a703f7f3ada3626bde74c7bbef880073f1d273354cc7e0e0dbe2c481456dbe47',],
            [7311559333,'https://tonviewer.com/transaction/9606ec2d75e080f6d858ce68d6198a2df6b27eacefb46b50fc1fdaa6613e981c',],
            [6466028126,'https://tonviewer.com/transaction/3d2fb25fd2d06f16733b0a82a98930056aa52d412ae0e17054287e857c040442',],
            [1984298064,'https://tonviewer.com/transaction/0014b34a0b5f7469b41cabe76e7756808fedcac9455b73d4bf606caebf77239fc',],
            [6466028126,'https://tonviewer.com/transaction/3d2fb25fd2d06f16733b0a82a98930056aa52d412ae0e17054287e857c040442',],
            [5164482224,'https://tonviewer.com/transaction/631b707c283d59d81b021b499cb93e66b37ecf856fd91192a76ef3bb4a6ac42d',],
            [5164482224,'https://tonviewer.com/transaction/54a377d2a7802bcff05fb852d42d702092098587b70ae6e6df61a384c982cb3e',],
            [5084737033,'https://tonviewer.com/transaction/abe827548015d56e90f21b9c631cbc08587b07e9d60d176c0e4a22315e9397c3',],
            [393856054,'https://tonviewer.com/transaction/6e9d3fbd5342bf13e918627ec42ce0e796cf894ce53bcf0dc90571c5a426c1db',],
            [393856054,'https://tonviewer.com/transaction/282356dee3589af6db6b98f17be088f1299d0c176467053f8169f9737e82d611',],
            [393856054,'https://tonviewer.com/transaction/8953ae06e3e898498fce038b5217c37d277fdea944d26d6eb6b84aa019f54667',],
            [393856054,'https://tonviewer.com/transaction/1f7184faefd6e0724119df890ccef29586c8a0329cd55ec23c76b6f99537f4fb',],
            [5106436406,'https://tonviewer.com/transaction/31d5450f66fe3203680182935e7a51e66be65f5ccde4ab4886b51abee1e1a223',],
            [1984298064,'https://tonviewer.com/transaction/0014b34a0b5f7469b41cabe76e7756808fedcac9455b73d4bf606caebf77239fc',],
            [1984298064,'https://tonviewer.com/transaction/631b707c283d59d81b021b499cb93e66b37ecf856fd91192a76ef3bb4a6ac42d',],
            [1984298064,'https://tonviewer.com/transaction/5c31f4dd6aa6d6cd6a9fc9cdcae21c15bea9c46c4bd9edd54ddf37d6fe224c66',],
            [1984298064,'https://tonviewer.com/transaction/0014b34a0b5f7469b41cabe76e7756808fedcac9455b73d4bf606caebf77239fc',],
            [7494832475,'https://tonviewer.com/transaction/fc0e99c1526fe04d166f5c3accdb3bd998c32cb4da0a68d3968ffbbb09bd12b3',],
            [332649122,'https://tonviewer.com/transaction/a5c74229706fa39e9b6f9ed6d5c4d5d27cee78dde7e52351ad01a94f23f56aba',],
            [7418914051,'https://tonviewer.com/transaction/8ea210361fcad612df2a66d2b10aed5de30eeeea2cc94efa2635a5f2a8fa1eae',],

        ];
        $data2 = [];
        foreach ($data as $item) {
            $arr = explode('/',$item[1]);
            $txid = $arr[4];
            $data2[$txid] = $item;
        }

        $data3 = [];
        $tonApi = TonApi::getInstance();
        $start = new \DateTime('2024-11-11 00:00:00');
        $finish = new \DateTime('2024-11-16 00:00:00');
        foreach ($data2 as $txid => $item) {
            $resp = $tonApi->get('v2/blockchain/transactions/' . $txid);
            if (!isset($resp['out_msgs'])) {
                Log::info('out_msgs not exist ' . $txid);
                $data3[] = $txid . ';' . 0 . ';' . $item[0] . ';' . 'out_msgs not exist';
                continue;
            }
            if (count($resp['out_msgs']) == 0) {
                $ton = $resp['in_msg']['value'] / 1000000000;

                $dest = $resp['in_msg']['destination']['address'];
                $from = $resp['in_msg']['source']['address'];
                $utime = $resp['utime'];
                if (!($utime > $start->format('U') && $utime < $finish->format('U'))) {
                    Log::info('time not correct ' . $txid);
                    $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'time not correct';
                    continue;
                }

            } else {
                $ton = $resp['out_msgs'][0]['value'] / 1000000000;
                if (count($resp['out_msgs']) != 1) {
                    Log::info('count(out_msgs)!=1 ' . $txid);
                    $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'count(out_msgs)!=1';
                    continue;
                }

                $dest = $resp['out_msgs'][0]['destination']['address'];
                $from = $resp['account']['address'];
                $utime = $resp['utime'];
                if (!($utime > $start->format('U') && $utime < $finish->format('U'))) {
                    Log::info('time not correct ' . $txid);
                    $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'time not correct';
                    continue;
                }
            }

            $a = Address::parse($dest)->toString(true,true,false);
            if ($a != config('app.highload')) {
                Log::info('dest_address!=highload ' . $txid);
                $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'dest_address!=highload';
                continue;
            }
            $row = MmproToken::query()->where('txid', $txid)->first();
            if (!is_null($row)) {
                Log::info('tx exist ' . $txid);
                $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'tx exist';
                continue;
            }
            $amount1 = [
                1,
                10,
                50,
            ];

            if (!in_array($ton, $amount1)) {
                Log::info('value not valid ' . $txid);
                $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'value not valid';
                continue;
            }

            $next = MmproToken::query()->where('created_at', '>', $utime)->orderBy('created_at', 'asc')->first()->toArray();
            $amount = $ton * $next['kurs_ton'] / $next['kurs_mmpro'];

            $data3[] = $txid . ';' . $ton . ';' . $item[0] . ';' . 'success';

            Log::info($txid . ' success');

//            $i = MmproToken::query()->create([
//                'tg_id'      => $item[0],
//                'address'    => Address::parse($from)->toString(false),
//                'txid'       => $txid,
//                'created_at' => time(),
//                'kurs_ton'   => $next['kurs_ton'],
//                'kurs_mmpro' => $next['kurs_mmpro'],
//                'ton'        => $ton,
//                'amount'     => $amount,
//                'status'     => 1,
//            ]);
//
//            Log::info(VarDumper::dumpAsString($i->toArray()));
        }

        file_put_contents('/application/storage/framework/cache/'.time().'.csv', join("\n", $data3));

    }
}
