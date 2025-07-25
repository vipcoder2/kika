# KikaSports - Football Streaming Platform

## Overview

KikaSports is a modern football streaming platform built with React, TypeScript, and Express. It provides live football match streaming with multiple quality options, real-time scores, match schedules, and comprehensive football content. The application features a responsive design optimized for both desktop and mobile viewing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with custom theming
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state and React hooks for local state
- **Routing**: React Router DOM for client-side navigation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL session store
- **Development**: Hot reload with Vite integration
- **API Structure**: RESTful endpoints with `/api` prefix

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Database migrations managed through Drizzle Kit
- **Validation**: Zod schemas for runtime validation

## Key Components

### Frontend Components
- **Navbar**: Responsive navigation with mobile menu
- **LiveStreamViewer**: Video player with HLS support for different devices
- **MatchCard**: Reusable match display component with live/upcoming states
- **StreamQualitySelector**: Multiple stream quality options (HD/SD/Mobile)
- **TelegramBanner**: Community engagement modal
- **Footer**: Site navigation and legal links

### Backend Components
- **Storage Interface**: Abstracted storage layer with memory and database implementations
- **Route Registration**: Centralized route management
- **Vite Integration**: Development server with HMR support
- **Error Handling**: Centralized error middleware

### Data Models
- **Match**: Core match data with teams, scores, streams, and venue information
- **User**: Basic user authentication structure
- **Competition**: Tournament and league information

## Data Flow

### Match Data
1. External API fetches match data from Google Drive API
2. Data is cached and transformed into typed Match objects
3. Components consume match data through service layer
4. Real-time updates for live matches and scores

### Streaming Flow
1. Match selection triggers stream URL generation
2. Quality selector determines appropriate stream type (HLS/Mobile/iframe)
3. Video player components handle different stream formats
4. Device detection optimizes player selection

### User Interaction
1. React Router manages navigation between pages
2. TanStack Query handles server state and caching
3. Form validation through React Hook Form and Zod
4. Real-time updates through polling mechanisms

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Streaming**: HLS.js for video streaming
- **UI Components**: Radix UI primitive components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation

### External Services
- **Google Drive API**: Match data source
- **Telegram Integration**: Community features
- **Ad Services**: Revenue integration (AdSense)

### Build Dependencies
- **TypeScript**: Type safety across full stack
- **ESBuild**: Fast production builds
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- **Local Development**: Hot reload with Vite dev server
- **Database**: Local PostgreSQL or Neon development database
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite build outputs to `dist/public`
- **Backend**: ESBuild bundles server to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **Streaming**: External stream URLs and API keys
- **Sessions**: PostgreSQL-backed session storage

### Hosting Considerations
- **Static Assets**: CDN-ready build output
- **API Routes**: Express server with `/api` prefix
- **Database**: Serverless PostgreSQL (Neon)
- **Streaming**: External HLS sources

## Development Notes

### Code Organization
- **Monorepo Structure**: Client, server, and shared code in organized directories
- **Path Aliases**: Configured for clean imports (@/, @shared/)
- **Type Safety**: Full TypeScript coverage with strict configuration

### Performance Optimizations
- **Lazy Loading**: Code splitting for route-based components
- **Image Optimization**: Lazy loading for match logos and assets
- **Caching**: TanStack Query for efficient data fetching
- **Mobile Optimization**: Responsive design with mobile-first approach

### Security Features
- **Input Validation**: Zod schemas for all user inputs
- **Session Management**: Secure session handling
- **CORS**: Configured for production environment
- **Anti-Sniffer Protection**: Built-in protection against download managers