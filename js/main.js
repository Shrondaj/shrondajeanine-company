// Enhanced JavaScript for Shronda Jeanine & Company Website
// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DAILY AFFIRMATIONS SYSTEM =====
    const affirmations = [
        "You are worthy of healing and peace.",
        "Every step forward is a victory worth celebrating.",
        "Your journey matters, and you are not alone.",
        "Healing is not linear, and that's perfectly okay.",
        "You have the strength to overcome any challenge.",
        "Community and connection are powerful healers.",
        "Today is a new opportunity for growth and peace.",
        "Your recovery inspires others in their journey.",
        "You are capable of creating positive change.",
        "Compassion for yourself is the first step to healing."
    ];

    function updateDailyAffirmation() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const affirmationIndex = dayOfYear % affirmations.length;
        const affirmationElement = document.getElementById('daily-affirmation');
        
        if (affirmationElement) {
            affirmationElement.textContent = `"${affirmations[affirmationIndex]}"`;
        }
    }

    // Initialize daily affirmation
    updateDailyAffirmation();
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                }
            }
        });
    });

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                if (navToggle.classList.contains('active')) {
                    hamburger.style.transform = 'rotate(45deg)';
                    hamburger.style.background = 'transparent';
                } else {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = '#4A5568';
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = '#4A5568';
                }
            }
        }
    });

    // ===== ENHANCED CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Enhanced validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Crisis support check
            if (subject === 'crisis') {
                const crisisConfirm = confirm(
                    'You selected Crisis Support. For immediate assistance:\n\n' +
                    '• Call: 602-902-2677\n' +
                    '• National Crisis Line: 988\n' +
                    '• Emergency: 911\n\n' +
                    'Would you like to call now?'
                );
                
                if (crisisConfirm) {
                    window.open('tel:602-902-2677');
                    return;
                }
            }
            
            // Success message with service-specific response
            let responseMessage = `Thank you, ${name}! Your message has been received.\n\n`;
            
            switch(subject) {
                case 'coaching':
                    responseMessage += 'We\'ll contact you within 24 hours to schedule your holistic coaching session.';
                    break;
                case 'group':
                    responseMessage += 'We\'ll send you information about upcoming group sessions that match your needs.';
                    break;
                case 'events':
                    responseMessage += 'We\'ll send you our current event calendar and location details.';
                    break;
                case 'volunteer':
                    responseMessage += 'Thank you for your interest in volunteering! We\'ll be in touch with opportunities.';
                    break;
                default:
                    responseMessage += 'We\'ll get back to you at ' + email + ' within 24 hours.';
            }
            
            alert(responseMessage);
            
            // Reset form
            this.reset();
        });
    }

    // ===== NEWSLETTER SUBSCRIPTION =====
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert(
                'Welcome to our Healing Pathways Newsletter!\n\n' +
                `Confirmation sent to: ${email}\n\n` +
                'You\'ll receive:\n' +
                '• Weekly inspiration and affirmations\n' +
                '• Event updates and early registration\n' +
                '• Exclusive healing resources\n' +
                '• Community success stories\n\n' +
                'Thank you for joining our healing community!'
            );
            
            this.reset();
        });
    }

    // ===== SCROLL EFFECTS FOR NAVIGATION =====
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background opacity based on scroll
        if (header) {
            if (currentScroll > 100) {
                header.style.background = 'rgba(247, 250, 252, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(247, 250, 252, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // ===== ANIMATE TESTIMONIALS ON SCROLL =====
    const testimonialObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, testimonialObserverOptions);

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        testimonialObserver.observe(card);
    });

    // ===== ANIMATE OTHER CARDS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Staggered animation for testimonials
                if (entry.target.classList.contains('testimonial-card')) {
                    const cards = document.querySelectorAll('.testimonial-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.service-card, .event-card, .testimonial-card, .tier-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== ENHANCED BUTTON CLICK EFFECTS =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect for non-link buttons
            if (!this.href) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on load

    // ===== FORM INPUT ENHANCEMENTS =====
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // ===== PRICING HOVER EFFECTS =====
    document.querySelectorAll('.price-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== CRISIS SUPPORT FUNCTIONALITY =====
    function handleCrisisSupport() {
        const crisisMessage = 
            'CRISIS SUPPORT AVAILABLE\n\n' +
            '🔴 IMMEDIATE HELP:\n' +
            '• Call: 602-902-2677\n' +
            '• National Crisis Line: 988\n' +
            '• Emergency: 911\n\n' +
            '⏰ Available 24/7\n' +
            '💙 You are not alone\n\n' +
            'Would you like to call now?';
        
        if (confirm(crisisMessage)) {
            window.open('tel:602-902-2677');
        }
    }

    // Add crisis support to crisis buttons
    document.querySelectorAll('.crisis-btn, .btn-crisis').forEach(btn => {
        // Only add event listener if it's not already a phone link
        if (!btn.href || !btn.href.includes('tel:')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleCrisisSupport();
            });
        }
    });

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Keyboard navigation for custom elements
    document.querySelectorAll('.tier-card, .service-card, .event-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.querySelector('.btn');
                if (button) button.click();
            }
        });
    });

    // Console welcome message
    console.log('🌟 Shronda Jeanine & Company website loaded successfully!');
    console.log('✨ All interactive features are ready!');
    console.log('📞 Crisis support: 602-902-2677');
    console.log('🔗 Repository: https://github.com/Shrondaj/shrondajeanine-company');
});

// ===== CSS FOR ENHANCED EFFECTS =====
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--accent-color);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .form-group.focused label {
        color: var(--accent-color);
        font-weight: 600;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .price-option {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .testimonial-card {
        transition-delay: 0s;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);
