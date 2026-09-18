<?php
/** @var $address */
/** @var $result */
/** @var $userFriendly */
/** @var $testOnly */
/** @var $urlSafe */
/** @var $bounceable */
/** @var $phparray */
?>
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Конвертер адресов TON</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<div class="container" style="margin-top: 200px;">
    <h1>Конвертер адресов TON</h1>
    <form action="/ton-address" method="get">
        <textarea name="address" class="form-control"  rows="10"><?= $address ?></textarea>
        <pre><?= $result ?></pre>
        <input type="checkbox" name="userFriendly" value="1" <?= $userFriendly == '1' ? 'checked' : '' ?>>userFriendly
        <input type="checkbox" name="testOnly" value="1" <?= $testOnly == '1' ? 'checked' : '' ?>>testOnly
        <input type="checkbox" name="urlSafe" value="1" <?= $urlSafe == '1' ? 'checked' : '' ?>>urlSafe
        <input type="checkbox" name="bounceable" value="1" <?= $bounceable == '1' ? 'checked' : '' ?>>bounceable
        <input type="checkbox" name="phparray" value="1" <?= $phparray == '1' ? 'checked' : '' ?>>phparray
        <hr>
        <button type="submit" class="btn btn-success">Конвертировать</button>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


