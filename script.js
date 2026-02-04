// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== THEME TOGGLE FUNCTIONALITY =====
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        themeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if reCAPTCHA is available
        const recaptchaResponse = window.grecaptcha ? window.grecaptcha.getResponse() : null;
        
        if (window.grecaptcha && !recaptchaResponse) {
            showFeedback('Please complete the reCAPTCHA verification.', 'error');
            return;
        }
        
        // Get form values
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const device = document.getElementById('device')?.value || '';
        const issue = document.getElementById('issue')?.value || '';
        
        // Simple validation
        if (name && email && device && issue) {
            // Success message
            showFeedback(`Thanks, ${name}! Your ${device} repair request has been received. We'll contact you at ${email} soon.`, 'success');
            contactForm.reset();
            
            // Reset reCAPTCHA if available
            if (window.grecaptcha) {
                window.grecaptcha.reset();
            }
        } else {
            showFeedback('Please fill in all required fields.', 'error');
        }
    });
}

// ===== NEWSLETTER FORM HANDLER =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterFeedback = document.getElementById('newsletterFeedback');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            // Success message
            showNewsletterFeedback('🎉 Thanks! You\'ve subscribed to our tech newsletter.', 'success');
            newsletterForm.reset();
        } else {
            showNewsletterFeedback('Please enter a valid email address.', 'error');
        }
    });
}

// ===== HELPER FUNCTIONS =====
function showFeedback(message, type) {
    const formFeedback = document.getElementById('formFeedback');
    if (!formFeedback) return;
    
    formFeedback.textContent = message;
    formFeedback.className = '';
    formFeedback.classList.add(type);
    
    // Clear feedback after 5 seconds
    setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = '';
    }, 5000);
}

function showNewsletterFeedback(message, type) {
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    if (!newsletterFeedback) return;
    
    newsletterFeedback.textContent = message;
    newsletterFeedback.className = '';
    newsletterFeedback.classList.add(type);
    
    // Button feedback effect
    const btn = newsletterForm.querySelector('.newsletter-btn');
    if (btn && type === 'success') {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#00d4aa';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    }
    
    // Clear feedback after 4 seconds
    setTimeout(() => {
        newsletterFeedback.textContent = '';
        newsletterFeedback.className = '';
    }, 4000);
}

// ===== SERVICE CARD INTERACTIVITY =====
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only navigate if not clicking on a link inside the card
            if (!e.target.closest('a')) {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .review-card, .detail-card, .feature').forEach(el => {
        observer.observe(el);
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize all features
    initThemeToggle();
    initServiceCards();
    initAnimations();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
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
    
    @keyframes border-circle {
        0% {
            transform: translateX(-100%);
        }
        25% {
            transform: translateX(100%) translateY(0);
        }
        50% {
            transform: translateX(100%) translateY(calc(100% - 3px));
        }
        75% {
            transform: translateX(-100%) translateY(calc(100% - 3px));
        }
        100% {
            transform: translateX(-100%) translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .service-card:hover::before {
        animation: border-circle 2s linear infinite;
    }
    
    /* Form feedback styles */
    #formFeedback.success,
    #newsletterFeedback.success {
        color: #00d4aa;
        background-color: rgba(0, 212, 170, 0.1);
        border: 1px solid rgba(0, 212, 170, 0.3);
        padding: 10px;
        border-radius: 4px;
        margin-top: 15px;
    }
    
    #formFeedback.error,
    #newsletterFeedback.error {
        color: #ff6b35;
        background-color: rgba(255, 107, 53, 0.1);
        border: 1px solid rgba(255, 107, 53, 0.3);
        padding: 10px;
        border-radius: 4px;
        margin-top: 15px;
    }
    `;
    document.head.appendChild(style);
});