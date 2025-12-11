/* JavaScript Document

TemplateMo 605 Xmas Countdown - Модифицирован для Сербии

https://templatemo.com/tm-605-xmas-countdown

*/

// Create Particles and Snowflakes with Serbian colors
function createParticles() {
   const container = document.getElementById('particles');
   
   // Создаем новогодние украшения (гирлянды, звезды и т.д.)
   createChristmasDecorations();

   // Floating particles with Serbian colors
   for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (15 + Math.random() * 25) + 's';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.width = (3 + Math.random() * 5) + 'px';
      particle.style.height = particle.style.width;
      
      // Сербские цвета (красный, синий, белый, золотой)
      const colors = ['#c6363c', '#0c4076', '#ffffff', '#ffd700'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
   }

   // Snowflakes - новогодние снежинки
   const snowflakeSymbols = ['❄', '❅', '❆', '★', '☆', '✨', '🎄', '🎁'];
   for (let i = 0; i < 35; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (15 + Math.random() * 25) + 's';
      snowflake.style.animationDelay = Math.random() * 15 + 's';
      snowflake.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
      snowflake.style.opacity = 0.3 + Math.random() * 0.7;
      
      // Сербские цвета для снежинок
      const flakeColors = ['rgba(255, 255, 255, 0.8)', 'rgba(198, 54, 60, 0.7)', 'rgba(12, 64, 118, 0.7)', 'rgba(255, 215, 0, 0.7)'];
      snowflake.style.color = flakeColors[Math.floor(Math.random() * flakeColors.length)];
      
      container.appendChild(snowflake);
   }
}

// Создание новогодних украшений
function createChristmasDecorations() {
   const container = document.getElementById('particles');
   const decorations = ['🎄', '🎅', '🎁', '✨', '⭐', '🔔', '🕯️', '🇷🇸'];
   
   for (let i = 0; i < 15; i++) {
      const decoration = document.createElement('div');
      decoration.className = 'xmas-decoration';
      decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
      decoration.style.left = Math.random() * 100 + '%';
      decoration.style.animationDuration = (20 + Math.random() * 40) + 's';
      decoration.style.animationDelay = Math.random() * 25 + 's';
      decoration.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
      decoration.style.opacity = 0.15 + Math.random() * 0.3;
      
      // Добавляем индивидуальные анимации
      if (i % 3 === 0) {
         decoration.style.animationName = 'float-xmas-decoration, rotate-slow';
         decoration.style.animationDuration = (20 + Math.random() * 40) + 's, ' + (30 + Math.random() * 50) + 's';
      }
      
      container.appendChild(decoration);
   }
}

// Countdown Timer - Target: January 1, 2025 at 00:00:00 (Новый Год)
function updateCountdown() {
   const newYear = new Date('January 1, 2025 00:00:00').getTime();
   const now = new Date().getTime();
   const distance = newYear - now;

   if (distance < 0) {
      // Новый год наступил
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      
      // Показать праздничное сообщение
      showNewYearMessage();
      return;
   }

   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   // Плавная анимация изменения чисел
   animateNumberChange('days', days.toString().padStart(2, '0'));
   animateNumberChange('hours', hours.toString().padStart(2, '0'));
   animateNumberChange('minutes', minutes.toString().padStart(2, '0'));
   animateNumberChange('seconds', seconds.toString().padStart(2, '0'));
   
   // Обновляем прогресс-бар
   updateProgressBar(distance);
   
   // Добавляем праздничные эффекты когда мало времени
   if (days <= 7) {
      addHolidayEffects(days);
   }
}

// Плавная анимация изменения чисел
function animateNumberChange(elementId, newValue) {
   const element = document.getElementById(elementId);
   const oldValue = element.textContent;
   
   if (oldValue !== newValue) {
      element.style.transform = 'scale(1.1)';
      element.style.color = '#ffd700'; // Золотой цвет при изменении
      
      setTimeout(() => {
         element.textContent = newValue;
         element.style.transform = 'scale(1)';
         element.style.color = '';
      }, 150);
   }
}

