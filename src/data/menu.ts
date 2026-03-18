import type { Dish } from '../types';

export const menuData: Dish[] = [
  // 中餐
  {
    id: 'c1',
    name: '宫保鸡丁',
    category: 'chinese',
    description: '经典川菜，鸡肉鲜嫩，花生酥脆',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
    difficulty: 'medium',
    cookTime: 30,
    ingredients: ['鸡胸肉 300g', '花生米 50g', '干辣椒 10个', '花椒 1勺', '葱姜蒜适量', '生抽、老抽、醋、糖、盐适量'],
    steps: [
      '鸡胸肉切丁，用料酒、生抽、淀粉腌制15分钟',
      '调制宫保汁：生抽、老抽、醋、糖、淀粉、水调匀',
      '热锅凉油，炸香花生米，盛出备用',
      '锅中留底油，爆香干辣椒和花椒',
      '下鸡丁炒至变色',
      '加入葱姜蒜炒香',
      '倒入宫保汁，大火收汁',
      '最后加入花生米，翻炒均匀即可'
    ],
    tips: '火候要大，动作要快，保持鸡肉嫩滑'
  },
  {
    id: 'c2',
    name: '麻婆豆腐',
    category: 'chinese',
    description: '麻辣鲜香，豆腐嫩滑入味',
    image: 'https://images.unsplash.com/photo-1541544537156-21c5299228d8?w=400',
    difficulty: 'easy',
    cookTime: 20,
    ingredients: ['嫩豆腐 400g', '猪肉末 100g', '豆瓣酱 2勺', '花椒粉 1勺', '蒜末、姜末适量', '生抽、盐、淀粉适量'],
    steps: [
      '豆腐切块，用盐水焯烫去豆腥味',
      '热锅凉油，炒散肉末至变色',
      '加入豆瓣酱炒出红油',
      '加入蒜末、姜末炒香',
      '加入适量清水烧开',
      '轻轻放入豆腐，中小火烧5分钟',
      '勾芡收汁，撒上花椒粉和葱花'
    ],
    tips: '豆腐要轻拿轻放，避免碎裂'
  },
  {
    id: 'c3',
    name: '糖醋排骨',
    category: 'chinese',
    description: '酸甜可口，色泽红亮',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
    difficulty: 'medium',
    cookTime: 45,
    ingredients: ['猪小排 500g', '冰糖 30g', '醋 3勺', '生抽 2勺', '料酒 2勺', '姜片、葱段适量'],
    steps: [
      '排骨洗净，冷水下锅焯水去血沫',
      '捞出排骨，用温水冲洗干净',
      '锅中放少许油，小火炒化冰糖',
      '糖色变红时放入排骨翻炒上色',
      '加入料酒、生抽、醋翻炒均匀',
      '加入开水没过排骨，大火烧开',
      '转小火炖煮30分钟至排骨软烂',
      '大火收汁，让排骨裹满酱汁'
    ],
    tips: '炒糖色时火要小，避免糖发苦'
  },
  {
    id: 'c4',
    name: '西红柿炒鸡蛋',
    category: 'chinese',
    description: '家常经典，营养丰富',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400',
    difficulty: 'easy',
    cookTime: 15,
    ingredients: ['鸡蛋 3个', '西红柿 2个', '葱花适量', '盐 1勺', '糖 1勺', '食用油适量'],
    steps: [
      '鸡蛋打散，加少许盐搅匀',
      '西红柿切块备用',
      '热锅凉油，倒入蛋液炒熟盛出',
      '锅中再加少许油，放入西红柿翻炒',
      '西红柿出汁后加入炒好的鸡蛋',
      '加盐、糖调味，翻炒均匀',
      '撒上葱花即可出锅'
    ],
    tips: '西红柿要去皮口感更好，可以用开水烫一下去皮'
  },
  {
    id: 'c5',
    name: '红烧肉',
    category: 'chinese',
    description: '肥而不腻，入口即化',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400',
    difficulty: 'hard',
    cookTime: 90,
    ingredients: ['五花肉 500g', '冰糖 40g', '生抽 3勺', '老抽 1勺', '料酒 3勺', '八角 2个', '桂皮 1块', '姜片、葱段适量'],
    steps: [
      '五花肉切块，冷水下锅焯水',
      '捞出肉块，用温水冲洗干净',
      '锅中不放油，将肉块皮朝下煎至金黄',
      '另起锅，小火炒化冰糖至焦糖色',
      '放入肉块翻炒上色',
      '加入料酒、生抽、老抽翻炒均匀',
      '加入开水没过肉块，放入香料',
      '大火烧开，转小火炖煮1小时',
      '大火收汁至浓稠即可'
    ],
    tips: '选五花肉要层次分明，炖煮时间要够长'
  },
  {
    id: 'c6',
    name: '清蒸鲈鱼',
    category: 'chinese',
    description: '鲜嫩清淡，原汁原味',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400',
    difficulty: 'medium',
    cookTime: 20,
    ingredients: ['鲈鱼 1条', '葱丝、姜丝适量', '蒸鱼豉油 3勺', '料酒 2勺', '食用油适量'],
    steps: [
      '鲈鱼处理干净，两面划几刀',
      '鱼身抹料酒，塞入姜片腌制10分钟',
      '盘中放葱段垫底，放上鱼',
      '水开后放入蒸锅，大火蒸8-10分钟',
      '取出鱼，倒掉盘中汤汁',
      '铺上葱丝、姜丝',
      '淋上蒸鱼豉油',
      '烧热油，淋在葱姜丝上激香'
    ],
    tips: '蒸鱼时间根据鱼的大小调整，不要蒸太久'
  },

  // 西餐
  {
    id: 'w1',
    name: '奶油蘑菇意面',
    category: 'western',
    description: '奶香浓郁，蘑菇鲜美',
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=400',
    difficulty: 'easy',
    cookTime: 25,
    ingredients: ['意大利面 200g', '口蘑 200g', '淡奶油 200ml', '洋葱 半个', '大蒜 2瓣', '帕玛森芝士粉 2勺', '黄油 20g'],
    steps: [
      '烧一锅水，加盐，煮意面至八分熟',
      '口蘑切片，洋葱切丁，大蒜切末',
      '热锅融化黄油，炒香洋葱和大蒜',
      '加入蘑菇片炒至变软出水',
      '倒入淡奶油，小火煮开',
      '加入煮好的意面，翻拌均匀',
      '撒上芝士粉和黑胡椒即可'
    ],
    tips: '煮意面的水要像海水一样咸'
  },
  {
    id: 'w2',
    name: '牛排',
    category: 'western',
    description: '外焦里嫩，肉汁丰富',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    difficulty: 'medium',
    cookTime: 15,
    ingredients: ['西冷牛排 200g', '黄油 30g', '大蒜 2瓣', '迷迭香 1枝', '海盐、黑胡椒适量'],
    steps: [
      '牛排提前回温，用厨房纸吸干水分',
      '两面撒上海盐和黑胡椒腌制',
      '锅烧至冒烟，不放油直接下牛排',
      '大火煎2-3分钟至表面焦黄',
      '翻面再煎2-3分钟',
      '转小火，加入黄油、大蒜、迷迭香',
      '用勺子将融化的黄油淋在牛排上',
      '取出牛排，静置5分钟后切开'
    ],
    tips: '煎好后一定要静置，让肉汁重新分布'
  },
  {
    id: 'w3',
    name: '凯撒沙拉',
    category: 'western',
    description: '清爽开胃，经典美味',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',
    difficulty: 'easy',
    cookTime: 15,
    ingredients: ['罗马生菜 1颗', '面包丁 50g', '帕玛森芝士片 适量', '凯撒酱 3勺', '培根 2片'],
    steps: [
      '生菜洗净，沥干水分，手撕成块',
      '培根煎脆，撕成小块',
      '面包丁用烤箱或平底锅烤至金黄',
      '将生菜放入大碗中',
      '加入凯撒酱拌匀',
      '撒上培根碎和面包丁',
      '最后放上芝士片'
    ],
    tips: '生菜一定要沥干水分，否则沙拉会水水的'
  },
  {
    id: 'w4',
    name: '番茄肉酱意面',
    category: 'western',
    description: '酸甜开胃，经典意式',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
    difficulty: 'medium',
    cookTime: 40,
    ingredients: ['意大利面 200g', '牛肉末 200g', '番茄 2个', '洋葱 半个', '番茄酱 3勺', '红酒 50ml', '橄榄油适量'],
    steps: [
      '番茄去皮切丁，洋葱切丁',
      '热锅倒橄榄油，炒香洋葱',
      '加入牛肉末炒散至变色',
      '加入番茄丁炒出汁水',
      '加入番茄酱和红酒',
      '小火炖煮20分钟至浓稠',
      '另起锅煮意面至八分熟',
      '将意面加入肉酱中翻拌均匀'
    ],
    tips: '红酒可以增加风味，没有可以用水代替'
  },

  // 韩餐
  {
    id: 'k1',
    name: '石锅拌饭',
    category: 'korean',
    description: '色彩缤纷，营养均衡',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b96070d3?w=400',
    difficulty: 'medium',
    cookTime: 30,
    ingredients: ['米饭 1碗', '牛肉 100g', '菠菜、豆芽、胡萝卜、香菇适量', '鸡蛋 1个', '韩式辣酱 2勺', '芝麻油 1勺'],
    steps: [
      '各种蔬菜分别焯水或炒熟，调味备用',
      '牛肉切丝，用酱油、糖、芝麻油腌制后炒熟',
      '石锅刷油，铺上米饭',
      '将各种配菜整齐码放在米饭上',
      '中间放一个煎蛋（可以是溏心蛋）',
      '石锅加热至底部有锅巴',
      '加入韩式辣酱和芝麻油拌匀食用'
    ],
    tips: '配菜可以根据喜好调整，颜色搭配要丰富'
  },
  {
    id: 'k2',
    name: '韩式炸鸡',
    category: 'korean',
    description: '外酥里嫩，甜辣可口',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
    difficulty: 'medium',
    cookTime: 40,
    ingredients: ['鸡翅中 500g', '牛奶 200ml', '炸鸡粉 100g', '韩式辣酱 2勺', '蜂蜜 2勺', '番茄酱 2勺'],
    steps: [
      '鸡翅用牛奶浸泡30分钟去腥',
      '倒掉牛奶，鸡翅裹上炸鸡粉',
      '油温170度，炸至金黄酥脆捞出',
      '锅中放少许油，加入韩式辣酱、番茄酱、蜂蜜',
      '小火煮至酱汁浓稠',
      '倒入炸好的鸡翅翻拌均匀',
      '撒上白芝麻即可'
    ],
    tips: '牛奶浸泡可以让鸡肉更嫩滑'
  },
  {
    id: 'k3',
    name: '泡菜汤',
    category: 'korean',
    description: '酸辣开胃，暖胃暖心',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=400',
    difficulty: 'easy',
    cookTime: 25,
    ingredients: ['韩式泡菜 200g', '五花肉 100g', '豆腐 200g', '洋葱 半个', '韩式辣酱 1勺', '蒜末 1勺'],
    steps: [
      '五花肉切片，洋葱切丝，豆腐切块',
      '锅中不放油，直接炒五花肉至出油',
      '加入洋葱和蒜末炒香',
      '加入泡菜翻炒均匀',
      '加入开水没过食材',
      '加入韩式辣酱调味',
      '放入豆腐，煮10分钟即可'
    ],
    tips: '泡菜要选发酵时间长的，味道更浓郁'
  },
  {
    id: 'k4',
    name: '韩式烤肉',
    category: 'korean',
    description: '香气四溢，配生菜更美味',
    image: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400',
    difficulty: 'easy',
    cookTime: 20,
    ingredients: ['五花肉片 300g', '生菜 1颗', '大蒜 5瓣', '韩式烤肉酱 3勺', '芝麻油 1勺', '白芝麻适量'],
    steps: [
      '五花肉片用烤肉酱、芝麻油腌制15分钟',
      '生菜洗净，沥干水分',
      '大蒜切片备用',
      '平底锅或烤肉锅加热',
      '放入五花肉片煎至两面金黄',
      '撒上白芝麻',
      '用生菜包着肉片和蒜片一起吃'
    ],
    tips: '可以配上泡菜和米饭一起包着吃'
  },

  // 日餐
  {
    id: 'j1',
    name: '寿司拼盘',
    category: 'japanese',
    description: '精致美味，新鲜健康',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    difficulty: 'hard',
    cookTime: 45,
    ingredients: ['寿司米 300g', '寿司醋 3勺', '三文鱼、金枪鱼刺身适量', '海苔 3张', '黄瓜、牛油果适量', '芥末、酱油、腌姜片适量'],
    steps: [
      '寿司米煮熟，趁热拌入寿司醋，晾凉',
      '三文鱼、金枪鱼切薄片',
      '黄瓜切条，牛油果切片',
      '手沾水，取适量米饭捏成椭圆形',
      '铺上鱼片，轻压成型',
      '也可以做卷寿司：海苔上铺饭，放配料，卷起切段',
      '摆盘，配上芥末、酱油和腌姜片'
    ],
    tips: '米饭要稍微硬一点，手要沾水防粘'
  },
  {
    id: 'j2',
    name: '味噌汤',
    category: 'japanese',
    description: '清淡鲜美，营养丰富',
    image: 'https://images.unsplash.com/photo-1547592166-23acbe346499?w=400',
    difficulty: 'easy',
    cookTime: 15,
    ingredients: ['白味噌 2勺', '嫩豆腐 150g', '海带芽 1小把', '葱花适量', '高汤 500ml'],
    steps: [
      '豆腐切小块，海带芽泡发',
      '高汤烧开',
      '放入豆腐和海带芽煮2分钟',
      '关火，将味噌放在漏勺中',
      '将漏勺浸入汤中，用筷子搅拌化开味噌',
      '撒上葱花即可',
      '注意：味噌不要煮沸，会破坏风味'
    ],
    tips: '味噌要用漏勺化开，不要直接倒入锅中'
  },
  {
    id: 'j3',
    name: '天妇罗',
    category: 'japanese',
    description: '酥脆轻盈，不油腻',
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400',
    difficulty: 'hard',
    cookTime: 30,
    ingredients: ['大虾 6只', '南瓜、茄子、红薯适量', '天妇罗粉 100g', '冰水 150ml', '食用油适量'],
    steps: [
      '虾去壳留尾，去虾线，腹部划几刀防止卷曲',
      '蔬菜切成适合的大小',
      '天妇罗粉加冰水调成面糊（不要过度搅拌）',
      '油温170度',
      '食材裹上面糊，轻轻放入油锅',
      '炸至金黄酥脆，约2-3分钟',
      '捞出沥油，趁热食用'
    ],
    tips: '面糊要现调现用，油温要控制好'
  },
  {
    id: 'j4',
    name: '牛肉盖饭',
    category: 'japanese',
    description: '肉嫩汁多，下饭神器',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
    difficulty: 'easy',
    cookTime: 20,
    ingredients: ['肥牛片 200g', '洋葱 1个', '鸡蛋 1个', '生抽 2勺', '味淋 2勺', '糖 1勺', '高汤 100ml'],
    steps: [
      '洋葱切丝',
      '锅中放入高汤、生抽、味淋、糖煮开',
      '加入洋葱丝煮软',
      '铺上肥牛片，煮至变色',
      '撇去浮沫，继续煮5分钟',
      '碗中盛好热米饭',
      '将牛肉和汤汁铺在饭上',
      '中间放一个温泉蛋或煎蛋'
    ],
    tips: '肥牛片要选品质好的，煮的时间不要太长'
  },
  {
    id: 'j5',
    name: '日式咖喱饭',
    category: 'japanese',
    description: '香浓温和，老少皆宜',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    difficulty: 'easy',
    cookTime: 40,
    ingredients: ['咖喱块 4块', '鸡肉或牛肉 300g', '土豆 2个', '胡萝卜 1根', '洋葱 1个', '米饭适量'],
    steps: [
      '肉类切块，土豆、胡萝卜切滚刀块，洋葱切丝',
      '热锅炒肉至变色',
      '加入洋葱炒软',
      '加入土豆、胡萝卜翻炒均匀',
      '加水没过食材，大火煮开',
      '撇去浮沫，转小火煮20分钟至蔬菜软烂',
      '关火，加入咖喱块搅拌融化',
      '小火再煮5分钟至浓稠，浇在米饭上'
    ],
    tips: '咖喱块要关火后再加，避免结块'
  }
];

export const categoryLabels: Record<string, string> = {
  chinese: '中餐',
  western: '西餐',
  korean: '韩餐',
  japanese: '日餐',
  other: '其他'
};

export const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
};
