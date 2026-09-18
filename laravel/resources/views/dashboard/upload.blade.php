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
                <form action="/dashboard/upload-result" method="post" enctype='multipart/form-data'>
                    @csrf

                    <div class="group">
                        <label>Файл</label>
                        <input name="file" class="form-control" type="file">
                    </div>


                    <hr style="margin-top: 40px; margin-bottom: 20px;">
                    <button class="btn btn-primary js-add" type="submit">Добавить</button>

                </form>


            </div>

        </div>
    </section>

</main>

@include('/layouts/footer')

</body>

<script>


</script>

</html>

