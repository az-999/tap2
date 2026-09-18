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

            <article class="main__content-item main__content-form main__content-form_type_task-add col">
                <div class="main__content-item-header">
                  <span class="main__content-text main__content-item-bold-text">
                     Пользователи
                  </span>
                </div>
                <div class="main__content-item-section">

                    <form action="/dashboard/user" method="get">
                        <div class="form-item">
                            <label for="tg-id" class="form-label">Telegram Id</label>
                            <input type="text" class="form-control" id="tg-id" name="id" value="">
                        </div>
                        <div class="form-item">
                            <label for="token" class="form-label">Wallet address</label>
                            <input type="text" class="form-control" id="token" name="token" value="">
                        </div>
                        <button class="btn btn-primary" type="submit" style="width: 100%">Найти</button>
                    </form>

                    <a href="/dashboard/users-blocked" class="btn btn-light">Заблокированные</a>
                </div>
            </article>

            <article class="main__content-item main__content-form main__content-form_type_task-add col">
                <div class="main__content-item-header">
                    <span class="main__content-text main__content-item-bold-text">
                        Групповой запрос
                    </span>
                </div>
                <div class="main__content-item-section">
                    <form action="/dashboard/stat-group">
                        <div class="form-item">
                            <label for="tg-id" class="form-label">Ref Telegram Id через запятую</label>
                            <input type="text" class="form-control"  name="id" value="">
                        </div>
                        <button class="btn btn-primary" style="width: 100%">Найти</button>
                    </form>
                </div>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>

</script>

</html>
