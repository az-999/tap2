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
                     Добавить задачу
                  </span>
               </div>
               <div class="main__content-item-section">


                   <form method="post">

                       <div class="group">
                           <label>Наименование *</label>
                           <input name="name" class="form-control">
                       </div>
                       <div class="group" style="margin-top: 20px;">
                           <label>Описание *</label>
                           <input name="description" class="form-control">
                       </div>
                       <div class="group" style="margin-top: 20px;">
                           <label>Награда *</label>
                           <input name="amount" class="form-control">
                       </div>
                       <div class="group" style="margin-top: 20px;">
                           <label>Тип *</label>
                           <select name="type" class="form-control">
                               <option value="1">Разозовая</option>
                               <option value="2">Лимитированная</option>
                               <option value="3">Бесконечная</option>
                           </select>
                       </div>
                       <div class="group" style="margin-top: 20px;">
                           <label>Кол-во раз в задаче</label>
                           <input name="count" class="form-control">
                       </div>
                       <div class="group" style="margin-top: 20px;">
                           <label>Инструкция</label>
                           <textarea name="instruction" class="form-control" rows="10"></textarea>
                       </div>



                       <hr style="margin-top: 40px; margin-bottom: 20px;">
                       <button class="btn btn-primary js-add" style="width: 100%;">Добавить</button>
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
        console.log(ret);
        return false;
    });

    $('.js-add').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            url: '/dashboard/airdrop-task-add-post',
            data: {
                name: $('form input[name="name"]').val(),
                description: $('form input[name="description"]').val(),
                amount: $('form input[name="amount"]').val(),
                type: $('form select[name="type"]').val(),
                count: $('form input[name="count"]').val(),
                instruction: $('form textarea[name="instruction"]').val()
            },
            headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'},
            type: 'post',
            success: function (ret) {
                alert('Задание добавлено');
            }
        });
    });
</script>

</html>
