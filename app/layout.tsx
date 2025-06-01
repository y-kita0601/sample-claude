import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechCorp | 革新的ITソリューション',
  description: 'TechCorpは最先端の技術とイノベーションで企業のデジタル変革を支援するITソリューション企業です。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}