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

            <article class="main__content-item main__content-form main__content-form_type_task-edit col col-xl-8">
                <div class="main__content-item-header">
                  <span class="main__content-text main__content-item-bold-text">
                     Обновить задачу
                  </span>
                </div>
                <div class="main__content-item-section">

                    <p>Время выполнения: {{$life_time}} ч</p>
                    <form method="post">
                        <div class="group">
                            <label class='fw-medium'>Наименование</label>
                            <input name="name" class="form-control" value="{{$model->name}}">
                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <label class='fw-medium'>Ссылка</label>
                            <input name="link" class="form-control" value="{{$model->link}}">
                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <label>Награда *</label>
                            <input name="price" class="form-control" value="{{$model->price}}">
                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <label class='fw-medium'>Иконка</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" name="icon" value="{{$model->icon}}">
                                <a class="btn btn-outline-secondary" type="button" target="_blank" href="/dashboard/upload">Закачать файл</a>
                            </div>
                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <label>Группа</label>
                            <select name="group" class="form-control">
                                <option value="2" {{ $model->group == 2 ? ' selected=selected' : '' }}>KOLs</option>
                                <option value="1" {{ $model->group == 1 ? ' selected=selected' : '' }}>Сommunity</option>
                            </select>

                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <label class='fw-medium'>Партнер</label>
                            <select class="form-select" name="partner_id">
                                <option value="">- Ничего не выбрано -</option>
                                <?php foreach (\App\Models\Partner::query()->get() as $p) { ?>
                                <option value="{{$p->id}}" {{ $p->id == $model->partner_id ? ' selected=selected' : '' }}>
                                    {{$p->name}}</option>
                                <?php } ?>
                            </select>
                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <label>Проверка</label>
                            <select name="checker" class="form-control">
                                <option value="">- Ничего не выбрано -</option>
                                <option value="App\Service\TrueChecker" {{ 'App\Service\TrueChecker' == $model->checker ? ' selected=selected' : '' }}>По ссылке</option>
                                <option value="App\Service\TelegramChecker" {{ 'App\Service\TelegramChecker' == $model->checker ? ' selected=selected' : '' }}>Бот</option>
                            </select>

                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <label>ID telegram группы/канала</label>
                            <?php
                            $value = '';
                            if ($model->checker) {
                                try {
                                    $ch = json_decode($model->checker_options,true);
                                    if (isset($ch['chat_id'])) {
                                        $value = $ch['chat_id'];
                                        if ($value == 1) {
                                            $value = '';
                                        }
                                    }
                                } catch (\Throwable $e) {

                                }
                            }
                            ?>
                            <input name="checker_options" class="form-control" value="{{ $value  }}" >
                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <label><a href="https://en.wikipedia.org/wiki/IETF_language_tag" target="_blank">Язык</a> (малыми буквами, через запятую, без пробелов)</label>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p>Применить для:</p>
                                    <input name="language_filter" class="form-control" value="{{ $model->language_filter  }}">
                                </div>
                                <div class="col-lg-6">
                                    <p>Исключить для:</p>
                                    <input name="language_filter_except" class="form-control" value="{{ $model->language_filter_except  }}">
                                </div>
                            </div>
                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <label><a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2" target="_blank">Страна</a> (большими буквами, через запятую, без пробелов)</label>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p>Применить для:</p>
                                    <input name="geo_target" class="form-control" value="{{ $model->geo_target  }}">
                                </div>
                                <div class="col-lg-6">
                                    <p>Исключить для:</p>
                                    <input name="geo_target_except" class="form-control" value="{{ $model->geo_target_except  }}">
                                </div>
                            </div>
                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" id="flexCheckChecked" name="is_premium" <?= $model->is_premium == 1? 'checked' : '' ?>>
                                <label class="form-check-label" for="flexCheckChecked">
                                    Показывать только для Premium аккаунтов
                                </label>
                            </div>
                        </div>
                        <div class="group" style="margin-top: 20px;">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" id="flexCheckChecked_has_wallet" name="has_wallet" <?= $model->has_wallet == 1? 'checked' : '' ?>>
                                <label class="form-check-label" for="flexCheckChecked_has_wallet">
                                    Показывать если у пользователя установлен кошелек
                                </label>
                            </div>
                        </div>

                        <div class="group" style="margin-top: 20px;">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" id="flexCheckChecked_has_one_pay" name="has_one_pay" <?= $model->has_one_pay == 1? 'checked' : '' ?>>
                                <label class="form-check-label" for="flexCheckChecked_has_one_pay">
                                    Показывать если у пользователя есть минимум одна транзакция в BUMP
                                </label>
                            </div>
                        </div>


                        <hr style="margin-top: 40px; margin-bottom: 20px;">
                        <div class="btn btn-primary js-edit">Обновить</div>
                    </form>
                </div>
            </article>
        </div>

    </section>

</main>

@include('/layouts/footer')

</body>

<script>
    $('form').on('submit', function (ret) {
        return false;
    });

    $('.js-edit').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            url: '/dashboard/task-edit-post',
            data: {
                id: {{$model->id}},
                name: $('form input[name="name"]').val(),
                link: $('form input[name="link"]').val(),
                price: $('form input[name="price"]').val(),
                icon: $('form input[name="icon"]').val(),
                partner_id: $('form select[name="partner_id"]').val(),
                group: $('form select[name="group"]').val(),
                checker: $('form select[name="checker"]').val(),
                checker_options: $('form input[name="checker_options"]').val(),
                language_filter_except: $('form input[name="language_filter_except"]').val(),
                geo_target: $('form input[name="geo_target"]').val(),
                geo_target_except: $('form input[name="geo_target_except"]').val(),
                language_filter: $('form input[name="language_filter"]').val(),
                is_premium: $('form input[name="is_premium"]').prop('checked')? 1 : 0,
                has_wallet: $('form input[name="has_wallet"]').prop('checked')? 1 : 0,
                has_one_pay: $('form input[name="has_one_pay"]').prop('checked')? 1 : 0
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            success: function (ret) {
                alert('Задание обновлено');
                //window.location = '/dashboard/task-list';
            }
        });
    });
</script>

</html>
