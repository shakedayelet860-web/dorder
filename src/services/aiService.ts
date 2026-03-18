import type { Dish } from '../types';

export interface AIRecipeResponse {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cookTime: number;
  ingredients: string[];
  steps: string[];
  tips: string;
}

// 支持的大模型提供商
export type AIProvider = 'openai' | 'anthropic' | 'gemini' | 'moonshot' | 'custom';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  apiUrl?: string;
  model?: string;
}

// 默认配置存储键
const AI_CONFIG_KEY = 'ai_config';

// 获取存储的AI配置
export function getAIConfig(): AIConfig | null {
  const config = localStorage.getItem(AI_CONFIG_KEY);
  return config ? JSON.parse(config) : null;
}

// 保存AI配置
export function saveAIConfig(config: AIConfig): void {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
}

// 构建提示词
function buildRecipePrompt(dishName: string, category: string): string {
  return `请为"${dishName}"生成一份详细的菜谱教程。

要求：
1. 这是一道${category}菜
2. 提供详细的食材清单（包含用量）
3. 提供清晰的制作步骤
4. 给出烹饪小贴士
5. 评估难度（简单/中等/困难）和烹饪时间

请严格按照以下JSON格式返回，不要包含其他内容：
{
  "name": "菜品名称",
  "description": "简短描述（20字以内）",
  "difficulty": "easy|medium|hard",
  "cookTime": 30,
  "ingredients": ["食材1 用量", "食材2 用量"],
  "steps": ["步骤1", "步骤2"],
  "tips": "烹饪小贴士"
}`;
}

// 调用OpenAI API
async function callOpenAI(prompt: string, config: AIConfig): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个专业的美食专家，擅长提供详细的菜谱教程。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 调用Moonshot (月之暗面) API
async function callMoonshot(prompt: string, config: AIConfig): Promise<string> {
  const response = await fetch(config.apiUrl || 'https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: '你是一个专业的美食专家，擅长提供详细的菜谱教程。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 调用Gemini API
async function callGemini(prompt: string, config: AIConfig): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model || 'gemini-pro'}:generateContent?key=${config.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: '你是一个专业的美食专家，擅长提供详细的菜谱教程。' },
            { text: prompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// 调用自定义API
async function callCustomAPI(prompt: string, config: AIConfig): Promise<string> {
  if (!config.apiUrl) {
    throw new Error('自定义API需要设置API地址');
  }

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'default',
      messages: [
        { role: 'system', content: '你是一个专业的美食专家，擅长提供详细的菜谱教程。' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  // 尝试多种可能的响应格式
  return data.choices?.[0]?.message?.content || 
         data.choices?.[0]?.text || 
         data.text || 
         data.response ||
         JSON.stringify(data);
}

// 解析AI响应
function parseAIResponse(content: string): AIRecipeResponse {
  try {
    // 尝试提取JSON部分
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        name: parsed.name || '未知菜品',
        description: parsed.description || '',
        difficulty: parsed.difficulty || 'medium',
        cookTime: parsed.cookTime || 30,
        ingredients: parsed.ingredients || [],
        steps: parsed.steps || [],
        tips: parsed.tips || ''
      };
    }
    throw new Error('无法解析响应');
  } catch (error) {
    console.error('解析AI响应失败:', error);
    throw new Error('解析菜谱数据失败');
  }
}

// 生成菜谱
export async function generateRecipe(dishName: string, category: string): Promise<AIRecipeResponse> {
  const config = getAIConfig();
  
  if (!config) {
    throw new Error('请先配置AI API');
  }

  const prompt = buildRecipePrompt(dishName, category);
  let content: string;

  switch (config.provider) {
    case 'openai':
      content = await callOpenAI(prompt, config);
      break;
    case 'moonshot':
      content = await callMoonshot(prompt, config);
      break;
    case 'gemini':
      content = await callGemini(prompt, config);
      break;
    case 'custom':
      content = await callCustomAPI(prompt, config);
      break;
    default:
      throw new Error('不支持的AI提供商');
  }

  return parseAIResponse(content);
}

// 搜索菜品图片（使用Unsplash API）
export async function searchDishImage(dishName: string): Promise<string> {
  // 使用Unsplash Source API获取随机美食图片
  // 实际项目中可以使用更专业的图片API
  const keywords = encodeURIComponent(`${dishName} food dish`);
  return `https://source.unsplash.com/400x300/?${keywords}`;
}

// 生成完整菜品数据
export async function generateDish(dishName: string, category: string): Promise<Dish> {
  const recipe = await generateRecipe(dishName, category);
  const image = await searchDishImage(dishName);

  return {
    id: `ai_${Date.now()}`,
    name: recipe.name,
    category: category as Dish['category'],
    description: recipe.description,
    image: image,
    difficulty: recipe.difficulty,
    cookTime: recipe.cookTime,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tips: recipe.tips
  };
}

// 批量生成菜品建议
export async function generateDishSuggestions(category: string, count: number = 5): Promise<string[]> {
  const config = getAIConfig();
  
  if (!config) {
    throw new Error('请先配置AI API');
  }

  const prompt = `请推荐${count}道${category}菜品的名称，只需要列出菜品名称，每行一个，不要其他内容。`;

  let content: string;
  switch (config.provider) {
    case 'openai':
      content = await callOpenAI(prompt, config);
      break;
    case 'moonshot':
      content = await callMoonshot(prompt, config);
      break;
    case 'gemini':
      content = await callGemini(prompt, config);
      break;
    case 'custom':
      content = await callCustomAPI(prompt, config);
      break;
    default:
      throw new Error('不支持的AI提供商');
  }

  return content.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.\s*/, '').trim());
}
