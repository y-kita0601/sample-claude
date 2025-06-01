export default function ProjectsPage() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>プロジェクト管理</h2>
        <button className="btn btn-primary">新規プロジェクト作成</button>
      </div>
      
      <div className="page-content">
        <div className="projects-overview">
          <div className="overview-card">
            <h4>進行中</h4>
            <div className="overview-number">15</div>
          </div>
          <div className="overview-card">
            <h4>完了</h4>
            <div className="overview-number">87</div>
          </div>
          <div className="overview-card">
            <h4>保留中</h4>
            <div className="overview-number">3</div>
          </div>
          <div className="overview-card">
            <h4>今月完了</h4>
            <div className="overview-number">5</div>
          </div>
        </div>

        <div className="search-filter">
          <input 
            type="text" 
            placeholder="プロジェクトを検索..." 
            className="search-input"
          />
          <select className="filter-select">
            <option value="">すべてのステータス</option>
            <option value="in-progress">進行中</option>
            <option value="completed">完了</option>
            <option value="on-hold">保留中</option>
          </select>
        </div>

        <div className="projects-grid">
          <div className="project-card">
            <div className="project-header">
              <h3>AI チャットボット開発</h3>
              <span className="project-status in-progress">進行中</span>
            </div>
            <p className="project-description">
              カスタマーサポート向けのAIチャットボットシステムの開発
            </p>
            <div className="project-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <span className="progress-text">75%</span>
            </div>
            <div className="project-meta">
              <div className="project-date">開始日: 2024-01-15</div>
              <div className="project-team">チーム: 5名</div>
            </div>
            <div className="project-actions">
              <button className="action-btn primary">詳細</button>
              <button className="action-btn secondary">編集</button>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>モバイルアプリ リニューアル</h3>
              <span className="project-status in-progress">進行中</span>
            </div>
            <p className="project-description">
              既存モバイルアプリケーションのUI/UXリニューアル
            </p>
            <div className="project-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '40%'}}></div>
              </div>
              <span className="progress-text">40%</span>
            </div>
            <div className="project-meta">
              <div className="project-date">開始日: 2024-02-01</div>
              <div className="project-team">チーム: 3名</div>
            </div>
            <div className="project-actions">
              <button className="action-btn primary">詳細</button>
              <button className="action-btn secondary">編集</button>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>データ分析システム</h3>
              <span className="project-status nearly-complete">完了間近</span>
            </div>
            <p className="project-description">
              ビジネスインテリジェンス向けデータ分析プラットフォーム
            </p>
            <div className="project-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '90%'}}></div>
              </div>
              <span className="progress-text">90%</span>
            </div>
            <div className="project-meta">
              <div className="project-date">開始日: 2023-11-20</div>
              <div className="project-team">チーム: 7名</div>
            </div>
            <div className="project-actions">
              <button className="action-btn primary">詳細</button>
              <button className="action-btn secondary">編集</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}