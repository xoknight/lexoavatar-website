'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, Scale, DollarSign, Heart } from 'lucide-react'

export default function SolutionsPage() {
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">行业解决方案</h1>
            <p className="text-xl text-slate-600">针对不同行业的专业数据服务</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scale className="h-16 w-16" />,
                title: '法律行业',
                color: 'from-blue-500 to-blue-600',
                solutions: [
                  '法律法规数据库',
                  '裁判文书分析',
                  '合同智能审查',
                  '法律咨询辅助',
                  '合规风险评估'
                ]
              },
              {
                icon: <DollarSign className="h-16 w-16" />,
                title: '金融行业',
                color: 'from-purple-500 to-purple-600',
                solutions: [
                  '市场分析数据',
                  '风险评估模型',
                  'KYC/AML合规',
                  'ESG数据服务',
                  '智能投研助手'
                ]
              },
              {
                icon: <Heart className="h-16 w-16" />,
                title: '医疗行业',
                color: 'from-green-500 to-green-600',
                solutions: [
                  '医学文献检索',
                  '临床数据分析',
                  '药物研发支持',
                  '诊疗辅助系统',
                  '医疗器械合规'
                ]
              }
            ].map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center text-white mb-6 mx-auto`}>
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">{solution.title}</h3>
                <ul className="space-y-3">
                  {solution.solutions.map((item, j) => (
                    <li key={j} className="text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                      {item}
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