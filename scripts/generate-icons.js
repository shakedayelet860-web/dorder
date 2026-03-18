// 图标生成脚本
// 需要先安装 sharp: npm install sharp --save-dev

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = path.join(__dirname, '../public/icons');

// 确保目录存在
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// 简单的SVG图标模板
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c44569;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#grad)"/>
  <path d="M256 120c-35 0-64 29-64 64 0 35 29 64 64 64s64-29 64-64c0-35-29-64-64-64zm0 112c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="white"/>
  <path d="M256 216c-44.2 0-80 35.8-80 80 0 44.2 35.8 80 80 80s80-35.8 80-80c0-44.2-35.8-80-80-80zm0 144c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" fill="white" opacity="0.8"/>
  <circle cx="256" cy="296" r="32" fill="white"/>
</svg>
`;

async function generateIcons() {
  console.log('生成应用图标...');
  
  for (const size of sizes) {
    const outputPath = path.join(iconDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(Buffer.from(svgIcon))
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ 生成图标: ${size}x${size}`);
    } catch (error) {
      console.error(`✗ 生成失败 ${size}x${size}:`, error);
    }
  }
  
  console.log('图标生成完成！');
}

generateIcons().catch(console.error);
