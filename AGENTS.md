# Agent Guidelines for Kite Spots Project

## Commands
- **Start dev server**: `npm start` (uses live-server)
- **Build**: No build step required (static HTML/CSS/JS)
- **Test**: No test framework configured yet
- **Lint**: No linter configured yet

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper meta tags (charset, viewport, title)
- Use lowercase for all HTML elements and attributes
- Double quotes for attribute values
- Self-closing tags for void elements

### CSS/JavaScript
- Use Tailwind CSS classes inline for styling
- Custom Tailwind config for consistent colors and fonts
- Vanilla JavaScript with modern ES6+ features
- Use `const`/`let` instead of `var`
- Arrow functions preferred for callbacks
- Async/await for asynchronous operations

### Naming Conventions
- kebab-case for HTML classes and IDs
- camelCase for JavaScript variables and functions
- PascalCase for constructor functions (if any)

### File Structure
- Static assets in `/assets/` directory
- Spot-specific content in `/spots/{spot-name}/`
- Keep HTML, CSS, and JS separated appropriately

### Error Handling
- Use try/catch for async operations
- Return appropriate HTTP status codes in API endpoints
- Graceful fallbacks for missing resources

### Security
- Validate and sanitize all user inputs
- Use HTTPS for external API calls
- Implement proper CORS headers for API endpoints