import { NextRequest } from 'next/server'
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

// OpenAI流式调用
async function* streamOpenAI(modelId: string, systemPrompt: string, message: string) {
  const stream = await openai.chat.completions.create({
    model: modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 2000,
    temperature: 0.7,
    stream: true,
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      yield content
    }
  }
}

// Anthropic Claude流式调用
async function* streamClaude(modelId: string, systemPrompt: string, message: string) {
  const stream = await anthropic.messages.stream({
    model: modelId,
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      { role: 'user', content: message }
    ],
  })

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      yield chunk.delta.text
    }
  }
}

// Google Gemini流式调用
async function* streamGemini(modelId: string, systemPrompt: string, message: string) {
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

  const result = await chat.sendMessageStream(message)

  for await (const chunk of result.stream) {
    const text = chunk.text()
    if (text) {
      yield text
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, industry, modelId } = await request.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: '请提供消息内容' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 获取模型配置
    const selectedModelId = modelId || DEFAULT_MODEL
    const modelConfig = getModelById(selectedModelId)

    if (!modelConfig) {
      return new Response(
        JSON.stringify({ error: '不支持的模型' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 获取系统提示词
    const systemPrompt = INDUSTRY_PROMPTS[industry as string] || INDUSTRY_PROMPTS.default

    // 创建流式响应
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 发送开始标记
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start', model: modelConfig.name })}\n\n`))

          let textStream: AsyncGenerator<string>

          // 根据提供商调用不同的流式API
          switch (modelConfig.provider) {
            case 'openai':
              textStream = streamOpenAI(selectedModelId, systemPrompt, message)
              break

            case 'anthropic':
              textStream = streamClaude(selectedModelId, systemPrompt, message)
              break

            case 'google':
              textStream = streamGemini(selectedModelId, systemPrompt, message)
              break

            default:
              throw new Error('不支持的AI提供商')
          }

          // 流式发送内容
          for await (const text of textStream) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', text })}\n\n`))
          }

          // 发送结束标记
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
          controller.close()

        } catch (error: any) {
          console.error('流式API错误:', error)

          const errorMessage = error.message?.includes('API key')
            ? '请先配置对应的API密钥'
            : error.message || '服务暂时不可用，请稍后重试'

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error: any) {
    console.error('请求处理错误:', error)
    return new Response(
      JSON.stringify({ error: error.message || '服务暂时不可用' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
