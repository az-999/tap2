<?php
/** @var array $items */
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

            <div class='d-flex flex-column gap-4 col col-xl-8'>


                <article class="main__content-item main__content-form main__content-form_type_task-add col">
                    <div class="main__content-item-header">
                        <span class="main__content-text main__content-item-bold-text">
                            Части корабля
                        </span>
                    </div>
                    <div class="main__content-item-section">

                        <table id="t1">

                        </table>
                    </div>
                </article>
            </div>

        </div>
    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    var list = [
        {
            id: "ship_in_order",
            name: "В очереди",
            query: [['nft_id',6],['status',0]]
        },
        {
            id: "ship_verifed",
            name: "Проверен приход комиссии",
            query: [['nft_id',6],['status',1]]
        },
        {
            id: "ship_minted",
            name: "Начат процесс минтинга",
            query: [['nft_id',6],['status',2]]
        },
        {
            id: "ship_minted_verifed",
            name: "Сминчено успешно",
            query: [['nft_id',6],['status',3]]
        },
        {
            id: "ship_minted_verifed_cabin",
            name: "cabin",
            query: [['nft_id',6],['status',3],['item_id',0]]
        },
        {
            id: "ship_minted_verifed_right_wing",
            name: "right_wing",
            query: [['nft_id',6],['status',3],['item_id',1]]
        },
        {
            id: "ship_minted_verifed_left_wing",
            name: "left_wing",
            query: [['nft_id',6],['status',3],['item_id',2]]
        },
        {
            id: "ship_minted_verifed_engine",
            name: "engine",
            query: [['nft_id',6],['status',3],['item_id',3]]
        },
        {
            id: "ship_minted_verifed_nose",
            name: "nose",
            query: [['nft_id',6],['status',3],['item_id',4]]
        },
        {
            id: "ship_minted_verifed_tail",
            name: "tail",
            query: [['nft_id',6],['status',3],['item_id',5]]
        },
        {
            id: "ship_error",
            name: "Невалидная транзакция",
            query: [['nft_id',6],['status',4]]
        },
    ];

    var functionItem = function (list,j) {

        $.ajax({
            url: '/dashboard/stat-post',
            type: 'post',
            data: {
                'query': JSON.stringify(list[j].query),
                'id': list[j].id
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                $('#t1').append($('<tr>')
                    .append($('<td>').html(list[j].name))
                    .append($('<td>',{id: data.id}).html(data.count))
                );

                if (list.length > (j + 1)) {
                    functionItem(list, j+1);
                }
            },
            error: function (ret) {
                alert(ret.message);
            }
        });
    }

    functionItem(list,0);

</script>

</html>
