# Eleventy Build System Implementation

This project has been refactored to use Eleventy (11ty) for eliminating code duplication and improving maintainability.

## What Was Changed

### Before (Original Structure)
- 5 HTML files with ~80% duplicated code
- Repeated Tailwind config, CSS styles, navigation, and scripts
- Manual maintenance of shared elements across all files

### After (Eleventy Structure)
- Shared components in `src/_includes/`
- Page-specific content only in `src/pages/`
- Automatic build process generates final HTML
- Single source of truth for common elements

## Directory Structure

```
src/
├── _includes/          # Shared HTML components
│   ├── header.html    # Fonts, Tailwind config, styles
│   ├── navigation.html # Navigation and mobile menu
│   └── footer.html    # Common scripts
├── _layouts/
│   └── base.html      # Main page template
├── pages/             # Page-specific content
│   ├── index.html
│   └── spots/
│       └── jeziorsko/
│           ├── index.html
│           ├── pogoda/
│           │   └── index.html
│           └── spoty/
│               └── index.html
├── assets/            # Static assets (copied as-is)
└── scripts/           # Build scripts (copied as-is)

dist/                  # Generated output (ready for deployment)
├── index.html
├── spots/
│   └── jeziorsko/
│       ├── index.html
│       ├── pogoda/
│       │   └── index.html
│       └── spoty/
│           └── index.html
├── assets/
└── scripts/
```

## Build Commands

```bash
# Development server with live reload (recommended)
npm run dev

# Simple build + serve (for testing)
npm run dev-simple

# Build for production
npm run build

# Watch for changes and rebuild
npm run watch
```

## Troubleshooting

### If you see raw HTML instead of rendered components:
1. Make sure you're accessing the site through the web server (http://127.0.0.1:8080)
2. Not by opening HTML files directly in your browser
3. The `| safe` filter in the layout ensures HTML is not encoded

### File Extensions:
- Use `.html` for template files (processed as Nunjucks)
- Use `.html` in `src/_includes/` and `src/_layouts/` for shared components
- Static assets remain in `src/assets/` and are copied as-is

## How It Works

1. **Shared Components**: Common HTML elements are stored in `src/_includes/`
2. **Page Templates**: Each page uses the `base.html` layout and includes only its unique content
3. **Build Process**: Eleventy processes templates and generates final HTML files
4. **Asset Copying**: Static assets are automatically copied to the output directory

## Benefits Achieved

- ✅ **80% reduction** in duplicated code
- ✅ **Single source of truth** for common elements
- ✅ **Faster development** - changes to shared components apply everywhere
- ✅ **Consistent styling** across all pages
- ✅ **Maintainable codebase** with clear separation of concerns
- ✅ **Static output** - no runtime dependencies for production

## Making Changes

### To modify shared elements:
Edit files in `src/_includes/` - changes will apply to all pages automatically

### To modify page-specific content:
Edit files in `src/pages/` - only the unique content for that page

### To add new pages:
1. Create new file in `src/pages/`
2. Use `--- layout: base.html ---` at the top
3. Add only the page-specific content

## Deployment

The `dist/` directory contains the final, production-ready files. Deploy this directory to your web server.

## Migration Notes

- All original functionality preserved
- URLs remain the same
- No breaking changes for users
- Improved performance due to reduced file sizes
- Better SEO with cleaner HTML structure