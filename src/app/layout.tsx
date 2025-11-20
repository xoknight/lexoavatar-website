import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '律智人科技 - 全球领先的行业大模型数据服务商 | LexoAvatar',
  description: '律智人科技为法律、金融、医疗等行业提供高质量、合规的大模型数据采集、预处理和优化服务',
  keywords: '大模型数据,AI数据服务,法律数据,金融数据,医疗数据,RLHF,数据标注',
  authors: [{ name: 'LexoAvatar Technology Limited' }],
  openGraph: {
    title: '律智人科技 - LexoAvatar Technology',
    description: '全球领先的行业大模型数据资源供应商',
    url: 'https://lexoavatar.com',
    siteName: '律智人科技',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}
      <Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ID');
  `}
</Script>
</body>
    </html>
  )
}

// 在<body>标签内添加：

