<?php
/** @var string $url */
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
                <p>Ссылка на файл</p>

                <pre><?= $url ?></pre>

                <a href="/dashboard/upload" class="btn btn-primary">Назад</a>

            </div>

        </div>
    </section>

</main>

@include('/layouts/footer')

</body>

<script>


</script>

</html>

