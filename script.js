// ===== СОВРЕМЕННЫЙ JAVASCRIPT ДЛЯ САЙТА СЕРБИЯ =====
// Анимации, эффекты, интерактивность

// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
    // Анимации
    animationSpeed: 0.3,
    scrollOffset: 80,
    lazyLoadThreshold: 0.1,
    
    // Эффекты
    parallaxIntensity: 0.15,
    mouseTrailLength: 15,
    
    // Картинки
    imagesToLoad: [
        'tara-national-park.jpg',
        'djerdap-national-park.jpg',
        'tara-mountain.jpg',
        'belgrade-fortress.jpg',
        'studentca-monastery.jpg',
        'culture-festival.jpg',
        'house-on-drina.jpg',
        'cevapi.jpg',
        'gibanica.jpg',
        'rakija.jpg',
        'palacinke.jpg'
    ],
    
    // Задержки
    staggerDelay: 100,
    imageLoadDelay: 200
};

// ===== СОСТОЯНИЕ =====
const STATE = {
    isMobile: false,
    isScrolled: false,
    currentSection: 'home',
    loadedImages: 0,
    totalImages: 0,
    mouseX: 0,
    mouseY: 0,
    scrollDirection: 'down',
    lastScrollY: 0
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🇷🇸 СЕРБИЯ | Modern Experience', 
        'background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 10px; border-radius: 8px; font-size: 14px;');
    
    init();
});

function init() {
    // Определяем устройство
    detectDevice();
    
    // Создаем экран загрузки
    createLoadingScreen();
    
    // Инициализируем все модули
    initNavigation();
    initLazyLoading();
    initAnimations();
    initSmoothScrolling();
    initParallax();
    initImageEffects();
    initHoverEffects();
    initScrollAnimations();
    initInteractiveElements();
    
    // Запускаем анимацию загрузки
    setTimeout(() => {
        startPageIntro();
        updateProgressBar();
    }, 500);
    
    // Вешаем обработчики событий
    setupEventListeners();
}

