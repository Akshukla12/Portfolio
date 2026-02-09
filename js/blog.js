/**
 * Blog Posts Loader
 * Dynamically loads and renders blog posts from JSON data
 */

(function () {
    'use strict';

    // Format date using Intl.DateTimeFormat
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Create blog card HTML
    const createBlogCard = (post) => {
        const article = document.createElement('article');
        article.className = 'blog-card animate-on-scroll';

        article.innerHTML = `
      <div class="blog-card__image">
        <img 
          src="${post.image}" 
          alt="${post.title}" 
          width="600" 
          height="338" 
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22338%22%3E%3Crect width=%22600%22 height=%22338%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2224%22 fill=%22%239ca3af%22%3EImage%3C/text%3E%3C/svg%3E'"
        >
      </div>
      <div class="blog-card__content">
        <h3 class="blog-card__title">${post.title}</h3>
        <time class="blog-card__date" datetime="${post.date}">
          ${formatDate(post.date)}
        </time>
        <p class="blog-card__excerpt">${post.excerpt}</p>
        <a href="#" class="blog-card__link">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    `;

        return article;
    };

    // Render blog posts
    const renderBlogPosts = (posts) => {
        const blogGrid = document.querySelector('#blog-posts');
        const blogEmpty = document.querySelector('#blog-empty');

        if (!blogGrid) return;

        // Clear existing content
        blogGrid.innerHTML = '';

        if (!posts || posts.length === 0) {
            // Show empty state
            if (blogEmpty) {
                blogEmpty.removeAttribute('hidden');
            }
            return;
        }

        // Hide empty state
        if (blogEmpty) {
            blogEmpty.setAttribute('hidden', '');
        }

        // Create and append blog cards
        posts.forEach(post => {
            const card = createBlogCard(post);
            blogGrid.appendChild(card);
        });

        // Re-observe new elements for scroll animations
        if (window.IntersectionObserver && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            blogGrid.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        } else {
            // If no IntersectionObserver or reduced motion, show immediately
            blogGrid.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('animate-in');
            });
        }
    };

    // Load blog posts from JSON
    const loadBlogPosts = async () => {
        try {
            const response = await fetch('assets/data/blog-posts.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const posts = await response.json();

            // Sort posts by date (newest first)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            renderBlogPosts(posts);

        } catch (error) {
            console.error('Error loading blog posts:', error);

            // Show empty state on error
            const blogEmpty = document.querySelector('#blog-empty');
            if (blogEmpty) {
                blogEmpty.querySelector('p').textContent = 'Unable to load blog posts. Please try again later.';
                blogEmpty.removeAttribute('hidden');
            }
        }
    };

    // Initialize blog
    const init = () => {
        loadBlogPosts();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
