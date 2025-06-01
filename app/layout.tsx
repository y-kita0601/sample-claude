import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sample Claude',
  description: 'Next.js app created with Claude',
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