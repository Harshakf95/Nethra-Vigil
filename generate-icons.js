const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Icon sizes needed
const sizes = [192, 512];

// Check if ImageMagick is installed
try {
  execSync('magick -version');
} catch (error) {
  console.error('Error: ImageMagick is required to generate icons. Please install it first:');
  console.error('Windows: https://imagemagick.org/script/download.php#windows');
  console.error('macOS: brew install imagemagick');
  console.error('Linux: sudo apt-get install imagemagick');
  process.exit(1);
}

// Generate icons
sizes.forEach(size => {
  const outputFile = path.join(publicDir, `android-chrome-${size}x${size}.png`);
  try {
    execSync(`magick convert -background none -resize ${size}x${size} icon.svg ${outputFile}`);
    console.log(`Generated: ${outputFile}`);
  } catch (error) {
    console.error(`Error generating ${size}x${size} icon:`, error.message);
  }
});

// Generate favicon.ico
const faviconOutput = path.join(publicDir, 'favicon.ico');
try {
  execSync(`magick convert -background none -resize 32x32 icon.svg ${faviconOutput}`);
  console.log(`Generated: ${faviconOutput}`);
} catch (error) {
  console.error('Error generating favicon:', error.message);
}

console.log('\nIcon generation complete!');
console.log('Make sure to update your index.html with the correct paths to the generated icons.');
