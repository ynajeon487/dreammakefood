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
- Menu planning (three modes: by-day, by-meal, and by-ingredients with servings support)
  - `/menu` - Main selection page with 3 aligned option cards
  - `/menu/by-day` - Daily menu generator (budget, servings, meals/day, diet, skill level)
  - `/menu/by-meal` - Single meal recipe generator (budget, servings, diet, optional dish name)
  - `/menu/by-ingredients` - Multiple recipe suggestions from available ingredients (ingredients, servings, optional budget, diet, skill level)
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
- Ingredient-based recipe suggestions with searchable ingredient library (60+ common Vietnamese ingredients)

## Backend Architecture

**Runtime**: Node.js with Express.js server

**API Structure**: RESTful endpoints using Express routes:
- `/api/chat` - AI chatbot interaction endpoint
- `/api/generate-menu` - Menu generation by day (budget, servings, meals/day, diet, skill level)
- `/api/menu/generate-meal` - Individual meal recipe generation (budget, servings, diet, optional dish name)
- `/api/menu/generate-from-ingredients` - Multiple recipe suggestions from available ingredients (ingredients, servings, optional budget, diet, skill level) - generates 2-4 different dishes

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
- Handles general chat, structured menu generation, and ingredient-based recipe suggestions
- **Ingredient-based generation**: Returns 2-4 different dish options from available ingredients
  - ALL dishes combined MUST use ALL selected ingredients (no waste)
  - Prioritizes at least 1 dish using all ingredients when culinary-compatible
  - Prevents unreasonable combinations (e.g., pork + shrimp in same dish)
  - Creates separate dishes for incompatible ingredients
  - Budget parameter is optional - AI adapts recommendations based on presence/absence
  - Follows Vietnamese cuisine principles and traditional ingredient pairings
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

**Ingredient Library**: Comprehensive Vietnamese ingredient database (`client/src/lib/ingredients.ts`)
- 60+ common ingredients grouped by category (Rau củ, Thịt, Hải sản, Đạm thực vật, Nấm, Tinh bột, Gia vị)
- Searchable multi-select interface with real-time filtering
- Badge display for selected ingredients
- Custom ingredient input field for ingredients not in the predefined list
- Ingredient analysis logging system to track user-requested ingredients for database expansion
- Used for ingredient-based recipe generation (generates 2-4 dish options)
- **Shopping List Integration**: Shopping page uses same ingredient data source with mapped pricing information
  - Prices based on TP Hồ Chí Minh market rates (January 2025)
  - Interactive checkboxes to select items for purchase
  - Dynamic quantity inputs with real-time price recalculation based on baseUnitPrice
  - Dynamic total calculation (only counts checked items)
  - Price disclaimer noting regional variations
  - **Hierarchical Ingredient Selection**: Parent items can be expanded to show specific sub-types
    - Thịt heo: Ba rọi, Sườn non, Nạc vai, Thịt mông (4 loại)
    - Thịt bò: Bò nạc, Bò kho, Thăn nội, Bắp bò (4 loại)
    - Thịt gà: Gà ta, Gà công nghiệp, Đùi gà, Cánh gà (4 loại)
    - Tôm: Tôm sú, Tôm thẻ, Tôm he (3 loại)
    - Cá: Cá rô phi, Cá diêu hồng, Cá lóc, Cá thu (4 loại)
    - Click chevron icon or item name to expand/collapse
    - Each sub-item has independent checkbox and quantity input
    - Sub-items visually indented with border-left
  - **Custom Ingredients**: Add ingredients not in predefined list (like MenuByIngredients page)
    - Input field accepts comma-separated ingredient names
    - Default values: 1 phần, 10.000đ/phần
    - Added to "Nguyên liệu khác" category
    - Fully adjustable quantity and included in total calculation
  - **PDF Download**: Uses jsPDF + html2canvas to generate PDF file
    - Captures styled HTML as PNG image and embeds in PDF (preserves Vietnamese text perfectly)
    - Mobile-friendly download format (A4 portrait)
    - Filename: `danh-sach-mua-sam-YYYY-MM-DD.pdf`
    - Includes both regular items and checked sub-items
  - **Clear list**: Unchecks all items (visual color change only, no strikethrough)

**Build & Development Tools**:
- TypeScript for type safety
- ESBuild for production builds
- PostCSS with Tailwind CSS and Autoprefixer
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)

**Fonts**: Google Fonts CDN for Inter and Lexend font families