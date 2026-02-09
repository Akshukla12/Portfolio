/**
 * Animated Backgrounds Controller
 * Mouse-following spotlight and dynamic particle generation
 */

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========== Mouse-Following Spotlight ========== //

    function initSpotlight() {
        if (prefersReducedMotion) return;

        const spotlight = document.getElementById('spotlight');
        if (!spotlight) return;

        let mouseX = 50;
        let mouseY = 50;
        let currentX = 50;
        let currentY = 50;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;
        });

        // Smooth animation loop
        function animate() {
            // Lerp (linear interpolation) for smooth following
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            spotlight.style.setProperty('--mouse-x', `${currentX}%`);
            spotlight.style.setProperty('--mouse-y', `${currentY}%`);

            requestAnimationFrame(animate);
        }

        animate();
    }

    // ========== Dynamic Particle Generation ========== //

    function initDynamicParticles() {
        if (prefersReducedMotion) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'bg-particles';
        document.body.appendChild(particleContainer);

        const particleCount = 30;
        const particles = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';

            // Random starting position
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const delay = Math.random() * 15;

            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;
            particle.style.animationDelay = `${delay}s`;

            particleContainer.appendChild(particle);
            particles.push(particle);
        }
    }

    // ========== GSAP Background Animations ========== //

    function initGSAPBackgrounds() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        // Animate orbs with GSAP for smoother motion
        const orbs = document.querySelectorAll('.bg-orb');

        orbs.forEach((orb, index) => {
            gsap.to(orb, {
                x: () => `${Math.random() * 100 - 50}px`,
                y: () => `${Math.random() * 100 - 50}px`,
                scale: () => 0.9 + Math.random() * 0.2,
                duration: 20 + index * 5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: index * 2
            });
        });

        // Animate shapes
        const shapes = document.querySelectorAll('.bg-shape');

        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                rotation: 360,
                duration: 30 + index * 10,
                ease: 'none',
                repeat: -1
            });

            gsap.to(shape, {
                x: () => `${Math.random() * 50 - 25}px`,
                y: () => `${Math.random() * 50 - 25}px`,
                duration: 25 + index * 5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: index
            });
        });
    }

    // ========== Parallax Background on Scroll ========== //

    function initParallaxBackground() {
        if (prefersReducedMotion) return;

        const animatedBg = document.querySelector('.animated-bg');
        if (!animatedBg) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;

            animatedBg.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // ========== Theme-Aware Background Updates ========== //

    function initThemeAwareBackgrounds() {
        const updateBackgroundColors = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const orbs = document.querySelectorAll('.bg-orb');

            // Update orb colors based on theme
            if (isDark) {
                orbs[0].style.background = 'radial-gradient(circle, hsla(150, 25%, 45%, 0.4) 0%, transparent 70%)';
                orbs[1].style.background = 'radial-gradient(circle, hsla(25, 45%, 40%, 0.3) 0%, transparent 70%)';
                orbs[2].style.background = 'radial-gradient(circle, hsla(150, 25%, 45%, 0.3) 0%, transparent 70%)';
            } else {
                orbs[0].style.background = 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)';
                orbs[1].style.background = 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)';
                orbs[2].style.background = 'radial-gradient(circle, hsla(150, 25%, 45%, 0.5) 0%, transparent 70%)';
            }
        };

        // Watch for theme changes
        const observer = new MutationObserver(updateBackgroundColors);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Initial update
        updateBackgroundColors();
    }

    // ========== Initialize All Background Effects ========== //

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initSpotlight();
        initDynamicParticles();
        initParallaxBackground();
        initThemeAwareBackgrounds();

        // Wait for GSAP to load
        if (typeof gsap !== 'undefined') {
            initGSAPBackgrounds();
        } else {
            window.addEventListener('load', () => {
                if (typeof gsap !== 'undefined') {
                    initGSAPBackgrounds();
                }
            });
        }

        console.log('✅ Animated backgrounds initialized');
    }

    // Start initialization
    init();

})();