// Обновление прогресс-бара до Нового Года
function updateProgressBar(distance) {
   const totalDays = 365; // Дней в году
   const daysPassed = totalDays - Math.floor(distance / (1000 * 60 * 60 * 24));
   const progress = (daysPassed / totalDays) * 100;
   
   const progressBar = document.getElementById('progress-bar');
   if (progressBar) {
      progressBar.style.width = progress + '%';
      
      // Цвет прогресс-бара меняется в зависимости от времени года
      if (progress < 25) {
         progressBar.style.background = 'linear-gradient(90deg, var(--serbian-blue), #4a90e2)';
      } else if (progress < 50) {
         progressBar.style.background = 'linear-gradient(90deg, #4a90e2, #7cb342)';
      } else if (progress < 75) {
         progressBar.style.background = 'linear-gradient(90deg, #7cb342, #f57c00)';
      } else {
         progressBar.style.background = 'linear-gradient(90deg, var(--serbian-red), #ffd700)';
      }
   }
}

// Добавление праздничных эффектов когда мало дней до Нового Года
function addHolidayEffects(daysLeft) {
   const heroSection = document.querySelector('.hero');
   const countdownItems = document.querySelectorAll('.countdown-item');
   
   // Мерцание элементов
   if (daysLeft <= 3) {
      countdownItems.forEach((item, index) => {
         item.style.animation = `pulse-glow 1.5s ease-in-out ${index * 0.2}s infinite`;
      });
      
      // Добавляем конфетти при 1 дне
      if (daysLeft === 1) {
         createConfetti();
      }
   }
   
   // Интенсивность эффектов увеличивается с уменьшением дней
   const intensity = 1 - (daysLeft / 7);
   document.documentElement.style.setProperty('--glow-intensity', intensity);
}

// Создание конфетти
function createConfetti() {
   const container = document.getElementById('particles');
   const confettiColors = ['#c6363c', '#0c4076', '#ffffff', '#ffd700', '#ff6b6b', '#4d9fff'];
   const confettiShapes = ['❄', '✨', '⭐', '🎉', '🎊', '💫'];
   
   for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-20px';
      confetti.style.position = 'absolute';
      confetti.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
      confetti.style.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.opacity = 0.8 + Math.random() * 0.2;
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      confetti.style.userSelect = 'none';
      
      // Анимация падения конфетти
      const animation = confetti.animate([
         { 
            transform: `translateY(0) rotate(0deg)`,
            opacity: 1
         },
         { 
            transform: `translateY(${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`,
            opacity: 0
         }
      ], {
         duration: 3000 + Math.random() * 2000,
         easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
         delay: Math.random() * 1000
      });
      
      animation.onfinish = () => confetti.remove();
      container.appendChild(confetti);
   }
}

// Показать сообщение о наступлении Нового Года
function showNewYearMessage() {
   const hero = document.querySelector('.hero');
   const countdownWrapper = document.querySelector('.countdown-wrapper');
   
   if (!hero.querySelector('.new-year-message')) {
      const message = document.createElement('div');
      message.className = 'new-year-message';
      message.innerHTML = `
         <div class="message-content">
            <h2 style="font-size: 4rem; color: #ffd700; margin-bottom: 20px;">🎉 С НОВЫМ 2025 ГОДОМ! 🎉</h2>
            <p style="font-size: 1.5rem; color: white; margin-bottom: 30px;">Živela Srbija! Слава Сербии!</p>
            <div style="font-size: 5rem; animation: pulse 2s infinite;">
               🇷🇸🎄🎅🎁✨
            </div>
         </div>
      `;
      
      message.style.cssText = `
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         background: rgba(10, 10, 15, 0.95);
         padding: 40px;
         border-radius: 30px;
         border: 2px solid #ffd700;
         box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
         text-align: center;
         z-index: 100;
         animation: fadeIn 1s ease-out;
      `;
      
      hero.appendChild(message);
      
      // Запускаем масштабный конфетти
      setInterval(() => createConfetti(), 500);
   }
}

