'use client'

import { useState, useEffect } from 'react'
import { Database } from '@/lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: ProjectInsert) => Promise<{ success: boolean; error?: string }>
  project?: Project | null
  title: string
}

export default function ProjectModal({ isOpen, onClose, onSave, project, title }: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectInsert>({
    name: '',
    description: '',
    status: 'in-progress',
    progress: 0,
    start_date: new Date().toISOString().split('T')[0],
    team_size: 1
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        progress: project.progress,
        start_date: project.start_date.split('T')[0],
        team_size: project.team_size
      })
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'in-progress',
        progress: 0,
        start_date: new Date().toISOString().split('T')[0],
        team_size: 1
      })
    }
  }, [project, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await onSave(formData)
    
    if (result.success) {
      onClose()
    }
    
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">プロジェクト名 *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">説明 *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">ステータス</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            >
              <option value="in-progress">進行中</option>
              <option value="completed">完了</option>
              <option value="on-hold">保留中</option>
              <option value="nearly-complete">完了間近</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="progress">進捗 (%)</label>
            <input
              type="number"
              id="progress"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_date">開始日</label>
            <input
              type="date"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team_size">チーム人数</label>
            <input
              type="number"
              id="team_size"
              min="1"
              value={formData.team_size}
              onChange={(e) => setFormData(prev => ({ ...prev, team_size: parseInt(e.target.value) || 1 }))}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              キャンセル
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}