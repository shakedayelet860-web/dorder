# 甜蜜点餐 - 情侣专属APP

专为情侣设计的点餐APP，让爱情从一起好好吃饭开始。

## 📁 项目结构

```
couple-order-app/
├── .gitignore              # Git忽略文件配置
├── README.md               # 项目说明
├── SIMPLE_DEPLOY.md        # 快速部署教程
├── MOBILE_DEPLOY.md        # 移动端部署详细指南
├── package.json            # 前端依赖配置
├── package-lock.json       # 依赖锁定文件
├── tsconfig.json           # TypeScript配置
├── tsconfig.node.json      # Node环境TS配置
├── vite.config.ts          # Vite构建配置
├── capacitor.config.ts     # Capacitor原生APP配置
├── index.html              # 入口HTML文件
│
├── public/                 # 静态资源
│   ├── icons/             # 应用图标
│   │   ├── icon-72x72.svg
│   │   ├── icon-96x96.svg
│   │   ├── icon-128x128.svg
│   │   ├── icon-144x144.svg
│   │   ├── icon-152x152.svg
│   │   ├── icon-192x192.svg
│   │   ├── icon-384x384.svg
│   │   └── icon-512x512.svg
│   ├── splash/            # 启动屏
│   │   ├── splash-640x1136.svg
│   │   ├── splash-750x1334.svg
│   │   ├── splash-828x1792.svg
│   │   ├── splash-1125x2436.svg
│   │   ├── splash-1242x2208.svg
│   │   └── splash-1242x2688.svg
│   ├── manifest.json      # PWA配置
│   └── sw.js              # Service Worker
│
├── scripts/               # 工具脚本
│   ├── create-icons-simple.js
│   └── generate-icons.js
│
├── server/                # 后端服务
│   ├── package.json       # 后端依赖
│   └── index.js           # 服务端代码
│
└── src/                   # 前端源代码
    ├── App.tsx            # 主应用组件
    ├── main.tsx           # 入口文件
    │
    ├── components/        # 组件
    │   └── CartBar.tsx    # 购物车组件
    │
    ├── context/           # 状态管理
    │   └── AppContext.tsx # 全局状态
    │
    ├── data/              # 数据
    │   └── menu.ts        # 菜单数据
    │
    ├── pages/             # 页面
    │   ├── MenuPage.tsx       # 菜单页
    │   ├── OrdersPage.tsx     # 订单页
    │   ├── TutorialPage.tsx   # 教程页
    │   ├── HistoryPage.tsx    # 历史记录
    │   ├── ProfilePage.tsx    # 个人中心
    │   └── AIConfigPage.tsx   # AI配置
    │
    ├── services/          # 服务
    │   └── aiService.ts   # AI菜品生成
    │
    ├── types/             # 类型定义
    │   └── index.ts       # TypeScript类型
    │
    └── utils/             # 工具函数
        └── pwa.ts         # PWA工具
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

### 2. 本地开发

```bash
# 启动后端（新终端）
cd server
npm start

# 启动前端（新终端）
npm run dev
```

### 3. 部署上线

查看 `SIMPLE_DEPLOY.md` 获取详细部署教程。

## 📱 功能特性

- ✅ 菜单浏览（中餐、西餐、韩餐、日餐）
- ✅ 点菜系统（加入购物车、备注、发送订单）
- ✅ 实时同步（两人实时看到订单状态）
- ✅ 菜品教程（详细图文教程）
- ✅ AI生成（输入菜名自动生成菜谱）
- ✅ 订单管理（待制作、制作中、已完成）
- ✅ 评价系统（用餐后评价反馈）
- ✅ 历史记录（查看过往用餐记录）
- ✅ PWA支持（离线使用、添加到桌面）

## 🛠 技术栈

- **前端**: React + TypeScript + Vite + styled-components
- **后端**: Node.js + Express + Socket.io
- **PWA**: Service Worker + Web App Manifest
- **移动端**: Capacitor (可选)

## 📄 需要上传的文件清单

部署到 Vercel/Render 时，需要上传以下文件：

### 必须上传的文件：

**根目录文件：**
- .gitignore
- package.json
- package-lock.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts
- capacitor.config.ts
- index.html
- README.md
- SIMPLE_DEPLOY.md
- MOBILE_DEPLOY.md

**public/ 目录：**
- public/icons/ (所有图标文件)
- public/splash/ (所有启动屏文件)
- public/manifest.json
- public/sw.js

**scripts/ 目录：**
- scripts/create-icons-simple.js
- scripts/generate-icons.js

**server/ 目录：**
- server/package.json
- server/index.js

**src/ 目录：**
- src/App.tsx
- src/main.tsx
- src/components/CartBar.tsx
- src/context/AppContext.tsx
- src/data/menu.ts
- src/pages/ (所有页面文件)
- src/services/aiService.ts
- src/types/index.ts
- src/utils/pwa.ts

### 不需要上传的文件：
- node_modules/ (依赖目录)
- dist/ (构建输出目录)
- .env (环境变量文件)
- android/ (Capacitor生成的Android项目)
- ios/ (Capacitor生成的iOS项目)

## 💡 使用流程

1. **创建房间**：你打开APP，创建房间获得房间号
2. **邀请加入**：把房间号发给女朋友
3. **开始点菜**：女朋友加入后，可以互相点菜
4. **实时同步**：订单状态实时同步给双方
5. **完成用餐**：制作完成、评价反馈

## 📞 支持

如有问题，请查看：
- `SIMPLE_DEPLOY.md` - 快速部署教程
- `MOBILE_DEPLOY.md` - 详细部署指南

## ❤️ 祝你们用餐愉快！

---

Made with ❤️ for couples
