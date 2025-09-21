# Agent Guidelines for Kite Spots Project

## Commands

- **Start dev server**: `npm run dev` or `npm start` (uses Astro dev server)
- **Build**: `npm run build` (builds static site with Astro)
- **Preview build**: `npm run preview` (previews built site)
- **Test**: No test framework configured yet
- **Lint**: `npm run lint` (uses ESLint for JS/TS/JSX/TSX)
- **Lint fix**: `npm run lint:fix` (auto-fixes lint issues)
- **Optimize images**: `npm run optimize` (optimizes images using Sharp)

## Code Style Guidelines

### Astro

- Use Astro components (.astro files) for page layouts and static content
- Use React components (.tsx) for interactive elements
- Include proper meta tags in Layout.astro
- Use semantic HTML5 elements
- Use lowercase for HTML elements and attributes
- Double quotes for attribute values
- Self-closing tags for void elements
- Use pure Server-Side Rendering (SSR) for all pages

### JavaScript

- Use pure JavaScript for interactive components
- Use Tailwind CSS classes for styling
- Custom Tailwind config for consistent colors and fonts
- Use `const`/`let` instead of `var`
- Arrow functions preferred for callbacks
- Async/await for asynchronous operations
- PascalCase for component names
- camelCase for props and state variables

### Naming Conventions

- kebab-case for HTML classes and IDs
- camelCase for JavaScript/TypeScript variables and functions
- PascalCase for React components and constructor functions

### File Structure

- Static assets in `/assets/` directory
- Astro pages in `/src/pages/`
- Components in `/src/components/`
- Styles in `/src/styles/`
- Spot-specific content in `/src/pages/spots/{spot-name}/`

### Error Handling

- Use try/catch for async operations
- Graceful fallbacks for missing resources
- Handle errors in React components with error boundaries

### Security

- Validate and sanitize all user inputs
- Use HTTPS for external API calls
- Implement proper CORS headers for API endpoints
