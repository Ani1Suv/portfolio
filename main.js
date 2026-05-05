// Theme Toggle Logic
const initTheme = () => {
    // Default to dark theme as requested
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
        
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
};

// Render Home Page Projects
const renderProjects = () => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Use portfolioData from data.js
    const projectsHTML = portfolioData.projects.map((project, index) => {
        // Add a slight delay for staggered animation
        const delay = index * 0.1;
        
        return `
            <a href="project.html?id=${project.id}" class="project-card fade-in" style="animation-delay: ${delay}s">
                <div class="project-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.shortDescription}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    }).join('');

    grid.innerHTML = projectsHTML;
};

// Render Single Project Detail
const renderProjectDetail = () => {
    const detailContainer = document.getElementById('project-detail');
    if (!detailContainer) return;

    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    const project = portfolioData.projects.find(p => p.id === projectId);

    if (!project) {
        detailContainer.innerHTML = `<h2>Project not found</h2><a href="index.html" class="back-link">← Back to Home</a>`;
        return;
    }

    // Set page title
    document.title = `${project.title} | ${portfolioData.name}`;

    detailContainer.innerHTML = `
        <a href="index.html" class="back-link">← Back to Home</a>
        <div class="project-header fade-in">
            <h1>${project.title}</h1>
            <div class="project-tags" style="margin-top: 0; margin-bottom: 2rem;">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <img src="${project.image}" alt="${project.title}" class="project-hero-img fade-in" style="animation-delay: 0.1s">
        <div class="project-content fade-in" style="animation-delay: 0.2s">
            <p>${project.fullDescription}</p>
        </div>
    `;
};

// Populate text from data.js
const populateData = () => {
    const elements = {
        'my-name': portfolioData.name,
        'my-role': portfolioData.role,
        'my-tagline': portfolioData.tagline,
        'my-about': portfolioData.about
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
};

// Handle Contact Form Submit
const initForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            
            // Simulate network request
            setTimeout(() => {
                btn.textContent = 'Message Sent Successfully!';
                btn.style.backgroundColor = '#2ecc71';
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }
};

// Initialize everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure dark theme defaults immediately before rendering flashes
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
    
    initTheme();
    populateData();
    renderProjects();
    renderProjectDetail();
    initForm();

    // Smooth page transitions for internal links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
            // Check if it's an internal link and not just an anchor on the same page
            const url = new URL(link.href);
            if (url.origin === window.location.origin && !link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        }
    });
});
