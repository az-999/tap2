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
                        NFT функционал
                    </span>
                </div>
                <div class="main__content-item-section">
                    <table>
                        <?php foreach ($data as $k => $v) { ?>
                        <tr>
                            <td style="width: 33%">
                                    <?= $v['name'] ?>
                            </td>
                            <td style="width: 33%">
                                <span class="label label-<?= $data[$k]['value'] == 1 ? 'success' : 'danger' ?>"><?= $data[$k]['value'] == 1 ? 'Включено' : 'Выключено' ?></span>
                            </td>
                            <td>
                                <button class="btn btn-primary js-switch" data-module="<?= $k ?>" data-value="<?= $data[$k]['value'] == 1 ? -1 : 1 ?>"><?= $data[$k]['value'] == 1 ? 'Выключить' : 'Включить' ?></button>
                            </td>
                        </tr>
                        <?php } ?>
                    </table>
                </div>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    $('.js-switch').click(function (e) {
        $.ajax({
            url: '/dashboard/nft-functional-post',
            type: 'post',
            data: {
                'module': $(this).data('module'),
                'value': $(this).data('value')
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                window.location.reload();
            },
            error: function (ret) {
                alert('Ошибка');
            }
        });
    });
</script>

</html>
