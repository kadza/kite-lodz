module.exports = function(eleventyConfig) {
  // Copy assets without processing
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("src/scripts");

  // Copy root-level files that aren't processed by Eleventy
  eleventyConfig.addPassthroughCopy("src/_includes");
  eleventyConfig.addPassthroughCopy("src/_layouts");

  // Watch for changes (with fallback for fsevents issues)
  try {
    eleventyConfig.addWatchTarget("assets");
    eleventyConfig.addWatchTarget("src/_includes");
    eleventyConfig.addWatchTarget("src/_layouts");
  } catch (err) {
    console.log('File watching may be limited due to fsevents compatibility issues');
  }

  // Ensure HTML files are processed as templates
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);

  // Copy generated pages to root level for proper URL structure
  eleventyConfig.on('eleventy.after', async function() {
    const fs = require('fs').promises;
    const path = require('path');

    // Copy main index.html to root
    try {
      await fs.copyFile('dist/pages/index.html', 'dist/index.html');
    } catch (err) {
      console.log('Could not copy index.html to root');
    }

    // Copy spots directory to root
    const copyDir = async (src, dest) => {
      try {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
          } else {
            await fs.copyFile(srcPath, destPath);
          }
        }
      } catch (err) {
        console.log(`Could not copy ${src} to ${dest}`);
      }
    };

    await copyDir('dist/pages/spots', 'dist/spots');
  });

  // Configure HTML files to be processed as Nunjucks templates
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    // Use polling for file watching to avoid fsevents issues
    chokidarConfig: {
      usePolling: true,
      interval: 500,
    },
  };
};