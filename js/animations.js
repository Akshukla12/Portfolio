/**
 * Advanced Animations - Animation Designer Skill
 * Scroll-triggered animations, stagger effects, and micro-interactions
 */

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========== Scroll Reveal Animation ========== //

    function initScrollReveal() {
        if (prefersReducedMotion) return;

        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');

        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: unobserve after revealing
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========== Stagger Animation for Lists ========== //

    function initStaggerAnimations() {
        if (prefersReducedMotion) return;

        const staggerContainers = document.querySelectorAll('[data-stagger]');

        staggerContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.dataset.stagger) || 100; // ms

            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`;
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, index) => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';

                            // Remove inline styles after animation completes
                            // This allows CSS hover effects to work properly
                            const totalDelay = (index * delay) + 600; // delay + transition duration
                            setTimeout(() => {
                                child.style.opacity = '';
                                child.style.transform = '';
                                child.style.transition = '';
                            }, totalDelay);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(container);
        });
    }

    // ========== Parallax Effect ========== //

    function initParallax() {
        if (prefersReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        function updateParallax() {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        }, { passive: true });
    }

    // ========== Number Counter Animation ========== //

    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeProgress);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    function initNumberCounters() {
        if (prefersReducedMotion) return;

        const counters = document.querySelectorAll('[data-count]');

        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    const target = parseInt(entry.target.dataset.count);
                    const duration = parseInt(entry.target.dataset.duration) || 2000;
                    animateNumber(entry.target, target, duration);
                    entry.target.dataset.counted = 'true';
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ========== Scroll Progress Indicator ========== //

    function initScrollProgress() {
        const progressBar = document.querySelector('[data-scroll-progress]');

        if (!progressBar) return;

        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

            progressBar.style.width = `${scrollPercent}%`;
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateProgress);
        }, { passive: true });

        updateProgress();
    }

    // ========== Button Ripple Effect ========== //

    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.btn-ripple');

        rippleButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ========== Magnetic Button Effect ========== //

    function initMagneticButtons() {
        if (prefersReducedMotion) return;

        const magneticButtons = document.querySelectorAll('[data-magnetic]');

        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const strength = parseFloat(this.dataset.magnetic) || 0.3;

                this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            button.addEventListener('mouseleave', function () {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========== Smooth Scroll to Anchor ========== //

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerOffset = 80; // Adjust based on your header height
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== Typing Animation ========== //

    function initTypingAnimation() {
        if (prefersReducedMotion) return;

        const typingElements = document.querySelectorAll('[data-typing]');

        typingElements.forEach(element => {
            const text = element.dataset.typing || element.textContent;
            const speed = parseInt(element.dataset.typingSpeed) || 50;

            element.textContent = '';
            element.style.borderRight = '2px solid var(--color-primary)';

            let index = 0;

            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    // Blinking cursor
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === 'none'
                            ? '2px solid var(--color-primary)'
                            : 'none';
                    }, 500);
                }
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && index === 0) {
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    // ========== Image Lazy Load with Fade In ========== //

    function initLazyImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });
        });
    }

    // ========== Card Tilt Effect ========== //

    function initCardTilt() {
        if (prefersReducedMotion) return;

        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });

            card.style.transition = 'transform 0.3s ease';
        });
    }

    // ========== Initialize All Animations ========== //

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initScrollReveal();
        initStaggerAnimations();
        initParallax();
        initNumberCounters();
        initScrollProgress();
        initRippleEffect();
        initMagneticButtons();
        initSmoothScroll();
        initTypingAnimation();
        initLazyImages();
        initCardTilt();

        console.log('✅ Advanced animations initialized');
    }

    // Start initialization
    init();

})();
