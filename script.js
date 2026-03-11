// Typewriter Effect
const titles = [
    "Full Stack Developer",
    "AI & ML Enthusiast",
    "Problem Solver"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loadingVideo = document.querySelector('.loading-video');
    
    // Hide loader when video ends or after 5 seconds
    if (loadingVideo) {
        loadingVideo.addEventListener('ended', () => {
            loader.classList.add('hidden');
        });
        
        // Fallback: hide after 5 seconds if video doesn't end
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 5000);
    } else {
        // Fallback if no video
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3000);
    }
});

// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 7, 18, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(3, 7, 18, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .stat-card, .achievement-card, .leadership-card, .about-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skill Tab Filtering
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPlanets = document.querySelectorAll('.skill-planet');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Filter planets
            skillPlanets.forEach((planet, index) => {
                const planetCategory = planet.dataset.category;
                
                if (category === 'all' || planetCategory === category) {
                    planet.classList.remove('hidden');
                    planet.style.animationDelay = `${index * 0.04}s`;
                    // Re-trigger animation
                    planet.style.animation = 'none';
                    planet.offsetHeight; // Force reflow
                    planet.style.animation = '';
                } else {
                    planet.classList.add('hidden');
                }
            });
        });
    });
});

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'akula_narendra_kumar';
const EMAILJS_TEMPLATE_ID = 'narendra_20';
const EMAILJS_PUBLIC_KEY = 'vfqFW58u_BZT7lg0G';

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                contactForm
            );
            
            console.log('Email sent successfully:', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Email send failed:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Active nav highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        if (scrollY >= (section.offsetTop - 200)) {
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

// Escape key closes mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Star sparkle trail effect on mouse move
document.addEventListener('mousemove', (e) => {
    // Create 1 subtle sparkle with cursor
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Small offset - very close to cursor
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    
    sparkle.style.left = (x + offsetX) + 'px';
    sparkle.style.top = (y + offsetY) + 'px';
    
    // Smaller, subtle sizes
    const size = Math.random() * 2 + 1;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    // Faster, shorter animation
    sparkle.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 700);
}

