import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apps = ['accommodation', 'ari', 'discount', 'booking', 'home'];

async function generateFavicon() {
  const sourcePath = join(__dirname, 'apps/accommodation/public/creami-logo.png');

  // Generate 32x32 ICO (standard favicon size)
  const icoBuffer = await sharp(sourcePath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFormat('png')
    .toBuffer();

  // Copy to all apps
  for (const app of apps) {
    const targetPath = join(__dirname, `apps/${app}/public/favicon.ico`);
    writeFileSync(targetPath, icoBuffer);
    console.log(`✓ Generated favicon.ico for ${app}`);
  }

  console.log('\n✓ All favicons generated successfully!');
}

generateFavicon().catch(console.error);
