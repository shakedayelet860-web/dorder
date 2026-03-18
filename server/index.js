const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// 内存存储（实际使用可以换成数据库）
const rooms = new Map();

// 创建房间
app.post('/api/room/create', (req, res) => {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const room = {
    id: roomId,
    createdAt: new Date(),
    orders: [],
    users: []
  };
  rooms.set(roomId, room);
  
  console.log(`房间创建成功: ${roomId}`);
  res.json({ roomId, success: true });
});

// 加入房间
app.post('/api/room/join', (req, res) => {
  const { roomId } = req.body;
  const room = rooms.get(roomId);
  
  if (!room) {
    return res.status(404).json({ error: '房间不存在' });
  }
  
  res.json({ room, success: true });
});

// 获取房间数据
app.get('/api/room/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: '房间不存在' });
  }
  res.json(room);
});

// Socket.io 连接处理
io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);
  
  // 加入房间
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`用户 ${socket.id} 加入房间 ${roomId}`);
    
    // 通知房间内其他用户
    socket.to(roomId).emit('user-joined', {
      userId: socket.id,
      message: '对方已连接'
    });
  });
  
  // 发送订单
  socket.on('send-order', (data) => {
    const { roomId, order } = data;
    
    // 保存订单
    const room = rooms.get(roomId);
    if (room) {
      order.id = uuidv4();
      order.createdAt = new Date();
      room.orders.push(order);
    }
    
    // 广播给房间内所有人
    io.to(roomId).emit('new-order', order);
    console.log(`房间 ${roomId} 收到新订单:`, order.items.map(i => i.dish.name).join(', '));
  });
  
  // 更新订单状态
  socket.on('update-order-status', (data) => {
    const { roomId, orderId, status } = data;
    
    const room = rooms.get(roomId);
    if (room) {
      const order = room.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date();
      }
    }
    
    io.to(roomId).emit('order-status-updated', { orderId, status });
  });
  
  // 发送消息/备注
  socket.on('send-message', (data) => {
    const { roomId, message } = data;
    socket.to(roomId).emit('new-message', {
      ...message,
      from: socket.id,
      timestamp: new Date()
    });
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log('用户断开:', socket.id);
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', rooms: rooms.size });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     甜蜜点餐服务器已启动！              ║
╠════════════════════════════════════════╣
║  端口: ${PORT}                          ║
║  地址: http://localhost:${PORT}         ║
╚════════════════════════════════════════╝
  `);
});
