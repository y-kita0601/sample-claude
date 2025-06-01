import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'TechCorp 管理画面',
  description: 'TechCorp 管理システム',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>TechCorp Admin</h2>
        </div>
        <nav className="admin-nav">
          <ul>
            <li><a href="/admin" className="admin-nav-link">ダッシュボード</a></li>
            <li><a href="/admin/users" className="admin-nav-link">ユーザー管理</a></li>
            <li><a href="/admin/projects" className="admin-nav-link">プロジェクト管理</a></li>
            <li><a href="/admin/services" className="admin-nav-link">サービス管理</a></li>
            <li><a href="/admin/analytics" className="admin-nav-link">分析</a></li>
            <li><a href="/admin/settings" className="admin-nav-link">設定</a></li>
          </ul>
        </nav>
      </div>
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>管理画面</h1>
          </div>
          <div className="admin-header-right">
            <div className="admin-user">
              <span>管理者</span>
              <button className="admin-logout-btn">ログアウト</button>
            </div>
          </div>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}