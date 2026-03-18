import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context/AppContext'
import { registerServiceWorker, captureInstallPrompt } from './utils/pwa'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)

// 注册Service Worker
registerServiceWorker()

// 捕获安装提示事件
captureInstallPrompt()

// 监听在线/离线状态
window.addEventListener('online', () => {
  console.log('应用已连接到网络')
})

window.addEventListener('offline', () => {
  console.log('应用已离线')
  // 可以在这里显示离线提示
})
