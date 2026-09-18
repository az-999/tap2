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
                <?php if (is_null($user)) { ?>
                    <p>Пользователь не найден</p>
                <?php } else { ?>
                    <div class="main__content-item-header">
                        <span class="main__content-text main__content-item-bold-text">
                            Пользователь {{$user->chat_id}}
                        </span>
                    </div>
                    <div class="main__content-item-section">

                        <table>
                            <tr>
                                <td>{{$user->ref_count}} шт</td>
                                <td></td>
                                <td>количество приглашенных друзей</td>
                            </tr>
                            <tr>
                                <td>{{$stat['task']['count']}} шт</td>
                                <td></td>
                                <td>Выполненных заданий</td>
                            </tr>
                            <tr>
                                <td>{{$stat['mint_ship_details']['count']}} шт</td>
                                <td>{{$stat['mint_ship_details']['sum']}} TON</td>
                                <td>количество сминченных деталей кораблей, - комиссия с минта</td>
                            </tr>
                            <tr>
                                <td>{{$user->ship_craft_count}} шт</td>
                                <td></td>
                                <td>количество кораблей - craft</td>
                            </tr>
                            <tr>
                                <td>{{$user->ship_upgrade_count}} шт</td>
                                <td></td>
                                <td>количество кораблей - upgrade</td>
                            </tr>
                            <tr>
                                <td>{{$user->ship_union_count}} шт</td>
                                <td></td>
                                <td>количество кораблей - соединение</td>
                            </tr>
                            <tr>
                                <td>{{$stat['market']['count']}} шт</td>
                                <td>{{$stat['market']['sum']}} TON</td>
                                <td>количество проданных НФТ на маркетплейсе</td>
                            </tr>
                            <tr>
                                <td>{{$stat['pass']['count']}} шт</td>
                                <td>{{$stat['pass']['sum']}} TON</td>
                                <td>Сколько купил со стора Pass NFT</td>
                            </tr>
                            <tr>
                                <td>{{$user->black_metka_count}} шт</td>
                                <td></td>
                                <td>черных меток</td>
                            </tr>
                            <tr>
                                <td>{{$user->shield_count}} шт</td>
                                <td></td>
                                <td>защит</td>
                            </tr>

                        </table>

                    </div>
                <?php } ?>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    $('.js-clear-cache').click(function (e) {
        $.ajax({
            url: '/dashboard/clear-cache',
            type: 'post',
            data: {
                'id': $(this).data('id')
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                alert('Успешно, обновите страницу');
            },
            error: function (ret) {
                alert(ret.message);
            }
        });
    });
    $('.js-block').click(function (e) {
        $.ajax({
            url: '/dashboard/user-block-post',
            type: 'post',
            data: {
                'id': $(this).data('id'),
                'value': $(this).data('value')
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                alert('Успешно, обновите страницу');
            },
            error: function (ret) {
                alert(ret.message);
            }
        });
    });
</script>

</html>
