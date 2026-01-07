/**
 * ==========================================
 * BATIK NUSANTARA - Custom JavaScript
 * Premium Batik E-Commerce Website
 * ==========================================
 * 
 * Table of Contents:
 * 1. DOM Elements & Variables
 * 2. Navbar Functionality
 * 3. Smooth Scrolling
 * 4. Scroll Animations (AOS Alternative)
 * 5. Back to Top Button
 * 6. Active Navigation Link
 * 7. Contact Form Handling
 * 8. Utility Functions
 * 9. Initialization
 */

'use strict';

// ==========================================
// 1. DOM ELEMENTS & VARIABLES
// ==========================================

const DOM = {
    navbar: document.getElementById('mainNavbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTop: document.getElementById('backToTop'),
    contactForm: document.getElementById('contactForm'),
    animatedElements: document.querySelectorAll('[data-aos]'),
    sections: document.querySelectorAll('section[id]')
};

const CONFIG = {
    navbarScrollThreshold: 50,
    backToTopThreshold: 300,
    animationOffset: 0.15, // Percentage of viewport
    debounceDelay: 10
};

// ==========================================
// 2. NAVBAR FUNCTIONALITY
// ==========================================

/**
 * Handle navbar appearance on scroll
 * Adds/removes 'scrolled' class based on scroll position
 */
function handleNavbarScroll() {
    if (!DOM.navbar) return;

    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > CONFIG.navbarScrollThreshold) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }
}

/**
 * Close mobile navbar when clicking a link
 */
function setupMobileNavbarClose() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (!navbarCollapse || !navbarToggler) return;

    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// ==========================================
// 3. SMOOTH SCROLLING
// ==========================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;
                const extraOffset = 20; // Extra padding for better positioning
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - extraOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// 4. SCROLL ANIMATIONS (AOS Alternative)
// ==========================================

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const offset = windowHeight * CONFIG.animationOffset;

    return (
        rect.top <= windowHeight - offset &&
        rect.bottom >= 0
    );
}

/**
 * Handle scroll animations for elements with data-aos attribute
 */
function handleScrollAnimations() {
    DOM.animatedElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('aos-animate');
        }
    });
}

/**
 * Initialize animations on page load
 * Triggers animation for elements already in viewport
 */
function initAnimations() {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        handleScrollAnimations();
    }, 100);
}

// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================

/**
 * Handle back to top button visibility
 */
function handleBackToTop() {
    if (!DOM.backToTop) return;

    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > CONFIG.backToTopThreshold) {
        DOM.backToTop.classList.add('visible');
    } else {
        DOM.backToTop.classList.remove('visible');
    }
}

/**
 * Scroll to top when button is clicked
 */
function initBackToTopClick() {
    if (!DOM.backToTop) return;

    DOM.backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// 6. ACTIVE NAVIGATION LINK
// ==========================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const navbarHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;

    DOM.sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all links
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section's link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ==========================================
// 7. CONTACT FORM HANDLING
// ==========================================

/**
 * Handle contact form submission
 * Note: This is a static website, so form submission is simulated
 */
function initContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        // Validate form
        if (!validateForm(formData)) {
            showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Mengirim...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset form
            this.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Show success message
            showNotification('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        }, 1500);
    });
}

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {boolean} - Whether form is valid
 */
function validateForm(data) {
    // Check required fields
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="bi bi-x"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#E8F5E9' : '#FFEBEE'};
        color: ${type === 'success' ? '#2E7D32' : '#C62828'};
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        animation: slideInRight 0.4s ease;
    `;

    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.95rem;
    `;

    const notificationIcon = notificationContent.querySelector('i');
    notificationIcon.style.fontSize = '1.5rem';

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);

    // Add to DOM
    document.body.appendChild(notification);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==========================================
// 8. UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
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

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Add hover effect animation to product cards
 */
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Add parallax effect to hero shapes
 */
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.hero-shape');

    if (shapes.length === 0) return;

    window.addEventListener('mousemove', throttle((e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 50));
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput?.value || '';

        if (!email.trim()) {
            showNotification('Mohon masukkan alamat email Anda.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Mohon masukkan alamat email yang valid.', 'error');
            return;
        }

        // Simulate subscription
        showNotification('Terima kasih! Anda berhasil berlangganan newsletter kami.', 'success');
        emailInput.value = '';
    });
}

// ==========================================
// 9. INITIALIZATION
// ==========================================

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = element.innerText;
        const hasPlus = target.includes('+');
        const hasK = target.includes('K');
        let finalNum = parseInt(target.replace(/[^0-9]/g, ''));

        if (hasK) finalNum = finalNum; // Keep as is for display

        let current = 0;
        const increment = finalNum / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= finalNum) {
                current = finalNum;
                clearInterval(counter);
            }
            let display = Math.floor(current);
            if (hasK) display = display + 'K';
            if (hasPlus) display = display + '+';
            element.innerText = display;
        }, stepTime);
    };

    // Observe when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Tilt effect for product cards
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Reveal elements on scroll with stagger effect
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .product-card, .contact-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

/**
 * Magnetic effect for buttons
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary-custom, .btn-outline-custom');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Ripple effect on button click
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Cursor follower effect (subtle)
 */
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 992) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Scale up on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .feature-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--color-primary-dark)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--color-primary)';
        });
    });
}

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    // Navbar functionality
    handleNavbarScroll();
    setupMobileNavbarClose();

    // Smooth scrolling
    initSmoothScroll();

    // Scroll animations
    initAnimations();

    // Back to top
    handleBackToTop();
    initBackToTopClick();

    // Active nav link
    updateActiveNavLink();

    // Contact form
    initContactForm();

    // Product card effects
    initProductCardEffects();

    // Parallax effect
    initParallaxEffect();

    // Newsletter form
    initNewsletterForm();

    // New animations
    initCounterAnimation();
    initTiltEffect();
    initScrollReveal();
    initMagneticButtons();
    initRippleEffect();
    initCursorEffect();

    // Log initialization
    console.log('✨ Batik Nusantara website initialized successfully!');
}

/**
 * Scroll event handler with optimized performance
 */
const handleScroll = throttle(() => {
    handleNavbarScroll();
    handleBackToTop();
    handleScrollAnimations();
    updateActiveNavLink();
}, CONFIG.debounceDelay);

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', debounce(handleScrollAnimations, 100), { passive: true });

// Handle page load for elements already in viewport
window.addEventListener('load', () => {
    handleScrollAnimations();
});
