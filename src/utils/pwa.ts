// PWA工具函数

// 注册Service Worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('Service Worker 注册成功:', registration);
      
      // 监听更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 有新版本可用
              showUpdateNotification();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker 注册失败:', error);
    }
  }
  return null;
}

// 显示更新通知
function showUpdateNotification() {
  if (confirm('发现新版本，是否立即更新？')) {
    window.location.reload();
  }
}

// 检查是否已安装
export function isInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
}

// 检查是否可以安装
export function canInstall(): boolean {
  return 'BeforeInstallPromptEvent' in window;
}

// 获取安装提示事件
let deferredPrompt: any = null;

export function captureInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止默认提示
    e.preventDefault();
    // 保存事件以便后续触发
    deferredPrompt = e;
    console.log('捕获到安装提示事件');
  });
}

// 触发安装
export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('没有可用的安装提示');
    return false;
  }
  
  // 显示安装提示
  deferredPrompt.prompt();
  
  // 等待用户响应
  const { outcome } = await deferredPrompt.userChoice;
  
  // 清除保存的事件
  deferredPrompt = null;
  
  return outcome === 'accepted';
}

// 请求通知权限
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('浏览器不支持通知');
    return false;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// 发送本地通知
export function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options
      });
    });
  }
}

// 后台同步
export async function sync(tag: string): Promise<boolean> {
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register(tag);
      return true;
    } catch (error) {
      console.error('后台同步注册失败:', error);
    }
  }
  return false;
}

// 检查网络状态
export function isOnline(): boolean {
  return navigator.onLine;
}

// 监听网络状态变化
export function listenNetworkStatus(
  onOnline: () => void,
  onOffline: () => void
) {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

// 添加到主屏幕提示
export function showAddToHomeScreen() {
  // 检测是否是iOS设备
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  // 检测是否是Android
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS && !isInstalled()) {
    alert('请将本页面添加到主屏幕：\n1. 点击 Safari 底部的分享按钮\n2. 选择"添加到主屏幕"\n3. 点击"添加"');
  } else if (isAndroid && !isInstalled() && deferredPrompt) {
    promptInstall();
  }
}
