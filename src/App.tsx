import { useState } from 'react';
import styled from 'styled-components';
import { Heart, Utensils, BookOpen, History, User, Sparkles } from 'lucide-react';
import { MenuPage } from './pages/MenuPage';
import { OrdersPage } from './pages/OrdersPage';
import { TutorialPage } from './pages/TutorialPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIConfigPage } from './pages/AIConfigPage';
import { CartBar } from './components/CartBar';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd4e8 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 20px rgba(255, 105, 180, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeartIcon = styled(Heart)`
  color: #ff6b9d;
  fill: #ff6b9d;
`;

const MainContent = styled.main`
  padding: 20px;
  padding-bottom: 100px;
  max-width: 800px;
  margin: 0 auto;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  padding: 12px 0 20px;
  box-shadow: 0 -2px 20px rgba(255, 105, 180, 0.15);
  z-index: 100;
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${props => props.active ? '#ff6b9d' : '#999'};
  transition: all 0.3s ease;

  &:hover {
    color: #ff6b9d;
    transform: translateY(-2px);
  }
`;

const NavIcon = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
`;

type TabType = 'menu' | 'orders' | 'tutorials' | 'history' | 'profile' | 'ai-config';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('menu');

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuPage />;
      case 'orders':
        return <OrdersPage />;
      case 'tutorials':
        return <TutorialPage />;
      case 'history':
        return <HistoryPage />;
      case 'profile':
        return <ProfilePage />;
      case 'ai-config':
        return <AIConfigPage />;
      default:
        return <MenuPage />;
    }
  };

  return (
    <AppContainer>
      <Header>
        <Logo>
          <HeartIcon size={28} />
          甜蜜点餐
        </Logo>
      </Header>

      <MainContent>
        {renderContent()}
      </MainContent>

      <CartBar />

      <BottomNav>
        <NavItem active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}>
          <NavIcon><Utensils size={22} /></NavIcon>
          <NavLabel>菜单</NavLabel>
        </NavItem>
        <NavItem active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
          <NavIcon><Heart size={22} /></NavIcon>
          <NavLabel>订单</NavLabel>
        </NavItem>
        <NavItem active={activeTab === 'tutorials'} onClick={() => setActiveTab('tutorials')}>
          <NavIcon><BookOpen size={22} /></NavIcon>
          <NavLabel>教程</NavLabel>
        </NavItem>
        <NavItem active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          <NavIcon><History size={22} /></NavIcon>
          <NavLabel>记录</NavLabel>
        </NavItem>
        <NavItem active={activeTab === 'ai-config'} onClick={() => setActiveTab('ai-config')}>
          <NavIcon><Sparkles size={22} /></NavIcon>
          <NavLabel>AI配置</NavLabel>
        </NavItem>
        <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
          <NavIcon><User size={22} /></NavIcon>
          <NavLabel>我的</NavLabel>
        </NavItem>
      </BottomNav>
    </AppContainer>
  );
}

export default App;
