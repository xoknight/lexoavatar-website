import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, industry } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '请提供消息内容' },
        { status: 400 }
      )
    }

    // 根据行业定制系统提示词
    const systemPrompts: { [key: string]: string } = {
      legal: '你是一个专业的法律领域AI助手，擅长法律法规、合同审查和合规咨询。',
      finance: '你是一个专业的金融领域AI助手，擅长市场分析、风险评估和投资建议。',
      healthcare: '你是一个专业的医疗领域AI助手，擅长医学知识、临床研究和健康咨询。',
      default: '你是律智人科技的AI助手，专注于为法律、金融、医疗行业提供大模型数据服务。'
    }

    const systemPrompt = systemPrompts[industry as string] || systemPrompts.default

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      response,
      model: 'gpt-3.5-turbo',
      industry: industry || 'default',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('OpenAI API错误:', error)

    // 处理不同类型的错误
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API配额不足，请充值' },
        { status: 402 }
      )
    }

    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'API密钥无效' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: '服务暂时不可用，请稍后重试' },
      { status: 500 }
    )
  }
}