'use client'

import { useState, useMemo } from 'react'
import { useUsers } from '@/hooks/useUsers'
import UserModal from '@/components/UserModal'
import { Database } from '@/lib/database.types'

type User = Database['public']['Tables']['users']['Row']

export default function UsersPage() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !roleFilter || user.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [users, searchQuery, roleFilter])

  const handleCreateUser = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = async (userData: any) => {
    if (editingUser) {
      return await updateUser(editingUser.id, userData)
    } else {
      return await createUser(userData)
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('このユーザーを削除しますか？')) {
      await deleteUser(id)
    }
  }

  const getRoleBadgeText = (role: string) => {
    switch (role) {
      case 'admin': return '管理者'
      case 'user': return '一般ユーザー'
      case 'guest': return 'ゲスト'
      default: return role
    }
  }

  const getStatusBadgeText = (status: string) => {
    switch (status) {
      case 'active': return 'アクティブ'
      case 'inactive': return '非アクティブ'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="error">エラー: {error}</div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>ユーザー管理</h2>
        <button className="btn btn-primary" onClick={handleCreateUser}>
          新規ユーザー追加
        </button>
      </div>
      
      <div className="page-content">
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="ユーザーを検索..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id.substring(0, 8)}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {getRoleBadgeText(user.role)}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('ja-JP')}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {getStatusBadgeText(user.status)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditUser(user)}
                    >
                      編集
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    ユーザーが見つかりません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="pagination-info">
            {filteredUsers.length} 件中 {filteredUsers.length} 件表示
          </span>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
        title={editingUser ? 'ユーザー編集' : '新規ユーザー追加'}
      />
    </div>
  )
}