/**
 * Supabase Environment Configuration & Validator
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project') &&
    supabaseAnonKey !== 'your-anon-key-here' &&
    supabaseAnonKey.length > 20
);

export const envConfig = {
  supabaseUrl: supabaseUrl || '',
  supabaseAnonKey: supabaseAnonKey || '',
  isConfigured: isSupabaseConfigured,
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
} as const;
