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
        $block =  [
            "1623918975",
            "6497825915",
            "6526059592",
            "5787583557",
            "6170157851",
            "6326624172",
            "6387956780",
            "6458740177",
            "135828322",
            "6732458103",
            "5837526197",
            "6302532447",
            "6095697016",
            "6398663039",
            "6353002923",
            "6292458390",
            "6191424565",
            "6392662650",
            "6065634223",
            "6389863394",
            "6317280258",
            "6294422431",
            "5907292588",
            "6183273299",
            "5891551748",
            "7889736117",
            "6154286197",
            "6511948746",
            "6529894898",
            "7763933032",
            "7500726730",
            "7822745319",
            "8195499753",
            "7628553713",
            "7635298294",
            "7419557164",
            "7275573222",
            "6510429092",
            "5803371471",
            "5788500315",
            "6893718158",
            "7113771233",
            "6760234869",
            "7018826064",
            "6874490027",
            "7120501078",
            "7038884134",
            "6778847238",
            "7090078563",
            "6760125820",
            "6783470942",
        ];

        foreach ($block as $id) {
            $u = \App\Models\UserTelegram::findByTgId($id);
            if (!is_null($u)) {
                $u->is_blocked = 1;
                $u->save();
                \Illuminate\Support\Facades\Log::info('user id='.$id.' blocked');
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
