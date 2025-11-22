// AI模型配置
export type AIProvider = 'openai' | 'anthropic' | 'google'

export interface AIModel {
  id: string
  name: string
  provider: AIProvider
  description: string
  icon: string
  maxTokens?: number
  contextWindow?: number
  supportStream: boolean
}

// 所有可用的AI模型配置
export const AI_MODELS: Record<string, AIModel> = {
  // OpenAI 模型
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    description: '最强大的GPT模型，适合复杂任务',
    icon: '🤖',
    maxTokens: 8192,
    contextWindow: 8192,
    supportStream: true,
  },
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: '更快的GPT-4版本，性价比高',
    icon: '⚡',
    maxTokens: 4096,
    contextWindow: 128000,
    supportStream: true,
  },
  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: '快速响应，适合日常对话',
    icon: '💬',
    maxTokens: 4096,
    contextWindow: 16385,
    supportStream: true,
  },

  // Anthropic Claude 模型
  'claude-3-5-sonnet-20241022': {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Anthropic最新最强模型，擅长推理和编程',
    icon: '🎭',
    maxTokens: 8192,
    contextWindow: 200000,
    supportStream: true,
  },
  'claude-3-opus-20240229': {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: '最强大的Claude模型，适合复杂分析',
    icon: '🎨',
    maxTokens: 4096,
    contextWindow: 200000,
    supportStream: true,
  },
  'claude-3-haiku-20240307': {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: '快速轻量的Claude模型',
    icon: '🌸',
    maxTokens: 4096,
    contextWindow: 200000,
    supportStream: true,
  },

  // Google Gemini 模型
  'gemini-2.0-flash-exp': {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    description: 'Google最新实验版本，速度快',
    icon: '✨',
    maxTokens: 8192,
    contextWindow: 1000000,
    supportStream: true,
  },
  'gemini-1.5-flash': {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    description: '快速高效的Gemini模型',
    icon: '⚡',
    maxTokens: 8192,
    contextWindow: 1000000,
    supportStream: true,
  },
  'gemini-1.5-pro-latest': {
    id: 'gemini-1.5-pro-latest',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: 'Google最强多模态模型',
    icon: '🔷',
    maxTokens: 8192,
    contextWindow: 2000000,
    supportStream: true,
  },
}

// 按提供商分组的模型
export const MODELS_BY_PROVIDER: Record<AIProvider, AIModel[]> = {
  openai: [
    AI_MODELS['gpt-4'],
    AI_MODELS['gpt-4-turbo'],
    AI_MODELS['gpt-3.5-turbo'],
  ],
  anthropic: [
    AI_MODELS['claude-3-5-sonnet-20241022'],
    AI_MODELS['claude-3-opus-20240229'],
    AI_MODELS['claude-3-haiku-20240307'],
  ],
  google: [
    AI_MODELS['gemini-2.0-flash-exp'],
    AI_MODELS['gemini-1.5-flash'],
    AI_MODELS['gemini-1.5-pro-latest'],
  ],
}

// 获取所有模型列表
export function getAllModels(): AIModel[] {
  return Object.values(AI_MODELS)
}

// 根据ID获取模型
export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS[id]
}

// 根据提供商获取模型
export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return MODELS_BY_PROVIDER[provider] || []
}

// 默认模型
export const DEFAULT_MODEL = 'gpt-3.5-turbo'

// 行业场景的系统提示词
export const INDUSTRY_PROMPTS: Record<string, string> = {
  default: '你是一个友好、专业的AI助手，能够回答各种问题并提供帮助。',
  legal: '你是一位专业的法律顾问AI助手，擅长解答法律相关问题。请注意，你提供的是法律信息和建议，但不构成正式的法律意见。在回答时要严谨、准确，并引用相关法律条文。',
  finance: '你是一位专业的金融分析师AI助手，擅长财务分析、投资建议和市场趋势解读。请提供专业、数据驱动的分析，但也要提醒用户投资有风险。',
  healthcare: '你是一位医疗健康领域的AI助手，可以提供健康知识和医疗信息。请注意，你的建议仅供参考，不能替代专业医生的诊断和治疗。遇到严重症状时，请建议用户及时就医。',
}
