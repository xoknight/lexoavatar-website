# 多模型AI聊天应用 - 升级指南

## 项目概述

这是一个支持多个顶级AI模型的现代化聊天应用，基于成熟的开源项目（如 LobeChat 和 ChatGPT-Next-Web）的最佳实践构建。

### 支持的AI模型

#### OpenAI
- **GPT-4**: 最强大的GPT模型，适合复杂任务
- **GPT-4 Turbo**: 更快的GPT-4版本，性价比高
- **GPT-3.5 Turbo**: 快速响应，适合日常对话

#### Anthropic Claude
- **Claude 3.5 Sonnet**: 最新最强模型，擅长推理和编程
- **Claude 3 Opus**: 最强大的Claude模型，适合复杂分析
- **Claude 3 Haiku**: 快速轻量的Claude模型

#### Google Gemini
- **Gemini 1.5 Pro**: Google最强多模态模型
- **Gemini 1.5 Flash**: 快速高效的Gemini模型
- **Gemini Pro**: Google通用AI模型

## 核心功能

✅ **多模型切换**: 支持9个不同的AI模型，实时切换
✅ **行业定制**: 内置法律、金融、医疗、通用四种行业场景
✅ **现代UI**: 参考LobeChat设计，美观易用
✅ **类型安全**: 完整的TypeScript类型支持
✅ **错误处理**: 完善的错误处理和用户提示
✅ **响应式设计**: 支持移动端和桌面端

## 快速开始

### 1. 安装依赖

项目已自动安装以下依赖：
```bash
npm install
```

已安装的AI SDK:
- `openai` - OpenAI官方SDK
- `@anthropic-ai/sdk` - Anthropic官方SDK
- `@google/generative-ai` - Google AI官方SDK

### 2. 配置API密钥

复制环境变量示例文件：
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的API密钥：

```env
# OpenAI API配置
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic Claude API配置
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Google AI (Gemini) API配置
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

#### 获取API密钥

- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/settings/keys
- **Google AI**: https://makersuite.google.com/app/apikey

> 注意: 至少需要配置一个API密钥才能使用相应的模型。

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000/demo 查看升级后的多模型AI助手页面。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # 多模型API路由（已升级）
│   └── demo/
│       └── page.tsx               # 多模型聊天页面（已升级）
├── lib/
│   └── ai-models.ts               # AI模型配置和类型定义（新增）
└── ...
```

## 核心文件说明

### 1. `/src/lib/ai-models.ts`
定义了所有AI模型的配置、类型和工具函数：
- `AIModel`: 模型接口定义
- `AI_MODELS`: 所有模型的配置
- `MODELS_BY_PROVIDER`: 按提供商分组的模型
- `INDUSTRY_PROMPTS`: 行业场景的系统提示词

### 2. `/src/app/api/chat/route.ts`
统一的API路由，支持多模型调用：
- `callOpenAI()`: OpenAI模型调用
- `callClaude()`: Anthropic Claude模型调用
- `callGemini()`: Google Gemini模型调用
- 统一的错误处理和响应格式

### 3. `/src/app/demo/page.tsx`
升级后的演示页面：
- 左侧模型选择面板
- 右侧聊天交互界面
- 行业场景切换
- 实时模型切换

## 技术架构

### 参考的开源项目

本项目参考了以下成熟的开源AI聊天应用：

1. **LobeChat**
   - GitHub: https://github.com/lobehub/lobe-chat
   - 特点: 现代化设计、多模型支持、插件系统
   - 参考内容: UI设计、模型配置架构

2. **ChatGPT-Next-Web**
   - 特点: 轻量、易部署、多模型接入
   - 参考内容: API统一封装、环境变量配置

### 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **AI SDK**:
  - OpenAI SDK 6.9.1
  - Anthropic SDK (最新)
  - Google Generative AI SDK (最新)

## 使用指南

### 切换AI模型

1. 在左侧面板选择你想使用的AI模型
2. 不同提供商用不同颜色区分（OpenAI绿色、Anthropic橙色、Google蓝色）
3. 选中的模型会高亮显示

