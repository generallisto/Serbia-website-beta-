// app.js

// Оптимизированная загрузка и инициализация
(function() {
    'use strict';
    
    // Конфигурация
    const CONFIG = {
        LAZY_LOAD_OFFSET: '100px',
        ANIMATION_THRESHOLD: 0.1,
        DEBOUNCE_DELAY: 100,
        SCROLL_THROTTLE: 100
    };
    
    // Глобальное состояние
    const State = {
        isLoading: false,
        isNavOpen: false,
        lastScrollY: 0,
        scrollDirection: 'down',
        loadedImages: new Set()
    };
    
    // ===== УТИЛИТЫ =====
    const Utils = {
        // Дебаунс
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Троттлинг
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Проверка видимости элемента
        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        },
        
        // Плавная прокрутка
        smoothScrollTo(target, offset = 80) {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (!element) return;
            
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition - offset;
            const duration = 800;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        },
        
        // Загрузка изображения с кэшированием
        loadImage(src) {
            return new Promise((resolve, reject) => {
                if (State.loadedImages.has(src)) {
                    resolve(src);
                    return;
                }
                
                const img = new Image();
                img.onload = () => {
                    State.loadedImages.add(src);
                    resolve(src);
                };
                img.onerror = reject;
                img.src = src;
            });
        },
        
        // Добавление CSS класса с префиксом
        addClass(el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },
        
        // Удаление CSS класса
        removeClass(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(
                    new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), 
                    ' '
                );
            }
        },
        
        // Проверка поддержки Intersection Observer
        supportsIntersectionObserver() {
            return 'IntersectionObserver' in window &&
                   'IntersectionObserverEntry' in window &&
                   'intersectionRatio' in window.IntersectionObserverEntry.prototype;
        }
    };
    
    // ===== МОДУЛЬ НАВИГАЦИИ =====
    const Navigation = {
        init() {
            this.nav = document.getElementById('nav');
            this.navToggle = document.getElementById('navToggle');
            this.navLinks = document.getElementById('navLinks');
            
            if (!this.nav || !this.navToggle || !this.navLinks) return;
            
            this.bindEvents();
            this.updateActiveLink();
        },
        
        bindEvents() {
            // Переключение мобильного меню
            this.navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
            
            // Закрытие меню при клике на ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        this.closeMenu();
                        Utils.smoothScrollTo(href);
                        this.updateActiveLink();
                    }
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (!this.nav.contains(e.target) && State.isNavOpen) {
                    this.closeMenu();
                }
            });
            
            // Обработка клавиши Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && State.isNavOpen) {
                    this.closeMenu();
                }
            });
            
            // Изменение навигации при скролле
            window.addEventListener('scroll', Utils.throttle(() => {
                this.handleScroll();
            }, CONFIG.SCROLL_THROTTLE));
        },
        
        toggleMenu() {
            if (State.isNavOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },
        
        openMenu() {
            Utils.addClass(this.navLinks, 'active');
            this.navToggle.innerHTML = '<i class="fas fa-times"></i>';
            State.isNavOpen = true;
            
            // Блокировка скролла на мобильных устройствах
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        },
        
        closeMenu() {
            Utils.removeClass(this.navLinks, 'active');
            this.navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            State.isNavOpen = false;
            document.body.style.overflow = '';
        },
        
        handleScroll() {
            const currentScrollY = window.pageYOffset;
            
            // Определение направления скролла
            State.scrollDirection = currentScrollY > State.lastScrollY ? 'down' : 'up';
            State.lastScrollY = currentScrollY;
            
            // Добавление класса при скролле
            if (currentScrollY > 50) {
                Utils.addClass(this.nav, 'scrolled');
            } else {
                Utils.removeClass(this.nav, 'scrolled');
            }
            
            // Автоматическое закрытие меню на мобильных при скролле вниз
            if (State.isNavOpen && State.scrollDirection === 'down' && window.innerWidth <= 768) {
                this.closeMenu();
            }
            
            this.updateActiveLink();
        },
        
        updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        Utils.removeClass(link, 'active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            Utils.addClass(link, 'active');
                        }
                    });
                }
            });
        }
    };
    
    // ===== МОДУЛЬ ЛЕНИВОЙ ЗАГРУЗКИ =====
    const LazyLoader = {
        init() {
            this.images = document.querySelectorAll('img[data-src], img[data-srcset]');
            this.backgrounds = document.querySelectorAll('[data-bg]');
            
            if (Utils.supportsIntersectionObserver()) {
                this.initWithObserver();
            } else {
                this.initFallback();
            }
        },
        
        initWithObserver() {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: CONFIG.LAZY_LOAD_OFFSET,
                threshold: CONFIG.ANIMATION_THRESHOLD
            });
            
            // Наблюдаем за изображениями
            this.images.forEach(img => {
                if (!img.hasAttribute('src') || img.getAttribute('src') === '') {
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                }
                imageObserver.observe(img);
            });
            
            // Наблюдаем за фонами
            this.backgrounds.forEach(el => {
                imageObserver.observe(el);
            });
        },
        
        initFallback() {
            // Fallback для старых браузеров
            const lazyLoad = () => {
                this.images.forEach(img => {
                    if (Utils.isElementInViewport(img)) {
                        this.loadElement(img);
                    }
                });
                
                this.backgrounds.forEach(el => {
                    if (Utils.isElementInViewport(el)) {
                        this.loadElement(el);
                    }
                });
            };
            
            // Проверяем при скролле с троттлингом
            window.addEventListener('scroll', Utils.throttle(lazyLoad, 250));
            window.addEventListener('resize', Utils.throttle(lazyLoad, 250));
            window.addEventListener('orientationchange', Utils.throttle(lazyLoad, 250));
            
            // Первоначальная проверка
            lazyLoad();
        },
        
        loadElement(element) {
            if (element.tagName === 'IMG') {
                const src = element.getAttribute('data-src');
                const srcset = element.getAttribute('data-srcset');
                
                if (src) {
                    Utils.loadImage(src)
                        .then(() => {
                            element.src = src;
                            element.removeAttribute('data-src');
                        })
                        .catch(() => {
                            console.warn('Failed to load image:', src);
                        });
                }
                
                if (srcset) {
                    element.srcset = srcset;
                    element.removeAttribute('data-srcset');
                }
                
                // Анимация появления
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 10);
                
            } else if (element.hasAttribute('data-bg')) {
                const bg = element.getAttribute('data-bg');
                element.style.backgroundImage = `url(${bg})`;
                element.removeAttribute('data-bg');
            }
        }
    };
    
    // ===== МОДУЛЬ АНИМАЦИЙ =====
    const Animations = {
        init() {
            this.animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
            this.initScrollAnimations();
            this.initParallax();
            this.initCardHoverEffects();
            this.initButtonEffects();
        },
        
        initScrollAnimations() {
            if (Utils.supportsIntersectionObserver()) {
                const animationObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateElement(entry.target);
                            animationObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: CONFIG.ANIMATION_THRESHOLD,
                    rootMargin: '50px'
                });
                
                this.animatedElements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    animationObserver.observe(el);
                });
            } else {
                // Fallback
                this.animatedElements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        if (Utils.isElementInViewport(el)) {
                            this.animateElement(el);
                        }
                    }, index * 100);
                });
                
                window.addEventListener('scroll', Utils.throttle(() => {
                    this.animatedElements.forEach(el => {
                        if (Utils.isElementInViewport(el) && 
                            getComputedStyle(el).opacity === '0') {
                            this.animateElement(el);
                        }
                    });
                }, 250));
            }
        },
        
        animateElement(element) {
            Utils.addClass(element, 'animated');
            
            // Убираем inline стили для применения CSS анимаций
            setTimeout(() => {
                element.style.opacity = '';
                element.style.transform = '';
            }, 10);
            
            // Добавляем случайную задержку для эффекта каскада
            const delay = Math.random() * 200;
            setTimeout(() => {
                Utils.addClass(element, 'visible');
            }, delay);
        },
        
        initParallax() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            if (!parallaxElements.length) return;
            
            window.addEventListener('scroll', Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
            }, CONFIG.SCROLL_THROTTLE));
        },
        
        initCardHoverEffects() {
            const cards = document.querySelectorAll('.card, .photo-item');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                    
                    // Эффект поднятия
                    card.style.zIndex = '100';
                    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                });
                
                card.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        card.style.zIndex = '';
                    }, 300);
                });
            });
        },
        
        initButtonEffects() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    // Эффект ripple
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        width: ${size}px;
                        height: ${size}px;
                        top: ${y}px;
                        left: ${x}px;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    // Удаляем элемент после анимации
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
                
                // Эффект наведения
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
            
            // Добавляем стили для ripple эффекта
            this.addRippleStyles();
        },
        
        addRippleStyles() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // ===== МОДУЛЬ ГАЛЕРЕИ =====
    const Gallery = {
        init() {
            this.photoItems = document.querySelectorAll('.photo-item');
            if (!this.photoItems.length) return;
            
            this.setupGallery();
        },
        
        setupGallery() {
            this.photoItems.forEach((item, index) => {
                // Анимация появления с задержкой
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Клик для увеличения (можно расширить в будущем)
                item.addEventListener('click', () => {
                    this.showImage(index);
                });
                
                // Эффект при наведении на мобильных (touch)
                item.addEventListener('touchstart', () => {
                    Utils.addClass(item, 'touched');
                }, { passive: true });
                
                item.addEventListener('touchend', () => {
                    setTimeout(() => {
                        Utils.removeClass(item, 'touched');
                    }, 300);
                }, { passive: true });
            });
        },
        
        showImage(index) {
            // Базовый превью - можно расширить до полноценной галереи
            const item = this.photoItems[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('.photo-caption')?.textContent || '';
            
            console.log('Просмотр изображения:', img.src, caption);
            
            // Здесь можно добавить модальное окно с изображением
            // Для простоты пока просто логируем
        }
    };
    
    // ===== МОДУЛЬ ПРОИЗВОДИТЕЛЬНОСТИ =====
    const Performance = {
        init() {
            this.initPreload();
            this.initPrefetch();
            this.initIdleCallback();
            this.monitorPerformance();
        },
        
        initPreload() {
            // Предзагрузка критичных изображений
            const criticalImages = [
                'https://images.unsplash.com/photo-1578474845476-8af6d0aa3e79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ];
            
            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        },
        
        initPrefetch() {
            // Префетч для навигации
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        const target = document.querySelector(href);
                        if (target) {
                            // Можно добавить префетч ресурсов для секции
                        }
                    }
                }, { once: true });
            });
        },
        
        initIdleCallback() {
            // Используем idle callback для не критичных задач
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.loadNonCriticalResources();
                });
            } else {
                // Fallback
                setTimeout(() => {
                    this.loadNonCriticalResources();
                }, 2000);
            }
        },
        
        loadNonCriticalResources() {
            // Загрузка не критичных изображений и ресурсов
            const nonCriticalImages = document.querySelectorAll('img[data-src][data-priority="low"]');
            nonCriticalImages.forEach(img => {
                if (Utils.isElementInViewport(img)) {
                    const src = img.getAttribute('data-src');
                    Utils.loadImage(src).then(() => {
                        img.src = src;
                    });
                }
            });
        },
        
        monitorPerformance() {
            // Мониторинг производительности
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        if (perfData) {
                            console.log('Performance metrics:', {
                                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                                domReady: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                                complete: perfData.domComplete
                            });
                        }
                    }, 0);
                });
            }
        }
    };
    
    // ===== МОДУЛЬ АНАЛИТИКИ =====
    const Analytics = {
        init() {
            this.trackEvents();
            this.trackScrollDepth();
            this.trackTimeOnPage();
        },
        
        trackEvents() {
            // Трекинг кликов по навигации
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const section = link.getAttribute('href');
                    this.logEvent('navigation_click', { section });
                });
            });
            
            // Трекинг кликов по кнопкам
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const text = btn.textContent.trim();
                    this.logEvent('button_click', { button: text });
                });
            });
            
            // Трекинг просмотра фотографий
            document.querySelectorAll('.photo-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.logEvent('gallery_view', { image_index: index });
                });
            });
        },
        
        trackScrollDepth() {
            const depths = [25, 50, 75, 90];
            let trackedDepths = new Set();
            
            window.addEventListener('scroll', Utils.throttle(() => {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                const percentage = Math.round((scrolled / scrollable) * 100);
                
                depths.forEach(depth => {
                    if (percentage >= depth && !trackedDepths.has(depth)) {
                        trackedDepths.add(depth);
                        this.logEvent('scroll_depth', { depth: `${depth}%` });
                    }
                });
            }, 1000));
        },
        
        trackTimeOnPage() {
            let startTime = Date.now();
            
            window.addEventListener('beforeunload', () => {
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                this.logEvent('time_on_page', { seconds: timeSpent });
            });
        },
        
        logEvent(eventName, data = {}) {
            // Для GitHub Pages - просто логируем в консоль
            // В реальном проекте здесь будет отправка в аналитическую систему
            console.log(`[Analytics] ${eventName}:`, {
                ...data,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        }
    };
    
    // ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
    const App = {
        init() {
            // Скрываем загрузочный экран
            this.hideLoading();
            
            // Инициализируем модули
            Navigation.init();
            LazyLoader.init();
            Animations.init();
            Gallery.init();
            Performance.init();
            Analytics.init();
            
            // Настраиваем глобальные обработчики
            this.setupGlobalHandlers();
            
            // Показываем контент
            this.showContent();
            
            // Выводим приветственное сообщение
            this.showWelcomeMessage();
        },
        
        hideLoading() {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 300);
            }
        },
        
        showContent() {
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease';
        },
        
        setupGlobalHandlers() {
            // Обработка ошибок изображений
            document.addEventListener('error', (e) => {
                if (e.target.tagName === 'IMG') {
                    console.warn('Image failed to load:', e.target.src);
                    // Можно установить fallback изображение
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%231a1a1a"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23fff" font-family="Arial"%3EИзображение%3C/text%3E%3C/svg%3E';
                }
            }, true);
            
            // Предотвращение контекстного меню на изображениях
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('contextmenu', (e) => e.preventDefault());
            });
            
            // Обновление при изменении размера окна
            window.addEventListener('resize', Utils.debounce(() => {
                this.handleResize();
            }, CONFIG.DEBOUNCE_DELAY));
            
            // Обработка клавиатуры
            document.addEventListener('keydown', (e) => {
                // Прокрутка вверх/вниз по секциям
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.scrollToSection(e.key);
                }
            });
        },
        
        handleResize() {
            // Обновление навигации при изменении размера
            if (window.innerWidth > 768 && State.isNavOpen) {
                Navigation.closeMenu();
            }
            
            // Переинициализация lazy load для новых размеров
            LazyLoader.init();
        },
        
        scrollToSection(direction) {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentScroll = window.pageYOffset;
            
            let targetSection = null;
            
            if (direction === 'ArrowDown') {
                // Ищем следующую секцию
                for (let section of sections) {
                    if (section.offsetTop > currentScroll + 100) {
                        targetSection = section;
                        break;
                    }
                }
            } else if (direction === 'ArrowUp') {
                // Ищем предыдущую секцию
                for (let i = sections.length - 1; i >= 0; i--) {
                    if (sections[i].offsetTop < currentScroll - 100) {
                        targetSection = sections[i];
                        break;
                    }
                }
            }
            
            if (targetSection) {
                Utils.smoothScrollTo(targetSection);
            }
        },
        
        showWelcomeMessage() {
            // Красивое сообщение в консоли
            const styles = [
                'font-size: 14px',
                'font-family: monospace',
                'background: linear-gradient(90deg, #2a1a3c, #4d6bff)',
                'color: white',
                'padding: 10px 20px',
                'border-radius: 4px',
                'font-weight: bold'
            ].join(';');
            
            console.log('%c🇷🇸 Добро пожаловать на сайт о Сербии!', styles);
            console.log('%cСтрана с богатой историей и большим сердцем', 'color: #c59bff');
        }
    };
    
    // ===== ТОЧКА ВХОДА =====
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }
    
    // Экспортируем публичные методы (для отладки)
    window.App = {
        Navigation,
        Animations,
        Gallery,
        Utils,
        State
    };
    
})();
