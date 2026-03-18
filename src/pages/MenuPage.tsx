import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Clock, ChefHat, Search, Sparkles, Wand2, AlertCircle, X, Loader2 } from 'lucide-react';
import { menuData, categoryLabels, difficultyLabels } from '../data/menu';
import { useApp } from '../context/AppContext';
import { getAIConfig, generateDish, generateDishSuggestions } from '../services/aiService';
import type { Dish } from '../types';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  svg {
    color: #999;
    margin-right: 10px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 15px;
    color: #333;

    &::placeholder {
      color: #bbb;
    }
  }
`;

const AISearchButton = styled.button<{ hasConfig: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${props => props.hasConfig ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : '#f5f5f5'};
  color: ${props => props.hasConfig ? 'white' : '#999'};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: ${props => props.hasConfig ? 'pointer' : 'not-allowed'};
  transition: all 0.3s;
  margin-left: 10px;
  white-space: nowrap;

  &:hover {
    transform: ${props => props.hasConfig ? 'scale(1.02)' : 'none'};
    box-shadow: ${props => props.hasConfig ? '0 4px 15px rgba(255, 107, 157, 0.4)' : 'none'};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(255, 107, 157, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
  }
`;

const DishGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const DishCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const DishImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const DishContent = styled.div`
  padding: 16px;
`;

const DishHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const DishName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const CategoryTag = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: #fff0f5;
  color: #ff6b9d;
  font-weight: 500;
`;

const AITag = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #1976d2;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DishDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.5;
`;

const DishMeta = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  font-size: 13px;
  color: #888;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'easy': return '#e8f5e9';
      case 'medium': return '#fff3e0';
      case 'hard': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#666';
    }
  }};
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const AIInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const GenerateButton = styled.button`
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

const SuggestionsList = styled.div`
  margin-top: 20px;
`;

const SuggestionsTitle = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
`;

const SuggestionChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  margin: 0 8px 8px 0;
  transition: all 0.2s;

  &:hover {
    background: #fff0f5;
    color: #ff6b9d;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 300;
  gap: 16px;
`;

const LoadingText = styled.div`
  color: #ff6b9d;
  font-size: 16px;
  font-weight: 500;
`;

const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffebee;
  color: #f44336;
  font-size: 14px;
`;

const categories = ['all', 'chinese', 'western', 'korean', 'japanese'] as const;

const categoryNames: Record<string, string> = {
  chinese: '中餐',
  western: '西餐',
  korean: '韩餐',
  japanese: '日餐',
  other: '其他'
};

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiDishes, setAiDishes] = useState<Dish[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiConfig, setAiConfig] = useState(getAIConfig());
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useApp();

  useEffect(() => {
    setAiConfig(getAIConfig());
  }, [showAIModal]);

  const baseDishes = [...menuData, ...aiDishes];

  const filteredDishes = baseDishes.filter(dish => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (dish: Dish) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        dishId: dish.id,
        dish,
        quantity: 1
      }
    });
  };

  const handleAIGenerate = async () => {
    if (!aiSearchQuery.trim()) return;
    if (!aiConfig) {
      setError('请先配置AI API');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const newDish = await generateDish(aiSearchQuery, activeCategory === 'all' ? 'chinese' : activeCategory);
      setAiDishes(prev => [newDish, ...prev]);
      setShowAIModal(false);
      setAiSearchQuery('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadSuggestions = async () => {
    if (!aiConfig) return;
    try {
      const cats = activeCategory === 'all' ? 'chinese' : activeCategory;
      const newSuggestions = await generateDishSuggestions(categoryNames[cats], 5);
      setSuggestions(newSuggestions);
    } catch (err) {
      console.error('加载建议失败:', err);
    }
  };

  const handleOpenAIModal = () => {
    setShowAIModal(true);
    setError(null);
    if (aiConfig) {
      loadSuggestions();
    }
  };

  return (
    <div>
      <PageTitle>
        今天想吃什么，<span>亲爱的</span>？
      </PageTitle>

      <SearchContainer>
        <SearchBar>
          <Search size={20} />
          <input
            type="text"
            placeholder="搜索菜品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AISearchButton 
            hasConfig={!!aiConfig}
            onClick={handleOpenAIModal}
          >
            <Sparkles size={18} />
            {aiConfig ? 'AI生成' : '配置AI'}
          </AISearchButton>
        </SearchBar>
      </SearchContainer>

      <CategoryTabs>
        {categories.map(cat => (
          <CategoryTab
            key={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? '全部' : categoryLabels[cat]}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <DishGrid>
        {filteredDishes.map(dish => (
          <DishCard key={dish.id}>
            <DishImage src={dish.image} alt={dish.name} />
            <DishContent>
              <DishHeader>
                <DishName>{dish.name}</DishName>
                {dish.id.startsWith('ai_') ? (
                  <AITag>
                    <Sparkles size={12} />
                    AI生成
                  </AITag>
                ) : (
                  <CategoryTag>{categoryLabels[dish.category]}</CategoryTag>
                )}
              </DishHeader>
              <DishDescription>{dish.description}</DishDescription>
              <DishMeta>
                <span>
                  <Clock size={14} />
                  {dish.cookTime}分钟
                </span>
                <DifficultyBadge difficulty={dish.difficulty}>
                  <ChefHat size={12} />
                  {difficultyLabels[dish.difficulty]}
                </DifficultyBadge>
              </DishMeta>
              <AddButton onClick={() => handleAddToCart(dish)}>
                <Plus size={18} />
                加入订单
              </AddButton>
            </DishContent>
          </DishCard>
        ))}
      </DishGrid>

      {showAIModal && (
        <Modal onClick={() => setShowAIModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <Wand2 size={24} color="#ff6b9d" />
                AI生成菜品
              </ModalTitle>
              <CloseButton onClick={() => setShowAIModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              {!aiConfig ? (
                <Alert>
                  <AlertCircle size={20} />
                  请先前往"我的"页面配置AI API
                </Alert>
              ) : (
                <>
                  {error && (
                    <Alert>
                      <AlertCircle size={20} />
                      {error}
                    </Alert>
                  )}
                  <AIInput
                    placeholder="输入任意菜品名称，AI将为你生成完整菜谱..."
                    value={aiSearchQuery}
                    onChange={(e) => setAiSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIGenerate()}
                  />
                  <GenerateButton 
                    onClick={handleAIGenerate}
                    disabled={isGenerating || !aiSearchQuery.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        生成菜谱
                      </>
                    )}
                  </GenerateButton>

                  {suggestions.length > 0 && (
                    <SuggestionsList>
                      <SuggestionsTitle>试试这些菜品：</SuggestionsTitle>
                      {suggestions.map((suggestion, idx) => (
                        <SuggestionChip
                          key={idx}
                          onClick={() => setAiSearchQuery(suggestion)}
                        >
                          <Sparkles size={14} />
                          {suggestion}
                        </SuggestionChip>
                      ))}
                    </SuggestionsList>
                  )}
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {isGenerating && (
        <LoadingOverlay>
          <Loader2 size={48} color="#ff6b9d" style={{ animation: 'spin 1s linear infinite' }} />
          <LoadingText>AI正在为你生成菜谱...</LoadingText>
        </LoadingOverlay>
      )}
    </div>
  );
}
