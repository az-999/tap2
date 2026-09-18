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

            <article class="main__content-item main__content-form main__content-form_type_partners-list col col-xl-8">
               <div class="main__content-item-header">
                  <span class="main__content-text main__content-item-bold-text">
                     Партнеры
                  </span>
               </div>
               <div class="main__content-item-section">

                  <a href="/dashboard/add-partner" class="btn btn-success">Добавить</a>

                  <table class='table table-striped align-middle table-bordered'
                     style="font-family: Gilroy, sans-serif">
                     <thead class='align-middle text-center'>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">name</th>
                           <th scope="col">REF</th>
                           <th scope="col">Кол-во</th>
                           <th scope="col"></th>
                        </tr>
                     </thead>
                     <tbody>
                        <?php foreach (\App\Models\Partner::query()->get() as $task) { ?>
                        <tr>
                           <th scope="row"><?= $task->id ?></th>
                           <td><?= $task->name ?></td>
                           <td><?= $task->ref_id ?></td>
                           <td>
                              <span onclick="getPartnerCount(this, <?= $task->id ?>)"
                                 class="main__content-text main__content-item-bold-text updatable">X</span>
                           </td>
                           <td>
                              <button class="btn btn-outline-danger js-delete" data-id="{{$task->id}}">Удалить</button>
                           </td>
                        </tr>
                        <?php } ?>
                     </tbody>

                  </table>

               </div>
            </article>
         </div>

      </section>

   </main>

   @include('/layouts/footer')

</body>

<script>
const getPartnerCount = async (element, id) => {
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
         'target': 'partner-count',
         'id': id
      }),
   });

   const data = await response.json();
   element.innerText = data.count;
}

$('.js-delete').click(function(e) {
   $.ajax({
      url: '/dashboard/partner-delete',
      data: {
         id: $(this).data('id')
      },
      headers: {
         'X-CSRF-TOKEN': '{{ csrf_token() }}'
      },
      type: 'post',
      success: function(ret) {
         window.location.reload();
      }
   });
});
</script>

</html>