// Header scroll effect with parallax
function handleScroll() {
   const header = document.getElementById('header');
   const scrollY = window.scrollY;
   
   if (scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
   
   // Параллакс эффект для фона
   const gridBg = document.querySelector('.grid-bg');
   if (gridBg) {
      gridBg.style.transform = `translateY(${scrollY * 0.2}px)`;
   }
}

// Smooth Scroll Spy with highlighting
function scrollSpy() {
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');
   const headerHeight = document.getElementById('header').offsetHeight;

   let currentSection = '';
   const scrollPosition = window.scrollY + headerHeight + 100;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
         currentSection = sectionId;
         
         // Добавляем эффект подсветки секции
         section.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.1)';
         setTimeout(() => {
            section.style.boxShadow = '';
         }, 1000);
      }
   });

   navLinks.forEach(link => {
      link.classList.remove('nav-active');
      const href = link.getAttribute('href');
      
      if (href === '#' + currentSection) {
         link.classList.add('nav-active');
         
         // Анимация активной ссылки
         link.style.transform = 'scale(1.05)';
         setTimeout(() => {
            link.style.transform = '';
         }, 300);
      }
   });
}

// Smooth scrolling for anchor links
function setupSmoothScroll() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         if (targetId === '#') return;
         
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
               top: targetPosition,
               behavior: 'smooth'
            });
            
            // Эффект пульсации для целевого элемента
            targetElement.style.animation = 'pulse-highlight 1s ease';
            setTimeout(() => {
               targetElement.style.animation = '';
            }, 1000);
         }
      });
   });
}

// Mobile navigation with animations
function setupNavigation() {
   const toggle = document.getElementById('navToggle');
   const nav = document.getElementById('nav');
   const links = nav.querySelectorAll('a');

   toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      
      // Анимация кнопки меню
      if (nav.classList.contains('active')) {
         document.body.style.overflow = 'hidden';
         nav.style.animation = 'slideInRight 0.4s ease-out';
      } else {
         document.body.style.overflow = '';
         nav.style.animation = 'slideOutRight 0.4s ease-out';
      }
   });

   links.forEach(link => {
      link.addEventListener('click', () => {
         toggle.classList.remove('active');
         nav.classList.remove('active');
         document.body.style.overflow = '';
         
         // Эффект клика по ссылке
         link.style.transform = 'scale(0.95)';
         setTimeout(() => {
            link.style.transform = '';
         }, 200);
      });
   });
}

// Newsletter form with validation and animation
function setupNewsletter() {
   const form = document.getElementById('newsletterForm');
   const input = form.querySelector('input');
   const button = form.querySelector('button');
   
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!input.value || !input.value.includes('@')) {
         // Анимация ошибки
         input.style.animation = 'shake 0.5s ease';
         input.style.borderColor = '#c6363c';
         setTimeout(() => {
            input.style.animation = '';
            input.style.borderColor = '';
         }, 500);
         return;
      }
      
      // Анимация успешной отправки
      button.textContent = '✓';
      button.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
      
      // Создаем эффект праздничного конфетти
      createSuccessConfetti();
      
      setTimeout(() => {
         // Показать праздничное сообщение
         const message = document.createElement('div');
         message.textContent = `Hvala! Новогодние обновления будут отправлены на ${input.value}`;
         message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--serbian-red), var(--serbian-blue));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
         `;
         
         document.body.appendChild(message);
         setTimeout(() => message.remove(), 3000);
         
         // Сброс формы
         input.value = '';
         button.textContent = 'Subscribe';
         button.style.background = '';
      }, 1000);
   });
   
   // Эффект фокуса на поле ввода
   input.addEventListener('focus', () => {
      input.style.transform = 'scale(1.02)';
      input.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
   });
   
   input.addEventListener('blur', () => {
      input.style.transform = '';
      input.style.boxShadow = '';
   });
}

// Создание конфетти при успешной подписке
function createSuccessConfetti() {
   const container = document.getElementById('particles');
   const colors = ['#c6363c', '#0c4076', '#ffd700', '#ffffff'];
   
   for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
         position: fixed;
         top: 50%;
         left: 50%;
         width: 10px;
         height: 10px;
         background: ${colors[Math.floor(Math.random() * colors.length)]};
         border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
         z-index: 10000;
         pointer-events: none;
      `;
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let x = 0;
      let y = 0;
      
      const animate = () => {
         x += vx;
         y += vy;
         vy += 0.1; // гравитация
         
         confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
         confetti.style.opacity = 1 - (y / 200);
         
         if (y < 200) {
            requestAnimationFrame(animate);
         } else {
            confetti.remove();
         }
      };
      
      container.appendChild(confetti);
      requestAnimationFrame(animate);
   }
}

