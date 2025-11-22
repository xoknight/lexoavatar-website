# 部署指南

## 📋 部署概述

本项目包含两个部分需要部署：
1. **前端页面** - 部署到 Cloudflare Pages
2. **API服务** - 部署到支持Node.js的服务器（Vercel/Railway/自建）

## 🚀 快速部署

### 方案一：Vercel（推荐 - 最简单）

Vercel同时部署前端和API，零配置：

1. **连接GitHub仓库**
   ```bash
   # 访问 https://vercel.com
   # 点击 "New Project"
   # 导入你的GitHub仓库
   ```

2. **配置环境变量**
   在Vercel项目设置中添加：
   ```
   OPENAI_API_KEY=sk-your-key
   ANTHROPIC_API_KEY=sk-ant-your-key
   GOOGLE_AI_API_KEY=your-google-key
   ```

3. **部署**
   - Vercel自动检测Next.js项目
   - 自动构建和部署
   - 获得生产环境URL（如：https://your-app.vercel.app）

### 方案二：Cloudflare Pages + 独立API服务器

#### A. 部署前端到Cloudflare Pages

**步骤：**

1. **构建静态页面（如果需要）**
   ```bash
   npm run build
   ```

2. **连接GitHub到Cloudflare Pages**
   - 访问 https://dash.cloudflare.com/
   - 进入 "Pages"
   - 点击 "Create a project"
   - 连接你的GitHub仓库

3. **配置构建设置**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Node version: 20
   ```

4. **部署**
   - Cloudflare自动构建
   - 获得URL（如：https://your-app.pages.dev）

#### B. 部署API服务器

**选项1：Railway**

1. 访问 https://railway.app
2. 连接GitHub仓库
3. 添加环境变量（同Vercel）
4. 自动部署

**选项2：自建服务器（Docker）**

创建 `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

部署：
```bash
docker build -t ai-chat .
docker run -d -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e ANTHROPIC_API_KEY=sk-ant-your-key \
  -e GOOGLE_AI_API_KEY=your-google-key \
  ai-chat
```

## 🔐 环境变量配置

### 必需的环境变量

```bash
# OpenAI（至少配置一个）
OPENAI_API_KEY=sk-proj-xxxxx

# Anthropic Claude（可选）
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Google Gemini（可选）
GOOGLE_AI_API_KEY=AIzaxxxxx
```

### 获取API密钥

| 服务商 | 获取链接 | 说明 |
|--------|---------|------|
| OpenAI | https://platform.openai.com/api-keys | 需要信用卡 |
| Anthropic | https://console.anthropic.com/settings/keys | 需要申请 |
| Google AI | https://makersuite.google.com/app/apikey | 免费配额 |

### 在不同平台设置环境变量

**Vercel:**
```
Project Settings > Environment Variables > Add
```

**Cloudflare Pages:**
```
Settings > Environment Variables > Add Variable
```

**Railway:**
```
Variables Tab > Add Variable
```

## 📦 部署前检查清单

- [ ] 所有依赖已安装（`npm install`）
- [ ] 代码已提交到GitHub
- [ ] `.env.local` 文件已添加到 `.gitignore`（不要提交密钥！）
- [ ] 至少配置了一个AI API密钥
- [ ] 本地测试通过（`npm run dev`）
- [ ] 生产构建成功（`npm run build`）

## 🔄 CI/CD 自动部署

### GitHub Actions 自动部署到Vercel

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🌍 域名配置

### Vercel 自定义域名

1. 进入项目设置 > Domains
2. 添加你的域名（如：chat.yourdomain.com）
3. 在DNS提供商添加CNAME记录：
   ```
   chat.yourdomain.com → cname.vercel-dns.com
   ```

### Cloudflare Pages 自定义域名

1. Pages项目 > Custom Domains
2. 添加域名
3. Cloudflare自动配置DNS

## 🔧 生产环境优化

### 1. 启用缓存

在 `next.config.ts` 中：
```typescript
const nextConfig = {
  // 静态资源缓存
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp|gif)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### 2. 压缩响应

Vercel和Cloudflare自动启用Gzip/Brotli压缩。

### 3. 监控和日志

**Vercel:**
- 内置分析（Analytics）
- 实时日志（Logs）
- 性能监控（Speed Insights）

**自建服务器:**
```typescript
// 添加日志记录
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
```

## 🐛 常见部署问题

### 问题1：API密钥未生效

**原因：** 环境变量未正确设置

**解决：**
1. 检查环境变量名称是否正确
2. 重新部署（有些平台需要手动触发）
3. 检查是否有拼写错误

### 问题2：流式响应不工作

**原因：** 某些CDN或代理会缓冲流式响应

**解决：**
- Vercel: 无需配置，原生支持
- Cloudflare: 确保 "Auto Minify" 中的 HTML 未勾选
- Nginx: 添加 `proxy_buffering off;`

### 问题3：构建失败

**常见错误：**

```bash
# 内存不足
Error: Heap out of memory

# 解决：增加Node.js内存
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

```bash
# 依赖缺失
Module not found

# 解决：清除缓存重装
rm -rf node_modules package-lock.json
npm install
```

### 问题4：CORS错误

**解决：** 在 `next.config.ts` 添加：
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
      ],
    },
  ]
}
```

## 📊 性能监控

### Vercel Analytics

免费内置，自动启用：
- 页面加载时间
- Core Web Vitals
- 地理位置分布

### Google Analytics

在 `src/app/layout.tsx` 添加：
```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 💰 成本估算

| 服务 | 免费额度 | 付费价格 |
|------|---------|---------|
| **托管平台** |
| Vercel | 100GB带宽/月 | $20/月起 |
| Cloudflare Pages | 无限带宽 | 免费（Pro $20/月）|
| Railway | $5免费额度 | 按使用量计费 |
| **AI API** |
| OpenAI GPT-3.5 | - | $0.5/1M tokens |
| OpenAI GPT-4 | - | $10/1M tokens |
| Claude 3.5 Sonnet | - | $3/1M tokens |
| Google Gemini Flash | 免费层 | $0.075/1M tokens |

## 🔒 安全建议

### 1. 添加速率限制

```typescript
// 使用 upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  // 继续处理请求...
}
```

### 2. 添加认证

```typescript
// 简单的API密钥认证
export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key')

  if (apiKey !== process.env.API_SECRET_KEY) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 继续处理请求...
}
```

### 3. 限制请求大小

在 `next.config.ts`:
```typescript
module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
```

## 📝 更新部署

### 方式1：Git推送自动部署

```bash
git add .
git commit -m "Update features"
git push origin main
# Vercel/Cloudflare自动部署
```

### 方式2：手动触发部署

在平台控制台点击 "Redeploy" 按钮

### 方式3：回滚到之前版本

Vercel和Cloudflare都支持一键回滚到历史部署

## 🎉 部署成功后

1. ✅ 测试所有AI模型
2. ✅ 检查流式输出
3. ✅ 验证Markdown渲染
4. ✅ 测试错误处理
5. ✅ 配置监控告警
6. ✅ 设置自定义域名
7. ✅ 添加Google Analytics（可选）

---

**推荐部署方案**: Vercel（最简单，免费额度足够）

**备选方案**: Cloudflare Pages（前端）+ Railway（API）

祝部署顺利！🚀
