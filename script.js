// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section titles, skill cards, and project cards
document.querySelectorAll('.section-title, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const modalContent = document.querySelector('.modal-content');
const modalBody = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');
const viewDetailsLinks = document.querySelectorAll('.view-details');

// Open modal with project details
viewDetailsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the project ID from the parent card
        const projectCard = this.closest('.project-card');
        const projectId = projectCard.getAttribute('data-id');
        
        // Get the template content
        const template = document.getElementById(`${projectId}-template`);
        
        if (template) {
            // Clone the template content
            const content = template.content.cloneNode(true);
            
            // Clear previous content and add new content
            modalBody.innerHTML = '';
            modalBody.appendChild(content);
            
            // Show the modal with animation
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close modal when clicking the close button
if (closeModal) {
    closeModal.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

// Close modal when clicking outside the content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-4px)';
    });
});

// Add animation to skill logos
document.querySelectorAll('.skill-logo').forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.1}s`;
});

// Add subtle parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) {
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
        }
    });
}