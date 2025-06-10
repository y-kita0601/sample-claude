import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type Sprint = Database['public']['Tables']['sprints']['Row']
type SprintInsert = Database['public']['Tables']['sprints']['Insert']
type SprintUpdate = Database['public']['Tables']['sprints']['Update']

type BacklogItem = Database['public']['Tables']['backlog_items']['Row']
type BacklogItemInsert = Database['public']['Tables']['backlog_items']['Insert']
type BacklogItemUpdate = Database['public']['Tables']['backlog_items']['Update']

type DailyUpdate = Database['public']['Tables']['daily_updates']['Row']
type DailyUpdateInsert = Database['public']['Tables']['daily_updates']['Insert']
type DailyUpdateUpdate = Database['public']['Tables']['daily_updates']['Update']

type RetroItem = Database['public']['Tables']['retro_items']['Row']
type RetroItemInsert = Database['public']['Tables']['retro_items']['Insert']
type RetroItemUpdate = Database['public']['Tables']['retro_items']['Update']

export function useScrum() {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [currentSprint, setCurrentSprint] = useState<Sprint | null>(null)
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([])
  const [dailyUpdates, setDailyUpdates] = useState<DailyUpdate[]>([])
  const [retroItems, setRetroItems] = useState<RetroItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // スプリント管理
  const fetchSprints = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('sprints')
        .select('*')
        .order('number', { ascending: false })

      if (error) throw error
      setSprints(data || [])
      
      // アクティブなスプリントを現在のスプリントとして設定
      const activeSprint = data?.find(sprint => sprint.status === 'active')
      if (activeSprint) {
        setCurrentSprint(activeSprint)
      } else if (data && data.length > 0) {
        setCurrentSprint(data[0])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sprints')
    }
  }, [])

  const createSprint = async (sprint: SprintInsert) => {
    try {
      const { data, error } = await supabase
        .from('sprints')
        .insert(sprint)
        .select()
        .single()

      if (error) throw error
      setSprints(prev => [data, ...prev])
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create sprint'
      setError(message)
      return { success: false, error: message }
    }
  }

  const updateSprint = async (id: string, updates: SprintUpdate) => {
    try {
      const { data, error } = await supabase
        .from('sprints')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setSprints(prev => prev.map(sprint => sprint.id === id ? data : sprint))
      if (currentSprint?.id === id) {
        setCurrentSprint(data)
      }
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update sprint'
      setError(message)
      return { success: false, error: message }
    }
  }

  // バックログアイテム管理
  const fetchBacklogItems = useCallback(async (sprintId: string) => {
    try {
      const { data, error } = await supabase
        .from('backlog_items')
        .select('*')
        .eq('sprint_id', sprintId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBacklogItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch backlog items')
    }
  }, [])

  const createBacklogItem = async (item: Omit<BacklogItemInsert, 'sprint_id'>) => {
    if (!currentSprint) return { success: false, error: 'No active sprint' }

    try {
      const { data, error } = await supabase
        .from('backlog_items')
        .insert({ ...item, sprint_id: currentSprint.id })
        .select()
        .single()

      if (error) throw error
      setBacklogItems(prev => [data, ...prev])
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create backlog item'
      setError(message)
      return { success: false, error: message }
    }
  }

  const updateBacklogItem = async (id: string, updates: BacklogItemUpdate) => {
    try {
      const { data, error } = await supabase
        .from('backlog_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setBacklogItems(prev => prev.map(item => item.id === id ? data : item))
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update backlog item'
      setError(message)
      return { success: false, error: message }
    }
  }

  const deleteBacklogItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('backlog_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      setBacklogItems(prev => prev.filter(item => item.id !== id))
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete backlog item'
      setError(message)
      return { success: false, error: message }
    }
  }

  // デイリーアップデート管理
  const fetchDailyUpdates = useCallback(async (sprintId: string) => {
    try {
      const { data, error } = await supabase
        .from('daily_updates')
        .select('*')
        .eq('sprint_id', sprintId)
        .order('date', { ascending: false })

      if (error) throw error
      setDailyUpdates(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch daily updates')
    }
  }, [])

  const createDailyUpdate = async (update: Omit<DailyUpdateInsert, 'sprint_id'>) => {
    if (!currentSprint) return { success: false, error: 'No active sprint' }

    try {
      const { data, error } = await supabase
        .from('daily_updates')
        .insert({ ...update, sprint_id: currentSprint.id })
        .select()
        .single()

      if (error) throw error
      setDailyUpdates(prev => [data, ...prev])
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create daily update'
      setError(message)
      return { success: false, error: message }
    }
  }

  const deleteDailyUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_updates')
        .delete()
        .eq('id', id)

      if (error) throw error
      setDailyUpdates(prev => prev.filter(update => update.id !== id))
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete daily update'
      setError(message)
      return { success: false, error: message }
    }
  }

  // レトロスペクティブアイテム管理
  const fetchRetroItems = useCallback(async (sprintId: string) => {
    try {
      const { data, error } = await supabase
        .from('retro_items')
        .select('*')
        .eq('sprint_id', sprintId)
        .order('votes', { ascending: false })

      if (error) throw error
      setRetroItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch retro items')
    }
  }, [])

  const createRetroItem = async (item: Omit<RetroItemInsert, 'sprint_id'>) => {
    if (!currentSprint) return { success: false, error: 'No active sprint' }

    try {
      const { data, error } = await supabase
        .from('retro_items')
        .insert({ ...item, sprint_id: currentSprint.id })
        .select()
        .single()

      if (error) throw error
      setRetroItems(prev => [data, ...prev])
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create retro item'
      setError(message)
      return { success: false, error: message }
    }
  }

  const updateRetroItem = async (id: string, updates: RetroItemUpdate) => {
    try {
      const { data, error } = await supabase
        .from('retro_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setRetroItems(prev => prev.map(item => item.id === id ? data : item))
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update retro item'
      setError(message)
      return { success: false, error: message }
    }
  }

  const deleteRetroItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('retro_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      setRetroItems(prev => prev.filter(item => item.id !== id))
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete retro item'
      setError(message)
      return { success: false, error: message }
    }
  }

  // 新しいスプリント開始（現在のUIの機能）
  const startNextSprint = async () => {
    if (!currentSprint) return { success: false, error: 'No current sprint' }

    try {
      // 現在のスプリントを完了済みに更新
      await updateSprint(currentSprint.id, { 
        status: 'completed', 
        end_date: new Date().toISOString().split('T')[0] 
      })

      // 新しいスプリントを作成
      const newSprintNumber = currentSprint.number + 1
      const result = await createSprint({
        number: newSprintNumber,
        status: 'active'
      })

      if (result.success && result.data) {
        setCurrentSprint(result.data)
        // 新しいスプリントのデータをクリア
        setBacklogItems([])
        setDailyUpdates([])
        setRetroItems([])
      }

      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start next sprint'
      setError(message)
      return { success: false, error: message }
    }
  }

  // 統計情報の取得
  const getStats = () => {
    const todoItems = backlogItems.filter(item => item.status === 'todo').length
    const inProgressItems = backlogItems.filter(item => item.status === 'inprogress').length
    const doneItems = backlogItems.filter(item => item.status === 'done').length
    const totalStoryPoints = backlogItems.reduce((sum, item) => sum + item.story_points, 0)
    const completedStoryPoints = backlogItems
      .filter(item => item.status === 'done')
      .reduce((sum, item) => sum + item.story_points, 0)

    return {
      backlogItems: {
        total: backlogItems.length,
        todo: todoItems,
        inProgress: inProgressItems,
        done: doneItems
      },
      storyPoints: {
        total: totalStoryPoints,
        completed: completedStoryPoints,
        remaining: totalStoryPoints - completedStoryPoints
      },
      dailyUpdates: dailyUpdates.length,
      retroItems: {
        total: retroItems.length,
        good: retroItems.filter(item => item.type === 'good').length,
        bad: retroItems.filter(item => item.type === 'bad').length,
        improve: retroItems.filter(item => item.type === 'improve').length
      }
    }
  }

  // 現在のスプリントのデータを取得
  const fetchCurrentSprintData = useCallback(async () => {
    if (!currentSprint) return
    
    setLoading(true)
    try {
      await Promise.all([
        fetchBacklogItems(currentSprint.id),
        fetchDailyUpdates(currentSprint.id),
        fetchRetroItems(currentSprint.id)
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sprint data')
    } finally {
      setLoading(false)
    }
  }, [currentSprint, fetchBacklogItems, fetchDailyUpdates, fetchRetroItems])

  useEffect(() => {
    fetchSprints()
  }, [fetchSprints])

  useEffect(() => {
    fetchCurrentSprintData()
  }, [fetchCurrentSprintData])

  return {
    // スプリント関連
    sprints,
    currentSprint,
    setCurrentSprint,
    createSprint,
    updateSprint,
    startNextSprint,

    // バックログアイテム関連
    backlogItems,
    createBacklogItem,
    updateBacklogItem,
    deleteBacklogItem,

    // デイリーアップデート関連
    dailyUpdates,
    createDailyUpdate,
    deleteDailyUpdate,

    // レトロスペクティブアイテム関連
    retroItems,
    createRetroItem,
    updateRetroItem,
    deleteRetroItem,

    // 共通
    loading,
    error,
    stats: getStats(),
    refetch: fetchCurrentSprintData
  }
}