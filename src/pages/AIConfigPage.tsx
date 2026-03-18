import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Settings, Key, Server, Bot, Check, AlertCircle, Sparkles } from 'lucide-react';
import { getAIConfig, saveAIConfig, type AIConfig, type AIProvider } from '../services/aiService';

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const CardTitle = styled.h3`
  margin: 0 0 20px;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #ff6b9d;
  }
`;

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

const ProviderButton = styled.button<{ selected: boolean }>`
  padding: 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#ff6b9d' : '#eee'};
  background: ${props => props.selected ? '#fff0f5' : 'white'};
  color: ${props => props.selected ? '#ff6b9d' : '#666'};
  font-weight: ${props => props.selected ? '600' : '400'};
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

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const SaveButton = styled.button`
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

const TestButton = styled.button`
  padding: 10px 20px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  margin-top: 12px;

  &:hover {
    background: #eee;
  }
`;

const Alert = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#e8f5e9';
      case 'error': return '#ffebee';
      case 'info': return '#e3f2fd';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'info': return '#2196f3';
    }
  }};
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #fff0f5, #ffe0f0);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  color: #c44569;
  font-size: 14px;
  line-height: 1.6;

  ul {
    margin: 8px 0 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }
`;

const providers: { id: AIProvider; name: string; icon: React.ReactNode; models: string[] }[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    icon: <Bot size={28} />,
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
  },
  {
    id: 'moonshot',
    name: 'Moonshot',
    icon: <Sparkles size={28} />,
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: <Bot size={28} />,
    models: ['gemini-pro', 'gemini-pro-vision']
  },
  {
    id: 'custom',
    name: '自定义',
    icon: <Server size={28} />,
    models: ['default']
  }
];

export function AIConfigPage() {
  const [config, setConfig] = useState<AIConfig>({
    provider: 'moonshot',
    apiKey: '',
    apiUrl: '',
    model: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const savedConfig = getAIConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSave = () => {
    if (!config.apiKey) {
      setMessage({ type: 'error', text: '请输入API密钥' });
      return;
    }
    if (config.provider === 'custom' && !config.apiUrl) {
      setMessage({ type: 'error', text: '自定义API需要填写API地址' });
      return;
    }

    saveAIConfig(config);
    setMessage({ type: 'success', text: '配置已保存！' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setMessage({ type: 'info', text: '正在测试连接...' });

    try {
      const { generateRecipe } = await import('../services/aiService');
      await generateRecipe('西红柿炒鸡蛋', 'chinese');
      setMessage({ type: 'success', text: '连接测试成功！AI服务可用。' });
    } catch (error) {
      setMessage({ type: 'error', text: `测试失败: ${error instanceof Error ? error.message : '未知错误'}` });
    } finally {
      setIsTesting(false);
    }
  };

  const selectedProvider = providers.find(p => p.id === config.provider);

  return (
    <div>
      <PageTitle>
        <Settings size={28} />
        AI配置
      </PageTitle>

      <InfoBox>
        <strong>💡 配置说明</strong>
        <ul>
          <li>配置AI API后，可以自动生成任意菜品的菜谱</li>
          <li>支持 OpenAI、Moonshot(月之暗面)、Gemini 等主流大模型</li>
          <li>API密钥仅存储在本地浏览器中，不会上传到服务器</li>
          <li>推荐使用 Moonshot(月之暗面)，国内访问稳定</li>
        </ul>
      </InfoBox>

      {message && (
        <Alert type={message.type}>
          {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </Alert>
      )}

      <Card>
        <CardTitle>
          <Bot size={20} />
          选择AI提供商
        </CardTitle>
        <ProviderGrid>
          {providers.map(provider => (
            <ProviderButton
              key={provider.id}
              selected={config.provider === provider.id}
              onClick={() => setConfig({ ...config, provider: provider.id, model: provider.models[0] })}
            >
              {provider.icon}
              {provider.name}
            </ProviderButton>
          ))}
        </ProviderGrid>

        <InputGroup>
          <Label>
            <Key size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            API密钥
          </Label>
          <Input
            type="password"
            placeholder={`请输入${selectedProvider?.name} API密钥`}
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
          />
        </InputGroup>

        {config.provider === 'custom' && (
          <InputGroup>
            <Label>
              <Server size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              API地址
            </Label>
            <Input
              type="text"
              placeholder="https://api.example.com/v1/chat/completions"
              value={config.apiUrl}
              onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
            />
          </InputGroup>
        )}

        <InputGroup>
          <Label>模型选择</Label>
          <Select
            value={config.model}
            onChange={(e) => setConfig({ ...config, model: e.target.value })}
          >
            {selectedProvider?.models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </Select>
        </InputGroup>

        <SaveButton onClick={handleSave}>
          <Check size={20} />
          保存配置
        </SaveButton>

        {config.apiKey && (
          <TestButton onClick={handleTest} disabled={isTesting}>
            <Sparkles size={18} />
            {isTesting ? '测试中...' : '测试连接'}
          </TestButton>
        )}
      </Card>

      <Card>
        <CardTitle>
          <Sparkles size={20} />
          获取API密钥
        </CardTitle>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>
          <p><strong>OpenAI:</strong> 访问 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>platform.openai.com</a></p>
          <p><strong>Moonshot:</strong> 访问 <a href="https://platform.moonshot.cn/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>platform.moonshot.cn</a>（推荐，国内可用）</p>
          <p><strong>Gemini:</strong> 访问 <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>makersuite.google.com</a></p>
        </div>
      </Card>
    </div>
  );
}
