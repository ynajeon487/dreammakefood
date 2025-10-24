# Overview

This is a Vietnamese student cooking support platform called "Dream Makers" (Nấu Ăn Sinh Viên). The application helps students plan budget-friendly meals by providing recipe suggestions, meal planning tools, shopping lists, and AI-powered cooking assistance. The platform focuses on Vietnamese cuisine with cost-effective recipes suitable for student budgets (typically under 30,000 VND per meal).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with the following pages:
- Home page with hero section and featured recipes
- Recipes listing and detail pages
- Menu planning (two modes: by-day and by-meal with servings support)
  - `/menu` - Main selection page with 2 aligned option cards
  - `/menu/by-day` - Daily menu generator (budget, servings, meals/day, diet, skill level)
  - `/menu/by-meal` - Single meal recipe generator (budget, servings, diet, optional dish name)
- Shopping list management
- Knowledge base with cooking tips

**UI Component Library**: Shadcn/ui (New York style variant) built on top of Radix UI primitives with Tailwind CSS for styling

**State Management**: TanStack Query (React Query v5) for server state management with custom query client configuration

**Design System**:
- Color palette based on olive green tones (#556B2F primary, #8FA31E secondary, #C6D870 tertiary, #EFF5D2 background)
- Typography using Inter for UI elements and Lexend for headings/Vietnamese text
- Consistent spacing using Tailwind's spacing scale
- Custom CSS variables for light/dark mode support with elevation states (hover-elevate, active-elevate)

**Key Features**:
- AI chatbot component with markdown parsing for formatted responses
- Responsive design with mobile-first approach
- Recipe filtering and search functionality
- Interactive menu generation forms with validation

## Backend Architecture

**Runtime**: Node.js with Express.js server

**API Structure**: RESTful endpoints using Express routes:
- `/api/chat` - AI chatbot interaction endpoint
- `/api/generate-menu` - Menu generation by day (budget, servings, meals/day, diet, skill level)
- `/api/menu/generate-meal` - Individual meal recipe generation (budget, servings, diet, optional dish name)

**Development Setup**: 
- Vite middleware for HMR in development
- Custom logging middleware for API requests
- Static file serving in production

**Data Layer**: 
- In-memory storage implementation (MemStorage class) for user management
- Schema defined using Drizzle ORM with PostgreSQL dialect
- Database configuration points to Neon serverless PostgreSQL

**Session Management**: Uses connect-pg-simple for PostgreSQL-backed sessions (configured but storage currently in-memory)

## External Dependencies

**AI Service**: OpenAI API integration via Replit's AI Integrations service
- Model: GPT-4o-mini for cost-effective responses
- System prompt configured for Vietnamese student cooking assistance
- Handles both general chat and structured menu/recipe generation
- Markdown formatting support for rich text responses

**Database**: Neon Serverless PostgreSQL
- Connection via `@neondatabase/serverless` driver
- Schema migrations managed through Drizzle Kit
- Currently using in-memory storage but schema prepared for database migration

**UI Component Dependencies**: Extensive Radix UI component library including:
- Dialog, Popover, Dropdown Menu for overlays
- Form components (Input, Select, Checkbox, Textarea)
- Navigation components (Tabs, Accordion, Navigation Menu)
- Feedback components (Toast, Alert Dialog)

**Asset Management**: Static images stored in `attached_assets/generated_images/` directory for recipe photos

**Build & Development Tools**:
- TypeScript for type safety
- ESBuild for production builds
- PostCSS with Tailwind CSS and Autoprefixer
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)

**Fonts**: Google Fonts CDN for Inter and Lexend font families