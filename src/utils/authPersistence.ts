import { supabase } from '../lib/supabase';

export async function persistSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    localStorage.setItem('supabase.auth.token', session.access_token);
  }
}

export async function clearSession() {
  localStorage.removeItem('supabase.auth.token');
  await supabase.auth.signOut();
}

export function getStoredSession() {
  return localStorage.getItem('supabase.auth.token');
}