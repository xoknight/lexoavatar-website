'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
              <span>返回首页</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">律智人科技</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">在线演示</h1>
            <p className="text-xl text-slate-600 mb-8">体验我们的AI数据服务</p>
            
            <div className="bg-white p-12 rounded-2xl shadow-xl">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">功能开发中</h2>
              <p className="text-slate-600 mb-8">
                我们正在为您准备精彩的演示功能，敬请期待！
              </p>
              <Link href="/">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                  返回首页
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}