// Mouse move parallax effect
function setupMouseParallax() {
   document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Параллакс для частиц
      document.querySelectorAll('.particle, .snowflake, .xmas-decoration').forEach(element => {
         const speed = parseFloat(getComputedStyle(element).animationDuration) || 20;
         const moveX = (mouseX - 0.5) * (speed / 2);
         const moveY = (mouseY - 0.5) * (speed / 2);
         
         element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
   });
}

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', () => {
   createParticles();
   updateCountdown();
   setInterval(updateCountdown, 1000);
   setupNavigation();
   setupNewsletter();
   setupSmoothScroll();
   setupMouseParallax();
   
   // Инициализация прогресс-бара
   const progressBar = document.createElement('div');
   progressBar.id = 'progress-bar';
   progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--serbian-blue), var(--serbian-red));
      z-index: 1001;
      transition: width 0.3s ease;
   `;
   document.body.appendChild(progressBar);
   
   // Добавляем CSS анимации
   addKeyframes();
   
   // Обработчики скролла
   window.addEventListener('scroll', () => {
      handleScroll();
      scrollSpy();
   });
   
   // Preloader
   setTimeout(() => {
      document.body.classList.add('loaded');
   }, 500);
});

// Добавление keyframes анимаций
function addKeyframes() {
   const style = document.createElement('style');
   style.textContent = `
      @keyframes pulse-glow {
         0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(198, 54, 60, 0.4); }
         50% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.6); }
      }
      
      @keyframes pulse-highlight {
         0%, 100% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }
         50% { box-shadow: 0 5px 30px rgba(255, 215, 0, 0.3); }
      }
      
      @keyframes shake {
         0%, 100% { transform: translateX(0); }
         10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
         20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      
      @keyframes slideInRight {
         from { transform: translateX(100%); }
         to { transform: translateX(0); }
      }
      
      @keyframes slideOutRight {
         from { transform: translateX(0); }
         to { transform: translateX(100%); }
      }
      
      @keyframes fadeIn {
         from { opacity: 0; transform: translate(-50%, -40%); }
         to { opacity: 1; transform: translate(-50%, -50%); }
      }
      
      @keyframes fadeOut {
         from { opacity: 1; }
         to { opacity: 0; }
      }
      
      @keyframes pulse {
         0%, 100% { transform: scale(1); opacity: 1; }
         50% { transform: scale(1.1); opacity: 0.8; }
      }
      
      .loaded .hero h1 {
         animation: fadeInUp 0.8s ease 0.2s forwards !important;
      }
      
      .loaded .hero-subtitle {
         animation: fadeInUp 0.8s ease 0.4s forwards !important;
      }
      
      .loaded .countdown-wrapper {
         animation: fadeInUp 0.8s ease 0.6s forwards !important;
      }
   `;
   document.head.appendChild(style);
}

// Добавление ресайз обработчика для адаптивности
window.addEventListener('resize', () => {
   // Пересоздаем частицы при изменении размера окна для лучшей адаптивности
   const container = document.getElementById('particles');
   const particles = container.querySelectorAll('.particle, .snowflake, .xmas-decoration, .confetti');
   particles.forEach(p => p.remove());
   
   setTimeout(() => {
      createParticles();
   }, 100);
});
