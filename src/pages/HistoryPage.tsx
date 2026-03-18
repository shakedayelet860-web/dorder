import styled from 'styled-components';
import { Calendar, Sun, Sunset, Moon, Star, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categoryLabels } from '../data/menu';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const WeekCalendar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const WeekTitle = styled.h3`
  margin: 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const WeekDay = styled.div<{ hasMeals: boolean; isToday: boolean }>`
  aspect-ratio: 1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.isToday ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : props.hasMeals ? '#fff0f5' : '#f8f8f8'};
  color: ${props => props.isToday ? 'white' : props.hasMeals ? '#ff6b9d' : '#999'};
  border: ${props => props.isToday ? 'none' : '2px solid transparent'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
  }
`;

const DayName = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const DayNumber = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const MealDots = styled.div`
  display: flex;
  gap: 3px;
`;

const MealDot = styled.div<{ type: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'breakfast': return '#ffc107';
      case 'lunch': return '#4caf50';
      case 'dinner': return '#2196f3';
      default: return '#ccc';
    }
  }};
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DateGroup = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f5f5f5;
`;

const DateText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const MealCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MealTypeIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.type) {
      case 'breakfast': return '#fff8e1';
      case 'lunch': return '#e8f5e9';
      case 'dinner': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'breakfast': return '#ff9800';
      case 'lunch': return '#4caf50';
      case 'dinner': return '#2196f3';
      default: return '#999';
    }
  }};
`;

const MealInfo = styled.div`
  flex: 1;
`;

const MealType = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
`;

const MealDishes = styled.div`
  font-weight: 600;
  color: #333;
`;

const ReviewBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #ffc107;
  margin-top: 4px;
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

const mealTypeLabels: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐'
};

const mealTypeIcons: Record<string, React.ReactNode> = {
  breakfast: <Sun size={20} />,
  lunch: <Sunset size={20} />,
  dinner: <Moon size={20} />
};

export function HistoryPage() {
  const { state } = useApp();

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const totalMeals = state.mealRecords.length;
  const totalReviews = state.reviews.length;
  const averageRating = state.reviews.length > 0
    ? (state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length).toFixed(1)
    : '0';

  const categoryCount: Record<string, number> = {};
  state.mealRecords.forEach(record => {
    record.order.items.forEach(item => {
      categoryCount[item.dish.category] = (categoryCount[item.dish.category] || 0) + 1;
    });
  });

  const favoriteCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];

  const groupedRecords = state.mealRecords.reduce((groups, record) => {
    const dateKey = format(new Date(record.date), 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(record);
    return groups;
  }, {} as Record<string, typeof state.mealRecords>);

  const sortedDates = Object.keys(groupedRecords).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const getMealsForDay = (date: Date) => {
    return state.mealRecords.filter(record =>
      isSameDay(new Date(record.date), date)
    );
  };

  return (
    <div>
      <PageTitle>用餐统计</PageTitle>

      <StatsCards>
        <StatCard>
          <StatValue>{totalMeals}</StatValue>
          <StatLabel>总用餐次数</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalReviews}</StatValue>
          <StatLabel>已评价</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{averageRating}</StatValue>
          <StatLabel>平均评分</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{favoriteCategory ? categoryLabels[favoriteCategory[0]] : '-'}</StatValue>
          <StatLabel>最爱菜系</StatLabel>
        </StatCard>
      </StatsCards>

      <WeekCalendar>
        <WeekHeader>
          <WeekTitle>
            <Calendar size={20} />
            本周用餐
          </WeekTitle>
        </WeekHeader>
        <WeekDays>
          {weekDays.map((day, idx) => {
            const dayMeals = getMealsForDay(day);
            const isToday = isSameDay(day, today);
            return (
              <WeekDay
                key={idx}
                hasMeals={dayMeals.length > 0}
                isToday={isToday}
              >
                <DayName>{format(day, 'EEE', { locale: zhCN })}</DayName>
                <DayNumber>{format(day, 'd')}</DayNumber>
                <MealDots>
                  {dayMeals.map((meal, i) => (
                    <MealDot key={i} type={meal.mealType} />
                  ))}
                </MealDots>
              </WeekDay>
            );
          })}
        </WeekDays>
      </WeekCalendar>

      <PageTitle>历史记录</PageTitle>

      <HistoryList>
        {sortedDates.length === 0 ? (
          <EmptyState>
            <TrendingUp size={64} />
            <div>暂无用餐记录</div>
          </EmptyState>
        ) : (
          sortedDates.map(dateKey => {
            const records = groupedRecords[dateKey];
            const date = new Date(dateKey);
            return (
              <DateGroup key={dateKey}>
                <DateHeader>
                  <Calendar size={18} color="#ff6b9d" />
                  <DateText>
                    {format(date, 'yyyy年MM月dd日', { locale: zhCN })} {format(date, 'EEEE', { locale: zhCN })}
                  </DateText>
                </DateHeader>
                {records.map(record => (
                  <MealCard key={record.id}>
                    <MealTypeIcon type={record.mealType}>
                      {mealTypeIcons[record.mealType]}
                    </MealTypeIcon>
                    <MealInfo>
                      <MealType>{mealTypeLabels[record.mealType]}</MealType>
                      <MealDishes>
                        {record.order.items.map(item => item.dish.name).join('、')}
                      </MealDishes>
                      {record.review && (
                        <ReviewBadge>
                          <Star size={14} fill="#ffc107" />
                          {record.review.rating}分 · {record.review.comment}
                        </ReviewBadge>
                      )}
                    </MealInfo>
                  </MealCard>
                ))}
              </DateGroup>
            );
          })
        )}
      </HistoryList>
    </div>
  );
}
