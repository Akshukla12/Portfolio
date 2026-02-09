/**
 * Main JavaScript Entry Point
 * Initializes global functionality and utilities
 */

(function () {
    'use strict';

    // Update copyright year in footer
    const updateCopyrightYear = () => {
        const yearElement = document.querySelector('#current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // Handle external links (add security attributes)
    const secureExternalLinks = () => {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');

        externalLinks.forEach(link => {
            // Ensure rel attribute includes noopener and noreferrer
            const rel = link.getAttribute('rel') || '';
            const relValues = new Set(rel.split(' ').filter(Boolean));

            relValues.add('noopener');
            relValues.add('noreferrer');

            link.setAttribute('rel', Array.from(relValues).join(' '));
        });
    };

    // Log performance metrics (optional, for development)
    const logPerformanceMetrics = () => {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    const renderTime = perfData.domComplete - perfData.domLoading;

                    console.log('⚡ Performance Metrics:');
                    console.log(`  Page Load Time: ${pageLoadTime}ms`);
                    console.log(`  Connect Time: ${connectTime}ms`);
                    console.log(`  Render Time: ${renderTime}ms`);
                }, 0);
            });
        }
    };

    // Initialize all main functionality
    const init = () => {
        updateCopyrightYear();
        secureExternalLinks();

        // Only log performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformanceMetrics();
        }

        // Log initialization
        console.log('✅ Portfolio initialized successfully');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
