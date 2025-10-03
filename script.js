// Register animation plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =====================
// LOADING SCREEN
// =====================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');

    gsap.to('.loader-text', {
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: 1
    });

    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                loadingScreen.classList.add('hidden');
                initAnimations();
            }
        });
    }, 2000);
});

// =====================
// NAVIGATION
// =====================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

// Smooth scroll for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetId,
                offsetY: 80
            },
            ease: 'power3.inOut'
        });
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// =====================
// MAIN ANIMATIONS
// =====================
function initAnimations() {
    // Hero Section Animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
        .from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.8
        })
        .from('.title-small', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.title-name', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scale: 0.9
        }, '-=0.4')
        .from('.title-role', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.3')
        .from('.stat', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.3')
        .from('.hero-cta .btn', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15
        }, '-=0.3')
        .from('.tech-card', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5');

    // Continuous tech card animations
    gsap.utils.toArray('.tech-card').forEach((card, index) => {
        gsap.to(card, {
            y: -15,
            duration: 2 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.2
        });
    });

    // Gradient orb animations
    gsap.utils.toArray('.gradient-orb').forEach((orb, index) => {
        gsap.to(orb, {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            scale: 'random(0.8, 1.2)',
            duration: 'random(15, 25)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 2
        });
    });

    // Section Headers Animation with enhanced reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        timeline
            .from(header.querySelector('.section-number'), {
                y: 50,
                opacity: 0,
                rotation: -90,
                duration: 0.8,
                ease: 'back.out(1.7)'
            })
            .from(header.querySelector('.section-title'), {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clipPath: 'inset(0 100% 0 0)'
            }, '-=0.5')
            .from(header.querySelector('.section-line'), {
                scaleX: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.6');
    });

    // About Section
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 70%',
            end: 'bottom 60%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.fromTo('.highlight-item',
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.about-highlights',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        }
    );

    gsap.from('.about-skills-preview', {
        scrollTrigger: {
            trigger: '.about-skills-preview',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Enhanced skill bubbles animation with wave effect
    gsap.fromTo('.skill-bubble',
        {
            scale: 0,
            rotation: 360,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.skills-cloud',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            stagger: {
                each: 0.08,
                from: 'start'
            },
            ease: 'back.out(1.7)'
        }
    );

    // Add floating animation to skill bubbles
    gsap.to('.skill-bubble', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            each: 0.1,
            from: 'random'
        }
    });

    // Timeline animations with enhanced effects
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        timeline
            .fromTo(item.querySelector('.timeline-dot'),
                { scale: 0, opacity: 0, rotation: 360 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
            )
            .fromTo(item.querySelector('.timeline-content'),
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.4'
            )
            .fromTo(item.querySelector('.timeline-header h3'),
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo(item.querySelector('.timeline-header h4'),
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo(item.querySelectorAll('.timeline-details li'),
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo(item.querySelectorAll('.tech-tags span'),
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.7)' },
                '-=0.3'
            );
    });

    // Timeline dot continuous pulse with glow
    gsap.to('.timeline-dot', {
        boxShadow: '0 0 0 8px rgba(250, 204, 21, 0.3), 0 0 40px rgba(250, 204, 21, 0.6)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
            each: 0.4,
            repeat: -1
        }
    });

    // Projects Grid
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: (index % 3) * 0.1
        });

        // Project card hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.project-icon'), {
                scale: 1.1,
                rotate: 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.project-icon'), {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Skills Section
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1
        });
    });

    // Skill bars animation
    gsap.utils.toArray('.skill-progress').forEach(progress => {
        const percentage = progress.getAttribute('data-progress');
        gsap.to(progress, {
            scrollTrigger: {
                trigger: progress,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            width: `${percentage}%`,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Skill tags animation
    gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag.parentElement,
                start: 'top 75%'
            },
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
            delay: index * 0.03
        });
    });

    // Publications
    gsap.utils.toArray('.publication-card').forEach((card, index) => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        timeline
            .fromTo(card.querySelector('.publication-year'),
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
            )
            .fromTo(card.querySelector('.publication-content'),
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
                '-=0.3'
            )
            .fromTo(card.querySelectorAll('.publication-tags span'),
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.7)' },
                '-=0.3'
            );
    });

    // Contact Section
    gsap.from('.contact-text', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 70%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.fromTo('.contact-card',
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        }
    );

    gsap.from('.contact-cta', {
        scrollTrigger: {
            trigger: '.contact-cta',
            start: 'top 80%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    });

    // Footer
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// =====================
// INTERACTIVE ELEMENTS
// =====================

// Button magnetic effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Card tilt effect
document.querySelectorAll('.tech-card, .project-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Parallax effect for hero section
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 150,
    opacity: 0.5,
    ease: 'none'
});

gsap.to('.hero-visual', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 100,
    opacity: 0,
    ease: 'none'
});

// Scroll indicator animation
gsap.to('.scroll-indicator', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '80% top',
        scrub: 1
    },
    opacity: 0,
    y: -20,
    ease: 'none'
});

// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

// Add cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: #38BDF8;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    }

    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid #38BDF8;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99998;
        opacity: 0.5;
        transition: transform 0.3s ease;
    }

    .custom-cursor.active,
    .cursor-follower.active {
        transform: scale(1.5);
    }
`;
document.head.appendChild(cursorStyles);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.1,
        ease: 'power2.out'
    });

    gsap.to(cursorFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Cursor interactions
document.querySelectorAll('a, button, .tech-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// =====================
// UTILITY FUNCTIONS
// =====================

// Smooth scroll to top
const scrollToTop = () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: 'power3.inOut'
    });
};

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #38BDF8, #FACC15);
    border: none;
    border-radius: 50%;
    color: #0F172A;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s ease;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(scrollTopBtn, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3
        });
    } else {
        gsap.to(scrollTopBtn, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3
        });
    }
});

scrollTopBtn.addEventListener('click', scrollToTop);

// Performance optimization
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0.1);
}

// Log success message
console.log('%c🚀 Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #38BDF8, #FACC15); color: #0F172A; font-size: 16px; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('%cBuilt with smooth animations | Color Scheme: Navy Black & Sky Blue', 'color: #38BDF8; font-size: 12px;');
