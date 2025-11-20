'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Zap, 
  Shield, 
  Brain,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* 导航栏 */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-xl font-bold text-slate-900">律智人科技</div>
                <div className="text-xs text-slate-500">LexoAvatar Technology</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-700 hover:text-blue-600 transition">首页</Link>
              <Link href="/services" className="text-slate-700 hover:text-blue-600 transition">服务</Link>
              <Link href="/solutions" className="text-slate-700 hover:text-blue-600 transition">解决方案</Link>
              <Link href="/demo" className="text-slate-700 hover:text-blue-600 transition">在线演示</Link>
              <Link href="/about" className="text-slate-700 hover:text-blue-600 transition">关于我们</Link>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              联系我们
            </button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              全球领先的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                {' '}行业大模型数据{' '}
              </span>
              服务商
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              为法律、金融、医疗等领域提供高质量、合规性强、定制化的数据支持和优化解决方案
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/demo">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center shadow-xl shadow-blue-500/30 text-lg font-medium">
                  开始使用
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl hover:border-blue-400 hover:text-blue-600 transition text-lg font-medium">
                  了解更多
                </button>
              </Link>
            </div>

            {/* 数据展示 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Users className="h-6 w-6" />, value: '15+', label: '年行业经验' },
                { icon: <CheckCircle className="h-6 w-6" />, value: '98%', label: '数据准确率' },
                { icon: <Globe className="h-6 w-6" />, value: '3+', label: '服务行业' },
                { icon: <TrendingUp className="h-6 w-6" />, value: '100%', label: '数据合规' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
                >
                  <div className="text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 核心竞争力 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">核心竞争力</h2>
            <p className="text-xl text-slate-600">专业团队 · 卓越技术 · 可信服务</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Database className="h-12 w-12 text-blue-600" />,
                title: '广泛的数据资源',
                desc: '覆盖法律、金融、医疗等领域的全方位数据采集渠道，确保数据来源广泛、合法且合规'
              },
              {
                icon: <Zap className="h-12 w-12 text-purple-600" />,
                title: '高效预处理能力',
                desc: '自主研发的数据处理平台，支持多种数据格式，准确率高达98%以上'
              },
              {
                icon: <Shield className="h-12 w-12 text-green-600" />,
                title: '合规安全保障',
                desc: '通过法律授权和隐私保护手段，确保数据的安全性与合法性，满足行业合规要求'
              },
              {
                icon: <Brain className="h-12 w-12 text-orange-600" />,
                title: '定制化优化',
                desc: '基于RLHF的数据增强服务，结合专家意见，优化数据内容以提升大模型性能'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务领域 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">服务领域</h2>
            <p className="text-xl text-slate-600">专注行业 · 深度服务</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '法律',
                icon: '⚖️',
                color: 'from-blue-500 to-blue-600',
                items: ['法律法规数据采集', '裁判文书智能处理', '合同模板数据库', '合规条款优化']
              },
              {
                title: '金融',
                icon: '💰',
                color: 'from-purple-500 to-purple-600',
                items: ['市场数据实时采集', 'KYC/AML合规数据', 'ESG数据服务', '风险评估数据分析']
              },
              {
                title: '医疗',
                icon: '🏥',
                color: 'from-green-500 to-green-600',
                items: ['医学文献数据库', '临床研究数据', '药物规范数据', '医疗器械合规信息']
              }
            ].map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-3xl mb-6`}>
                  {sector.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">{sector.title}</h3>
                <ul className="space-y-3">
                  {sector.items.map((item, j) => (
                    <li key={j} className="flex items-start text-slate-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              准备开始了吗？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              立即体验我们的数据服务，为您的大模型提供高质量数据支持
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demo">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-xl text-lg font-medium">
                  免费试用
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition text-lg font-medium">
                  联系销售
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="font-bold">律智人科技</div>
                  <div className="text-xs text-slate-400">LexoAvatar</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                全球领先的行业大模型数据资源供应商
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">服务</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/services" className="hover:text-white transition">数据采集</Link></li>
                <li><Link href="/services" className="hover:text-white transition">数据预处理</Link></li>
                <li><Link href="/services" className="hover:text-white transition">数据增强</Link></li>
                <li><Link href="/services" className="hover:text-white transition">RLHF优化</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">解决方案</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/solutions" className="hover:text-white transition">法律行业</Link></li>
                <li><Link href="/solutions" className="hover:text-white transition">金融行业</Link></li>
                <li><Link href="/solutions" className="hover:text-white transition">医疗行业</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">联系我们</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>📧 info@lexoavatar.com</li>
                <li>📧 contact@lexoavatar.com</li>
                <li>🌐 lexoavatar.com</li>
                <li>📍 新加坡</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 律智人科技有限公司 LexoAvatar Technology Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-white transition">隐私政策</Link>
              <Link href="/terms" className="hover:text-white transition">服务条款</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
