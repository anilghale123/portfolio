// Section Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const mainContent = document.querySelector('.main-content');

console.log('Nav links found:', navLinks.length);
console.log('Sections found:', sections.length);
console.log('Main content element:', mainContent);

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Click event triggered');
        e.preventDefault();
        
        const targetSectionId = link.getAttribute('data-section');
        console.log('Target section ID:', targetSectionId);
        const targetSection = document.getElementById(targetSectionId);
        console.log('Target section element:', targetSection);
        
        if (targetSection) {
            // Calculate the position to scroll to
            const mainContentRect = mainContent.getBoundingClientRect();
            const targetRect = targetSection.getBoundingClientRect();
            const scrollPosition = targetRect.top - mainContentRect.top + mainContent.scrollTop;
            
            console.log('Scrolling to position:', scrollPosition);
            
            // Smooth scroll to the section
            console.log('Attempting to scroll mainContent');
            console.log('Current scroll position:', mainContent.scrollTop);
            console.log('Target scroll position:', scrollPosition - 80);
            
            // Try multiple scroll methods
            try {
                // Method 1: Modern scrollTo API
                mainContent.scrollTo({
                    top: scrollPosition - 80,
                    behavior: 'smooth'
                });
                console.log('Used scrollTo API');
                setTimeout(() => {
                    console.log('Scroll position after scrollTo:', mainContent.scrollTop);
                }, 100);
            } catch (error1) {
                console.log('scrollTo API failed:', error1);
                try {
                    // Method 2: Direct scrollTop assignment
                    mainContent.scrollTop = scrollPosition - 80;
                    console.log('Used direct scrollTop assignment');
                } catch (error2) {
                    console.log('Direct scrollTop failed:', error2);
                    try {
                        // Method 3: jQuery-style animation (if jQuery available)
                        if (typeof $ !== 'undefined') {
                            $(mainContent).animate({ scrollTop: scrollPosition - 80 }, 500);
                            console.log('Used jQuery animation');
                        } else {
                            // Method 4: Manual smooth scroll
                            smoothScrollTo(mainContent, scrollPosition - 80);
                            console.log('Used manual smooth scroll');
                        }
                    } catch (error3) {
                        console.log('All scroll methods failed:', error3);
                    }
                }
            }
        } else {
            console.log('Target section not found!');
        }
    });
    
    // Add touch support for mobile
    link.addEventListener('touchstart', (e) => {
        console.log('Touch event triggered');
        // Prevent default touch behavior
        e.preventDefault();
        
        const targetSectionId = link.getAttribute('data-section');
        console.log('Touch target section ID:', targetSectionId);
        const targetSection = document.getElementById(targetSectionId);
        console.log('Touch target section element:', targetSection);
        
        if (targetSection) {
            const scrollPosition = targetSection.offsetTop - 80;
            console.log('Touch scrolling to position:', scrollPosition);
            console.log('Attempting touch scroll');
            console.log('Current touch scroll position:', mainContent.scrollTop);
            console.log('Target touch scroll position:', scrollPosition);
            
            // Try multiple scroll methods for touch
            try {
                mainContent.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                console.log('Touch used scrollTo API');
                setTimeout(() => {
                    console.log('Scroll position after touch scrollTo:', mainContent.scrollTop);
                }, 100);
            } catch (error1) {
                console.log('Touch scrollTo API failed:', error1);
                try {
                    mainContent.scrollTop = scrollPosition;
                    console.log('Touch used direct scrollTop');
                } catch (error2) {
                    console.log('Touch direct scrollTop failed:', error2);
                    if (typeof $ !== 'undefined') {
                        $(mainContent).animate({ scrollTop: scrollPosition }, 500);
                        console.log('Touch used jQuery animation');
                    } else {
                        smoothScrollTo(mainContent, scrollPosition);
                        console.log('Touch used manual smooth scroll');
                    }
                }
            }
        } else {
            console.log('Touch target section not found!');
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
    console.log('DOM loaded - running initial checks');
    
    // Verify all elements exist
    const testElements = {
        'main-content': document.querySelector('.main-content'),
        'about': document.getElementById('about'),
        'experience': document.getElementById('experience'),
        'projects': document.getElementById('projects'),
        'contact': document.getElementById('contact')
    };
    
    Object.keys(testElements).forEach(key => {
        console.log(`${key} element:`, testElements[key] ? 'Found' : 'NOT FOUND');
    });
    
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

// Manual smooth scroll function
function smoothScrollTo(element, targetPosition) {
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 500; // ms
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Ease-out function
        const ease = 1 - Math.pow(1 - progress, 3);
        element.scrollTop = startPosition + distance * ease;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const sectionIndex = parseInt(e.key) - 1;
        if (navLinks[sectionIndex]) {
            navLinks[sectionIndex].click();
        }
    }
});
