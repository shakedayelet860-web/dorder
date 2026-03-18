import { useState } from 'react';
import styled from 'styled-components';
import { ChefHat, CheckCircle, Bell, Star, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categoryLabels } from '../data/menu';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const OrderTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const OrderTab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(255, 107, 157, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f5f5f5;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OrderId = styled.div`
  font-size: 14px;
  color: #999;
`;

const OrderMeta = styled.div`
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FromToBadge = styled.span<{ isFrom: boolean }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.isFrom ? '#fff0f5' : '#e3f2fd'};
  color: ${props => props.isFrom ? '#ff6b9d' : '#2196f3'};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#fff3e0';
      case 'cooking': return '#e3f2fd';
      case 'ready': return '#e8f5e9';
      case 'completed': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#ff9800';
      case 'cooking': return '#2196f3';
      case 'ready': return '#4caf50';
      case 'completed': return '#999';
      default: return '#666';
    }
  }};
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 12px;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ItemCategory = styled.span`
  font-size: 12px;
  color: #ff6b9d;
  background: #fff0f5;
  padding: 2px 8px;
  border-radius: 8px;
`;

const ItemNote = styled.div`
  font-size: 13px;
  color: #888;
  margin-top: 6px;
  font-style: italic;
`;

const ItemQuantity = styled.div`
  font-weight: 600;
  color: #ff6b9d;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f5f5f5;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
    }
  ` : `
    background: #f5f5f5;
    color: #666;
    
    &:hover {
      background: #eee;
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const ReviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const ReviewContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

const ReviewTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
`;

const StarRating = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
`;

const StarButton = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.filled ? '#ffc107' : '#ddd'};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 10px;
  resize: none;
  height: 100px;
  margin-bottom: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 10px;
`;

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');
  const [reviewingOrder, setReviewingOrder] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { state, dispatch } = useApp();

  const filteredOrders = state.orders.filter(order => {
    if (activeTab === 'incoming') {
      return order.to === state.currentUser;
    } else {
      return order.from === state.currentUser;
    }
  });

  const handleStatusUpdate = (orderId: string, status: 'pending' | 'cooking' | 'ready' | 'completed') => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });

    if (status === 'ready') {
      alert('取餐提醒已发送！');
    }
  };

  const handleSubmitReview = (orderId: string, dishId: string) => {
    const review = {
      id: `review_${Date.now()}`,
      orderId,
      dishId,
      rating,
      comment,
      reviewer: state.currentUser,
      createdAt: new Date()
    };
    dispatch({ type: 'ADD_REVIEW', payload: review });
    setReviewingOrder(null);
    setRating(5);
    setComment('');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待制作';
      case 'cooking': return '制作中';
      case 'ready': return '已完成';
      case 'completed': return '已评价';
      default: return status;
    }
  };

  return (
    <div>
      <PageTitle>订单管理</PageTitle>

      <OrderTabs>
        <OrderTab active={activeTab === 'incoming'} onClick={() => setActiveTab('incoming')}>
          给我的订单
        </OrderTab>
        <OrderTab active={activeTab === 'outgoing'} onClick={() => setActiveTab('outgoing')}>
          我点的订单
        </OrderTab>
      </OrderTabs>

      <OrderList>
        {filteredOrders.length === 0 ? (
          <EmptyState>
            <ChefHat size={64} />
            <div>暂无订单</div>
          </EmptyState>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderId>订单 #{order.id.slice(-6)}</OrderId>
                  <OrderMeta>
                    <FromToBadge isFrom={order.from === state.currentUser}>
                      {order.from === 'boyfriend' ? '男朋友' : '女朋友'} {order.from === state.currentUser ? '点给' : '做给'} {order.to === 'boyfriend' ? '男朋友' : '女朋友'}
                    </FromToBadge>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} />
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </OrderMeta>
                </OrderInfo>
                <StatusBadge status={order.status}>
                  {order.status === 'pending' && <Clock size={14} />}
                  {order.status === 'cooking' && <ChefHat size={14} />}
                  {order.status === 'ready' && <Bell size={14} />}
                  {order.status === 'completed' && <CheckCircle size={14} />}
                  {getStatusText(order.status)}
                </StatusBadge>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item, idx) => (
                  <OrderItem key={idx}>
                    <ItemImage src={item.dish.image} alt={item.dish.name} />
                    <ItemInfo>
                      <ItemName>{item.dish.name}</ItemName>
                      <ItemCategory>{categoryLabels[item.dish.category]}</ItemCategory>
                      {item.note && <ItemNote>备注: {item.note}</ItemNote>}
                    </ItemInfo>
                    <ItemQuantity>x{item.quantity}</ItemQuantity>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderActions>
                {activeTab === 'incoming' && order.status === 'pending' && (
                  <ActionButton variant="primary" onClick={() => handleStatusUpdate(order.id, 'cooking')}>
                    <ChefHat size={18} />
                    开始制作
                  </ActionButton>
                )}
                {activeTab === 'incoming' && order.status === 'cooking' && (
                  <ActionButton variant="primary" onClick={() => handleStatusUpdate(order.id, 'ready')}>
                    <Bell size={18} />
                    完成制作
                  </ActionButton>
                )}
                {activeTab === 'outgoing' && order.status === 'ready' && (
                  <ActionButton variant="primary" onClick={() => {
                    handleStatusUpdate(order.id, 'completed');
                    setReviewingOrder(order.id);
                  }}>
                    <CheckCircle size={18} />
                    确认收到
                  </ActionButton>
                )}
                {order.status === 'completed' && !state.reviews.find(r => r.orderId === order.id) && (
                  <ActionButton variant="primary" onClick={() => setReviewingOrder(order.id)}>
                    <Star size={18} />
                    评价
                  </ActionButton>
                )}
              </OrderActions>
            </OrderCard>
          ))
        )}
      </OrderList>

      {reviewingOrder && (
        <ReviewModal onClick={() => setReviewingOrder(null)}>
          <ReviewContent onClick={e => e.stopPropagation()}>
            <ReviewTitle>给这顿饭打个分吧</ReviewTitle>
            <StarRating>
              {[1, 2, 3, 4, 5].map(star => (
                <StarButton
                  key={star}
                  filled={star <= rating}
                  onClick={() => setRating(star)}
                >
                  <Star size={32} fill={star <= rating ? '#ffc107' : 'none'} />
                </StarButton>
              ))}
            </StarRating>
            <CommentInput
              placeholder="写下你的评价..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ReviewActions>
              <ActionButton onClick={() => setReviewingOrder(null)}>
                取消
              </ActionButton>
              <ActionButton
                variant="primary"
                onClick={() => {
                  const order = state.orders.find(o => o.id === reviewingOrder);
                  if (order) {
                    handleSubmitReview(order.id, order.items[0].dishId);
                  }
                }}
              >
                提交评价
              </ActionButton>
            </ReviewActions>
          </ReviewContent>
        </ReviewModal>
      )}
    </div>
  );
}
