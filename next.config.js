/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出（Cloudflare Pages需要）
  images: {
    unoptimized: true  // Cloudflare Pages需要
  },
  // 如果部署到子路径，取消下面注释
  // basePath: '/subfolder',
  // assetPrefix: '/subfolder'
}

module.exports = nextConfig