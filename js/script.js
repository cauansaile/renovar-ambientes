
// Menu toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('ativo');
});


/*const track = document.querySelector('.carousel-track-gal');
const slides = Array.from(track.children);
const navButtons = document.querySelectorAll('.carousel-nav-gal button');
const prevButton = document.querySelector('.carousel-button.prev-gal');
const nextButton = document.querySelector('.carousel-button.next-gal');
let currentIndex = 0;
const intervalTime = 3500;
let slideInterval;

function updateSlideWidth() {
  if(window.innerWidth >= 769) {
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
  const slidesToShow = updateSlideWidth();
  const page = Math.floor(currentIndex / slidesToShow); 
  // 🔹 Ajustado: agora marca o botão da "página" (grupo de slides)
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === page);
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
    goToSlide(i * updateSlideWidth()); 
    // 🔹 Agora cada botão leva para a "página" correta
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
slideInterval = setInterval(nextSlide, intervalTime);*/


// JS

const track = document.querySelector('.carousel-track-gal');
const slides = Array.from(track.children);
const nav = document.querySelector('.carousel-nav-gal');
const prevButton = document.querySelector('.carousel-button.prev-gal');
const nextButton = document.querySelector('.carousel-button.next-gal');

let currentIndex = 0;
let slidesToShow = 1;
let slideWidthPx = 0;
let navButtons = [];
const intervalTime = 3500;
let slideInterval;
const gap = 12;

let startX = 0;
let isDragging = false;
let movedX = 0;

/* 🔹 Clonar todos os slides para infinito */
function cloneSlides() {
  const allSlides = Array.from(track.children);

  // clones antes
  allSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('clone');
    track.insertBefore(clone, track.firstChild);
  });

  // clones depois
  allSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });
}

/* Calcula quantos slides mostrar */
function getSlidesToShow() {
  return window.innerWidth >= 769 ? 3 : 1;
}

/* Aplica tamanho dos slides */
function applySizes(preservePage = true) {
  slidesToShow = getSlidesToShow();
  const allSlides = document.querySelectorAll('.carousel-track-gal img');
  const viewportWidth = document.querySelector('.carousel-galeria').clientWidth;
  const totalGap = gap * (slidesToShow - 1);
  slideWidthPx = (viewportWidth - totalGap) / slidesToShow;

  allSlides.forEach(img => {
    img.style.flex = `0 0 ${slideWidthPx}px`;
    img.style.maxWidth = `${slideWidthPx}px`;
  });

  buildDots();
  goToSlide(currentIndex, false);
}

/* Cria dots dinamicamente */
function buildDots() {
  const originalSlides = slides.length;
  const pages = Math.ceil(originalSlides / slidesToShow);
  nav.innerHTML = '';
  navButtons = [];

  for (let i = 0; i < pages; i++) {
    const btn = document.createElement('button');
    if (i === Math.floor((currentIndex - slides.length) / slidesToShow)) btn.classList.add('active');
    btn.addEventListener('click', () => {
      goToSlide(i * slidesToShow + slides.length); // ajusta para começar no primeiro original
      resetInterval();
    });
    nav.appendChild(btn);
    navButtons.push(btn);
  }
}

/* Move para slide */
function goToSlide(index, animate = true) {
  const allSlides = document.querySelectorAll('.carousel-track-gal img');
  currentIndex = index;
  const offset = (slideWidthPx + gap) * currentIndex;
  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${offset}px)`;
  updateDots();
}

/* Atualiza dots */
function updateDots() {
  const page = Math.floor((currentIndex - slides.length) / slidesToShow);
  navButtons.forEach((b, i) => b.classList.toggle('active', i === page));
}

/* Transição infinita: reposiciona quando chega nos clones */
track.addEventListener('transitionend', () => {
  const allSlides = document.querySelectorAll('.carousel-track-gal img');
  const originalLength = slides.length;

  if (currentIndex >= allSlides.length - originalLength) {
    currentIndex = currentIndex - originalLength;
    goToSlide(currentIndex, false);
  }
  if (currentIndex < originalLength) {
    currentIndex = currentIndex + originalLength;
    goToSlide(currentIndex, false);
  }
});

/* Próximo e anterior */
function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

/* Swipe / arraste */
function startDrag(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  movedX = 0;
  track.style.transition = 'none';
}
function moveDrag(e) {
  if (!isDragging) return;
  const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  movedX = x - startX;
  const offset = (slideWidthPx + gap) * currentIndex - movedX;
  track.style.transform = `translateX(-${offset}px)`;
}
function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  if (movedX > 50) prevSlide();
  else if (movedX < -50) nextSlide();
  else goToSlide(currentIndex);
}

/* Eventos */
nextButton.addEventListener('click', () => { nextSlide(); resetInterval(); });
prevButton.addEventListener('click', () => { prevSlide(); resetInterval(); });
window.addEventListener('resize', () => applySizes(true));
track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', moveDrag);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);
track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', moveDrag);
track.addEventListener('touchend', endDrag);

/* Autoplay */
slideInterval = setInterval(nextSlide, intervalTime);

/* Inicializa */
cloneSlides();
currentIndex = slides.length; // começa no primeiro slide original
applySizes(false);
goToSlide(currentIndex, false);




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


