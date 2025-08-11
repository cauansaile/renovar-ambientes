
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('ativo');
});

let index = 0;
const carrossel = document.getElementById('carrossel');
const total = carrossel.children.length;
let intervalo;

function atualizarCarrossel() {
    carrossel.style.transform = `translateX(${-index * 100}%)`;
}

/*function proximo() {
    index = (index + 1) % total;
    atualizarCarrossel();
}

function anterior() {
    index = (index - 1 + total) % total;
    atualizarCarrossel();
}*/
function proximo() {
    index = (index + 1) % total;
    atualizarCarrossel();
    pararAutoPlay();
    iniciarAutoPlay();
}
function anterior() {
    index = (index - 1 + total) % total;
    atualizarCarrossel();
    pararAutoPlay();
    iniciarAutoPlay();
}

function iniciarAutoPlay() {
    intervalo = setInterval(proximo, 5000); // 5 segundos
}

function pararAutoPlay() {
    clearInterval(intervalo);
}

// Iniciar autoplay
iniciarAutoPlay();

// Pausar ao passar o mouse
const container = document.getElementById('carrossel-container');
container.addEventListener('mouseenter', pararAutoPlay);
container.addEventListener('mouseleave', iniciarAutoPlay);
