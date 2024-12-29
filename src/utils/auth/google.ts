import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

export async function handleGoogleAuthSuccess(user: User) {
  try {
    // Check if user profile exists
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      // Create new profile for Google user
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: user.id,
          username: user.email?.split('@')[0],
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url
        }]);

      if (profileError) throw profileError;
    }
  } catch (error) {
    console.error('Error handling Google auth:', error);
    throw error;
  }
}