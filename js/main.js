/* =====================================================
   ART HOTEL TIRANA - Main JavaScript
   Smooth interactions and animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    });

    // ============================================
    // NAVIGATION
    // ============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER - Scroll Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .section-tag,
        .section-title,
        .about-text,
        .about-features,
        .room-card,
        .amenity-card,
        .gallery-item,
        .contact-item,
        .location-list li
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.05}s, transform 0.8s ease ${index * 0.05}s`;
        animateOnScroll.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // ROOM CARDS STAGGER
    // ============================================
    const roomCards = document.querySelectorAll('.room-card');
    
    const roomObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    roomCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        roomObserver.observe(card);
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create WhatsApp message
            let message = `Hello! I'd like to make an inquiry.\n\n`;
            message += `Name: ${data.name}\n`;
            message += `Email: ${data.email}\n`;
            if (data.checkin) message += `Check-in: ${data.checkin}\n`;
            if (data.checkout) message += `Check-out: ${data.checkout}\n`;
            if (data.message) message += `Message: ${data.message}\n`;
            
            // Encode and redirect to WhatsApp
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/+355686000212?text=${encodedMessage}`, '_blank');
            
            // Show success feedback
            showNotification('Message prepared! Redirecting to WhatsApp...');
            
            // Reset form
            this.reset();
        });
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'var(--color-gold)' : '#ff4444'};
            color: var(--color-bg);
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-family: var(--font-body);
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add notification animations
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification button {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(notificationStyles);

    // ============================================
    // LANGUAGE SWITCHER
    // ============================================
    const langSwitcher = document.querySelectorAll('.lang-switcher span');
    
    langSwitcher.forEach(lang => {
        lang.addEventListener('click', function() {
            // Remove active from all
            langSwitcher.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // In production, this would redirect to different language pages
            // For now, just show a notification
            const selectedLang = this.textContent;
            if (selectedLang !== 'EN') {
                showNotification(`${selectedLang} translation coming soon!`);
            }
        });
    });

    // ============================================
    // GALLERY LIGHTBOX (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.src;
            const alt = img.alt;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${src}" alt="${alt}">
                    <p class="lightbox-caption">${alt}</p>
                </div>
            `;
            
            // Styles
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(13, 11, 9, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 2rem;
                animation: fadeIn 0.3s ease;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close handlers
            const close = lightbox.querySelector('.lightbox-close');
            close.style.cssText = `
                position: absolute;
                top: 2rem;
                right: 2rem;
                background: none;
                border: none;
                color: var(--color-cream);
                font-size: 2rem;
                cursor: pointer;
            `;
            
            close.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            
            function closeLightbox() {
                lightbox.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });

    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .lightbox-content {
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
        }
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        .lightbox-caption {
            text-align: center;
            color: var(--color-cream);
            margin-top: 1rem;
            font-family: var(--font-display);
            font-size: 1.25rem;
        }
    `;
    document.head.appendChild(lightboxStyles);

    // ============================================
    // PARALLAX EFFECT (subtle)
    // ============================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.feature-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                const isNumber = /^\d+$/.test(value);
                
                if (isNumber) {
                    animateCounter(target, parseInt(value));
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // ============================================
    // DATE INPUT DEFAULTS
    // ============================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        
        // Update checkout min when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.min = checkinDate.toISOString().split('T')[0];
            
            // Clear checkout if it's before new min
            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
                checkoutInput.value = '';
            }
        });
    }

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c Art Hotel Tirana ', 
        'background: #C9A962; color: #0D0B09; font-family: Georgia; font-size: 20px; padding: 10px 20px;'
    );
    console.log('%c Where Art Meets Albanian Soul ', 
        'color: #C9A962; font-family: Georgia; font-size: 14px;'
    );

});
