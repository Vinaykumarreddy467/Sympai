// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const userProfileToggle = document.getElementById('user-profile-toggle');
const userDropdown = document.getElementById('user-dropdown');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Toggle ARIA attributes for accessibility
    const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuToggle.setAttribute('aria-expanded', !expanded);
    mainNav.setAttribute('aria-hidden', expanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
        }
    });
});

// Toggle user dropdown
userProfileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userProfileToggle.classList.toggle('active');
    userDropdown.classList.toggle('active');
    
    // Toggle ARIA attributes for accessibility
    const expanded = userProfileToggle.getAttribute('aria-expanded') === 'true' || false;
    userProfileToggle.setAttribute('aria-expanded', !expanded);
    userDropdown.setAttribute('aria-hidden', expanded);
});

// Close user dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userProfileToggle.contains(e.target) && !userDropdown.contains(e.target)) {
        userProfileToggle.classList.remove('active');
        userDropdown.classList.remove('active');
        userProfileToggle.setAttribute('aria-expanded', 'false');
        userDropdown.setAttribute('aria-hidden', 'true');
    }
});

// Handle navigation - highlight active section
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.main-nav li');

function setActiveNavItem() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('a').getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .feature-card, .cta-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Keyboard accessibility for mobile menu
mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
    }
});

// Keyboard accessibility for user dropdown
userProfileToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        userProfileToggle.click();
    }
});

// Close dropdowns when ESC key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        userProfileToggle.classList.remove('active');
        userDropdown.classList.remove('active');
        
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        userProfileToggle.setAttribute('aria-expanded', 'false');
        userDropdown.setAttribute('aria-hidden', 'true');
    }
});

// Close dropdowns when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('aria-hidden', 'true');
    userProfileToggle.setAttribute('aria-expanded', 'false');
    userDropdown.setAttribute('aria-hidden', 'true');
    
    // Run animations on initial load
    animateOnScroll();
    
    // Set active nav item on initial load
    setActiveNavItem();
});

// Event listeners for scroll
window.addEventListener('scroll', () => {
    setActiveNavItem();
    animateOnScroll();
});
