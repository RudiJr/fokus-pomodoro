const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseTxt = document.querySelector('#start-pause span')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon');

const musicaFocoInput = document.querySelector('#alternar-musica'); 
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoSeg = 5; 
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }else { 
        musica.pause();
    };
});

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
}); 

longoBtn.addEventListener('click', ()=> {
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`); // template string
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br> 
                                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo": 
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    
        default:
            break;
    };
};

/* `` is a template string in JavaScript. It is
    used to dynamically insert the value of the variable
    `contexto` into the string. In this case, it is used to
    dynamically generate the source path for the `banner` image
    based on the value of the `contexto` variable. */

const contagemRegressiva = () => {
    if(tempoDecorridoSeg <= 0){
        audioTempoFinalizado.play()
        alert('Tempo Finalizado');
        zerar();
        return;
    };
    tempoDecorridoSeg -= 1;
    console.log('temporizador: ' + tempoDecorridoSeg);
    console.log('Id: ' + intervaloId);
};

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play();
        zerar();
        return;
    };
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseTxt.textContent =  'Pausar';
    startPauseIcon.setAttribute('src', '/imagens/pause.png');
};

function zerar() {
    clearInterval(intervaloId);
    startPauseTxt.textContent = 'Começar';
    startPauseIcon.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}