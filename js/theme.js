/**
 * Theme Switcher
 * Handles dark/light mode toggle with system preference detection
 */

(function() {
  'use strict';

  // Get theme from localStorage or system preference
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Initialize theme on page load (before DOM ready to prevent flash)
  const initTheme = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);
  };

  // Apply theme immediately (prevent flash of wrong theme)
  initTheme();

  // Set up theme toggle button when DOM is ready
  const setupThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      
      // Update aria-label based on current theme
      const updateAriaLabel = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        themeToggle.setAttribute('aria-label', `Switch to ${newTheme} mode`);
      };
      
      updateAriaLabel();
      
      // Update aria-label after each toggle
      themeToggle.addEventListener('click', () => {
        setTimeout(updateAriaLabel, 0);
      });
    }
  };

  // Listen for system theme changes
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupThemeToggle();
      watchSystemTheme();
    });
  } else {
    setupThemeToggle();
    watchSystemTheme();
  }
})();
