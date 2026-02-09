/**
 * Navigation
 * Handles smooth scrolling, mobile menu, and active link highlighting
 */

(function () {
    'use strict';

    // Smooth scroll to section
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80; // Fixed header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Update active navigation link based on scroll position
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            const href = link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    // Add scrolled class to header
    const handleHeaderScroll = () => {
        const header = document.querySelector('.header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Mobile menu toggle
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!menuToggle || !navMenu) return;

        // Toggle menu
        const toggleMenu = () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        };

        // Close menu
        const closeMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Toggle on button click
        menuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    closeMenu();
                    smoothScroll(href);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                menuToggle.focus(); // Return focus to toggle button
            }
        });
    };

    // Setup smooth scroll for all anchor links
    const setupSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;

                e.preventDefault();
                smoothScroll(href);
            });
        });
    };

    // Debounce function for scroll events
    const debounce = (func, wait = 10) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Initialize navigation
    const init = () => {
        setupMobileMenu();
        setupSmoothScroll();

        // Handle scroll events
        const handleScroll = debounce(() => {
            updateActiveLink();
            handleHeaderScroll();
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Initial call
        updateActiveLink();
        handleHeaderScroll();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
