import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getModelById, INDUSTRY_PROMPTS, DEFAULT_MODEL } from '@/lib/ai-models'

// 初始化各个AI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

// OpenAI调用
async function callOpenAI(modelId: string, systemPrompt: string, message: string) {
  const completion = await openai.chat.completions.create({
    model: modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 2000,
    temperature: 0.7,
  })

  return completion.choices[0].message.content || '抱歉，我无法生成回复。'
}

// Anthropic Claude调用
async function callClaude(modelId: string, systemPrompt: string, message: string) {
  const response = await anthropic.messages.create({
    model: modelId,
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      { role: 'user', content: message }
    ],
  })

  const content = response.content[0]
  return content.type === 'text' ? content.text : '抱歉，我无法生成回复。'
}

// Google Gemini调用
async function callGemini(modelId: string, systemPrompt: string, message: string) {
  const model = googleAI.getGenerativeModel({ model: modelId })

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: '好的，我明白了。我会按照这个角色来回答问题。' }],
      },
    ],
  })

  const result = await chat.sendMessage(message)
  const response = result.response
  return response.text()
}

export async function POST(request: NextRequest) {
  try {
    const { message, industry, modelId } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '请提供消息内容' },
        { status: 400 }
      )
    }

    // 获取模型配置
    const selectedModelId = modelId || DEFAULT_MODEL
    const modelConfig = getModelById(selectedModelId)

    if (!modelConfig) {
      return NextResponse.json(
        { error: '不支持的模型' },
        { status: 400 }
      )
    }

    // 获取系统提示词
    const systemPrompt = INDUSTRY_PROMPTS[industry as string] || INDUSTRY_PROMPTS.default

    let response: string

    // 根据提供商调用不同的API
    switch (modelConfig.provider) {
      case 'openai':
        response = await callOpenAI(selectedModelId, systemPrompt, message)
        break

      case 'anthropic':
        response = await callClaude(selectedModelId, systemPrompt, message)
        break

      case 'google':
        response = await callGemini(selectedModelId, systemPrompt, message)
        break

      default:
        throw new Error('不支持的AI提供商')
    }

    return NextResponse.json({
      success: true,
      response,
      model: modelConfig.name,
      modelId: selectedModelId,
      provider: modelConfig.provider,
      industry: industry || 'default',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('AI API错误:', error)

    // 处理不同类型的错误
    if (error.code === 'insufficient_quota' || error.status === 429) {
      return NextResponse.json(
        { error: 'API配额不足，请稍后重试或更换模型' },
        { status: 429 }
      )
    }

    if (error.code === 'invalid_api_key' || error.status === 401) {
      return NextResponse.json(
        { error: 'API密钥无效，请检查配置' },
        { status: 401 }
      )
    }

    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: '请先配置对应的API密钥' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || '服务暂时不可用，请稍后重试' },
      { status: 500 }
    )
  }
}
