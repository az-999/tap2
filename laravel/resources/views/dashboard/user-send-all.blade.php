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
                    Ручное начисление баланса пользователю
                </span>
                </div>
                <div class="main__content-item-section">
                    <div class="row">
                        <div class="alert alert-danger" id="error-message" hidden>ERROR MESSAGE</div>
                    </div>
                    <div class="row">
                        <div class="alert alert-success" id="result" hidden>Успешно</div>
                    </div>
                    <form>
                        <div class="form-item">
                            <label for="tg-id" class="form-label">Telegram Id, username</label>
                            <textarea type="text" class="form-control" id="tg-id" name="tg-id" rows="10"></textarea>
                        </div>
                        <div class="form-item">
                            <label for="value" class="form-label">Сколько начислить</label>
                            <input type="text" class="form-control" id="value" name="value" value="">
                        </div>
                        <div class="form-item">
                            <label for="comment" class="form-label">Комментарий</label>
                            <input type="text" class="form-control" id="comment" name="comment" value="">
                        </div>
                        <div class="form-item-center">
                            <div id="submit-btn" class="btn btn-primary">Отправить</div>
                        </div>
                    </form>

                </div>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    $('#submit-btn').click(function (e) {
        const tgId = document.getElementById('tg-id').value;
        const value = document.getElementById('value').value;
        const comment = document.getElementById('comment').value;

        const resultContainer = document.getElementById('result');
        const errorContainer = document.getElementById('error-message');

        resultContainer.hidden = true;
        errorContainer.hidden = true;

        $.ajax({
            url: '/dashboard/user-send-all-post',
            type: 'post',
            data: {
                'tg_id_list': tgId,
                'amount': value,
                'comment': comment
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            success: function (data) {
                if (!data.success) {
                    errorContainer.hidden = false;
                    errorContainer.innerText = data.message;
                } else {
                    resultContainer.hidden = false;
                }
            },
            error: function (ret) {
                errorContainer.hidden = false;
                errorContainer.innerText = JSON.stringify(ret.responseJSON.errors);

                console.log(ret.responseJSON);
            }
        });
    });
</script>

</html>
