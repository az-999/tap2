<?php


?>
<!doctype html>
<html lang="en">

@include('/layouts/head')

<body class="dashboard">

   @include('/layouts/header-auth')

   <main class="main">

      <section class="main__content-container container-fluid ">
         <div class='justify-content-evenly d-flex flex-column flex-xl-row align-items-xl-start align-items-center gap-xl-2 gap-4'>

             @include('/layouts/left-menu')

            <article class="main__content-item main__content-form col col-xl-8">
               <div class="main__content-item-header">
                  <span class="main__content-text main__content-item-bold-text">
                     Tasks
                  </span>
               </div>
               <div class="main__content-item-section">
                  <div class="row">
                     <div class="alert alert-danger" id="error-message" hidden>ERROR MESSAGE</div>
                  </div>

                   <div class="row">
                       <div class="col-lg-4">
                           <a href="/dashboard/task-list?sort=id&order=desc" class="btn btn-primary " style="width: 100%;">All</a>
                       </div>
                       <div class="col-lg-4">
                           <a href="/dashboard/task-list-kols?sort=id&order=desc" class="btn btn-light " style="width: 100%;">KOLs</a>
                       </div>
                      <div class="col-lg-4">
                          <a href="/dashboard/task-list-community?sort=id&order=desc" class="btn btn-light " style="width: 100%;">Сommunity</a>
                      </div>
                   </div>

                   <a href="/dashboard/task-add" class="btn btn-primary">Add</a>

                  <table class='table table-striped align-middle table-bordered'
                     style="font-family: Gilroy, sans-serif">
                     <thead class='align-middle text-center'>
                        <tr>
                           <?php
                           $query = \App\Models\Task::query()
                               ->select([
                                   'task.*',
                                   'partners.name as partner_name'
                               ])
                               ->leftJoin('partners', 'partners.id', '=', 'task.partner_id')
                           ;

                           $sort = request()->get('sort');
                           $order = request()->get('order', 'asc');
                           if ($sort) {
                               $query->orderBy($sort, $order);
                           }

                           $columns = [
                               [
                                   'header'    => 'ID',
                                   'attribute' => 'id',
                                   'sort'      => 'desc',
                               ],
                               [
                                   'header'    => 'Partner',
                                   'attribute' => 'partner_name',
                                   'sort'      => 'asc',
                               ],
                               [
                                   'header'    => 'Name',
                                   'attribute' => 'name',
                                   'sort'      => 'asc',
                               ],
                               ['header'    => 'Limit'],
                               [
                                   'header'    => 'Act?',
                                   'attribute' => 'is_active',
                                   'sort'      => 'desc',
                               ],
                               [
                                   'header'    => 'Hide?',
                                   'attribute' => 'is_hide',
                                   'sort'      => 'desc',
                               ],

                               [
                                   'header'    => 'Check',
                                   'attribute' => 'checker',
                                   'sort'      => 'desc',
                               ],
                               ['header'    => 'Sum'],
                           ];
                           foreach ($columns as $column) {
                               $header = $column['header'];
                               if (isset($column['sort'])) {
                                   $attribute = $column['attribute'];
                                   if ($sort == $column['attribute']) {
                                       $o = $order == 'asc' ? 'desc' : 'asc';
                                       $o1 = $order == 'asc' ? '↓' : '↑';
                                       $html = "<a href='?sort=$attribute&order=$o'>$header&nbsp;$o1</a>";
                                   } else {
                                       $o = $column['sort'];
                                       $html = "<a href='?sort=$attribute&order=$o'>$header</a>";
                                   }
                               } else {
                                   $html = $header;
                               }

                               echo "<th scope='col'>$html</th>";
                           }
                           ?>

                        </tr>
                     </thead>
                     <tbody>
                        <?php foreach ($query->get() as $task) { ?>
                        <tr>
                           <th scope="row"><a href="/dashboard/task-edit?id={{$task->id}}">{{$task->id}}</a></th>
                           <td><?php
                           if ($task->partner_id) {
                               $p = \App\Models\Partner::query()->find($task->partner_id);
                               if ($p) {
                                   echo $p->name;
                               }

                           }
                           ?></td>
                           <td><?= $task->name ?></td>
                           <td style="width: 150px;">

                               <div class="input-group  input-group-sm">
                                   <input type="text" class="form-control js-limit-input " value="{{ $task->limit }}"  style="width: 100px;">
                                   <button class="btn btn-outline-secondary js-limit-update" type="button"  title="обновить" data-id="{{ $task->id }}">u</button>
                               </div>
                           </td>

                           <td>
                               <button class="btn btn-sm js-toggle <?= $task->is_active ? 'btn-success' : 'btn-danger' ?>"
                                 data-id="<?= $task->id ?>" data-toggle="tooltip"
                                 title="<?= $task->is_active==1? 'Выключить' : 'Включить' ?>"><?= $task->is_active ? 'Yes' : 'No' ?></button>
                           </td>
                           <td>
                               <button class="btn btn-sm <?= $task->is_hide ? 'btn-danger' : 'btn-success' ?> js-hide" data-id="<?= $task->id ?>" data-toggle="tooltip" title="<?= $task->is_hide==1? 'Показать' : 'Скрыть' ?>"><?= $task->is_hide ? 'Yes' : 'No' ?></button>
                           </td>
                           <td><?= $task->checker == 'App\Service\TrueChecker' ? 'Link' : 'Bot' ?></td>
                           <td>
                              <span onclick="getTasksCount(this, <?= $task->id ?>)"
                                 class="main__content-text main__content-item-bold-text updatable">X</span>
                           </td>
                        </tr>
                        <?php } ?>
                     </tbody>
                  </table>
                  <hr>
                  <button class="btn btn-primary js-reset-cache">Reset the cache</button>

               </div>
            </article>
         </div>

      </section>

   </main>

   @include(' /layouts/footer')
</body>

<script>
    const getTasksCount = async(element, id) => {
        element.innerText = '...';
        const response = await fetch('/get-stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                'target': 'tasks-count',
                'task_id': id
            }),
        });

        const data = await response.json();
        element.innerText = data.count;
    }
    $('.js-toggle').click(function (e) {
        $.ajax({
            url: '/dashboard/toggle-task',
            data: {
                id: $(this).data('id')
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            success: function (ret) {
                window.location.reload();
            }
        });
    });
    $('.js-hide').click(function (e) {
        $.ajax({
            url: '/dashboard/task-hide-toggle',
            data: {
                id: $(this).data('id')
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            success: function (ret) {
                window.location.reload();
            }
        });
    });
    $('.js-reset-cache').click(function (e) {
        $.ajax({
            url: '/dashboard/reset-cache',
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            success: function (ret) {
                alert('Успешно');
            }
        });
    });
    $('.js-limit-update').click(function (e) {
        $.ajax({
            url: '/dashboard/update-limit',
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            data: {
                id: $(this).data('id'),
                value: $(this).parent().parent().find('.js-limit-input').val()
            },
            success: function (ret) {
                alert('Успешно');
            }
        });
    });
</script>

</html>
