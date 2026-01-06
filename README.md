# Art Hotel Tirana - Website Redesign

A modern, elegant website for Art Hotel Tirana - a 4-star boutique hotel in the heart of Albania's capital.

![Art Hotel Tirana](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80)

## 🏨 About

This is a complete redesign of the Art Hotel Tirana website, featuring:

- **Modern Luxury Aesthetic** - Dark, warm color palette with gold accents
- **Fully Responsive** - Beautiful on all devices
- **Smooth Animations** - Subtle scroll effects and transitions
- **WhatsApp Integration** - Direct booking via WhatsApp
- **Gallery Lightbox** - Interactive image viewing
- **Multi-language Ready** - Structure supports EN, IT, SQ translations

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your browser.

### Option 2: Live Server
```bash
# If you have VS Code with Live Server extension
# Right-click index.html > Open with Live Server

# Or use Python
python -m http.server 8000

# Or use Node
npx serve
```

## 📁 Project Structure

```
art-hotel-tirana/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactivity
├── images/             # Place hotel images here
└── README.md           # This file
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --color-bg: #0D0B09;           /* Dark background */
    --color-gold: #C9A962;          /* Accent gold */
    --color-cream: #F5F0E8;         /* Text color */
    /* ... more variables */
}
```

### Images
Replace the Unsplash placeholder images with actual hotel photos:

1. Add images to the `/images` folder
2. Update the `src` attributes in `index.html`
3. Recommended sizes:
   - Hero: 1920x1080px
   - Room cards: 600x450px
   - Gallery: 800x600px (large), 600x400px (standard)

### Content
All text content is in `index.html`. Key sections:
- Hero taglines
- Room descriptions and prices
- Amenities
- Contact information

### WhatsApp Number
Update the phone number in multiple places:
```html
<!-- Search for this number and replace -->
+355686000212
```

## 🌐 Deployment

### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select main branch
4. Your site will be live at `username.github.io/art-hotel-tirana`

### Netlify
1. Connect your GitHub repo
2. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`

### Traditional Hosting
Upload all files to your web server's public directory.

## 📱 Features

- **Responsive Navigation** - Mobile hamburger menu
- **Smooth Scroll** - Animated section navigation
- **Form to WhatsApp** - Contact form redirects to WhatsApp
- **Gallery Lightbox** - Click images to view full-size
- **Loading Animation** - Elegant preloader
- **Scroll Animations** - Elements animate on scroll

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No dependencies
- **Google Fonts** - Cormorant Garamond + Montserrat

## 📋 TODO (Suggested Improvements)

- [ ] Add actual hotel photography
- [ ] Implement proper booking system
- [ ] Add Italian and Albanian translations
- [ ] Integrate with booking.com/expedia widgets
- [ ] Add Google Maps with correct coordinates
- [ ] SEO optimization
- [ ] Add favicon

## 📄 License

This project is created for Art Hotel Tirana. 
Feel free to use as a template for similar projects.

---

Built with ❤️ for Art Hotel Tirana
