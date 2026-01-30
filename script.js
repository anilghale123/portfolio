// Section Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const mainContent = document.querySelector('.main-content');

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSectionId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);
        
        if (targetSection) {
            // Calculate the position to scroll to
            const mainContentRect = mainContent.getBoundingClientRect();
            const targetRect = targetSection.getBoundingClientRect();
            const scrollPosition = targetRect.top - mainContentRect.top + mainContent.scrollTop;
            
            // Smooth scroll to the section
            mainContent.scrollTo({
                top: scrollPosition - 80, // Offset for better positioning
                behavior: 'smooth'
            });
        }
    });
});

// Scroll-based navigation highlighting
function updateActiveNav() {
    const scrollPosition = mainContent.scrollTop + 200; // Offset for better detection
    let currentSection = '';
    
    // Check which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // If section is in viewport (with some tolerance)
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id;
        }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Add scroll listener to main content
mainContent.addEventListener('scroll', updateActiveNav);

// Also check on window resize
window.addEventListener('resize', updateActiveNav);

// Initial check
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
});

// Smooth scrolling for external links
document.querySelectorAll('a[href^="mailto"], a[href^="https"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('mailto:')) {
            return; // Let mailto links work normally
        }
        if (this.getAttribute('href').startsWith('https://')) {
            // External links open in new tab
            return;
        }
    });
});

// Intersection Observer for scroll animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.timeline-item, .project-item, .about-content p, .tech-tag'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const sectionIndex = parseInt(e.key) - 1;
        if (navLinks[sectionIndex]) {
            navLinks[sectionIndex].click();
        }
    }
});
