/* JavaScript Document

Адаптировано для сайта "Сербия встречает Новый Год"

*/

// Create Particles and Snowflakes with Serbian theme
function createParticles() {
   const container = document.getElementById('particles');

   // Новогодние частицы с сербскими цветами
   for (let i = 0; i < 40; i++) { // Увеличили количество частиц
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (10 + Math.random() * 20) + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.opacity = 0.2 + Math.random() * 0.5;
      
      // Разные цвета для разнообразия
      if (i % 4 === 0) {
         particle.style.background = '#c6363c'; // Сербский красный
      } else if (i % 4 === 1) {
         particle.style.background = '#f8e71c'; // Сербский желтый
      } else if (i % 4 === 2) {
         particle.style.background = '#ffd700'; // Золотой
      }
      
      container.appendChild(particle);
   }

   // Снежинки - новогодняя атмосфера
   for (let i = 0; i < 25; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (10 + Math.random() * 20) + 's';
      snowflake.style.animationDelay = Math.random() * 15 + 's';
      snowflake.style.fontSize = (0.6 + Math.random() * 1.2) + 'rem';
      snowflake.style.opacity = 0.1 + Math.random() * 0.5;
      container.appendChild(snowflake);
   }
}

// Countdown Timer - Target: December 31, 2025 at 23:59
function updateCountdown() {
   const newYear = new Date('December 31, 2025 23:59:59').getTime();
   const now = new Date().getTime();
   const distance = newYear - now;

   if (distance < 0) {
      // Если Новый год уже наступил
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      
      // Показываем поздравление
      if (!document.getElementById('newYearMessage')) {
         const message = document.createElement('div');
         message.id = 'newYearMessage';
         message.innerHTML = `
            <div style="
               position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: rgba(10, 10, 15, 0.95);
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               z-index: 9999;
               text-align: center;
               padding: 20px;
            ">
               <h1 style="color: #f8e71c; font-size: 4rem; margin-bottom: 20px;">🎉 Srećna Nova Godina! 🎉</h1>
               <p style="color: white; font-size: 1.5rem; max-width: 600px; margin-bottom: 30px;">
                  Счастливого Нового 2026 года! Пусть он принесет радость, здоровье и успех!
               </p>
               <button onclick="this.parentElement.remove()" style="
                  padding: 15px 30px;
                  background: linear-gradient(135deg, #c6363c, #f8e71c);
                  border: none;
                  border-radius: 10px;
                  color: #0a0a0f;
                  font-size: 1.1rem;
                  font-weight: bold;
                  cursor: pointer;
               ">
                  Продолжить праздновать!
               </button>
            </div>
         `;
         document.body.appendChild(message);
      }
      return;
   }

   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   document.getElementById('days').textContent = days.toString().padStart(2, '0');
   document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
   document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
   document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

   // Специальные сообщения при приближении Нового года
   showSpecialMessage(days, hours, minutes);
}

// Специальные новогодние сообщения
function showSpecialMessage(days, hours, minutes) {
   const messages = [
      {condition: days === 0 && hours < 1, text: "✨ Меньше часа до Нового Года! ✨", color: "#f8e71c"},
      {condition: days === 0 && hours < 3, text: "🎆 Скоро бой курантов! 🎆", color: "#ff6b6b"},
      {condition: days === 0 && hours < 6, text: "🎄 Вечер настал, праздник близко! 🎄", color: "#00d4aa"},
      {condition: days === 0 && hours < 12, text: "🌟 Последний день года! 🌟", color: "#4d9fff"},
      {condition: days === 1, text: "⏳ Завтра Новый Год! ⏳", color: "#f8e71c"},
      {condition: days <= 7, text: "🎁 Неделя до Нового Года! 🎁", color: "#c6363c"}
   ];

   const specialMsg = document.getElementById('specialMessage');
   const message = messages.find(m => m.condition);

   if (message && (!specialMsg || specialMsg.textContent !== message.text)) {
      if (specialMsg) specialMsg.remove();
      
      const msgElement = document.createElement('div');
      msgElement.id = 'specialMessage';
      msgElement.textContent = message.text;
      msgElement.style.cssText = `
         position: fixed;
         top: 20px;
         left: 50%;
         transform: translateX(-50%);
         background: ${message.color}20;
         border: 1px solid ${message.color};
         color: ${message.color};
         padding: 12px 24px;
         border-radius: 50px;
         font-weight: 600;
         z-index: 9998;
         backdrop-filter: blur(10px);
         animation: slideDown 0.5s ease-out;
      `;
      
      document.body.appendChild(msgElement);
      
      // Удаляем через 5 секунд
      setTimeout(() => {
         if (msgElement.parentElement) {
            msgElement.style.opacity = '0';
            msgElement.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => msgElement.remove(), 500);
         }
      }, 5000);
   }
}

