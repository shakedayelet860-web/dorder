# 甜蜜点餐 - 移动端部署指南

## 📱 三种使用方式

### 方式一：PWA网页应用（最简单，推荐）

无需打包，直接通过浏览器安装到手机桌面。

#### 部署步骤：

1. **构建项目**
```bash
npm run build
```

2. **部署到静态服务器**
将 `dist` 目录部署到任何静态托管服务：
- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS
- 自己的服务器

3. **手机访问并安装**
- **Android Chrome**: 访问网站 → 点击菜单 → "添加到主屏幕"
- **iOS Safari**: 访问网站 → 点击分享按钮 → "添加到主屏幕"

#### PWA特性：
- ✅ 离线使用
- ✅ 添加到桌面
- ✅ 推送通知
- ✅ 后台同步
- ✅ 自动更新

---

### 方式二：Capacitor原生APP（需要开发环境）

打包成真正的原生APP，可以上架应用商店。

#### 前置要求：

**Android打包需要：**
- Android Studio
- JDK 11+
- Android SDK

**iOS打包需要：**
- macOS系统
- Xcode
- Apple开发者账号（上架需要）

#### 打包步骤：

1. **安装依赖**
```bash
npm install
```

2. **生成图标**
```bash
npm run generate-icons
```

3. **构建Web项目**
```bash
npm run build
```

4. **初始化Capacitor**
```bash
npx cap init
```

5. **添加平台**

Android:
```bash
npx cap add android
```

iOS:
```bash
npx cap add ios
```

6. **同步代码到原生项目**
```bash
npx cap sync
```

7. **打开并构建**

Android:
```bash
npx cap open android
# 在Android Studio中点击 Build → Generate Signed Bundle/APK
```

iOS:
```bash
npx cap open ios
# 在Xcode中选择设备，点击运行或归档打包
```

#### 一键打包命令：

```bash
# Android
npm run mobile:android

# iOS
npm run mobile:ios
```

---

### 方式三：本地局域网使用（无需部署）

适合在本地WiFi环境下使用，不需要上传到服务器。

#### 步骤：

1. **启动开发服务器**
```bash
npm run dev -- --host
```

2. **查看本机IP**
终端会显示类似：
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.100:3000/  ← 使用这个地址
```

3. **手机连接同一WiFi**，浏览器访问 `http://192.168.1.100:3000/`

4. **添加到主屏幕**（同方式一）

---

## 🔧 详细配置说明

### 1. PWA配置

PWA配置文件：
- `public/manifest.json` - 应用信息
- `public/sw.js` - Service Worker（缓存策略）
- `index.html` - 主题色、图标等

### 2. Capacitor配置

配置文件：`capacitor.config.ts`

关键配置项：
```typescript
{
  appId: 'com.couple.order.app',  // 应用包名
  appName: '甜蜜点餐',             // 应用名称
  webDir: 'dist',                  // Web构建输出目录
  // ...插件配置
}
```

### 3. 图标配置

图标位于 `public/icons/` 目录，需要以下尺寸：
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

生成图标：
```bash
npm run generate-icons
```

---

## 📲 各平台安装方法

### Android

#### Chrome浏览器：
1. 打开网站
2. 点击右上角菜单（⋮）
3. 选择"添加到主屏幕"
4. 点击"添加"

#### 原生APK安装：
1. 从Android Studio导出APK
2. 发送到手机
3. 允许"未知来源"安装
4. 安装APK

### iOS

#### Safari浏览器：
1. 打开网站
2. 点击底部分享按钮（□↑）
3. 选择"添加到主屏幕"
4. 点击"添加"

#### 原生APP安装：
1. 从Xcode导出ipa或使用TestFlight
2. 安装到设备

---

## 🚀 推荐部署方案

### 方案A：免费快速上线（推荐新手）

使用 Vercel 部署：

1. 注册 [Vercel](https://vercel.com)
2. 导入GitHub仓库
3. 自动部署完成
4. 获得 `https://your-app.vercel.app` 地址
5. 手机访问并添加到主屏幕

**优点**：免费、自动HTTPS、全球CDN、自动部署

### 方案B：国内快速访问

使用 阿里云OSS / 腾讯云COS：

1. 购买OSS/COS存储包
2. 开启静态网站托管
3. 上传 `dist` 目录内容
4. 绑定自定义域名
5. 手机访问并添加到主屏幕

**优点**：国内访问快、成本低

### 方案C：完全私有部署

使用自己的服务器：

1. 将 `dist` 目录上传到服务器
2. 配置Nginx/Apache
3. 开启HTTPS
4. 手机访问并添加到主屏幕

---

## 🔔 推送通知配置（可选）

### 本地通知
无需服务器，APP本地触发。

### 推送通知
需要配置推送服务：
- Firebase Cloud Messaging (Android)
- Apple Push Notification Service (iOS)

---

## 📝 注意事项

### 1. HTTPS要求
- PWA必须运行在HTTPS环境下
- 本地开发使用localhost除外

### 2. 存储限制
- 浏览器本地存储约5-10MB
- 图片建议使用外链

### 3. 兼容性
- iOS Safari 11.3+ 支持PWA
- Android Chrome 57+ 支持PWA

### 4. 更新机制
- PWA会自动检测更新
- 原生APP需要重新打包发布

---

## 🆘 常见问题

**Q: 为什么添加到主屏幕后打开是白屏？**
A: 检查是否使用HTTPS，Service Worker是否正确注册。

**Q: 如何清除缓存？**
A: 
- Android: 设置 → 应用 → 浏览器 → 清除缓存
- iOS: 设置 → Safari → 清除历史记录和网站数据

**Q: 如何更新APP？**
A:
- PWA: 关闭APP重新打开会自动更新
- 原生APP: 需要重新安装新版本

**Q: 数据会丢失吗？**
A: 数据存储在本地浏览器，只要不清理缓存就不会丢失。

---

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台错误信息
2. Service Worker注册状态
3. 网络连接状态
4. 存储空间是否充足
