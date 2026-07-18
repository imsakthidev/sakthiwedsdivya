import './style.css'

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// Trigger initial reveals immediately for items already in view
setTimeout(() => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('active');
    }
  });
}, 100);

// Celebration Sparkles Background
const createSparkles = () => {
  const bg = document.createElement('div');
  bg.className = 'celebration-bg';
  // Create 25 elegant sparkles floating in the background
  for(let i=0; i<25; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = (Math.random() * 4) + 's';
    sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    bg.appendChild(sparkle);
  }
  document.body.prepend(bg);
};
createSparkles();

// Carousel Logic
let slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentSlide = 0;
let totalSlides = slides.length;
let autoSlideInterval;

window.initCarousel = function() {
  // Re-fetch slides in case some were removed by onerror
  slides = Array.from(document.querySelectorAll('.carousel-slide'));
  totalSlides = slides.length;
  
  if (totalSlides === 0) return; // No images loaded

  // Ensure current slide is within bounds
  if (currentSlide >= totalSlides) currentSlide = 0;

  // Rebuild dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  updateCarousel();
};

const dots = () => document.querySelectorAll('.dot');

function updateCarousel() {
  if (slides.length === 0) return;
  slides.forEach(slide => slide.classList.remove('active'));
  dots().forEach(dot => dot.classList.remove('active'));
  
  slides[currentSlide].classList.add('active');
  const dotElements = dots();
  if(dotElements[currentSlide]) {
    dotElements[currentSlide].classList.add('active');
  }
}

function nextSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 4000);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
}

// Initial Setup
window.initCarousel();
autoSlideInterval = setInterval(nextSlide, 4000);

// Countdown Logic
const weddingDate = new Date("June 8, 2025 09:30:00").getTime();

const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  if (distance < 0) {
    clearInterval(countdownTimer);
    countdownEl.innerHTML = "<h2 style='font-family: var(--font-title); color: var(--gold);'>The celebration has begun!</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}, 1000);