// Header scroll effect
function handleScroll() {
   const header = document.getElementById('header');
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
}

// Scroll Spy - Update active nav item based on scroll position
function scrollSpy() {
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');

   let currentSection = '';
   const scrollPosition = window.scrollY + 150;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
         currentSection = section.getAttribute('id');
      }
   });

   navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + currentSection) {
         link.classList.add('nav-active');
      }
   });
}

// Mobile navigation
function setupNavigation() {
   const toggle = document.getElementById('navToggle');
   const nav = document.getElementById('nav');
   const links = nav.querySelectorAll('a');

   toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
   });

   links.forEach(link => {
      link.addEventListener('click', () => {
         toggle.classList.remove('active');
         nav.classList.remove('active');
      });
   });
}

// Newsletter form
function setupNewsletter() {
   const form = document.getElementById('newsletterForm');
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const email = input.value.trim();
      
      if (!email) {
         showNotification('Введите email адрес', '#c6363c');
         return;
      }
      
      if (!validateEmail(email)) {
         showNotification('Введите корректный email', '#c6363c');
         return;
      }
      
      showNotification(`Спасибо за подписку! Вы будете получать новогодние новости Сербии на ${email}`, '#f8e71c');
      input.value = '';
      
      // Анимация успешной подписки
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = '✓ Успешно!';
      button.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
      
      setTimeout(() => {
         button.textContent = originalText;
         button.style.background = 'linear-gradient(135deg, #c6363c, #f8e71c)';
      }, 2000);
   });
}

// Валидация email
function validateEmail(email) {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
}

