const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.lexoavatar.com'

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// 获取模型列表
export async function getModels() {
  return fetchAPI('/api/models')
}

// 获取行业列表
export async function getIndustries() {
  return fetchAPI('/api/industries')
}

// 健康检查
export async function healthCheck() {
  return fetchAPI('/health')
}