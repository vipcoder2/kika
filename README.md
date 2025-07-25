
# KikaSports - Live Football Streaming Platform

A modern football streaming platform built with React, TypeScript, and Express. Features live match streaming, real-time scores, multi-language support, and responsive design.

## 🚀 Features

- 🎬 Live football match streaming with multiple quality options
- 📱 Responsive design for desktop and mobile
- 🌐 Multi-language support (English, Spanish, Arabic)
- 🕒 Automatic timezone detection and conversion
- ⚽ Real-time match scores and schedules
- 🎯 Modern UI with Tailwind CSS and Radix UI components

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI for components
- TanStack Query for state management
- Wouter for routing

**Backend:**
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- Session management
- RESTful API endpoints

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- VS Code (recommended for development)

### VS Code Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd kikasports
```

2. **Open in VS Code**
```bash
code .
```

3. **Install recommended VS Code extensions**
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint

4. **Install dependencies**
```bash
npm install
```

5. **Environment Setup**
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_connection_string"
NODE_ENV=development
PORT=5000
SESSION_SECRET="your_session_secret"
```

6. **Database Setup**
```bash
# Push database schema
npm run db:push
```

7. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build & Deployment

#### Local Production Build

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

#### Production Environment Variables
```env
DATABASE_URL="your_production_postgresql_connection_string"
NODE_ENV=production
PORT=5000
SESSION_SECRET="your_secure_session_secret"
```

#### Deployment on Replit
1. Push your code to the repository
2. Configure environment variables in Replit Secrets
3. The application will automatically build and deploy
4. Use the Deployments tool for production deployment

#### Building for Other Platforms
```bash
# Install dependencies
npm install

# Set production environment
export NODE_ENV=production

# Build the application
npm run build

# Start the application
npm start
```

The built files will be in the `dist/` directory:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

## 🎨 Customization Guide

### Changing Colors & Theming

#### Method 1: CSS Custom Properties (Recommended)
The application uses CSS custom properties for theming. Modify `client/src/index.css`:

```css
:root {
  /* Primary colors - Main brand colors */
  --sport-primary: 34 197 94;     /* Green primary (#22c55e) */
  --sport-secondary: 59 130 246;  /* Blue secondary (#3b82f6) */
  
  /* Background colors */
  --sport-background: 0 0 0;      /* Black background */
  --sport-surface: 24 24 27;      /* Dark surface (#18181b) */
  --sport-card: 39 39 42;         /* Card background (#27272a) */
  --sport-sidebar: 24 24 27;      /* Sidebar background */
  
  /* Text colors */
  --sport-text: 244 244 245;      /* Light text (#f4f4f5) */
  --sport-text-light: 161 161 170; /* Muted text (#a1a1aa) */
  --sport-muted: 113 113 122;     /* More muted text (#71717a) */
  
  /* Border and accent colors */
  --sport-border: 39 39 42;       /* Border color (#27272a) */
  --sport-dark: 9 9 11;          /* Darker elements (#09090b) */
}

/* Light theme (optional) */
[data-theme="light"] {
  --sport-background: 255 255 255;
  --sport-surface: 248 250 252;
  --sport-text: 15 23 42;
  /* Add other light theme colors */
}
```

#### Method 2: Tailwind Config
Update colors in `tailwind.config.ts`:

```typescript
// In the colors.sport section
sport: {
  primary: "hsl(142 76% 36%)",      // Custom green
  secondary: "hsl(217 91% 60%)",    // Custom blue
  background: "hsl(240 10% 3.9%)",  // Custom dark
  // ... other colors
}
```

#### Quick Color Presets

**Football Green Theme:**
```css
--sport-primary: 34 197 94;     /* Grass green */
--sport-secondary: 16 185 129;  /* Emerald accent */
```

**Champions League Blue:**
```css
--sport-primary: 37 99 235;     /* UEFA blue */
--sport-secondary: 124 58 237;  /* Purple accent */
```

**La Liga Orange:**
```css
--sport-primary: 249 115 22;    /* Orange primary */
--sport-secondary: 234 179 8;   /* Yellow accent */
```

### Customizing Menus & Navigation

#### Adding New Sidebar Menu Items

1. **Update Sidebar Navigation** (`client/src/components/Sidebar.tsx`):
```typescript
import { NewIcon } from 'lucide-react'; // Import your icon

const menuItems = [
  { path: "/", label: t('home'), icon: Home },
  { path: "/live", label: t('liveMatches'), icon: Tv },
  { path: "/schedule", label: t('schedule'), icon: Calendar },
  // Add your new item here
  { path: "/new-page", label: t('newPage'), icon: NewIcon },
];
```

2. **Add translations** in `client/src/contexts/LanguageContext.tsx`:
```typescript
const translations = {
  en: {
    // Existing translations...
    newPage: 'New Page',
    customFeature: 'Custom Feature',
  },
  es: {
    // Existing translations...
    newPage: 'Nueva Página',
    customFeature: 'Función Personalizada',
  },
  ar: {
    // Existing translations...
    newPage: 'صفحة جديدة',
    customFeature: 'ميزة مخصصة',
  },
};
```

3. **Create the page component** in `client/src/pages/NewPage.tsx`:
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('newPage')}</h1>
      {/* Your page content */}
    </div>
  );
}
```

4. **Add route** in `client/src/App.tsx`:
```typescript
import NewPage from './pages/NewPage';

