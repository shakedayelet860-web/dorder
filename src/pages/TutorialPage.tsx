import { useState } from 'react';
import styled from 'styled-components';
import { BookOpen, Clock, ChefHat, AlertCircle, X, Search } from 'lucide-react';
import { menuData, categoryLabels, difficultyLabels } from '../data/menu';
import type { Dish } from '../types';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
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
`;

const DishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DishCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const DishImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 100%;
    height: 180px;
  }
`;

const DishContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const DishDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.5;
`;

const DishMeta = styled.div`
  display: flex;
  gap: 16px;
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

const ViewButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  align-self: flex-start;

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
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

const TutorialImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #ff6b9d;
  }
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
`;

const IngredientItem = styled.li`
  padding: 10px 14px;
  background: #f8f8f8;
  border-radius: 8px;
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '•';
    color: #ff6b9d;
    font-weight: bold;
    font-size: 18px;
  }
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

const StepItem = styled.li`
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  gap: 16px;
  align-items: flex-start;

  &::before {
    counter-increment: step-counter;
    content: counter(step-counter);
    min-width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }
`;

const StepText = styled.div`
  flex: 1;
  line-height: 1.6;
  color: #555;
`;

const TipsBox = styled.div`
  background: linear-gradient(135deg, #fff9e6, #fff3cd);
  border-left: 4px solid #ffc107;
  padding: 16px;
  border-radius: 0 12px 12px 0;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  svg {
    color: #ff9800;
    flex-shrink: 0;
  }
`;

const TipsText = styled.div`
  color: #856404;
  line-height: 1.6;
`;

const categories = ['all', 'chinese', 'western', 'korean', 'japanese'] as const;

export function TutorialPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const filteredDishes = menuData.filter(dish => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageTitle>菜品教程</PageTitle>

      <SearchBar>
        <Search size={20} />
        <input
          type="text"
          placeholder="搜索教程..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

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

      <DishList>
        {filteredDishes.map(dish => (
          <DishCard key={dish.id} onClick={() => setSelectedDish(dish)}>
            <DishImage src={dish.image} alt={dish.name} />
            <DishContent>
              <div>
                <DishHeader>
                  <DishName>{dish.name}</DishName>
                  <CategoryTag>{categoryLabels[dish.category]}</CategoryTag>
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
              </div>
              <ViewButton onClick={(e) => {
                e.stopPropagation();
                setSelectedDish(dish);
              }}>
                <BookOpen size={18} />
                查看教程
              </ViewButton>
            </DishContent>
          </DishCard>
        ))}
      </DishList>

      {selectedDish && (
        <Modal onClick={() => setSelectedDish(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedDish.name}</ModalTitle>
              <CloseButton onClick={() => setSelectedDish(null)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <TutorialImage src={selectedDish.image} alt={selectedDish.name} />

              <Section>
                <SectionTitle>
                  <ChefHat size={18} />
                  所需食材
                </SectionTitle>
                <IngredientsList>
                  {selectedDish.ingredients.map((ingredient, idx) => (
                    <IngredientItem key={idx}>{ingredient}</IngredientItem>
                  ))}
                </IngredientsList>
              </Section>

              <Section>
                <SectionTitle>
                  <BookOpen size={18} />
                  制作步骤
                </SectionTitle>
                <StepsList>
                  {selectedDish.steps.map((step, idx) => (
                    <StepItem key={idx}>
                      <StepText>{step}</StepText>
                    </StepItem>
                  ))}
                </StepsList>
              </Section>

              {selectedDish.tips && (
                <Section>
                  <SectionTitle>
                    <AlertCircle size={18} />
                    小贴士
                  </SectionTitle>
                  <TipsBox>
                    <AlertCircle size={20} />
                    <TipsText>{selectedDish.tips}</TipsText>
                  </TipsBox>
                </Section>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
