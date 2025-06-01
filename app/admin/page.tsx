'use client'

import { useUsers } from '@/hooks/useUsers'
import { useProjects } from '@/hooks/useProjects'

export default function AdminDashboard() {
  const { users, loading: usersLoading } = useUsers()
  const { projects, stats, loading: projectsLoading } = useProjects()

  const recentProjects = projects
    .filter(p => p.status === 'in-progress' || p.status === 'nearly-complete')
    .slice(0, 3)

  const activeUsers = users.filter(u => u.status === 'active').length

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return '進行中'
      case 'completed': return '完了'
      case 'on-hold': return '保留中'
      case 'nearly-complete': return '完了間近'
      default: return status
    }
  }

  if (usersLoading || projectsLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <p>システムの概要と主要な指標を確認できます</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>総ユーザー数</h3>
          <div className="stat-number">{users.length}</div>
          <div className="stat-change neutral">登録ユーザー</div>
        </div>
        <div className="stat-card">
          <h3>アクティブユーザー</h3>
          <div className="stat-number">{activeUsers}</div>
          <div className="stat-change positive">オンライン</div>
        </div>
        <div className="stat-card">
          <h3>進行中プロジェクト</h3>
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-change neutral">作業中</div>
        </div>
        <div className="stat-card">
          <h3>完了プロジェクト</h3>
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-change positive">完了済み</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>最近のアクティビティ</h3>
          <div className="activity-list">
            {users.slice(0, 3).map((user, index) => (
              <div key={user.id} className="activity-item">
                <span className="activity-time">
                  {new Date(user.created_at).toLocaleTimeString('ja-JP', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span className="activity-desc">
                  ユーザー「{user.name}」が登録されました
                </span>
              </div>
            ))}
            {users.length === 0 && (
              <div className="activity-item">
                <span className="activity-desc">アクティビティがありません</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>進行中プロジェクト</h3>
          <div className="project-list">
            {recentProjects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-info">
                  <h4>{project.name}</h4>
                  <p>進捗: {project.progress}%</p>
                </div>
                <div className={`project-status ${project.status}`}>
                  {getStatusText(project.status)}
                </div>
              </div>
            ))}
            {recentProjects.length === 0 && (
              <div className="project-item">
                <div className="project-info">
                  <h4>進行中のプロジェクトはありません</h4>
                  <p>新しいプロジェクトを作成してください</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <h3>クイックアクション</h3>
        <div className="action-buttons">
          <a href="/admin/projects" className="action-btn primary">新規プロジェクト作成</a>
          <a href="/admin/users" className="action-btn secondary">ユーザー管理</a>
          <a href="/admin/projects" className="action-btn secondary">プロジェクト管理</a>
          <button className="action-btn secondary">システム設定</button>
        </div>
      </div>
    </div>
  )
}