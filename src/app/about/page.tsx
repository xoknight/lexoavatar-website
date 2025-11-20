'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, Mail, Globe, MapPin } from 'lucide-react'

export default function AboutPage() {
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
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">关于我们</h1>
            <p className="text-xl text-slate-600">致力于成为全球领先的行业大模型数据服务商</p>
          </motion.div>

          <div className="space-y-8">
            {/* 公司简介 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">公司简介</h2>
              <div className="text-slate-600 space-y-4 leading-relaxed">
                <p>
                  <strong>律智人科技有限公司</strong>（LexoAvatar Technology Limited）由一支拥有超过15年数据资源服务与人工智能技术经验的核心团队创建。
                </p>
                <p>
                  我们专注于为跨行业的大模型开发与应用提供端到端的数据服务及解决方案，通过合法手段获取优质数据，结合领先的技术平台和行业专家团队，为客户提供数据采集、预处理、增强优化和定制化交付服务。
                </p>
              </div>
            </motion.div>

            {/* 公司愿景 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">公司愿景</h2>
              <p className="text-slate-600 leading-relaxed">
                成为全球领先的行业大模型数据资源供应商，为法律、金融、医疗等领域提供高质量、合规性强、定制化的数据支持和优化解决方案，助力客户的大模型产品创新与落地。
              </p>
            </motion.div>

            {/* 联系方式 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">联系我们</h2>
              <div className="space-y-4">
                <div className="flex items-center text-slate-600">
                  <Mail className="h-5 w-5 mr-3 text-blue-600" />
                  <span>info@lexoavatar.com</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Mail className="h-5 w-5 mr-3 text-blue-600" />
                  <span>contact@lexoavatar.com</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Globe className="h-5 w-5 mr-3 text-blue-600" />
                  <span>https://lexoavatar.com</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                  <span>新加坡</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
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