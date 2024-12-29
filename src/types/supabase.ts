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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          company?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          company?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          notification_preferences: Json
          theme: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          notification_preferences?: Json
          theme?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          notification_preferences?: Json
          theme?: string
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      call_schedules: {
        Row: {
          id: string
          user_id: string
          contact_id: string
          scheduled_at: string
          duration: string
          status: 'pending' | 'completed' | 'cancelled' | 'failed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_id: string
          scheduled_at: string
          duration?: string
          status?: 'pending' | 'completed' | 'cancelled' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string
          scheduled_at?: string
          duration?: string
          status?: 'pending' | 'completed' | 'cancelled' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      call_analytics: {
        Row: {
          id: string
          call_id: string
          user_id: string
          duration: string
          sentiment_score: number
          keywords: string[]
          transcription_summary: string | null
          ai_suggestions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          call_id: string
          user_id: string
          duration: string
          sentiment_score: number
          keywords?: string[]
          transcription_summary?: string | null
          ai_suggestions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          user_id?: string
          duration?: string
          sentiment_score?: number
          keywords?: string[]
          transcription_summary?: string | null
          ai_suggestions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      user_metrics: {
        Row: {
          id: string
          user_id: string
          date: string
          total_calls: number
          total_duration: string
          successful_calls: number
          average_sentiment: number | null
          conversion_rate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          total_calls?: number
          total_duration?: string
          successful_calls?: number
          average_sentiment?: number | null
          conversion_rate?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          total_calls?: number
          total_duration?: string
          successful_calls?: number
          average_sentiment?: number | null
          conversion_rate?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      conversion_tracking: {
        Row: {
          id: string
          call_id: string
          user_id: string
          conversion_type: string
          value: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          call_id: string
          user_id: string
          conversion_type: string
          value?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          user_id?: string
          conversion_type?: string
          value?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          description: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          description: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          description?: string
          metadata?: Json
          created_at?: string
        }
      }
    }
    Views: {
      user_performance_summary: {
        Row: {
          user_id: string
          full_name: string | null
          total_calls: number
          completed_calls: number
          failed_calls: number
          avg_duration_seconds: number
          avg_sentiment: number | null
          total_conversions: number
          conversion_rate: number | null
        }
      }
      call_success_rates: {
        Row: {
          user_id: string
          period: string
          total_calls: number
          successful_calls: number
          success_rate: number
        }
      }
      conversion_analytics: {
        Row: {
          user_id: string
          full_name: string | null
          conversion_type: string
          conversion_count: number
          total_value: number | null
          average_value: number | null
          first_conversion: string
          last_conversion: string
        }
      }
    }
    Functions: {
      calculate_user_metrics: {
        Args: {
          user_uuid: string
          start_date: string
        }
        Returns: {
          metric_name: string
          metric_value: number
        }[]
      }
    }
    Enums: {
      call_schedule_status: 'pending' | 'completed' | 'cancelled' | 'failed'
    }
  }
}