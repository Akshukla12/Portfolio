// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // ms
                const startValue = 0;
                let startTime = null;

                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);

                    // Easing function (easeOutExpo)
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                    target.innerText = Math.floor(easeProgress * (finalValue - startValue) + startValue) + '+';

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
});
