// LogoLoop: Infinite Scrolling Skills
document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.skills-track');

    tracks.forEach(track => {
        // Clone the content to ensure seamless loop
        const content = track.innerHTML;
        track.innerHTML = content + content;

        // Add appropriate animation class
        const direction = track.getAttribute('data-direction');
        if (direction === 'left') {
            track.classList.add('loop-scroll-left');
        } else {
            track.classList.add('loop-scroll-right');
        }

        // Pause on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
});
