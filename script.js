// script.js - Современный JavaScript для сайта Сербии

class SerbiaWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.cacheDOM();
        this.setupEventListeners();
        this.initAnimations();
        this.initParticles();
        this.initScrollEffects();
        this.initTypewriter();
        this.setupAnalytics();
        this.initPreloader();
    }

    cacheDOM() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.sections = document.querySelectorAll('section');
        this.header = document.getElementById('header');
        this.ctaButton = document.querySelector('.cta-button');
        this.cards = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card');
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.images = document.querySelectorAll('img');
        this.particlesContainer = document.getElementById('particles');
    }

    setupEventListeners() {
        // Smooth scroll для навигации
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });

        // Клик по точкам навигации
        this.navDots.forEach(dot => {
            dot.addEventListener('click', () => this.handleDotClick(dot));
        });

        // Анимация для CTA кнопки
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', (e) => this.handleCTAClick(e));
        }

        // Глобальные слушатели
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.debounce(this.handleResize, 200));
        window.addEventListener('load', () => this.handlePageLoad());

        // Анимации при наведении на карточки
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCardHover(card, true));
            card.addEventListener('mouseleave', () => this.animateCardHover(card, false));
            card.addEventListener('click', () => this.animateCardClick(card));
        });

        // Анимация изображений при наведении
        document.querySelectorAll('.about-image, .place-image, .feature-image, .food-image').forEach(img => {
            img.addEventListener('mouseenter', () => this.enhanceImage(img));
            img.addEventListener('mouseleave', () => this.resetImage(img));
        });
    }

    handleNavClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        
        // Анимация клика
        this.animateClick(link);
    }

    handleDotClick(dot) {
        const sectionId = dot.dataset.section;
        this.scrollToSection(sectionId);
        
        // Анимация пульсации точки
        this.animatePulse(dot);
    }

    handleCTAClick(e) {
        e.preventDefault();
        
        // Эффект пульсации кнопки
        this.ctaButton.style.animation = 'none';
        setTimeout(() => {
            this.ctaButton.style.animation = 'buttonPulse 0.6s ease';
        }, 10);
        
        // Эффект разбрызгивания
        this.createRippleEffect(e);
        
        // Переход к секции
        setTimeout(() => {
            this.scrollToSection('about');
        }, 300);
    }

    handleScroll() {
        this.updateActiveSection();
        this.updateHeader();
        this.parallaxEffect();
        this.revealOnScroll();
        this.animateStats();
    }

    handleResize() {
        this.updateActiveSection();
        this.resetParticles();
    }

    handlePageLoad() {
        // Запуск анимаций после загрузки
        setTimeout(() => {
            this.animateHeroElements();
            this.lazyLoadImages();
        }, 500);
        
        // Консольное приветствие
        this.showConsoleWelcome();
    }

    // ===== АНИМАЦИИ =====
    initAnimations() {
        // Анимация появления элементов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Дополнительные эффекты для разных элементов
                    if (entry.target.classList.contains('culture-card')) {
                        this.animateStagger(entry.target, 'left');
                    } else if (entry.target.classList.contains('fact-card')) {
                        this.animateStagger(entry.target, 'right');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.fadeElements.forEach(element => observer.observe(element));
        
        // Добавление CSS анимаций
        this.addAnimationStyles();
    }

    initParticles() {
        if (!this.particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайные параметры
            const size = Math.random() * 4 + 1;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                background: ${Math.random() > 0.5 ? 
                    'linear-gradient(45deg, #ff6b6b, #c11b17)' : 
                    'linear-gradient(45deg, #c11b17, #8b0000)'};
            `;
            
            this.particlesContainer.appendChild(particle);
        }
    }

    initScrollEffects() {
        // Параллакс эффект
        this.parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (this.parallaxElements.length) {
                this.parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }

    initTypewriter() {
        // Эффект печатающегося текста (если нужно)
        const typewriterText = document.querySelector('.typewriter');
        if (typewriterText) {
            const text = typewriterText.textContent;
            typewriterText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // ===== ФУНКЦИИ АНИМАЦИЙ =====
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Анимация активации секции
        this.activateSection(sectionId);
    }

    updateActiveSection() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Обновляем активную точку навигации
        this.navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }

    updateHeader() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            hero.style.transform = `translateY(${yPos}px)`;
        }
    }

    revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            stats.forEach(stat => {
                if (!stat.dataset.animated) {
                    const value = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                    this.animateCounter(stat, 0, value, 2000);
                    stat.dataset.animated = 'true';
                }
            });
        }
    }

    animateCardHover(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.zIndex = '100';
            card.style.boxShadow = '0 25px 50px rgba(193, 27, 23, 0.4)';
            
            // Эффект свечения
            card.style.borderColor = '#ff6b6b';
            
            // Анимация содержимого
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        } else {
            card.style.transform = 'translateY(-5px) scale(1)';
            card.style.zIndex = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }

    animateCardClick(card) {
        card.style.transform = 'scale(0.95)';
        card.style.boxShadow = '0 15px 30px rgba(193, 27, 23, 0.6)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 50px rgba(193, 27, 23, 0.4)';
        }, 150);
    }

    enhanceImage(imgContainer) {
        const img = imgContainer.querySelector('img');
        const caption = imgContainer.querySelector('.image-caption');
        
        if (img) {
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(1.2) contrast(1.1)';
        }
        
        if (caption) {
            caption.style.opacity = '1';
            caption.style.transform = 'translateY(0)';
        }
    }

    resetImage(imgContainer) {
        const img = imgContainer.querySelector('img');
        const caption = imgContainer.querySelector('.image-caption');
        
        if (img) {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1) contrast(1)';
        }
        
        if (caption) {
            caption.style.opacity = '0';
            caption.style.transform = 'translateY(100%)';
        }
    }

    animateHeroElements() {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content p');
        const stats = document.querySelectorAll('.stat');
        const cta = document.querySelector('.cta-button');
        
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
        }
        
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'fadeInUp 0.6s ease-out both';
            }, index * 100);
        });
        
        if (cta) {
            setTimeout(() => {
                cta.style.animation = 'fadeInUp 0.8s ease-out 0.6s both, pulse 2s ease-in-out infinite 1s';
            }, 600);
        }
    }

    animateClick(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    animatePulse(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'dotPulse 0.6s ease';
        }, 10);
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
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
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animateStagger(element, direction) {
        const children = element.querySelectorAll('*');
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = direction === 'left' ? 
                'translateX(-20px)' : 'translateX(20px)';
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateX(0)';
                child.style.transition = `all 0.3s ease ${index * 0.1}s`;
            }, 10);
        });
    }

    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Анимация загрузки изображения
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.9)';
                    img.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 100);
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        this.images.forEach(img => {
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    activateSection(sectionId) {
        this.sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    }

    resetParticles() {
        if (this.particlesContainer) {
            this.particlesContainer.innerHTML = '';
            this.initParticles();
        }
    }

    // ===== УТИЛИТЫ =====
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
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== АНАЛИТИКА И ПРОЧЕЕ =====
    setupAnalytics() {
        // Отслеживание кликов
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A' || target.closest('a')) {
                this.trackEvent('link_click', {
                    text: target.textContent.trim(),
                    href: target.getAttribute('href')
                });
            }
            
            if (target.classList.contains('cta-button') || target.closest('.cta-button')) {
                this.trackEvent('cta_click', {
                    section: 'hero'
                });
            }
        });
        
        // Отслеживание скролла
        let scrollDepth = [];
        const depths = [25, 50, 75, 100];
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const percentage = Math.round((scrolled / scrollable) * 100);
            
            depths.forEach(depth => {
                if (percentage >= depth && !scrollDepth.includes(depth)) {
                    scrollDepth.push(depth);
                    this.trackEvent('scroll_depth', { depth: `${depth}%` });
                }
            });
        }, 1000));
    }

    trackEvent(eventName, data = {}) {
        // Для демо - просто логируем в консоль
        console.log(`[Analytics] ${eventName}:`, {
            ...data,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        
        // В реальном проекте здесь будет отправка в Google Analytics и т.д.
    }

    initPreloader() {
        const preloader = document.querySelector('.loading');
        if (preloader) {
            // Симуляция загрузки
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    this.animateHeroElements();
                }, 500);
            }, 1500);
        }
    }

    showConsoleWelcome() {
        const styles = [
            'font-size: 14px',
            'font-family: monospace',
            'background: linear-gradient(90deg, #c11b17, #ff6b6b)',
            'color: white',
            'padding: 10px 20px',
            'border-radius: 4px',
            'font-weight: bold'
        ].join(';');
        
        console.log('%c🇷🇸 Добро пожаловать на сайт о Сербии!', styles);
        console.log('%cСтрана с богатой историей и горячим сердцем', 'color: #ff6b6b');
        console.log('%cСоздано с использованием современных веб-технологий', 'color: #888');
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes buttonPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.95); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .cta-button {
                position: relative;
                overflow: hidden;
            }
            
            .stat:hover .stat-number {
                animation: numberBounce 0.3s ease;
            }
            
            @keyframes numberBounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            /* Анимация для иконок в карточках */
            .culture-card i,
            .fact-card i {
                transition: all 0.3s ease;
            }
            
            /* Эффект параллакса */
            .parallax {
                transition: transform 0.1s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new SerbiaWebsite();
});

// Глобальные утилиты (если нужны в других местах)
window.App = {
    utils: {
        debounce: function(func, wait) {
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
        
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        formatNumber: function(num) {
            return num.toLocaleString();
        }
    }
};

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
});

// Сохранение позиции скролла при перезагрузке
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});
