export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'user' | 'guest'
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'admin' | 'user' | 'guest'
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'user' | 'guest'
          status?: 'active' | 'inactive'
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          status: 'in-progress' | 'completed' | 'on-hold' | 'nearly-complete'
          progress: number
          start_date: string
          team_size: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          status?: 'in-progress' | 'completed' | 'on-hold' | 'nearly-complete'
          progress?: number
          start_date: string
          team_size: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          status?: 'in-progress' | 'completed' | 'on-hold' | 'nearly-complete'
          progress?: number
          start_date?: string
          team_size?: number
          updated_at?: string
        }
      }
      sprints: {
        Row: {
          id: string
          number: number
          status: 'planning' | 'active' | 'completed'
          start_date: string
          end_date?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          number: number
          status?: 'planning' | 'active' | 'completed'
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          number?: number
          status?: 'planning' | 'active' | 'completed'
          start_date?: string
          end_date?: string
          updated_at?: string
        }
      }
      backlog_items: {
        Row: {
          id: string
          sprint_id: string
          title: string
          description: string
          story_points: number
          priority: 'high' | 'medium' | 'low'
          status: 'todo' | 'inprogress' | 'done'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sprint_id: string
          title: string
          description?: string
          story_points?: number
          priority?: 'high' | 'medium' | 'low'
          status?: 'todo' | 'inprogress' | 'done'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sprint_id?: string
          title?: string
          description?: string
          story_points?: number
          priority?: 'high' | 'medium' | 'low'
          status?: 'todo' | 'inprogress' | 'done'
          updated_at?: string
        }
      }
      daily_updates: {
        Row: {
          id: string
          sprint_id: string
          member: string
          yesterday: string
          today: string
          blockers: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sprint_id: string
          member: string
          yesterday?: string
          today: string
          blockers?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sprint_id?: string
          member?: string
          yesterday?: string
          today?: string
          blockers?: string
          date?: string
          updated_at?: string
        }
      }
      retro_items: {
        Row: {
          id: string
          sprint_id: string
          type: 'good' | 'bad' | 'improve'
          content: string
          votes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sprint_id: string
          type: 'good' | 'bad' | 'improve'
          content: string
          votes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sprint_id?: string
          type?: 'good' | 'bad' | 'improve'
          content?: string
          votes?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}