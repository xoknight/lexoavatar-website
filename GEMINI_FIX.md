# Google Gemini 模型名称修复说明

## 问题描述

原来使用的模型ID `gemini-1.5-pro` 在Google Generative AI API中不存在，导致404错误。

## 已修复

已将Google Gemini模型更新为正确的模型ID：

### 修复前（错误）
```typescript
'gemini-1.5-pro'     // ❌ 不存在
'gemini-pro'         // ❌ 已过时
```

### 修复后（正确）
```typescript
'gemini-2.0-flash-exp'    // ✅ Gemini 2.0 Flash（实验版，最新）
'gemini-1.5-flash'        // ✅ Gemini 1.5 Flash（稳定版）
'gemini-1.5-pro-latest'   // ✅ Gemini 1.5 Pro（最新版本）
```

## Google Gemini 可用模型列表（2025年1月）

| 模型ID | 说明 | 状态 |
|--------|------|------|
| `gemini-2.0-flash-exp` | Gemini 2.0 Flash 实验版 | 最新，速度快 |
| `gemini-1.5-flash` | Gemini 1.5 Flash | 稳定，推荐 |
| `gemini-1.5-flash-8b` | Gemini 1.5 Flash 8B | 轻量版 |
| `gemini-1.5-pro-latest` | Gemini 1.5 Pro 最新版 | 最强性能 |
| `gemini-1.5-pro` | Gemini 1.5 Pro | 稳定版 |
| `gemini-pro` | Gemini Pro | 已过时 ⚠️ |

## 如何验证可用模型

如果你想查看当前可用的所有Gemini模型，可以使用以下代码：

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function listModels() {
  const models = await genAI.listModels();
  models.forEach(model => {
    console.log(model.name);
    console.log('支持的方法:', model.supportedGenerationMethods);
  });
}
```

## 推荐配置

根据你的需求选择：

### 追求速度
```typescript
modelId: 'gemini-1.5-flash'  // 最快，成本低
```

### 追求性能
```typescript
modelId: 'gemini-1.5-pro-latest'  // 最强，适合复杂任务
```

### 尝鲜体验
```typescript
modelId: 'gemini-2.0-flash-exp'  // 最新功能，可能不稳定
```

## 注意事项

1. **实验版模型**（如 `gemini-2.0-flash-exp`）可能会随时变更或下线
2. **推荐使用稳定版本**用于生产环境（如 `gemini-1.5-flash`）
3. Google的模型命名会定期更新，建议关注官方文档

## 参考资料

- [Google AI API 模型列表](https://ai.google.dev/gemini-api/docs/models/gemini)
- [Google Generative AI SDK文档](https://ai.google.dev/tutorials/node_quickstart)

---

修复时间: 2025-01-22
