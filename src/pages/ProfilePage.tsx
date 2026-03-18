import styled from 'styled-components';
import { Heart, User, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
  font-size: 40px;
`;

const UserName = styled.h2`
  margin: 0 0 8px;
  color: #333;
  font-size: 22px;
`;

const UserRole = styled.div`
  color: #ff6b9d;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const StatText = styled.div`
  font-size: 13px;
  color: #888;
  margin-top: 4px;
`;

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px;
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #ff6b9d;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SwitchButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid ${props => props.active ? '#ff6b9d' : '#eee'};
  background: ${props => props.active ? '#fff0f5' : 'white'};
  color: ${props => props.active ? '#ff6b9d' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    border-color: #ff6b9d;
  }
`;

const LoveQuote = styled.div`
  background: linear-gradient(135deg, #fff0f5, #ffe0f0);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: #c44569;
  font-style: italic;
  line-height: 1.6;

  svg {
    color: #ff6b9d;
    margin-bottom: 8px;
  }
`;

const Version = styled.div`
  text-align: center;
  color: #bbb;
  font-size: 12px;
  margin-top: 20px;
`;

export function ProfilePage() {
  const { state, dispatch } = useApp();

  const userName = state.currentUser === 'boyfriend' ? '男朋友' : '女朋友';
  const partnerName = state.currentUser === 'boyfriend' ? '女朋友' : '男朋友';

  const myOrders = state.orders.filter(o => o.from === state.currentUser);
  const receivedOrders = state.orders.filter(o => o.to === state.currentUser);
  const myReviews = state.reviews.filter(r => r.reviewer === state.currentUser);

  return (
    <div>
      <PageTitle>个人中心</PageTitle>

      <ProfileCard>
        <Avatar>
          <User size={50} />
        </Avatar>
        <UserName>{userName}</UserName>
        <UserRole>
          <Heart size={14} fill="#ff6b9d" />
          甜蜜点餐专属用户
        </UserRole>
        <StatsRow>
          <StatItem>
            <StatNumber>{myOrders.length}</StatNumber>
            <StatText>我点的餐</StatText>
          </StatItem>
          <StatItem>
            <StatNumber>{receivedOrders.length}</StatNumber>
            <StatText>给我做的餐</StatText>
          </StatItem>
          <StatItem>
            <StatNumber>{myReviews.length}</StatNumber>
            <StatText>我的评价</StatText>
          </StatItem>
        </StatsRow>
      </ProfileCard>

      <Section>
        <SectionTitle>
          <Settings size={18} />
          切换身份
        </SectionTitle>
        <SwitchContainer>
          <SwitchButton
            active={state.currentUser === 'boyfriend'}
            onClick={() => dispatch({ type: 'SET_USER', payload: 'boyfriend' })}
          >
            <User />
            男朋友
          </SwitchButton>
          <SwitchButton
            active={state.currentUser === 'girlfriend'}
            onClick={() => dispatch({ type: 'SET_USER', payload: 'girlfriend' })}
          >
            <User />
            女朋友
          </SwitchButton>
        </SwitchContainer>
      </Section>

      <Section>
        <SectionTitle>
          <Heart size={18} />
          关于我们
        </SectionTitle>
        <LoveQuote>
          <Heart size={24} fill="#ff6b9d" />
          <div>
            "爱情最美好的样子，<br />
            就是一起好好吃饭。"<br /><br />
            —— {userName} ❤️ {partnerName}
          </div>
        </LoveQuote>
      </Section>

      <Version>
        甜蜜点餐 v1.0.0
        <br />
        Made with ❤️ for couples
      </Version>
    </div>
  );
}
