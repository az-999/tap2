<!doctype html>
<html lang="en">

@include('/layouts/head')

<body class="dashboard">

@include('/layouts/header-auth')

<main class="main">

    <section class="main__content-container container-fluid">
        <div class='justify-content-evenly d-flex flex-column flex-xl-row align-items-xl-start align-items-center gap-xl-2 gap-4'>
            @include('/layouts/left-menu')

            <article class="main__content-item main__content-form main__content-form_type_task-add col col-xl-8">
                <div class="main__content-item-header">
                <span class="main__content-text main__content-item-bold-text">
                    Доход и комиссии (TON) с {{ $from }} по {{ $to }}
                </span>
                </div>
                <div class="main__content-item-section">
                    @foreach($stats as $wallet => $stats)
                    <div>
                        <h5>{{ $stats['name'] }}</h5>
                        <a href="https://tonviewer.com/{{ $wallet }}" target="_blank">{{ $wallet }}</a>
                        <div data-address="{{ $wallet }}" class="updatable" onclick="getWalletBalance(this)">💰
                            <span class="ton-value">{{ $stats['balance'] }}</span> TON
                            <span class="updatable-text" style="text-decoration: underline">обновить</span>
                        </div>
                        <table class="table">
                            <thead>
                                <th>Тип операции</th>
                                <th>Всего</th>
                                <th>Комиссия</th>
                                <th>Доход</th>
                                <th>Остаток</th>
                            </thead>
                            <tbody>
                            @foreach($stats['types'] as $type => $fs)
                                <tr>
                                    <td>{{ $fs['name'] }}({{ $fs['count'] }})</td>
                                    <td>{{ $fs['value'] }}</td>
                                    <td>{{ $fs['fees'] }}</td>
                                    <td>{{ $fs['income'] }}</td>
                                    <td>{{ $fs['locked'] }}</td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    @endforeach
                    @foreach($balances as $balance)
                    <div class="balance-item">
                        <h5>{{ $balance['name'] }}</h5>
                        <a href="https://tonviewer.com/{{ $balance['address'] }}" target="_blank">{{ $balance['address'] }}</a>
                        <div data-address="{{ $balance['address'] }}" class="updatable" onclick="getWalletBalance(this)">💰
                            <span class="ton-value">{{ $balance['balance'] }}</span> TON
                            <span class="updatable-text" style="text-decoration: underline">обновить</span>
                        </div>
                    </div>

                    @endforeach
                </div>
            </article>
        </div>
    </section>
</main>

@include('/layouts/footer')

</body>

<script>
const getWalletBalance = async (element) => {
    element.querySelector('.ton-value').innerText = '...';
    const response = await fetch('/get-wallet-balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            'address': element.dataset.address
        }),
    });

    const data = await response.json();
    element.querySelector('.ton-value').innerText = data.balance;
}
</script>

</html>
