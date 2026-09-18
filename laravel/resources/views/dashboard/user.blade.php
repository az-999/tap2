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
                            <?php foreach ($user->attributesToArray() as $k => $v) { ?>
                                <tr>
                                    <td>{{$k}}</td>
                                    <td>{{$v}}</td>
                                </tr>
                            <?php } ?>
                        </table>
                        <?php if ($user->is_blocked) { ?>
                            <button class="btn btn-success js-block" data-id="{{$user->chat_id}}" data-value="0">Разблокировать</button>
                        <?php } else { ?>
                            <button class="btn btn-danger js-block" data-id="{{$user->chat_id}}" data-value="1">Заблокировать</button>
                        <?php } ?>
                        <button class="btn btn-info js-clear-cache" data-id="{{$user->chat_id}}">Сбросить кеш</button>
                        <a class="btn btn-info" href="/dashboard/user-stat?id={{$user->chat_id}}">Статистика</a>
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
