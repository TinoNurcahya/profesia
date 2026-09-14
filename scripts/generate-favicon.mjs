import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve('public/favicon.svg');

async function generateFaviconFromSvg() {
  if (!fs.existsSync(svgPath)) {
    console.error('favicon.svg does not exist at:', svgPath);
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate PNGs at 16, 32, 48 for ICO
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers.push({ width: size, height: size, buffer: buf });
  }

  // 2. Build standard ICO file
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type = 1
  header.writeUInt16LE(count, 4); // count

  let currentOffset = headerSize + dirEntrySize * count;
  const dirEntries = [];
  const imageBuffers = [];

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);

    dirEntries.push(entry);
    imageBuffers.push(img.buffer);
    currentOffset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageBuffers]);

  const publicDir = path.resolve('public');
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico rendered from favicon.svg');

  // 3. Generate public/icon.png (32x32)
  const icon32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon32);
  console.log('Saved public/icon.png (32x32)');

  // 4. Generate public/apple-icon.png (180x180)
  const appleIcon = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon);
  console.log('Saved public/apple-icon.png (180x180)');
}

generateFaviconFromSvg().catch((err) => {
  console.error(err);
  process.exit(1);
});
