// GSAP Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations are handled in CSS mostly, but we can enhance them
    // Orbs Parallax
    gsap.to('.gradient-orb-1', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        x: -100
    });

    gsap.to('.gradient-orb-2', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: -150,
        x: 100
    });

    // About Section Animations
    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    aboutTimeline
        .from('.about-visual', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.about-content', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.stat-card', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.4');

    // General Reveal Animation for other sections
    const revealElements = document.querySelectorAll('.animate-on-scroll');
    revealElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});
