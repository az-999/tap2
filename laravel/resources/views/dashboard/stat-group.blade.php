<?php

/** @var array $items */

$jsonItems = json_encode($items);
?>
<!doctype html>
<html lang="en">

@include('/layouts/head')

<body class="dashboard">

@include('/layouts/header-auth')

<main class="main">

    <section class="main__content-container container-fluid">
        <div
            class='justify-content-evenly d-flex flex-column flex-xl-row align-items-xl-start align-items-center gap-xl-2 gap-4'>
            @include('/layouts/left-menu')

            <article class="main__content-item main__content-form main__content-form_type_task-add col col-xl-8">
                <div class="main__content-item-header">
                    <span class="main__content-text main__content-item-bold-text">
                        Статистика по группе
                    </span>
                </div>
                <div class="main__content-item-section">

                    <table>
                        <tr>
                            <td><span id="stat_friends"></span> шт</td>
                            <td></td>
                            <td>количество приглашенных друзей</td>
                        </tr>
                        <tr>
                            <td><span id="stat_mint_ship_details"></span> шт</td>
                            <td><span id="stat_mint_ship_details_ton"></span> TON</td>
                            <td>количество сминченных деталей кораблей, - комиссия с минта</td>
                        </tr>
                        <tr>
                            <td><span id="stat_ship_craft_count"></span> шт</td>
                            <td></td>
                            <td>количество кораблей - craft</td>
                        </tr>
                        <tr>
                            <td><span id="stat_ship_upgrade_count"></span> шт</td>
                            <td></td>
                            <td>количество кораблей - upgrade</td>
                        </tr>
                        <tr>
                            <td><span id="stat_ship_union_count"></span> шт</td>
                            <td></td>
                            <td>количество кораблей - соединение</td>
                        </tr>
                        <tr>
                            <td><span id="stat_market_nft_count"></span> шт</td>
                            <td><span id="stat_market_nft_ton"></span> TON</td>
                            <td>количество проданных НФТ на маркетплейсе</td>
                        </tr>
                        <tr>
                            <td><span id="stat_bumpstore_pass_count"></span> шт</td>
                            <td><span id="stat_bumpstore_pass_ton"></span> TON</td>
                            <td>Сколько купил со стора Pass NFT</td>
                        </tr>
                        <tr>
                            <td><span id="stat_user_black_dot"></span> шт</td>
                            <td></td>
                            <td>черных меток</td>
                        </tr>
                        <tr>
                            <td><span id="stat_user_shield"></span> шт</td>
                            <td></td>
                            <td>защит</td>
                        </tr>

                    </table>
                </div>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    var list = [
        {
            id: "stat_friends",
            query: "stat_friends"
        },
        {
            id: "stat_mint_ship_details",
            query: 'stat_mint_ship_details'
        },
        {
            id: "stat_mint_ship_details_ton",
            query: 'stat_mint_ship_details_ton'
        },
        {
            id: "stat_ship_craft_count",
            query: 'stat_ship_craft_count'
        },
        {
            id: "stat_ship_upgrade_count",
            query: 'stat_ship_upgrade_count'
        },
        {
            id: "stat_ship_union_count",
            query: 'stat_ship_union_count'
        },
        {
            id: "stat_user_black_dot",
            query: 'stat_user_black_dot'
        },
        {
            id: "stat_user_shield",
            query: 'stat_user_shield'
        },
        {
            id: "stat_market_nft_count",
            query: 'stat_market_nft_count'
        },
        {
            id: "stat_market_nft_ton",
            query: 'stat_market_nft_ton'
        },
        {
            id: "stat_bumpstore_pass_count",
            query: 'stat_bumpstore_pass_count'
        },
        {
            id: "stat_bumpstore_pass_ton",
            query: 'stat_bumpstore_pass_ton'
        },

    ];

    var f2 = function (list,j) {

        $.ajax({
            url: '/dashboard/stat-post',
            type: 'post',
            data: {
                'id': list[j].id,
                'query': JSON.stringify(<?= $jsonItems ?>)
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                $('#' + data.id).html(data.count);

                if (list.length > (j + 1)) {
                    f2(list, j+1);
                }
            },
            error: function (ret) {
                alert(ret.message);
            }
        });
    }
    f2(list,0);

</script>

</html>
