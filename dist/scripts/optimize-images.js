const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = process.argv[2] || "./assets/original";
const outputDir = process.argv[3] || "./assets";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  let pipeline = sharp(inputPath);

  if (ext === ".jpg" || ext === ".jpeg") {
    // Convert to WebP
    outputPath = outputPath.replace(ext, ".webp");
    pipeline = pipeline.webp({ quality: 80 });
  } else if (ext === ".png") {
    // Convert to WebP
    outputPath = outputPath.replace(ext, ".webp");
    pipeline = pipeline.webp({ quality: 80 });
  } else if (ext === ".webp") {
    // Compress WebP
    pipeline = pipeline.webp({ quality: 80 });
  } else {
    // Copy other formats as is
    return fs.copyFileSync(inputPath, outputPath);
  }

  return pipeline.toFile(outputPath);
}

function processDirectory(dir, baseDir = dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, baseDir);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        const outputPath = path.join(outputDir, relativePath);
        const outputDirPath = path.dirname(outputPath);

        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }

        console.log(`Optimizing: ${relativePath}`);
        optimizeImage(fullPath, outputPath).catch((err) => {
          console.error(`Error optimizing ${relativePath}:`, err);
        });
      }
    }
  });
}

processDirectory(inputDir);
console.log("Image optimization complete!");

