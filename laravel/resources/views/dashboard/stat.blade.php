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
                            Статистика
                        </span>
                    </div>
                    <div class="main__content-item-section">
                        <a class="btn btn-light" href="/dashboard/stat-market">Маркетплейс</a>
                        <a class="btn btn-light" href="/dashboard/feestats">Статистика по комиссиям и доходам</a>
                        <a class="btn btn-light" href="/dashboard/stat-ships">Части корабля</a>
                    </div>
                </article>


            </div>

        </div>
    </section>

</main>

@include('/layouts/footer')

</body>

<script>


</script>

</html>
