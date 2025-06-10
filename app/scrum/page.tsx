'use client'

import { useState } from 'react'

type Phase = 'backlog' | 'daily' | 'retro'

interface BacklogItem {
  id: string
  title: string
  description: string
  storyPoints: number
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'inprogress' | 'done'
}

interface DailyUpdate {
  id: string
  member: string
  yesterday: string
  today: string
  blockers: string
  date: string
}

interface RetroItem {
  id: string
  type: 'good' | 'bad' | 'improve'
  content: string
  votes: number
}

export default function ScrumManagement() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('backlog')
  const [sprintNumber, setSprintNumber] = useState(1)
  
  // Backlog state
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([])
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    storyPoints: 1,
    priority: 'medium' as const
  })
  
  // Daily meeting state
  const [dailyUpdates, setDailyUpdates] = useState<DailyUpdate[]>([])
  const [newUpdate, setNewUpdate] = useState({
    member: '',
    yesterday: '',
    today: '',
    blockers: ''
  })
  
  // Retrospective state
  const [retroItems, setRetroItems] = useState<RetroItem[]>([])
  const [newRetroItem, setNewRetroItem] = useState({
    type: 'good' as const,
    content: ''
  })

  // Backlog functions
  const addBacklogItem = () => {
    if (newItem.title.trim()) {
      const item: BacklogItem = {
        id: Date.now().toString(),
        ...newItem,
        status: 'todo'
      }
      setBacklogItems([...backlogItems, item])
      setNewItem({ title: '', description: '', storyPoints: 1, priority: 'medium' })
    }
  }

  const updateItemStatus = (id: string, status: BacklogItem['status']) => {
    setBacklogItems(items => 
      items.map(item => item.id === id ? { ...item, status } : item)
    )
  }

  const deleteBacklogItem = (id: string) => {
    setBacklogItems(items => items.filter(item => item.id !== id))
  }

  // Daily meeting functions
  const addDailyUpdate = () => {
    if (newUpdate.member.trim() && newUpdate.today.trim()) {
      const update: DailyUpdate = {
        id: Date.now().toString(),
        ...newUpdate,
        date: new Date().toLocaleDateString('ja-JP')
      }
      setDailyUpdates([update, ...dailyUpdates])
      setNewUpdate({ member: '', yesterday: '', today: '', blockers: '' })
    }
  }

  const deleteDailyUpdate = (id: string) => {
    setDailyUpdates(updates => updates.filter(update => update.id !== id))
  }

  // Retrospective functions
  const addRetroItem = () => {
    if (newRetroItem.content.trim()) {
      const item: RetroItem = {
        id: Date.now().toString(),
        ...newRetroItem,
        votes: 0
      }
      setRetroItems([...retroItems, item])
      setNewRetroItem({ type: 'good', content: '' })
    }
  }

  const voteRetroItem = (id: string) => {
    setRetroItems(items =>
      items.map(item => 
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    )
  }

  const deleteRetroItem = (id: string) => {
    setRetroItems(items => items.filter(item => item.id !== id))
  }

  const nextSprint = () => {
    setSprintNumber(prev => prev + 1)
    setBacklogItems(items => items.map(item => ({ ...item, status: 'todo' })))
    setDailyUpdates([])
    setRetroItems([])
    setCurrentPhase('backlog')
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>スクラム開発管理ツール</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
            スプリント {sprintNumber} - 2週間開発サイクル
          </p>
        </div>
        <div className="admin-header-right">
          <button 
            onClick={nextSprint}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            次のスプリント開始
          </button>
        </div>
      </header>

      {/* Phase Navigation */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {[
              { key: 'backlog', label: 'バックログ管理', icon: '📋' },
              { key: 'daily', label: 'デイリースタンドアップ', icon: '🗣️' },
              { key: 'retro', label: 'スプリント振り返り', icon: '🔄' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPhase(key as Phase)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '1rem 0',
                  cursor: 'pointer',
                  borderBottom: currentPhase === key ? '2px solid #2563eb' : '2px solid transparent',
                  color: currentPhase === key ? '#2563eb' : '#6b7280',
                  fontWeight: currentPhase === key ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Backlog Phase */}
        {currentPhase === 'backlog' && (
          <div>
            <div className="page-header">
              <h2>プロダクトバックログ</h2>
              <p style={{ margin: 0, color: '#6b7280' }}>
                ユーザーストーリーを作成・管理し、スプリント計画を立てます
              </p>
            </div>

            {/* Add New Item Form */}
            <div className="page-content" style={{ marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>新しいバックログアイテム</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>タイトル</label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="ユーザーストーリーのタイトル"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>ストーリーポイント</label>
                    <select
                      value={newItem.storyPoints}
                      onChange={(e) => setNewItem({ ...newItem, storyPoints: Number(e.target.value) })}
                    >
                      {[1, 2, 3, 5, 8, 13].map(point => (
                        <option key={point} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>優先度</label>
                    <select
                      value={newItem.priority}
                      onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as any })}
                    >
                      <option value="high">高</option>
                      <option value="medium">中</option>
                      <option value="low">低</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>説明</label>
                    <input
                      type="text"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="詳細説明"
                    />
                  </div>
                  <button onClick={addBacklogItem} className="btn btn-primary">追加</button>
                </div>
              </div>
            </div>

            {/* Backlog Items */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              {['todo', 'inprogress', 'done'].map(status => (
                <div key={status} className="page-content">
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      marginBottom: '1rem', 
                      color: '#1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {status === 'todo' && '📝 To Do'}
                      {status === 'inprogress' && '⚡ In Progress'}
                      {status === 'done' && '✅ Done'}
                      <span style={{ 
                        fontSize: '0.75rem', 
                        background: '#f3f4f6', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '1rem',
                        color: '#6b7280'
                      }}>
                        {backlogItems.filter(item => item.status === status).length}
                      </span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {backlogItems
                        .filter(item => item.status === status)
                        .map(item => (
                          <div key={item.id} className="service-card" style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                              <h4 style={{ margin: 0, fontSize: '1rem', color: '#1f2937' }}>{item.title}</h4>
                              <span className={`role-badge ${item.priority}`} style={{ fontSize: '0.7rem' }}>
                                {item.priority === 'high' && '高'}
                                {item.priority === 'medium' && '中'}
                                {item.priority === 'low' && '低'}
                              </span>
                            </div>
                            {item.description && (
                              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0' }}>
                                {item.description}
                              </p>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                SP: {item.storyPoints}
                              </span>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {status !== 'todo' && (
                                  <button
                                    onClick={() => updateItemStatus(item.id, status === 'inprogress' ? 'todo' : 'inprogress')}
                                    className="action-btn secondary"
                                    style={{ fontSize: '0.7rem' }}
                                  >
                                    ←
                                  </button>
                                )}
                                {status !== 'done' && (
                                  <button
                                    onClick={() => updateItemStatus(item.id, status === 'todo' ? 'inprogress' : 'done')}
                                    className="action-btn primary"
                                    style={{ fontSize: '0.7rem' }}
                                  >
                                    →
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteBacklogItem(item.id)}
                                  className="action-btn delete"
                                  style={{ fontSize: '0.7rem' }}
                                >
                                  削除
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Meeting Phase */}
        {currentPhase === 'daily' && (
          <div>
            <div className="page-header">
              <h2>デイリースタンドアップ</h2>
              <p style={{ margin: 0, color: '#6b7280' }}>
                チームメンバーの進捗状況と課題を共有します
              </p>
            </div>

            {/* Add Daily Update Form */}
            <div className="page-content" style={{ marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>今日の更新</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <div className="form-group">
                      <label>メンバー名</label>
                      <input
                        type="text"
                        value={newUpdate.member}
                        onChange={(e) => setNewUpdate({ ...newUpdate, member: e.target.value })}
                        placeholder="メンバー名を入力"
                      />
                    </div>
                    <div className="form-group">
                      <label>昨日やったこと</label>
                      <textarea
                        value={newUpdate.yesterday}
                        onChange={(e) => setNewUpdate({ ...newUpdate, yesterday: e.target.value })}
                        placeholder="昨日の作業内容"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label>今日やること</label>
                      <textarea
                        value={newUpdate.today}
                        onChange={(e) => setNewUpdate({ ...newUpdate, today: e.target.value })}
                        placeholder="今日の予定"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>ブロッカー・課題</label>
                      <textarea
                        value={newUpdate.blockers}
                        onChange={(e) => setNewUpdate({ ...newUpdate, blockers: e.target.value })}
                        placeholder="課題や困っていること"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                <button onClick={addDailyUpdate} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  更新を追加
                </button>
              </div>
            </div>

            {/* Daily Updates List */}
            <div className="page-content">
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
                  最近の更新 ({dailyUpdates.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dailyUpdates.map(update => (
                    <div key={update.id} className="service-card" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, color: '#1f2937' }}>{update.member}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{update.date}</span>
                          <button
                            onClick={() => deleteDailyUpdate(update.id)}
                            className="action-btn delete"
                            style={{ fontSize: '0.75rem' }}
                          >
                            削除
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.875rem' }}>昨日やったこと</h5>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            {update.yesterday || '記載なし'}
                          </p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.875rem' }}>今日やること</h5>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            {update.today}
                          </p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.875rem' }}>ブロッカー</h5>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: update.blockers ? '#ef4444' : '#6b7280' }}>
                            {update.blockers || 'なし'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {dailyUpdates.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                      まだ更新がありません。上のフォームから追加してください。
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Retrospective Phase */}
        {currentPhase === 'retro' && (
          <div>
            <div className="page-header">
              <h2>スプリント振り返り</h2>
              <p style={{ margin: 0, color: '#6b7280' }}>
                スプリントの成果と改善点を振り返ります
              </p>
            </div>

            {/* Add Retro Item Form */}
            <div className="page-content" style={{ marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>振り返り項目追加</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
                  <div className="form-group" style={{ marginBottom: 0, minWidth: '120px' }}>
                    <label>カテゴリ</label>
                    <select
                      value={newRetroItem.type}
                      onChange={(e) => setNewRetroItem({ ...newRetroItem, type: e.target.value as any })}
                    >
                      <option value="good">Keep (良かったこと)</option>
                      <option value="bad">Problem (問題点)</option>
                      <option value="improve">Try (改善案)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                    <label>内容</label>
                    <input
                      type="text"
                      value={newRetroItem.content}
                      onChange={(e) => setNewRetroItem({ ...newRetroItem, content: e.target.value })}
                      placeholder="振り返り内容を入力"
                    />
                  </div>
                  <button onClick={addRetroItem} className="btn btn-primary">追加</button>
                </div>
              </div>
            </div>

            {/* Retrospective Items */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              {[
                { key: 'good', label: 'Keep (良かったこと)', icon: '✅', color: '#10b981' },
                { key: 'bad', label: 'Problem (問題点)', icon: '⚠️', color: '#ef4444' },
                { key: 'improve', label: 'Try (改善案)', icon: '💡', color: '#f59e0b' }
              ].map(({ key, label, icon, color }) => (
                <div key={key} className="page-content">
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      marginBottom: '1rem', 
                      color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {icon} {label}
                      <span style={{ 
                        fontSize: '0.75rem', 
                        background: '#f3f4f6', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '1rem',
                        color: '#6b7280'
                      }}>
                        {retroItems.filter(item => item.type === key).length}
                      </span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {retroItems
                        .filter(item => item.type === key)
                        .sort((a, b) => b.votes - a.votes)
                        .map(item => (
                          <div key={item.id} className="service-card" style={{ padding: '1rem' }}>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#374151' }}>
                              {item.content}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                  onClick={() => voteRetroItem(item.id)}
                                  style={{
                                    background: color,
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  👍 {item.votes}
                                </button>
                              </div>
                              <button
                                onClick={() => deleteRetroItem(item.id)}
                                className="action-btn delete"
                                style={{ fontSize: '0.75rem' }}
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}