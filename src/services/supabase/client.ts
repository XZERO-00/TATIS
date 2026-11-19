import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/database/types/database.types';
import { envConfig, isSupabaseConfigured } from './config';

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!isSupabaseConfigured) {
    // Provide a dummy/fallback client structure to prevent crash on mount
    // Calls that require network will gracefully reject with unconfigured status
    supabaseClient = createClient<Database>(
      'https://unconfigured.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy',
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    );
    return supabaseClient;
  }

  supabaseClient = createClient<Database>(
    envConfig.supabaseUrl,
    envConfig.supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );

  return supabaseClient;
}

export const supabase = getSupabase();
