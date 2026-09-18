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
                     Заблокированные пользователи
                  </span>
                </div>
                <div class="main__content-item-section">

                    <table>
                    <?php foreach ($users as $u) { ?>
                        <tr>
                            <td>
                                <a href="/dashboard/user?id={{$u->chat_id}}">{{$u->chat_id}}</a>
                            </td>
                            <td>
                                {{$u->username}}
                            </td>
                            <td>
                                {{$u->name_first}}
                            </td>
                            <td>
                                {{$u->name_last}}
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

</script>

</html>
