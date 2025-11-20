'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, Send, Loader2 } from 'lucide-react'

export default function DemoPage() {
  const [message, setMessage] = useState('')
  const [industry, setIndustry] = useState('default')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, industry }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* 导航栏 - 修复了文字颜色 */}
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
                <div className="text-xs text-slate-500">LexoAvatar</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">AI助手演示</h1>
            <p className="text-xl text-slate-600">体验我们的AI数据服务能力</p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* 行业选择 - 修复了按钮样式 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                选择行业场景
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'default', label: '通用' },
                  { value: 'legal', label: '法律' },
                  { value: 'finance', label: '金融' },
                  { value: 'healthcare', label: '医疗' }
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
                    {item.label}
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
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center"
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {/* 响应结果 */}
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-slate-500 mb-2">AI 回复：</div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {response}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 提示 */}
            {!response && !loading && (
              <div className="text-center text-slate-400 text-sm">
                💡 选择行业场景后，输入您的问题，体验AI助手的专业能力
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              本演示使用 GPT-3.5 模型 · 数据由律智人科技提供
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}