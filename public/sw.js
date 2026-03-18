const CACHE_NAME = 'couple-order-app-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 安装时缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 跳过非GET请求
  if (event.request.method !== 'GET') return;

  // 跳过跨域请求
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果有缓存，返回缓存
      if (cachedResponse) {
        // 后台更新缓存
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // 没有缓存，发起网络请求
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // 缓存新资源
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // 网络失败，尝试返回离线页面
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('网络连接失败，请检查网络后重试', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain;charset=UTF-8'
            })
          });
        });
    })
  );
});

// 后台同步（用于离线提交订单）
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  // 从IndexedDB获取待同步的订单并发送
  console.log('同步订单...');
}

// 推送通知支持
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: data.tag,
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: '查看'
          },
          {
            action: 'close',
            title: '关闭'
          }
        ]
      })
    );
  }
});

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/orders')
    );
  }
});
