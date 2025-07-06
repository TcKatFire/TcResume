// Custom JavaScript for Matvei's Resume Site

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .skill-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Scroll event listener for progress bars
    window.addEventListener('scroll', animateProgressBars);
    
    // Initial check for progress bars
    animateProgressBars();

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            const email = formData.get('email') || document.getElementById('email').value;
            const subject = formData.get('subject') || document.getElementById('subject').value;
            const message = formData.get('message') || document.getElementById('message').value;
            
            // Create mailto link
            const mailtoLink = `mailto:matvei201357@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Имя: ${name}\nEmail: ${email}\n\nСообщение:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Форма отправлена! Откроется ваш почтовый клиент.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Add typing effect to hero section
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <h5>Загрузка резюме...</h5>
            </div>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
});

// Add smooth reveal animation for sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize sections with hidden state
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
});


// Language switching functionality
const translations = {
    ru: {
        // Navigation
        'nav-home': 'Главная',
        'nav-about': 'О себе',
        'nav-skills': 'Навыки',
        'nav-education': 'Образование',
        'nav-contact': 'Контакты',
        
        // Hero section
        'hero-title': 'TcKatFire',
        'hero-subtitle': 'IT-специалист / Системный администратор',
        'hero-description': 'Специалист по устройству ПК, настройке оборудования и программного обеспечения. Владею HTML, CSS и имею продвинутые навыки работы с компьютерной техникой.',
        'hero-contact-btn': 'Связаться со мной',
        'hero-learn-btn': 'Узнать больше',
        
        // About section
        'about-title': 'О себе',
        'about-subtitle': 'Мой опыт и специализация',
        'about-description': 'Специализируюсь на всём, что связано с ПК и его устройством. Имею средний уровень знаний HTML и CSS, что позволяет мне работать с веб-технологиями.',
        'about-pc-title': 'Работа с ПК',
        'about-pc-desc': 'Сборка, настройка и обслуживание компьютерной техники',
        'about-web-title': 'Веб-разработка',
        'about-web-desc': 'HTML и CSS на среднем уровне',
        'about-preferences-title': 'Пожелания по условиям работы',
        'about-schedule': 'График: Полный день, Удалённая работа',
        'about-employment': 'Занятость: Полная занятость',
        'about-travel-time': 'Время в пути: Не дольше 1 часа',
        'about-business-trips': 'Командировки: Не могу',
        
        // Skills section
        'skills-title': 'Навыки',
        'skills-subtitle': 'Мои профессиональные компетенции',
        'skills-advanced': 'Продвинутый уровень',
        'skills-intermediate': 'Средний уровень',
        'skill-english': 'Английский язык',
        'skill-pc-assembly': 'Сборка ПК',
        'skill-internet-search': 'Поиск информации в интернете',
        'skill-pc-setup': 'Настройка ПК',
        'skill-html': 'HTML',
        'skill-learning': 'Обучение и развитие',
        'skill-software-setup': 'Настройка ПО',
        'level-advanced': 'Продвинутый',
        'level-intermediate': 'Средний',
        
        // Education section
        'education-title': 'Образование',
        'education-subtitle': 'Моя образовательная база',
        'education-degree-higher': 'Высшее образование (Бакалавр (Разработчик мобильных приложений))',
        'education-description-higher': 'В процессе обучения, углубляю знания в разработке мобильных приложений.',
        'education-degree-secondary': 'Среднее специальное образование (Разработчик web и мультимедийных приложений)',
        'education-description-secondary': 'Получил базовые знания и навыки, которые применяю в работе с компьютерной техникой',
        
        // Contact section
        'contact-title': 'Контакты',
        'contact-subtitle': 'Свяжитесь со мной для обсуждения сотрудничества',
        'contact-telegram': 'Telegram',
        'contact-email': 'Email',
        'contact-preferred': 'Предпочитаемый способ связи',
        'contact-form-title': 'Отправить сообщение',
        'contact-form-name': 'Имя',
        'contact-form-email': 'Email',
        'contact-form-subject': 'Тема',
        'contact-form-message': 'Сообщение',
        'contact-form-send': 'Отправить сообщение',
        
        // Footer
        'footer-rights': '© 2025 TcKatFire. Все права защищены.',
        'footer-created': 'Создано для размещения на GitHub Pages'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-education': 'Education',
        'nav-contact': 'Contact',
        
        // Hero section
        'hero-title': 'TcKatFire',
        'hero-subtitle': 'IT Specialist / System Administrator',
        'hero-description': 'Specialist in PC hardware, equipment setup and software configuration. I have intermediate knowledge of HTML, CSS and advanced computer skills.',
        'hero-salary': 'Desired salary: $700/month',
        'hero-contact-btn': 'Contact me',
        'hero-learn-btn': 'Learn more',
        
        // About section
        'about-title': 'About Me',
        'about-subtitle': 'My experience and specialization',
        'about-description': 'I specialize in everything related to PCs and their hardware. I have intermediate knowledge of HTML and CSS, which allows me to work with web technologies.',
        'about-pc-title': 'PC Work',
        'about-pc-desc': 'Assembly, configuration and maintenance of computer equipment',
        'about-web-title': 'Web Development',
        'about-web-desc': 'HTML and CSS at intermediate level',
        'about-preferences-title': 'Work preferences',
        'about-schedule': 'Schedule: Remote work',
        'about-employment': 'Employment: Full-time',
        'about-travel-time': 'Travel time: No more than 1 hour',
        'about-business-trips': 'Business trips: Cannot',
        
        // Skills section
        'skills-title': 'Skills',
        'skills-subtitle': 'My professional competencies',
        'skills-advanced': 'Advanced level',
        'skills-intermediate': 'Intermediate level',
        'skill-english': 'English language',
        'skill-pc-assembly': 'PC Assembly',
        'skill-internet-search': 'Internet research',
        'skill-pc-setup': 'PC Setup',
        'skill-html': 'HTML',
        'skill-learning': 'Learning and development',
        'skill-software-setup': 'Software setup',
        'level-advanced': 'Advanced',
        'level-intermediate': 'Intermediate',
        
        // Education section
        'education-title': 'Education',
        'education-subtitle': 'My educational background',
        'education-degree-higher': 'Studying Higher Education: \n Bachelor Mobile App Developer',
        'education-description-higher': 'Currently studying, deepening knowledge in mobile application development.',
        'education-degree-secondary': 'Secondary Specialized Education: \n Web and Multimedia Application Developer',
        'education-description-secondary': 'Received basic knowledge and skills that I apply in working with computer technology',
        
        // Contact section
        'contact-title': 'Contact',
        'contact-subtitle': 'Contact me to discuss cooperation',
        'contact-telegram': 'Telegram',
        'contact-email': 'Email',
        'contact-preferred': 'Preferred contact method',
        'contact-form-title': 'Send message',
        'contact-form-name': 'Name',
        'contact-form-email': 'Email',
        'contact-form-subject': 'Subject',
        'contact-form-message': 'Message',
        'contact-form-send': 'Send message',
        
        // Footer
        'footer-rights': '© 2025 TcKatFire. All rights reserved.',
        'footer-created': 'Created for GitHub Pages hosting'
    }
};

let currentLanguage = 'ru';

function switchLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    
    // Update language toggle button
    const toggleBtn = document.getElementById('languageToggle');
    toggleBtn.innerHTML = `<i class="bi bi-translate"></i> ${currentLanguage === 'ru' ? 'EN' : 'RU'}`;
    
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
    
    // Update all translatable elements
    updateTranslations();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[currentLanguage][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation.replace(/\n/g, '<br>');
            }
        }
    });
}


// Initialize language switching
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    }
});