// ===== ЭКРАН ЗАГРУЗКИ =====
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-dot"></div>
            </div>
            <div class="loader-text">
                <h3>СЕРБИЯ</h3>
                <p>Загружаем путешествие...</p>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Стили для лоадера
    const style = document.createElement('style');
    style.textContent = `
        #page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            max-width: 300px;
        }
        
        .loader-spinner {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
        }
        
        .spinner-ring {
            width: 100%;
            height: 100%;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }
        
        .spinner-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            background: #10b981;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .loader-text h3 {
            font-size: 24px;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #3b82f6, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .loader-progress {
            width: 100%;
            height: 4px;
            background: #f3f3f3;
            border-radius: 2px;
            margin-top: 20px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #3b82f6, #10b981);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (progress > 90) {
            progress = 90;
        }
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 90) {
            clearInterval(interval);
            // Завершаем загрузку
            setTimeout(() => {
                const loader = document.getElementById('page-loader');
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }
            }, 500);
        }
    }, 50);
}

// ===== НАВИГАЦИЯ =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        // Переключение мобильного меню
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Анимация для мобильного меню
            if (navLinks.classList.contains('active')) {
                animateMobileMenu();
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                document.body.style.overflow = '';
                
                // Плавная прокрутка к секции
                if (targetId && targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        smoothScrollTo(targetSection);
                    }
                }
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Обновление активной ссылки при скролле
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
    }, 100));
}

function animateMobileMenu() {
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    let currentSection = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Обновляем активный класс
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function initSmoothScrolling() {
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, href);
            }
        });
    });
    
    // Обработка кнопок браузера "назад/вперед"
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) smoothScrollTo(target);
        }
    });
}

function smoothScrollTo(target) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition - CONFIG.scrollOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing функция для плавности
        const ease = easeOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для анимации
                entry.target.classList.add('animated');
                
                // Разные анимации для разных элементов
                if (entry.target.classList.contains('card')) {
                    animateCard(entry.target);
                } else if (entry.target.classList.contains('gallery-item')) {
                    animateGalleryItem(entry.target);
                } else if (entry.target.classList.contains('text-window')) {
                    animateTextWindow(entry.target);
                } else if (entry.target.classList.contains('food-card')) {
                    animateFoodCard(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми анимируемыми элементами
    document.querySelectorAll('.card, .gallery-item, .text-window, .food-card').forEach(el => {
        observer.observe(el);
    });
}

function animateCard(card) {
    const index = Array.from(document.querySelectorAll('.card')).indexOf(card);
    const delay = index * CONFIG.staggerDelay;
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) rotateX(10deg)';
    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotateX(0)';
        
        // Анимация иконки
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0)';
            }, 300);
        }
    }, delay);
}

function animateGalleryItem(item) {
    const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(item);
    const delay = index * 50;
    
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, delay);
}

function animateTextWindow(window) {
    window.style.opacity = '0';
    window.style.transform = 'translateY(20px)';
    window.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        window.style.opacity = '1';
        window.style.transform = 'translateY(0)';
    }, 200);
}

function animateFoodCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) rotate(-5deg)';
    
    const index = Array.from(document.querySelectorAll('.food-card')).indexOf(card);
    const delay = index * 100;
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotate(0)';
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
        
        // Анимация изображения
        const img = card.querySelector('.food-img');
        if (img) {
            setTimeout(() => {
                img.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    img.style.transform = 'scale(1) rotate(0)';
                }, 300);
            }, 200);
        }
    }, delay);
}

// ===== ПАРАЛЛАКС ЭФФЕКТЫ =====
function initParallax() {
    if (STATE.isMobile) return;
    
    // Добавляем параллакс для героя
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.setAttribute('data-parallax', 'true');
    }
    
    // Добавляем параллакс для некоторых картинок
    document.querySelectorAll('.nature-main, .nature-card').forEach((el, index) => {
        el.setAttribute('data-parallax', 'true');
        el.setAttribute('data-depth', (0.1 + index * 0.05).toFixed(2));
    });
    
    // Запускаем параллакс
    startParallax();
}

function startParallax() {
    if (STATE.isMobile) return;
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        // Параллакс для героя
        const hero = document.querySelector('.hero[data-parallax="true"]');
        if (hero && scrolled < window.innerHeight) {
            const parallax = -(scrolled * CONFIG.parallaxIntensity);
            hero.style.transform = `translate3d(0, ${parallax}px, 0)`;
        }
        
        // Параллакс для других элементов
        document.querySelectorAll('[data-parallax="true"]').forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth') || CONFIG.parallaxIntensity);
            const movement = -(scrolled * depth);
            
            if (el.classList.contains('nature-main') || el.classList.contains('nature-card')) {
                el.style.transform = `translate3d(0, ${movement}px, 0)`;
            }
        });
        
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick);
}

// ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    STATE.totalImages = images.length;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: CONFIG.lazyLoadThreshold
    });
    
    // Наблюдаем за всеми изображениями
    images.forEach(img => {
        if (img.dataset.src) {
            observer.observe(img);
        } else {
            // Если у изображения нет data-src, сразу считаем загруженным
            STATE.loadedImages++;
        }
    });
    
    // Предзагружаем важные изображения
    preloadCriticalImages();
}

function loadImage(img) {
    if (img.dataset.src) {
        const src = img.dataset.src;
        
        // Создаем временное изображение для загрузки
        const tempImg = new Image();
        tempImg.src = src;
        
        tempImg.onload = () => {
            // Плавное появление изображения
            img.src = src;
            img.classList.add('loaded');
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
                
                STATE.loadedImages++;
                checkAllImagesLoaded();
            }, 100);
        };
        
        tempImg.onerror = () => {
            // Если изображение не загрузилось, используем fallback
            const fallbackMatch = img.getAttribute('onerror')?.match(/src='([^']+)'/);
            if (fallbackMatch) {
                img.src = fallbackMatch[1];
                img.classList.add('loaded');
                img.style.opacity = '1';
            }
            STATE.loadedImages++;
            checkAllImagesLoaded();
        };
        
        delete img.dataset.src;
    }
}

function preloadCriticalImages() {
    // Предзагружаем самые важные изображения
    const criticalImages = [
        'tara-national-park.jpg',
        'belgrade-fortress.jpg',
        'cevapi.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            STATE.loadedImages++;
            checkAllImagesLoaded();
        };
        img.onerror = () => {
            STATE.loadedImages++;
            checkAllImagesLoaded();
        };
    });
}

function checkAllImagesLoaded() {
    if (STATE.loadedImages >= STATE.totalImages) {
        console.log('✅ Все изображения загружены');
        document.body.classList.add('images-loaded');
    }
}

// ===== ЭФФЕКТЫ ДЛЯ ИЗОБРАЖЕНИЙ =====
function initImageEffects() {
    // Эффект увеличения при наведении
    document.querySelectorAll('.gallery-img, .food-img').forEach(img => {
        img.parentElement.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.parentElement.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Эффект загрузки изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Добавляем placeholder
        if (!img.classList.contains('loaded')) {
            img.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
            img.style.backgroundSize = '200% 100%';
            img.style.animation = 'loading 1.5s infinite';
        }
    });
    
    // Добавляем анимацию loading
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== ЭФФЕКТЫ ПРИ НАВЕДЕНИИ =====
function initHoverEffects() {
    // Эффект для карточек
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = '';
            }, 300);
        });
    });
    
    // Эффект для галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.opacity = '1';
                caption.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.opacity = '0';
                caption.style.transform = 'translateY(10px)';
            }
        });
    });
    
    // Эффект для кнопок (ripple)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (btn.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${e.clientY - (btn.getBoundingClientRect().top + radius)}px`;
    circle.classList.add('ripple');
    
    const ripple = btn.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    btn.appendChild(circle);
}

