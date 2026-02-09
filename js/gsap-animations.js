/**
 * GSAP Animations - Disney's 12 Animation Principles
 * Professional animations using GreenSock Animation Platform
 */

// Import GSAP from CDN (loaded in HTML)
// Make sure to include: <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

(function () {
    'use strict';

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Skipping GSAP animations.');
        return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('GSAP animations disabled: user prefers reduced motion');
        return;
    }

    // ========== 1. Hero Section - Staging + Anticipation ========== //

    function initHeroAnimation() {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.from('.hero__title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .from('.hero__subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4') // Overlap with previous
            .from('.hero__cta .btn', {
                y: 20,
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                stagger: 0.1, // Stagger children
                ease: 'back.out(1.2)' // Slight overshoot for appeal
            }, '-=0.3');
    }

    // ========== 2. Button Hover - Squash & Stretch + Appeal ========== //

    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            // Hover in - Squash & Stretch
            btn.addEventListener('mouseenter', function () {
                gsap.to(this, {
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Hover out
            btn.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Click - Anticipation + Action
            btn.addEventListener('mousedown', function () {
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    ease: 'power2.in'
                });
            });

            btn.addEventListener('mouseup', function () {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    // ========== 3. Skill Cards - Hover Effects ========== //

    function initSkillCardAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach((card) => {
            // Hover - Exaggeration + Appeal
            card.addEventListener('mouseenter', function () {
                const tl = gsap.timeline();

                // Main card
                tl.to(this, {
                    y: -10,
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    duration: 0.4,
                    ease: 'power2.out'
                });

                // Icon - Secondary Action
                const icon = this.querySelector('.skill-card__icon');
                if (icon) {
                    tl.to(icon, {
                        rotation: 360,
                        scale: 1.1,
                        duration: 0.5,
                        ease: 'back.out(1.5)'
                    }, '<'); // Start at same time
                }
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });

                const icon = this.querySelector('.skill-card__icon');
                if (icon) {
                    gsap.to(icon, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ========== 4. Project Cards - Arc + Timing ========== //

    function initProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            // Scroll reveal with arc motion
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: index % 2 === 0 ? -100 : 100, // Alternate sides
                y: 50,
                opacity: 0,
                rotation: index % 2 === 0 ? -10 : 10,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Hover - Solid Drawing (3D effect)
            card.addEventListener('mouseenter', function () {
                gsap.to(this, {
                    rotationY: 5,
                    rotationX: -5,
                    transformPerspective: 1000,
                    scale: 1.02,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ========== 5. Section Titles - Slow In/Out + Appeal ========== //

    function initSectionTitles() {
        const titles = document.querySelectorAll('.section__title');

        titles.forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.8,
                ease: 'power3.out' // Slow in and out
            });
        });
    }

    // ========== 6. Form Inputs - Anticipation + Follow Through ========== //

    function initFormAnimations() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            // Focus - Anticipation
            input.addEventListener('focus', function () {
                const tl = gsap.timeline();

                tl.to(this, {
                    scale: 1.02,
                    borderColor: 'var(--color-primary)',
                    boxShadow: '0 0 0 3px rgba(212, 165, 116, 0.2)',
                    duration: 0.2,
                    ease: 'power2.out'
                });

                // Label animation - Secondary Action
                const label = this.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    tl.to(label, {
                        y: -3,
                        color: 'var(--color-primary)',
                        duration: 0.2,
                        ease: 'power2.out'
                    }, '<');
                }
            });

            // Blur - Follow Through
            input.addEventListener('blur', function () {
                gsap.to(this, {
                    scale: 1,
                    borderColor: 'var(--color-border)',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power2.out'
                });

                const label = this.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    gsap.to(label, {
                        y: 0,
                        color: 'var(--color-text-secondary)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ========== 7. Navigation - Staging + Secondary Action ========== //

    function initNavigationAnimations() {
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                gsap.to(this, {
                    color: 'var(--color-primary)',
                    y: -2,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    color: 'var(--color-text-primary)',
                    y: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ========== 8. Blog Cards - Stagger + Appeal ========== //

    function initBlogCardAnimations() {
        const blogCards = document.querySelectorAll('.blog-card');

        if (blogCards.length > 0) {
            gsap.from(blogCards, {
                scrollTrigger: {
                    trigger: '.blog__grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                scale: 0.95,
                stagger: 0.15, // Stagger children
                duration: 0.6,
                ease: 'power3.out'
            });

            // Hover animations
            blogCards.forEach(card => {
                card.addEventListener('mouseenter', function () {
                    gsap.to(this, {
                        y: -8,
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', function () {
                    gsap.to(this, {
                        y: 0,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }
    }

    // ========== 9. Theme Toggle - Exaggeration ========== //

    function initThemeToggleAnimation() {
        const themeToggle = document.querySelector('.theme-toggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                const icons = this.querySelectorAll('.theme-toggle__icon');

                // Exaggerated rotation
                gsap.to(icons, {
                    rotation: 360,
                    scale: 1.2,
                    duration: 0.5,
                    ease: 'back.out(2)',
                    onComplete: () => {
                        gsap.set(icons, { rotation: 0 });
                    }
                });
            });
        }
    }

    // ========== 10. Scroll Progress - Timing ========== //

    function initScrollProgressAnimation() {
        const progressBar = document.querySelector('[data-scroll-progress]');

        if (progressBar) {
            gsap.to(progressBar, {
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3, // Smooth scrubbing
                    onUpdate: (self) => {
                        gsap.to(progressBar, {
                            width: `${self.progress * 100}%`,
                            duration: 0.1,
                            ease: 'none'
                        });
                    }
                }
            });
        }
    }

    // ========== 11. Floating Animation - Arc + Timing ========== //

    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('[data-float]');

        floatingElements.forEach((el, index) => {
            gsap.to(el, {
                y: -15,
                duration: 2 + (index * 0.3),
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });
        });
    }

    // ========== 12. Page Load Sequence - Master Timeline ========== //

    function initPageLoadAnimation() {
        const masterTL = gsap.timeline({ defaults: { ease: 'power2.out' } });

        // Header
        masterTL.from('.header', {
            y: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Hero content (already handled by initHeroAnimation)
        // This is just for the initial page load
    }

    // ========== Initialize All GSAP Animations ========== //

    function init() {
        // Wait for DOM and GSAP to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Register ScrollTrigger plugin if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Initialize all animations
        initPageLoadAnimation();
        initHeroAnimation();
        initButtonAnimations();
        initSkillCardAnimations();
        initProjectCardAnimations();
        initSectionTitles();
        initFormAnimations();
        initNavigationAnimations();
        initBlogCardAnimations();
        initThemeToggleAnimation();
        initScrollProgressAnimation();
        initFloatingElements();

        console.log('✅ GSAP animations initialized with Disney\'s 12 principles');
    }

    // Start initialization
    init();

})();
