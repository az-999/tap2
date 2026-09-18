@include('dashboard-header')


<div class="container" style="margin-top: 100px;">
    @if($ok)
    <h1>Congratulations, you passed the captcha</h1>
    @else
    <h1>Captcha</h1>
    @if($error)
        <p>{{ $error }}</p>
    @endif
    <form action="/captcha/check" method="POST" style="max-width: 400px"> @csrf
        <!-- rest of your form here -->
        <div id="step-1" class="flex flex-col">
            <div class="w-full mx-auto rounded-t-md" style="margin:0; height:50px; background-image:url('{{ $captcha->top->toGif()->toDataUri() }}')"></div>
            <div id="bottom" class="w-full mx-auto shadow rounded-b-md" style="margin:0; height:50px; background-image:url('{{ $captcha->bottom->toGif()->toDataUri() }}');" x-ref="bottom" ></div>
            <input id="guess" type="range" name="guess" min="400" max="2000" step="10" x-model="guess" autocomplete="off" class="w-full mt-2 py-3" style="width: 100%">
            @error('guess'){{ $message }}@enderror
            <div id="next" class="btn btn-primary">Next Step</div>
        </div>
        <div id="step-2" class="flex flex-col" hidden>
            <img src="{{ $captcha->builder->inline() }}" alt="">
            <input class="form-control form-control-sm" type="text" name="captcha" autocomplete="off" style="max-width: 200px; margin-top: 10px">
            <input type="submit" value="Send" class="btn btn-primary" style="margin-top: 10px; width: 200px">
        </div>
    </form>
    @endif
</div>

@if(!$ok)
<script>
    document.getElementById('guess').addEventListener('input', () => {
        document.getElementById('bottom').style.backgroundPosition = `${document.getElementById('guess').value}px 0`;
    });

    document.getElementById('next').addEventListener('click', () => {
        document.getElementById('step-1').hidden = true;
        document.getElementById('step-2').hidden = false;
    });
</script>
@endif

@include('dashboard-footer')