// ===== ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ =====
function initInteractiveElements() {
    // Анимация логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Анимация логотипа
            logo.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Интерактивные текстовые окна
    document.querySelectorAll('.text-window').forEach(window => {
        window.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px) scale(1)';
            }, 150);
        });
    });
    
    // Показ информации при клике на изображения природы
    document.querySelectorAll('.nature-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                showImageInfo(img.alt || 'Природа Сербии');
            }
        });
    });
}

function showImageInfo(title) {
    // Создаем всплывающее окно
    const popup = document.createElement('div');
    popup.className = 'image-info-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${title}</h3>
            <p>Нажмите в любом месте, чтобы закрыть</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Анимация появления
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
    }, 10);
    
    // Закрытие при клике
    popup.addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        setTimeout(() => popup.remove(), 300);
    });
    
    // Стили для попапа
    const style = document.createElement('style');
    style.textContent = `
        .image-info-popup {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: var(--radius-lg);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .popup-content h3 {
            color: white;
            margin-bottom: 5px;
        }
        
        .popup-content p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
}

// ===== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====
function startPageIntro() {
    // Анимация появления страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Анимация заголовка
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            animateText(heroTitle);
        }
        
        // Анимация остальных элементов
        setTimeout(() => {
            animateHeroElements();
        }, 500);
    }, 300);
}

function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${i * 0.05}s`;
        
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 300 + (i * 30));
    }
}

function animateHeroElements() {
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.btn-group');
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        heroDescription.style.transition = 'all 0.5s ease 0.3s';
        
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroButtons) {
        const buttons = heroButtons.querySelectorAll('.btn');
        buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = `all 0.5s ease ${0.5 + (index * 0.1)}s`;
            
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });
    }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function setupEventListeners() {
    // Определение устройства при ресайзе
    window.addEventListener('resize', throttle(() => {
        detectDevice();
    }, 200));
    
    // Эффект навигации при скролле
    window.addEventListener('scroll', throttle(() => {
        const navbar = document.querySelector('.nav');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Обновление направления скролла
        STATE.scrollDirection = window.scrollY > STATE.lastScrollY ? 'down' : 'up';
        STATE.lastScrollY = window.scrollY;
    }, 100));
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        // Escape - закрыть мобильное меню
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const navToggle = document.getElementById('navToggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                document.body.style.overflow = '';
            }
        }
        
        // Пробел - прокрутка вниз
        if (e.key === ' ' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
        
        // Стрелки вверх/вниз
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy({ top: 100, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
    });
    
    // Анимация при загрузке страницы
    window.addEventListener('load', () => {
        console.log('🚀 Страница полностью загружена');
        
        // Показываем индикатор загрузки
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #10b981);
            z-index: 9998;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(loadingIndicator);
        
        // Анимация индикатора
        setTimeout(() => loadingIndicator.style.transform = 'scaleX(0.3)', 10);
        setTimeout(() => loadingIndicator.style.transform = 'scaleX(0.7)', 300);
        setTimeout(() => loadingIndicator.style.transform = 'scaleX(1)', 600);
        setTimeout(() => {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => loadingIndicator.remove(), 300);
        }, 900);
    });
}

// ===== УТИЛИТЫ =====
function detectDevice() {
    STATE.isMobile = window.innerWidth <= 768;
    
    if (STATE.isMobile) {
        document.body.classList.add('is-mobile');
        document.body.classList.remove('is-desktop');
    } else {
        document.body.classList.add('is-desktop');
        document.body.classList.remove('is-mobile');
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ЭКСПОРТ ДЛЯ ОТЛАДКИ =====
window.SerbiaJS = {
    version: '1.0.0',
    reload: () => {
        location.reload();
    },
    toggleAnimations: () => {
        document.body.classList.toggle('no-animations');
        console.log('Анимации ' + (document.body.classList.contains('no-animations') ? 'выключены' : 'включены'));
    },
    showStats: () => {
        console.table({
            loadedImages: STATE.loadedImages,
            totalImages: STATE.totalImages,
            isMobile: STATE.isMobile,
            currentSection: STATE.currentSection
        });
    }
};

// Сообщение в консоль
console.log(`
%c
   ╔══════════════════════════════════╗
   ║    🇷🇸 ДОБРО ПОЖАЛОВАТЬ В СЕРБИЮ!  ║
   ╚══════════════════════════════════╝
   
   Команды отладки:
   • SerbiaJS.reload() - Перезагрузить
   • SerbiaJS.toggleAnimations() - Вкл/выкл анимации
   • SerbiaJS.showStats() - Показать статистику
   
   Управление:
   • Пробел - Прокрутить вниз
   • Стрелки - Плавная прокрутка
   • Escape - Закрыть меню
   
   Приятного путешествия! ✨
`, 'color: #3b82f6; font-family: monospace; background: #f0f9ff; padding: 20px; border-radius: 8px;');
