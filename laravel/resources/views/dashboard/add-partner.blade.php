<!doctype html>
<html lang="en">

@include('/layouts/head')

<body class="dashboard">

@include('/layouts/header-auth')

<main class="main">

    <section class="main__content-container">
        @include('/layouts/left-menu')

        <article class="main__content-item main__content-form">
            <div class="main__content-item-header">
                <span class="main__content-text main__content-item-bold-text">
                    Добавить партнера
                </span>
            </div>
            <div class="main__content-item-section">

                    <div class="group">
                        <label>Наименование</label>
                        <input name="name" class="form-control js-form-name" >
                    </div>
                    <div class="group">
                        <label>REF_ID</label>
                        <input name="ref_id" class="form-control js-form-ref_id">
                    </div>

                    <hr style="margin-top: 40px; margin-bottom: 20px;">
                    <button class="btn btn-primary js-add">Добавить</button>

            </div>
        </article>
    </section>

</main>

@include('/layouts/footer')

</body>

<script>
$('.js-add').click(function (e) {
    $.ajax({
        url: '/dashboard/add-partner-post',
        data: {
            name: $('.js-form-name').val(),
            ref_id: $('.js-form-ref_id').val()
        },
        type: 'post',
        headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
        success: function (ret) {
            window.location = '/dashboard/partner-list'
        }
    });
});
</script>

</html>
