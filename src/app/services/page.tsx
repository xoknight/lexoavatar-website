'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Database, Zap, Shield, ArrowLeft } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* 简单导航 */}
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

      {/* 内容区域 */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">我们的服务</h1>
            <p className="text-xl text-slate-600">为您的大模型提供全方位数据支持</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Database className="h-12 w-12 text-blue-600" />,
                title: '数据采集服务',
                description: '覆盖法律、金融、医疗等领域的专业数据采集',
                features: ['合法合规渠道', '多源数据整合', '实时数据更新', '定制化采集']
              },
              {
                icon: <Zap className="h-12 w-12 text-purple-600" />,
                title: '数据预处理与增强',
                description: '高效的数据清洗、标注和格式转换服务',
                features: ['智能分类标注', '数据清洗去重', '格式标准化', '质量检查']
              },
              {
                icon: <Shield className="h-12 w-12 text-green-600" />,
                title: '定制化数据服务',
                description: '根据您的需求提供专属数据解决方案',
                features: ['场景定制', '独家数据', '专家标注', '持续迭代']
              },
              {
                icon: <Brain className="h-12 w-12 text-orange-600" />,
                title: 'RLHF优化服务',
                description: '基于人类反馈的强化学习数据优化',
                features: ['专家反馈', '质量提升', '模型对齐', '效果验证']
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                返回首页
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}