// Projects Section Logic
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    // Load Projects Data
    fetch('assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            renderProjects(data);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            // Fallback content if JSON fails
            projectsGrid.innerHTML = '<p class="text-center text-secondary">Projects data could not be loaded.</p>';
        });

    function renderProjects(projects) {
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card animate-on-scroll';

            card.innerHTML = `
        <div class="project-image-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
          <div class="project-overlay">
            <button class="view-project-btn" data-image="${project.image}">View Detail</button>
          </div>
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.github}" class="project-link" target="_blank">GitHub</a>
            <a href="${project.live}" class="project-link" target="_blank">Live Demo</a>
          </div>
        </div>
      `;

            projectsGrid.appendChild(card);

            // Add event listeners for new elements
            const viewBtn = card.querySelector('.view-project-btn');
            viewBtn.addEventListener('click', () => {
                openModal(project.image);
            });

            // Mouse Move Effect for Spotlight
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Re-trigger scroll animations for new elements
        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    // Modal Logic
    function openModal(imgSrc) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal.onclick = function () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close when clicking outside image
    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});