### 选择行业场景

1. 在右侧聊天界面顶部选择行业场景
2. 支持：通用、法律、金融、医疗
3. 每个场景都有定制的系统提示词，让AI更专业

### 发送消息

1. 在输入框输入你的问题
2. 点击"发送"按钮或按回车键
3. AI会使用选中的模型和行业场景回复你

## 自定义配置

### 添加新的AI模型

编辑 `/src/lib/ai-models.ts`：

```typescript
export const AI_MODELS: Record<string, AIModel> = {
  // 添加新模型
  'your-new-model': {
    id: 'your-new-model',
    name: '你的模型名称',
    provider: 'openai', // 或 'anthropic' 或 'google'
    description: '模型描述',
    icon: '🎯',
    maxTokens: 4096,
    contextWindow: 32000,
    supportStream: true,
  },
  // ... 其他模型
}
```

### 添加新的行业场景

编辑 `/src/lib/ai-models.ts` 中的 `INDUSTRY_PROMPTS`：

```typescript
export const INDUSTRY_PROMPTS: Record<string, string> = {
  // 添加新场景
  'education': '你是一位专业的教育领域AI助手...',
  // ... 其他场景
}
```

然后在 `/src/app/demo/page.tsx` 中添加对应的按钮。

### 添加流式响应（高级功能）

当前版本使用标准响应，如需流式响应（打字机效果），需要：

1. 修改API路由返回 `ReadableStream`
2. 使用各SDK的流式API（`stream: true`）
3. 在前端使用 `fetch` 的流式读取

参考实现可查看 LobeChat 的流式响应代码。

## 常见问题

### Q: 为什么某个模型报错"请先配置对应的API密钥"？
A: 请检查 `.env.local` 文件中是否正确配置了该模型提供商的API密钥。

### Q: 如何获取API密钥？
A: 查看上方"获取API密钥"部分的链接，前往对应平台注册并获取。

### Q: API调用失败怎么办？
A: 检查以下几点：
- API密钥是否正确
- 账户是否有足够余额
- 网络连接是否正常
- API配额是否用完

### Q: 可以部署到生产环境吗？
A: 可以，但建议：
- 使用环境变量管理API密钥
- 添加用户认证系统
- 设置API调用限流
- 监控API使用量和成本

### Q: 支持哪些部署平台？
A: 支持所有Next.js兼容的平台：
- Vercel（推荐）
- Netlify
- 自建服务器（Docker）
- Railway
- Render

## 性能优化建议

1. **缓存响应**: 对相同问题缓存AI回复
2. **限流策略**: 限制单个用户的请求频率
3. **流式响应**: 实现流式响应提升用户体验
4. **CDN加速**: 使用CDN加速静态资源
5. **代码分割**: 按需加载AI SDK

## 安全建议

1. **密钥管理**: 永远不要将API密钥提交到代码库
2. **环境变量**: 使用环境变量存储敏感信息
3. **用户认证**: 生产环境必须添加用户认证
4. **请求验证**: 验证所有用户输入
5. **限流保护**: 防止恶意调用和成本失控

## 下一步计划

可以考虑添加以下功能：

- [ ] 流式响应（打字机效果）
- [ ] 对话历史记录
- [ ] 多轮对话支持
- [ ] Markdown渲染
- [ ] 代码高亮
- [ ] 导出对话功能
- [ ] 用户认证系统
- [ ] 使用量统计
- [ ] 自定义系统提示词
- [ ] 插件系统

## 参考资源

- [OpenAI API文档](https://platform.openai.com/docs)
- [Anthropic API文档](https://docs.anthropic.com)
- [Google AI文档](https://ai.google.dev/docs)
- [LobeChat GitHub](https://github.com/lobehub/lobe-chat)
- [Next.js文档](https://nextjs.org/docs)

## 技术支持

如遇到问题，请检查：
1. 控制台错误信息
2. API密钥配置
3. 网络连接
4. 依赖版本

---

**由律智人科技构建** | 基于 LobeChat 和 ChatGPT-Next-Web 最佳实践
