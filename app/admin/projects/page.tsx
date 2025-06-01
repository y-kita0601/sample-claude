'use client'

import { useState, useMemo } from 'react'
import { useProjects } from '@/hooks/useProjects'
import ProjectModal from '@/components/ProjectModal'
import { Database } from '@/lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']

export default function ProjectsPage() {
  const { projects, loading, error, stats, createProject, updateProject, deleteProject } = useProjects()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !statusFilter || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [projects, searchQuery, statusFilter])

  const handleCreateProject = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleSaveProject = async (projectData: any) => {
    if (editingProject) {
      return await updateProject(editingProject.id, projectData)
    } else {
      return await createProject(projectData)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('このプロジェクトを削除しますか？')) {
      await deleteProject(id)
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return '進行中'
      case 'completed': return '完了'
      case 'on-hold': return '保留中'
      case 'nearly-complete': return '完了間近'
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
        <h2>プロジェクト管理</h2>
        <button className="btn btn-primary" onClick={handleCreateProject}>
          新規プロジェクト作成
        </button>
      </div>
      
      <div className="page-content">
        <div className="projects-overview">
          <div className="overview-card">
            <h4>進行中</h4>
            <div className="overview-number">{stats.inProgress}</div>
          </div>
          <div className="overview-card">
            <h4>完了</h4>
            <div className="overview-number">{stats.completed}</div>
          </div>
          <div className="overview-card">
            <h4>保留中</h4>
            <div className="overview-number">{stats.onHold}</div>
          </div>
          <div className="overview-card">
            <h4>完了間近</h4>
            <div className="overview-number">{stats.nearlyComplete}</div>
          </div>
        </div>

        <div className="search-filter">
          <input 
            type="text" 
            placeholder="プロジェクトを検索..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">すべてのステータス</option>
            <option value="in-progress">進行中</option>
            <option value="completed">完了</option>
            <option value="on-hold">保留中</option>
            <option value="nearly-complete">完了間近</option>
          </select>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`project-status ${project.status}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              <p className="project-description">
                {project.description}
              </p>
              <div className="project-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${project.progress}%`}}></div>
                </div>
                <span className="progress-text">{project.progress}%</span>
              </div>
              <div className="project-meta">
                <div className="project-date">
                  開始日: {new Date(project.start_date).toLocaleDateString('ja-JP')}
                </div>
                <div className="project-team">チーム: {project.team_size}名</div>
              </div>
              <div className="project-actions">
                <button 
                  className="action-btn secondary"
                  onClick={() => handleEditProject(project)}
                >
                  編集
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              プロジェクトが見つかりません
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
        title={editingProject ? 'プロジェクト編集' : '新規プロジェクト作成'}
      />
    </div>
  )
}