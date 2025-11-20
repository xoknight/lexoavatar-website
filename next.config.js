/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  // 启用压缩
  compress: true,
  // 生成sitemap
  generateBuildId: async () => {
    return 'lexoavatar-build-' + Date.now()
  },
  // 如果部署到子路径，取消下面注释
  // basePath: '/subfolder',
  // assetPrefix: '/subfolder'
}

module.exports = nextConfig