# Personal Portfolio Website

A modern, professional, and recruiter-friendly portfolio website built with vanilla HTML5, CSS3, and JavaScript.

## 🎯 Features

- ✨ Clean, modern, and professional UI design
- 🌓 System-based dark/light mode with manual toggle
- 📱 Fully responsive (mobile-first approach)
- ♿ Accessibility-first (WCAG 2.1 AA compliant)
- ⚡ Performance-optimized (Lighthouse 90+ score)
- 🎨 Subtle CSS and JavaScript animations
- 📝 JSON-driven blog system
- 📧 Client-side form validation
- 🚀 Fast loading and lightweight

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Design**: Mobile-first responsive design
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS custom properties (design tokens)
│   ├── reset.css          # CSS reset/normalize
│   ├── base.css           # Base styles and typography
│   ├── components.css     # Reusable component styles
│   ├── sections.css       # Section-specific styles
│   └── animations.css     # Animation definitions
├── js/
│   ├── main.js            # Main entry point
│   ├── theme.js           # Dark/light mode handler
│   ├── navigation.js      # Smooth scroll, mobile menu
│   ├── animations.js      # Intersection Observer animations
│   ├── form.js            # Contact form validation
│   └── blog.js            # Blog data loader
├── assets/
│   ├── images/
│   │   ├── hero/          # Hero section images
│   │   ├── projects/      # Project screenshots
│   │   └── icons/         # Icon assets
│   ├── resume/
│   │   └── resume.pdf     # Downloadable resume
│   └── data/
│       └── blog-posts.json # Blog content data
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Open with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📄 Sections

1. **Hero**: Eye-catching introduction with CTAs
2. **About Me**: Professional summary and background
3. **Skills**: Core competencies and technologies
4. **Projects**: Case studies with problem-solution format
5. **Blog**: Learning logs and project breakdowns
6. **Resume**: Downloadable PDF resume
7. **Contact**: Contact form with validation
8. **Footer**: Minimal professional footer

## 🎨 Customization

### Colors & Theme

Edit `css/variables.css` to customize colors, spacing, typography, and other design tokens:

```css
:root {
  --color-primary: hsl(220, 90%, 56%);
  --color-background: hsl(0, 0%, 100%);
  /* ... more variables */
}
```

### Content

- **Projects**: Edit the project cards in `index.html`
- **Blog**: Update `assets/data/blog-posts.json`
- **Resume**: Replace `assets/resume/resume.pdf`
- **Images**: Add your images to respective folders in `assets/images/`

## 🧪 Testing

### Accessibility
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader compatibility
- Color contrast (WCAG AA)

### Performance
- Lighthouse audit (target: 90+ score)
- Mobile-friendly test
- Cross-browser testing

### Browsers Tested
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Save and wait for deployment

### Netlify

1. Connect your repository
2. Build command: (none needed for static site)
3. Publish directory: `/`
4. Deploy

### Vercel

1. Import your repository
2. Configure project (auto-detected)
3. Deploy

## ✅ Performance Targets

- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **100**
- Lighthouse Best Practices: **100**
- Lighthouse SEO: **90+**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- Website: [your-website.com](https://your-website.com)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)
- GitHub: [@your-github](https://github.com/your-username)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [Heroicons](https://heroicons.com) / [Feather Icons](https://feathericons.com)
- Fonts from [Google Fonts](https://fonts.google.com)

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
