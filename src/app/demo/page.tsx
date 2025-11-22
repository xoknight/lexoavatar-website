'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ArrowLeft, Send, Loader2, Sparkles, Zap, MessageSquare } from 'lucide-react'
import { getAllModels, MODELS_BY_PROVIDER, DEFAULT_MODEL } from '@/lib/ai-models'

export default function DemoPage() {
  const [message, setMessage] = useState('')
  const [industry, setIndustry] = useState('default')
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const allModels = getAllModels()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      setError('请输入消息')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('https://api.lexoavatar.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          industry,
          model: selectedModel
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '请求失败')
      }

      setResponse(data.response)
    } catch (err: any) {
      setError(err.message || '发生错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'from-green-500 to-emerald-600'
      case 'anthropic':
        return 'from-orange-500 to-amber-600'
      case 'google':
        return 'from-blue-500 to-indigo-600'
      default:
        return 'from-slate-500 to-slate-600'
    }
  }

  const getProviderBadgeColor = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'anthropic':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'google':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* 导航栏 */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition">
              <ArrowLeft className="h-5 w-5" />
              <span>返回首页</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-slate-900">律智人科技</div>
                <div className="text-xs text-slate-500">多模型AI助手</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-12 w-12 text-blue-600" />
              多模型AI助手
            </h1>
            <p className="text-xl text-slate-600">支持 ChatGPT、Claude、Gemini 等多个顶级AI模型</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左侧：模型选择 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">选择AI模型</h2>
                </div>

                <div className="space-y-4">
                  {/* OpenAI 模型 */}
                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getProviderColor('openai')}`}></div>
                      OpenAI
                    </div>
                    <div className="space-y-2">
                      {MODELS_BY_PROVIDER.openai.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition ${
                            selectedModel === model.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-slate-200 bg-white hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 text-sm">{model.icon} {model.name}</span>
                            {selectedModel === model.id && (
                              <span className="text-xs text-green-600 font-semibold">✓</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{model.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anthropic 模型 */}
                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getProviderColor('anthropic')}`}></div>
                      Anthropic
                    </div>
                    <div className="space-y-2">
                      {MODELS_BY_PROVIDER.anthropic.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition ${
                            selectedModel === model.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-slate-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 text-sm">{model.icon} {model.name}</span>
                            {selectedModel === model.id && (
                              <span className="text-xs text-orange-600 font-semibold">✓</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{model.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Google 模型 */}
                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getProviderColor('google')}`}></div>
                      Google
                    </div>
                    <div className="space-y-2">
                      {MODELS_BY_PROVIDER.google.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition ${
                            selectedModel === model.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 text-sm">{model.icon} {model.name}</span>
                            {selectedModel === model.id && (
                              <span className="text-xs text-blue-600 font-semibold">✓</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{model.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：聊天界面 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* 行业选择 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    选择行业场景
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'default', label: '通用', icon: '💬' },
                      { value: 'legal', label: '法律', icon: '⚖️' },
                      { value: 'finance', label: '金融', icon: '💰' },
                      { value: 'healthcare', label: '医疗', icon: '🏥' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setIndustry(item.value)}
                        className={`p-3 rounded-lg border-2 transition font-medium ${
                          industry === item.value
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="text-sm">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 输入框 */}
                <form onSubmit={handleSubmit} className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    输入您的问题
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="例如：请帮我分析一下..."
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !message.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed flex items-center shadow-lg"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          发送
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* 错误提示 */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start gap-2"
                    >
                      <span className="text-lg">⚠️</span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 响应结果 */}
                <AnimatePresence>
                  {response && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getProviderColor(allModels.find(m => m.id === selectedModel)?.provider || 'openai')}`}>
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-sm font-semibold text-slate-700">AI 回复</div>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getProviderBadgeColor(allModels.find(m => m.id === selectedModel)?.provider || 'openai')}`}>
                              {allModels.find(m => m.id === selectedModel)?.name}
                            </span>
                          </div>
                          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {response}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 提示 */}
                {!response && !loading && (
                  <div className="text-center text-slate-400 text-sm py-8">
                    <div className="text-4xl mb-3">🤖</div>
                    <p>选择AI模型和行业场景，然后输入您的问题</p>
                    <p className="text-xs mt-2">体验不同AI模型的独特能力</p>
                  </div>
                )}
              </div>

              {/* 底部信息 */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  支持 OpenAI、Anthropic Claude、Google Gemini 等多个AI模型
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  由律智人科技提供技术支持
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
