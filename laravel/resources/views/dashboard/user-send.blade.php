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

            <article class="main__content-item main__content-form main__content-form_type_user-send col col-xl-8">
               <div class="main__content-item-header">
                  <span class="main__content-text main__content-item-bold-text">
                     Ручное начисление баланса пользователю
                  </span>
               </div>
               <div class="main__content-item-section">
                  <div class="row">
                     <div class="alert alert-danger" id="error-message" hidden>ERROR MESSAGE</div>
                  </div>
                  <form>
                     <div class="form-item">
                        <label for="tg-id" class="form-label">Telegram Id</label>
                        <input type="text" class="form-control" id="tg-id" name="tg-id" value="">
                     </div>
                     <div class="form-item">
                        <label for="value" class="form-label">Сколько начислить</label>
                        <input type="text" class="form-control" id="value" name="value" value="">
                     </div>
                     <div class="form-item">
                        <label for="comment" class="form-label">Комментарий</label>
                        <input type="text" class="form-control" id="comment" name="comment" value="">
                     </div>
                     <div class="form-item-center">
                        <div id="submit-btn" class="btn btn-primary">Отправить</div>
                     </div>
                  </form>
                  <div class="row result-data" id="result" hidden>
                     <h3>Успешно начислено</h3>
                     <p>Id записи: <b id="result-user-id">-</b></p>
                     <p>Начислил: <b id="result-author">-</b></p>
                     <p>Telegram id: <b id="result-telegram-id">-</b></p>
                     <p>Сумма начисления: <b id="result-value">-</b></p>
                     <p>Время начисления: <b id="result-time">-</b></p>
                     <p>Комментарий: <b id="result-comment">-</b></p>
                     <p>Log Id: <b id="result-log-id">-</b></p>
                  </div>
               </div>
            </article>
         </div>

      </section>

   </main>

   @include('/layouts/footer')

</body>

<script>
document.getElementById('submit-btn').addEventListener('click', async () => {
   const tgId = document.getElementById('tg-id').value;
   const value = document.getElementById('value').value;
   const comment = document.getElementById('comment').value;

   const resultContainer = document.getElementById('result');
   const errorContainer = document.getElementById('error-message');

   resultContainer.hidden = true;
   errorContainer.hidden = true;

   const response = await fetch('/add-user-balance', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'X-CSRF-TOKEN': '{{ csrf_token() }}',
         'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
         'tg_id': tgId,
         'amount': value,
         'comment': comment
      }),
   });

   const data = await response.json();

   if (!data.success) {
      errorContainer.hidden = false;
      errorContainer.innerText = data.message;
   } else {
      resultContainer.hidden = false;

      document.getElementById('result-user-id').innerText = data.id;
      document.getElementById('result-telegram-id').innerText = data.tg_id;
      document.getElementById('result-author').innerText = data.author;
      document.getElementById('result-value').innerText = data.value;
      document.getElementById('result-time').innerText = new Date(data.time * 1000).toLocaleString();
      document.getElementById('result-comment').innerText = data.comment;
      document.getElementById('result-log-id').innerText = data.log_id;
   }
});
</script>

</html>