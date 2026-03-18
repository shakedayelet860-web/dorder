// 简单图标创建脚本 - 使用SVG作为源文件
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = path.join(__dirname, '../public/icons');
const splashDir = path.join(__dirname, '../public/splash');

// 确保目录存在
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// 创建SVG图标
function createSVG(size, isSplash = false) {
  const bgColor = '#ff6b9d';
  const width = size;
  const height = isSplash ? size * 2 : size;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#c44569;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <text x="50%" y="${isSplash ? '40%' : '50%'}" dominant-baseline="middle" text-anchor="middle" font-size="${size * 0.4}" fill="white">🍽️</text>
    ${isSplash ? `<text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="${size * 0.08}" fill="white" font-family="Arial">甜蜜点餐</text>` : ''}
  </svg>`;
}

// 保存SVG文件
function saveSVG(filename, content) {
  fs.writeFileSync(filename, content);
  console.log(`✓ 创建: ${path.basename(filename)}`);
}

console.log('创建应用图标...\n');

// 生成图标
sizes.forEach(size => {
  const svg = createSVG(size);
  saveSVG(path.join(iconDir, `icon-${size}x${size}.svg`), svg);
});

console.log('\n创建启动屏...\n');

// 生成启动屏
const splashSizes = [
  { w: 640, h: 1136, name: 'splash-640x1136' },
  { w: 750, h: 1334, name: 'splash-750x1334' },
  { w: 1242, h: 2208, name: 'splash-1242x2208' },
  { w: 1125, h: 2436, name: 'splash-1125x2436' },
  { w: 828, h: 1792, name: 'splash-828x1792' },
  { w: 1242, h: 2688, name: 'splash-1242x2688' }
];

splashSizes.forEach(({ w, h, name }) => {
  const svg = createSVG(w, true);
  saveSVG(path.join(splashDir, `${name}.svg`), svg);
});

console.log('\n✅ 所有文件创建完成！');
console.log('\n注意：这些SVG文件需要转换为PNG才能在移动设备上正常显示。');
console.log('你可以使用在线转换工具或图形软件进行转换。');
