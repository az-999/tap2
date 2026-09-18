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
                     Airdrop Tasks
                  </span>
               </div>
               <div class="main__content-item-section">
                  <div class="row">
                     <div class="alert alert-danger" id="error-message" hidden>ERROR MESSAGE</div>
                  </div>



                  <table class='table table-striped align-middle table-bordered'
                     style="font-family: Gilroy, sans-serif">
                     <thead class='align-middle text-center'>
                        <tr>
                           <?php
                           $query = \App\Models\AirdropWhitebitRequest::query()
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
                                   'header'    => 'tg_id',
                                   'attribute' => 'tg_id',
                                   'sort'      => 'asc',
                               ],
                               [
                                   'header'    => 'nik',
                                   'attribute' => 'nik',
                                   'sort'      => 'asc',
                               ],
                               [
                                   'header'    => 'status',
                                   'attribute' => 'status',
                                   'sort'      => 'asc',
                               ],
                               [
                                   'header'    => 'created_at',
                                   'attribute' => 'created_at',
                                   'sort'      => 'asc',
                               ],
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
                               <td scope="row">{{$task->id}}</td>
                               <td scope="row">{{$task->tg_id}}</td>
                               <td scope="row">{{$task->nik}}</td>
                               <td scope="row">
                                   <?php if ($task->status == 0) { ?>
                                   <button class="btn btn-success js-success" data-id="<?= $task->id ?>">Одобрить</button>
                                   <button class="btn btn-danger js-reject" data-id="<?= $task->id ?>">Отклонить</button>
                                   <?php } ?>
                                   <?php if ($task->status == 1) { ?>
                                       Одобрено
                                   <?php } ?>
                                   <?php if ($task->status == 2) { ?>
                                        Отклонено: <?= $task->description ?>
                                   <?php } ?>

                               </td>
                               <td scope="row">{{$task->created_at}}</td>
                            </tr>
                        <?php } ?>
                     </tbody>
                  </table>

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
    $('.js-reject').click(function (e) {
        $.ajax({
            url: '/dashboard/airdrop-request-reject',
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
    $('.js-success').click(function (e) {
        $.ajax({
            url: '/dashboard/airdrop-request-success',
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
</script>

</html>
