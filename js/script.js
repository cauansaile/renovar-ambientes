
// Menu toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('ativo');
});


const track = document.querySelector('.carousel-track-gal');
const slides = Array.from(track.children);
const navButtons = document.querySelectorAll('.carousel-nav-gal button');
const prevButton = document.querySelector('.carousel-button.prev-gal');
const nextButton = document.querySelector('.carousel-button.next-gal');
let currentIndex = 0;
const intervalTime = 3500;
let slideInterval;

function updateSlideWidth() {
  if(window.innerWidth >= 768) {
    return 3; // mostra 3 fotos
  } else {
    return 1; // mostra 1 foto
  }
}

function goToSlide(index) {
  const slidesToShow = updateSlideWidth();
  const maxIndex = slides.length - slidesToShow;
  if(index > maxIndex) index = 0;
  if(index < 0) index = maxIndex;

  currentIndex = index;
  track.style.transform = `translateX(-${(100 / slidesToShow) * currentIndex}%)`;
  updateNav();
}

function updateNav() {
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
}

// Eventos
navButtons.forEach((button, i) => {
  button.addEventListener('click', () => {
    goToSlide(i);
    resetInterval();
  });
});

nextButton.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevButton.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Ajusta ao redimensionar a tela
window.addEventListener('resize', () => {
  goToSlide(currentIndex);
});

// Inicia carrossel automático
slideInterval = setInterval(nextSlide, intervalTime);


// ===================== CARROSSEL DIFERENCIAIS =====================
let indexDif = 0;
const carrosselDif = document.getElementById('carrossel-dif');
const totalDif = carrosselDif.children.length;
let intervaloDif;

function atualizarCarrosselDif() {
    carrosselDif.style.transform = `translateX(${-indexDif * 100}%)`;
}

function proximoDif() {
    indexDif = (indexDif + 1) % totalDif;
    atualizarCarrosselDif();
    reiniciarAutoPlayDif();
}

function anteriorDif() {
    indexDif = (indexDif - 1 + totalDif) % totalDif;
    atualizarCarrosselDif();
    reiniciarAutoPlayDif();
}

function iniciarAutoPlayDif() {
    intervaloDif = setInterval(proximoDif, 5000);
}

function pararAutoPlayDif() {
    clearInterval(intervaloDif);
}

function reiniciarAutoPlayDif() {
    pararAutoPlayDif();
    iniciarAutoPlayDif();
}

// Eventos de pausa
const containerDif = document.querySelector('.diferenciais #carrossel-container-dif');
containerDif.addEventListener('mouseenter', pararAutoPlayDif);
containerDif.addEventListener('mouseleave', iniciarAutoPlayDif);

iniciarAutoPlayDif();

document.getElementById("formContato").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const servico = document.getElementById("servico").value;
  

  const texto = `Olá! Me chamo ${nome}, Gostaria de um orçamento.%0A🏫 Endereço: ${endereco}%0A📝 Serviço: ${servico || "N/A"}`;

  const numero = "5571993201911"; // Altere para o número da escola com DDI + DDD
  const url = `https://wa.me/${numero}?text=${texto}`;

  window.open(url, "_blank");
});


