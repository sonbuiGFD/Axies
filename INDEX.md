# Axies Project Index

## Project Overview

**Axies** is a Node.js web application built with Express.js and EJS templating engine. It appears to be a theme UI generation tool for NFT/blockchain-related websites, featuring a modern, responsive design with dark mode support.

## Technology Stack

- **Backend**: Node.js + Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **CSS Framework**: Bootstrap
- **Icons**: Font Awesome
- **Animations**: Animate.css, WOW.js
- **Carousel**: Swiper.js
- **HTTP Client**: Axios
- **Build Tool**: None (vanilla setup)

## Project Structure

### Root Files

- `app.js` - Main Express application server
- `package.json` - Node.js dependencies and scripts
- `vercel.json` - Vercel deployment configuration
- `README.md` - Basic setup instructions

### Server Configuration (`app.js`)

- **Port**: 3000 (configurable via environment variable)
- **View Engine**: EJS with layouts
- **Static Files**: Served from `/public` directory
- **CORS**: Applied only to proxy route `/wisekingson`
- **Routes**:
  - `/` → `pages/home.ejs`
  - `/:page` → `pages/{page}.ejs` (dynamic routing)
  - `/wisekingson` → Google Apps Script API proxy (with CORS)

### CORS Configuration

The application implements CORS policies specifically for the proxy route `/wisekingson`:

- **Scope**: Only applies to `/wisekingson` endpoint
- **Allowed Origins**:
  - `https://wisekingson.com`
  - `https://wisekingson-straps.com`
- **Allowed Methods**: POST, OPTIONS (for preflight)
- **Allowed Headers**: Content-Type, Authorization, X-Requested-With
- **Credentials**: Enabled for authenticated requests
- **Security**: All other origins are blocked for this route only

### Dependencies

- `express` (~4.16.1) - Web framework
- `ejs` (~2.6.1) - Template engine
- `express-ejs-layouts` (^2.5.1) - Layout support
- `cookie-parser` (~1.4.4) - Cookie parsing
- `serve-favicon` (^2.5.0) - Favicon serving
- `cors` (^2.8.5) - Cross-Origin Resource Sharing middleware

## Frontend Structure

### CSS Files (`/public/css/`)

- `style.css` - Main stylesheet
- `bootstrap.css` - Bootstrap framework
- `animate.css` - Animation library
- `font-awesome.css` - Icon library
- `ntfs.css` - NFT-specific styles
- `responsive.css` - Responsive design
- `shortcodes.css` - Utility classes
- `swiper-bundle.min.css` - Carousel styles
- `jquery.fancybox.min.css` - Lightbox styles

### JavaScript Files (`/public/js/`)

- `jquery.min.js` - jQuery library
- `bootstrap.min.js` - Bootstrap components
- `main.js` - Main application logic
- `swiper-bundle.min.js` - Carousel functionality
- `wow.min.js` - Scroll animations
- `plugin.js` - Additional plugins
- `count-down.js` - Countdown timers
- `shortcodes.js` - Utility functions

### Fonts (`/public/font/`)

- **Font Awesome**: Complete icon font set (brands, duotone, light, regular, solid)
- **Custom NFT Font**: `nfts.*` files

### Images (`/public/images/`)

- **Avatars**: User profile images (avt-1.jpg to avt-30.jpg, author_rank.jpg)
- **Backgrounds**: Gradient and section backgrounds
- **Box Items**: Card and collection item images
- **Icons**: UI icons (moon, sun, rainbow, etc.)
- **Logos**: Multiple logo variants with @2x versions

## Template Structure

### Layout (`/views/layouts/theme.ejs`)

- **Theme**: Dark mode by default
- **Features**:
  - Preloader animation
  - Header and footer includes
  - Modal popups for bidding
  - Scroll-to-top functionality
  - Responsive design

### Pages (`/views/pages/`)

- `home.ejs` - Landing page
- `home6.ejs` - Alternative home page
- `explore.ejs` - NFT exploration
- `create.ejs` - NFT creation
- `detail.ejs` - Item details
- `activity.ejs` - User activity
- `ranking.ejs` - Rankings/leaderboard

### Partials (`/views/partials/`)

- `header.ejs` - Navigation and header
- `footer.ejs` - Footer content
- `error.ejs` - Error page template

## Key Features

### UI Components

- **Navigation**: Responsive header with dark theme
- **Modals**: Bidding system with popup dialogs
- **Carousels**: Swiper.js powered image sliders
- **Animations**: WOW.js scroll-triggered animations
- **Responsive**: Mobile-first design approach

### NFT Functionality

- **Bidding System**: Place bids with ETH amounts
- **Collections**: Browse NFT collections
- **Rankings**: User and item rankings
- **Activity Feed**: User activity tracking
- **Item Details**: Comprehensive NFT information

### Theme System

- **Dark Mode**: Default dark theme
- **Customizable**: Multiple color schemes
- **Modern Design**: Clean, professional appearance

## Development Setup

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager

### Installation

```bash
npm install
# or
yarn install
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:3000`

### Development Scripts

- `dev` - Start the development server

## Deployment

- **Platform**: Vercel-ready (vercel.json included)
- **Environment**: Production-ready with environment variable support
- **Port**: Configurable via `PORT` environment variable

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Progressive enhancement approach

## Performance Features

- **Static Asset Optimization**: CSS/JS minification ready
- **Image Optimization**: Multiple resolution support (@2x)
- **Lazy Loading**: Swiper.js carousel optimization
- **Preloader**: Smooth loading experience

## Customization

- **Themes**: Easy color scheme modification
- **Layouts**: Flexible EJS template system
- **Components**: Modular CSS and JavaScript
- **Content**: Easy page addition via EJS templates

---

_This index provides a comprehensive overview of the Axies project structure, features, and development setup. For specific implementation details, refer to the individual source files._
