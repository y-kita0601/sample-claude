export default function UsersPage() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>ユーザー管理</h2>
        <button className="btn btn-primary">新規ユーザー追加</button>
      </div>
      
      <div className="page-content">
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="ユーザーを検索..." 
            className="search-input"
          />
          <select className="filter-select">
            <option value="">すべてのロール</option>
            <option value="admin">管理者</option>
            <option value="user">一般ユーザー</option>
            <option value="guest">ゲスト</option>
          </select>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>ロール</th>
                <th>登録日</th>
                <th>ステータス</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>田中 太郎</td>
                <td>tanaka@example.com</td>
                <td><span className="role-badge admin">管理者</span></td>
                <td>2024-01-15</td>
                <td><span className="status-badge active">アクティブ</span></td>
                <td>
                  <button className="action-btn edit">編集</button>
                  <button className="action-btn delete">削除</button>
                </td>
              </tr>
              <tr>
                <td>002</td>
                <td>佐藤 花子</td>
                <td>sato@example.com</td>
                <td><span className="role-badge user">一般ユーザー</span></td>
                <td>2024-02-20</td>
                <td><span className="status-badge active">アクティブ</span></td>
                <td>
                  <button className="action-btn edit">編集</button>
                  <button className="action-btn delete">削除</button>
                </td>
              </tr>
              <tr>
                <td>003</td>
                <td>山田 次郎</td>
                <td>yamada@example.com</td>
                <td><span className="role-badge user">一般ユーザー</span></td>
                <td>2024-03-10</td>
                <td><span className="status-badge inactive">非アクティブ</span></td>
                <td>
                  <button className="action-btn edit">編集</button>
                  <button className="action-btn delete">削除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button className="pagination-btn">前へ</button>
          <span className="pagination-info">1 / 10 ページ</span>
          <button className="pagination-btn">次へ</button>
        </div>
      </div>
    </div>
  )
}