import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase belum dikonfigurasi. Buat file .env (lihat .env.example) berisi ' +
    'VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY dari project Supabase kamu.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