// Показ уведомлений
function showNotification(message, color) {
   const notification = document.createElement('div');
   notification.textContent = message;
   notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${color}20;
      border: 1px solid ${color};
      color: ${color};
      padding: 15px 25px;
      border-radius: 12px;
      font-weight: 500;
      z-index: 9999;
      backdrop-filter: blur(10px);
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
   `;
   
   document.body.appendChild(notification);
   
   setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => notification.remove(), 300);
   }, 3000);
}

// Новогодние анимации для элементов
function setupNewYearAnimations() {
   // Анимация для новогодних тегов
   const newYearTags = document.querySelectorAll('.newyear-tag, .newyear-badge');
   newYearTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
         tag.style.transform = 'scale(1.05)';
      });
      tag.addEventListener('mouseleave', () => {
         tag.style.transform = 'scale(1)';
      });
   });
   
   // Анимация для сербских символов
   const serbianIcons = document.querySelectorAll('.serbian-charm, .serbian-newyear');
   serbianIcons.forEach(icon => {
      icon.addEventListener('click', () => {
         icon.style.transform = 'scale(0.95)';
         setTimeout(() => {
            icon.style.transform = 'scale(1)';
         }, 150);
      });
   });
}

// Сербское новогоднее приветствие
function showSerbianGreeting() {
   const greetings = [
      "✨ Srećna Nova Godina 2026! ✨",
      "🎉 С Новым 2026 годом! 🎉",
      "🌟 Нека vam Nova Godina donese radost, zdravlje i uspeh! 🌟",
      "🎄 Пусть новый год принесет счастье и благополучие! 🎄"
   ];
   
   const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
   showNotification(randomGreeting, '#f8e71c');
}

// Показ всех праздничных дат
function showMoreDates() {
   const dates = `
📅 Новогодние праздники в Сербии:

• 24 декабря — Баджни день (Badnjak)
• 25 декабря — Рождество (Božić)
• 31 декабря — Нова Година
• 1 января — Новогодний день
• 7 января — Рождество по юлианскому календарю
• 13 января — Сербский Новый год
• 14 января — Новогодний день по старому стилю

🎊 Сербы празднуют Новый год дважды! 🎊
   `;
   
   alert(dates);
}

// Обновление счетчика желаний
function updateWishes() {
   const checkboxes = document.querySelectorAll('.wish-list input[type="checkbox"]');
   const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
   const total = checkboxes.length;
   const counter = document.getElementById('wish-counter');
   
   if (counter) {
      const percentage = Math.round((completed / total) * 100);
      counter.textContent = `✅ Выполнено: ${completed}/${total} (${percentage}%)`;
      
      // Специальное сообщение при выполнении всех желаний
      if (completed === total) {
         counter.innerHTML = '🎉 Все желания выполнены! Готовы к Новому Году! 🎉';
         counter.style.color = '#f8e71c';
         counter.style.fontWeight = 'bold';
         
         // Запускаем конфетти
         createConfetti();
      }
   }
}

// Новогоднее конфетти
function createConfetti() {
   const colors = ['#c6363c', '#f8e71c', '#ffd700', '#00d4aa', '#4d9fff'];
   const confettiContainer = document.createElement('div');
   confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
   `;
   
   document.body.appendChild(confettiContainer);
   
   for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
         position: absolute;
         width: 10px;
         height: 10px;
         background: ${colors[Math.floor(Math.random() * colors.length)]};
         border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
         top: -20px;
         left: ${Math.random() * 100}%;
         animation: fall ${2 + Math.random() * 3}s linear forwards;
         opacity: 0.8;
      `;
      
      confettiContainer.appendChild(confetti);
   }
   
   // Удаляем конфетти через 5 секунд
   setTimeout(() => {
      confettiContainer.style.opacity = '0';
      setTimeout(() => confettiContainer.remove(), 1000);
   }, 5000);
}

// Добавляем CSS для анимаций
function addAnimationStyles() {
   const style = document.createElement('style');
   style.textContent = `
      @keyframes slideDown {
         from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
         }
         to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
         }
      }
      
      @keyframes slideIn {
         from {
            opacity: 0;
            transform: translateX(100px);
         }
         to {
            opacity: 1;
            transform: translateX(0);
         }
      }
      
      @keyframes fall {
         to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
         }
      }
      
      @keyframes pulse-banner {
         0%, 100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(198, 54, 60, 0.3);
         }
         50% {
            transform: scale(1.02);
            box-shadow: 0 10px 25px rgba(248, 231, 28, 0.4);
         }
      }
   `;
   document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   // Добавляем стили анимаций
   addAnimationStyles();
   
   // Создаем частицы и снежинки
   createParticles();
   
   // Запускаем отсчет до Нового Года
   updateCountdown();
   setInterval(updateCountdown, 1000);
   
   // Настраиваем навигацию
   setupNavigation();
   
   // Настраиваем форму подписки
   setupNewsletter();
   
   // Настраиваем новогодние анимации
   setupNewYearAnimations();
   
   // Настраиваем Scroll Spy
   scrollSpy();
   
   // Обработка скролла
   window.addEventListener('scroll', () => {
      handleScroll();
      scrollSpy();
   });
   
   // Добавляем обработчики для интерактивных элементов
   const serbianCharm = document.querySelector('.serbian-charm span:last-child');
   if (serbianCharm) {
      serbianCharm.addEventListener('click', showSerbianGreeting);
   }
   
   // Инициализируем счетчик желаний
   updateWishes();
   
   // Автоматическое новогоднее приветствие при загрузке
   setTimeout(() => {
      showNotification('✨ Добро пожаловать на сайт "Сербия встречает Новый Год"! ✨', '#f8e71c');
   }, 1000);
});

// Глобальные функции для HTML
window.showSerbianGreeting = showSerbianGreeting;
window.showMoreDates = showMoreDates;
window.updateWishes = updateWishes;
