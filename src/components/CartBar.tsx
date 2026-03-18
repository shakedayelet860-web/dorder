import { useState } from 'react';
import styled from 'styled-components';
import { ShoppingCart, X, Plus, Minus, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { menuData } from '../data/menu';

const CartContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${props => props.isOpen ? '0' : '80px'};
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.15);
  z-index: 90;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(calc(100% - 70px))'};
  max-height: 70vh;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
`;

const CartTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #333;

  svg {
    color: #ff6b9d;
  }
`;

const CartBadge = styled.span`
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
`;

const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
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

const ItemNote = styled.div`
  font-size: 12px;
  color: #ff6b9d;
  margin-bottom: 8px;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ff6b9d;
    color: #ff6b9d;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 24px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff6b9d;
  }
`;

const NoteInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const CartFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;

  span:last-child {
    font-weight: 700;
    color: #ff6b9d;
    font-size: 20px;
  }
`;

const RecipientSelect = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const RecipientButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 10px;
  border: 2px solid ${props => props.selected ? '#ff6b9d' : '#eee'};
  background: ${props => props.selected ? '#fff0f5' : 'white'};
  color: ${props => props.selected ? '#ff6b9d' : '#666'};
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${props => props.selected ? '600' : '400'};
  transition: all 0.2s;

  &:hover {
    border-color: #ff6b9d;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export function CartBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState<'boyfriend' | 'girlfriend'>('girlfriend');
  const { state, dispatch } = useApp();

  const cartItems = state.cart.map(item => ({
    ...item,
    dish: menuData.find(d => d.id === item.dishId) || item.dish
  }));

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddNote = (dishId: string, note: string) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { dishId, note } });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const order = {
      id: `order_${Date.now()}`,
      items: cartItems,
      from: state.currentUser,
      to: recipient,
      status: 'pending' as const,
      createdAt: new Date()
    };

    dispatch({ type: 'PLACE_ORDER', payload: order });
    setIsOpen(false);
    alert('订单已发送！');
  };

  if (cartItems.length === 0 && !isOpen) return null;

  return (
    <CartContainer isOpen={isOpen}>
      <CartHeader onClick={() => setIsOpen(!isOpen)}>
        <CartTitle>
          <ShoppingCart size={22} />
          购物车
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </CartTitle>
        {isOpen ? <X size={22} color="#999" /> : <span style={{ color: '#999' }}>点击查看</span>}
      </CartHeader>

      <CartContent>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <ShoppingCart size={48} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>购物车是空的</div>
          </EmptyCart>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.dishId}>
              <ItemImage src={item.dish.image} alt={item.dish.name} />
              <ItemInfo>
                <ItemName>{item.dish.name}</ItemName>
                {item.note && <ItemNote>备注: {item.note}</ItemNote>}
                <ItemControls>
                  <QuantityButton onClick={() => {
                    if (item.quantity > 1) {
                      dispatch({
                        type: 'ADD_TO_CART',
                        payload: { ...item, quantity: -1 }
                      });
                    }
                  }}>
                    <Minus size={14} />
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton onClick={() => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: { ...item, quantity: 1 }
                    });
                  }}>
                    <Plus size={14} />
                  </QuantityButton>
                </ItemControls>
                <NoteInput
                  placeholder="添加备注..."
                  value={item.note || ''}
                  onChange={(e) => handleAddNote(item.dishId, e.target.value)}
                />
              </ItemInfo>
              <RemoveButton onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.dishId })}>
                <X size={18} />
              </RemoveButton>
            </CartItem>
          ))
        )}
      </CartContent>

      {cartItems.length > 0 && (
        <CartFooter>
          <TotalRow>
            <span>共 {totalItems} 道菜</span>
            <span>{totalItems} 道美味</span>
          </TotalRow>
          <RecipientSelect>
            <RecipientButton
              selected={recipient === 'boyfriend'}
              onClick={() => setRecipient('boyfriend')}
            >
              给男朋友做
            </RecipientButton>
            <RecipientButton
              selected={recipient === 'girlfriend'}
              onClick={() => setRecipient('girlfriend')}
            >
              给女朋友做
            </RecipientButton>
          </RecipientSelect>
          <SubmitButton onClick={handlePlaceOrder}>
            <Send size={18} />
            发送订单
          </SubmitButton>
        </CartFooter>
      )}
    </CartContainer>
  );
}
