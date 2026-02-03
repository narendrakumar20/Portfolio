// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.borderBottomColor = 'rgba(255, 68, 68, 0.2)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Advanced typing animation that handles HTML content
function typeWriterWithHTML(element, htmlText, speed = 100) {
    // Parse the HTML to separate text and tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    
    // Extract the plain text content
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Find the position of the gradient text
    const gradientTextMatch = htmlText.match(/<span class="gradient-text">([^<]+)<\/span>/);
    const gradientText = gradientTextMatch ? gradientTextMatch[1] : '';
    const beforeGradient = textContent.split(gradientText)[0];
    const afterGradient = textContent.split(gradientText)[1] || '';
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i <= textContent.length) {
            const currentText = textContent.substring(0, i);
            let displayHTML = '';
            
            if (gradientText && currentText.includes(gradientText)) {
                // Full gradient text is typed
                const beforePart = beforeGradient;
                const gradientPart = currentText.substring(beforePart.length, beforePart.length + gradientText.length);
                const afterPart = currentText.substring(beforePart.length + gradientText.length);
                
                displayHTML = beforePart + 
                    '<span class="gradient-text">' + gradientPart + '</span>' + 
                    afterPart;
            } else if (gradientText && currentText.length > beforeGradient.length) {
                // Currently typing gradient text
                const beforePart = beforeGradient;
                const gradientPart = currentText.substring(beforePart.length);
                
                displayHTML = beforePart + 
                    '<span class="gradient-text">' + gradientPart + '</span>';
            } else {
                // Before gradient text or no gradient
                displayHTML = currentText;
            }
            
            element.innerHTML = displayHTML;
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        // Start typing animation immediately with faster speed
        setTimeout(() => {
            typeWriterWithHTML(heroTitle, originalHTML, 60);
        }, 1); // Reduced delay from default to just 200ms
    }
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.bg-animation');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'akula_narendra_kumar';
const EMAILJS_TEMPLATE_ID = 'narendra_20';
const EMAILJS_PUBLIC_KEY = 'vfqFW58u_BZT7lg0G';

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            reply_to: formData.get('email'),
            to_email: 'akulanarendra20042006@gmail.com',
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Comprehensive form validation before submission
        const fields = {
            name: {
                field: this.querySelector('input[name="name"]'),
                error: document.getElementById('name-error'),
                rules: { required: true, minLength: 2, maxLength: 50 }
            },
            email: {
                field: this.querySelector('input[name="email"]'),
                error: document.getElementById('email-error'),
                rules: { required: true, email: true }
            },
            subject: {
                field: this.querySelector('input[name="subject"]'),
                error: document.getElementById('subject-error'),
                rules: { required: true, minLength: 3, maxLength: 100 }
            },
            message: {
                field: this.querySelector('textarea[name="message"]'),
                error: document.getElementById('message-error'),
                rules: { required: true, minLength: 10, maxLength: 1000 }
            }
        };
        
        // Validate all fields
        let isFormValid = true;
        Object.values(fields).forEach(({ field, error, rules }) => {
            if (field && error) {
                const fieldValid = validateField(field, error, rules);
                if (!fieldValid) {
                    isFormValid = false;
                }
            }
        });
        
        // Stop submission if form is invalid
        if (!isFormValid) {
            showNotification('Please fix the errors above before submitting.', 'error');
            resetSubmitButton(submitButton, originalButtonText);
            return;
        }
        
        // Check if EmailJS is configured
        if (EMAILJS_SERVICE_ID === 'your_service_id_here' || 
            EMAILJS_TEMPLATE_ID === 'your_template_id_here' || 
            EMAILJS_PUBLIC_KEY === 'your_public_key_here') {
            
            // EmailJS not configured - show demo message
            setTimeout(() => {
                showNotification('Demo mode: EmailJS not configured yet. Check EMAILJS_SETUP.md for instructions.', 'info');
                this.reset();
                resetSubmitButton(submitButton, originalButtonText);
            }, 1000);
            return;
        }
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            })
            .finally(function() {
                resetSubmitButton(submitButton, originalButtonText);
            });
    });
}

// Helper function to reset submit button
function resetSubmitButton(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Form validation functions
function validateField(field, errorElement, validationRules) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field check
    if (validationRules.required && !value) {
        isValid = false;
        errorMessage = `${field.placeholder} is required.`;
    }
    // Min length check
    else if (validationRules.minLength && value.length < validationRules.minLength) {
        isValid = false;
        errorMessage = `${field.placeholder} must be at least ${validationRules.minLength} characters.`;
    }
    // Max length check
    else if (validationRules.maxLength && value.length > validationRules.maxLength) {
        isValid = false;
        errorMessage = `${field.placeholder} must be less than ${validationRules.maxLength} characters.`;
    }
    // Email validation
    else if (validationRules.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Update UI
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    return isValid;
}

// Add real-time validation to form fields
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const fields = {
        name: {
            field: form.querySelector('input[name="name"]'),
            error: document.getElementById('name-error'),
            rules: { required: true, minLength: 2, maxLength: 50 }
        },
        email: {
            field: form.querySelector('input[name="email"]'),
            error: document.getElementById('email-error'),
            rules: { required: true, email: true }
        },
        subject: {
            field: form.querySelector('input[name="subject"]'),
            error: document.getElementById('subject-error'),
            rules: { required: true, minLength: 3, maxLength: 100 }
        },
        message: {
            field: form.querySelector('textarea[name="message"]'),
            error: document.getElementById('message-error'),
            rules: { required: true, minLength: 10, maxLength: 1000 }
        }
    };
    
    // Add event listeners for real-time validation
    Object.values(fields).forEach(({ field, error, rules }) => {
        if (field && error) {
            field.addEventListener('blur', () => validateField(field, error, rules));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field, error, rules);
                }
            });
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: white;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.borderLeftColor = '#4facfe';
        notification.innerHTML = `<i class="fas fa-check-circle" style="color: #4facfe; margin-right: 0.5rem;"></i>${message}`;
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#ef4444';
        notification.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #ef4444; margin-right: 0.5rem;"></i>${message}`;
    } else {
        notification.innerHTML = message;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards 3D tilt effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Mouse cursor trail effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 68, 68, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 2}px;
            top: ${e.clientY - 2}px;
            animation: cursorFade 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(cursor);
        
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 800);
    }
});

// Add cursor fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .nav-link.active {
        background: rgba(255, 68, 68, 0.2);
        color: #FF4444;
    }
    
    .nav-link.active::after {
        width: 80%;
    }
`;
document.head.appendChild(style);