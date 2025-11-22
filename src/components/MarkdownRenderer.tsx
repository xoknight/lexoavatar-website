'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 自定义标题样式
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-slate-900" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 text-slate-900" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-900" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-2 text-slate-900" {...props} />,

          // 自定义段落样式
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,

          // 自定义列表样式
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,

          // 自定义链接样式
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),

          // 自定义代码块样式
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match

            if (isInline) {
              return (
                <code
                  className="bg-slate-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },

          // 自定义代码块容器样式
          pre: ({ node, ...props }) => (
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props} />
          ),

          // 自定义引用样式
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4" {...props} />
          ),

          // 自定义表格样式
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-slate-300" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-slate-100" {...props} />,
          th: ({ node, ...props }) => (
            <th className="border border-slate-300 px-4 py-2 text-left font-semibold text-slate-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-slate-300 px-4 py-2 text-slate-700" {...props} />
          ),

          // 自定义水平线样式
          hr: ({ node, ...props }) => <hr className="my-6 border-slate-300" {...props} />,

          // 自定义强调样式
          strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
          em: ({ node, ...props }) => <em className="italic text-slate-700" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
