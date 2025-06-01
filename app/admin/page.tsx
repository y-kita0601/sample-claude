export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <p>システムの概要と主要な指標を確認できます</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>総ユーザー数</h3>
          <div className="stat-number">1,234</div>
          <div className="stat-change positive">+12% 今月</div>
        </div>
        <div className="stat-card">
          <h3>進行中プロジェクト</h3>
          <div className="stat-number">15</div>
          <div className="stat-change neutral">変動なし</div>
        </div>
        <div className="stat-card">
          <h3>完了プロジェクト</h3>
          <div className="stat-number">87</div>
          <div className="stat-change positive">+5 今月</div>
        </div>
        <div className="stat-card">
          <h3>システム稼働率</h3>
          <div className="stat-number">99.9%</div>
          <div className="stat-change positive">正常</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>最近のアクティビティ</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">10:30</span>
              <span className="activity-desc">新規ユーザーが登録されました</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">09:15</span>
              <span className="activity-desc">プロジェクト「ECサイト構築」が完了しました</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">08:45</span>
              <span className="activity-desc">サーバーメンテナンスが完了しました</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>進行中プロジェクト</h3>
          <div className="project-list">
            <div className="project-item">
              <div className="project-info">
                <h4>AI チャットボット開発</h4>
                <p>進捗: 75%</p>
              </div>
              <div className="project-status in-progress">進行中</div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h4>モバイルアプリ リニューアル</h4>
                <p>進捗: 40%</p>
              </div>
              <div className="project-status in-progress">進行中</div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h4>データ分析システム</h4>
                <p>進捗: 90%</p>
              </div>
              <div className="project-status nearly-complete">完了間近</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <h3>クイックアクション</h3>
        <div className="action-buttons">
          <button className="action-btn primary">新規プロジェクト作成</button>
          <button className="action-btn secondary">ユーザー招待</button>
          <button className="action-btn secondary">レポート生成</button>
          <button className="action-btn secondary">システム設定</button>
        </div>
      </div>
    </div>
  )
}