<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//        Schema::table('task', function (Blueprint $table) {
//            $table->integer('partner_id')->nullable();
//        });
//
//        $data = [
//            ['Yescoin' , 8, [12,15,16]],
//            ['OGC' , 10, [17]],
//            ['Hexn' , 16, [18,19]],
//            ['Wormfare Slap' , 7, [20,21,22]],
//            ['Battle Bulls' , 15,[23]],
//            ['Billion Gems' , 9],
//            ['Topcoin' , 14],
//            ['W coin' , 12],
//            ['Avacoin' , 13],
//            ['TimeTon' , 17, [30]],
//            ['Trending Apps' , 18],
//            ['Vertus' , 19, [31,32]],
//            ['NotBoredPuppies' , 20, [33]],
//            ['Zima' , null, [26,27,28,29]],
//        ];
//
//        foreach ($data as $i) {
//            $p = \App\Models\Partner::create([
//                'name'   => $i[0],
//                'ref_id' => $i[1],
//                'key'    => '1',
//            ]);
//            if (isset($i[2])) {
//                foreach ($i[2] as $j) {
//                    $t = \App\Models\Task::query()->find($j);
//                    $t->partner_id = $p->id;
//                    $t->save();
//                }
//            }
//        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