// In your Routes section:
<Route path="/new-page" component={NewPage} />
```

#### Customizing Top Navigation Bar

Modify `client/src/components/Navbar.tsx`:

```typescript
const navItems = [
  { path: "/", label: t('home') },
  { path: "/live", label: t('liveMatches') },
  { path: "/schedule", label: t('schedule') },
  // Add new navigation items here
  { path: "/tournaments", label: t('tournaments') },
];
```

#### Removing Menu Items

To remove items, simply delete or comment out the relevant lines in:
- `Sidebar.tsx` (for sidebar items)
- `Navbar.tsx` (for top navigation)
- Remove the corresponding route from `App.tsx`

#### Custom Menu Styling

Update menu appearance in the respective component files:

```typescript
// Custom menu item styling
<li className="custom-menu-item bg-sport-surface hover:bg-sport-primary">
  <Link href={item.path} className="flex items-center space-x-3 p-3">
    <item.icon className="w-5 h-5" />
    <span>{item.label}</span>
  </Link>
</li>
```

### Language Support

1. **Add new language** in `client/src/contexts/LanguageContext.tsx`:
```typescript
const translations = {
  // Existing languages...
  fr: {
    home: 'Accueil',
    liveMatches: 'Matchs en Direct',
    // Add all translation keys...
  },
};

const languages = [
  // Existing languages...
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];
```

### Styling Components

The project uses Tailwind CSS with custom sport-themed classes:

- `bg-sport-background` - Main background
- `bg-sport-surface` - Card/surface background
- `text-sport-primary` - Primary text color
- `text-sport-text` - Regular text color
- `border-sport-border` - Border color

### Adding New Components

1. Create component in `client/src/components/`
2. Follow the existing pattern with TypeScript interfaces
3. Use Tailwind classes with the sport theme
4. Add translations if needed

## 📝 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── services/       # API service functions
├── server/                 # Backend Express application
├── shared/                 # Shared types and schemas
└── README.md
```

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # Type checking
npm run db:push      # Update database schema
```

## 💻 VS Code Development Tips

### Recommended VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### Useful VS Code Tasks
Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Build Production",
      "type": "shell",
      "command": "npm run build",
      "group": "build"
    }
  ]
}
```

### Debug Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5000",
      "webRoot": "${workspaceFolder}/client/src"
    }
  ]
}
```

### Auto-Preview Setup
1. The development server runs on port 5000 by default
2. After running `npm run dev`, the application will be available at `http://localhost:5000`
3. For VS Code users, you can install the "Live Server" extension for additional features
4. The Replit environment automatically forwards port 5000 to make it accessible

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will automatically open in your browser at `http://localhost:5000`

### Troubleshooting Auto-Preview
- Make sure port 5000 is not blocked by other processes
- Check that the development server started successfully
- Look for any error messages in the terminal
- Try refreshing the browser if the page doesn't load

Right-click on `client/index.html` and select "Open with Live Server"
3. For auto-refresh during development, the Vite dev server already provides HMR (Hot Module Replacement)

### IntelliSense for Tailwind
The project includes Tailwind CSS IntelliSense support. Make sure you have the extension installed for autocomplete of Tailwind classes.

## 🚀 Deployment & Production

### Replit Deployment (Recommended)
1. Push your code to the repository
2. Configure environment variables in Replit Secrets:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
3. Use the Deployments tool for production deployment
4. The application will automatically build and deploy

### Manual Production Deployment
For other platforms, ensure:
- Node.js environment (v18+)
- PostgreSQL database
- Environment variables configured
- Build artifacts in `dist/` directory

```bash
# Production deployment steps
npm install --production
npm run build
npm start
```

## 🔧 Auto-Preview & Development

### Hot Module Replacement (HMR)
The project uses Vite with HMR enabled. Changes to your code will automatically refresh in the browser during development.

### Auto-Preview Setup
1. Run `npm run dev`
2. Open `http://localhost:5000` in your browser
3. Changes to React components, CSS, and TypeScript files will auto-refresh
4. Server changes require manual restart

### VS Code Live Preview
1. Install "Live Preview" extension in VS Code
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run "Live Preview: Start Server"
4. VS Code will show preview in sidebar

## 🐛 Troubleshooting & Common Issues

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check without emitting
npm run check

# Clear Vite cache
rm -rf node_modules/.vite
```

### Database Connection Issues
```bash
# Test database connection
npm run db:push

# Reset database schema
# Be careful - this will delete data
# drizzle-kit drop && npm run db:push
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port
PORT=3000 npm run dev
```

### TypeScript Errors
```bash
# Check TypeScript without building
npx tsc --noEmit

# Update TypeScript
npm install typescript@latest
```

### Tailwind Classes Not Working
1. Check `tailwind.config.ts` includes your file paths
2. Restart dev server after config changes
3. Verify CSS imports in `client/src/index.css`

### Module Resolution Issues
1. Check path aliases in `tsconfig.json`
2. Verify imports use correct paths (`@/` for client src)
3. Restart TypeScript server in VS Code (`Ctrl+Shift+P` → "TypeScript: Restart TS Server")

## 📱 Mobile Support

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized video player for mobile devices
- Progressive Web App capabilities

## 🌍 Internationalization

Currently supports:
- English (en)
- Spanish (es) 
- Arabic (ar)

To add more languages, follow the language support guide above.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
- Check the FAQ section in the app
- Review this README
- Contact support through the application

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
