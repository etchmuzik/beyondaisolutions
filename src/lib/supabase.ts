import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://uzlfjdeqdcegtctltmac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bGZqZGVxZGNlZ3RjdGx0bWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MjAwOTEsImV4cCI6MjA1MDk5NjA5MX0.LGO1QWs_IAsKgHQ-idTVUNPpKKXb0Cm5yoSKD8HH_Qk';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});