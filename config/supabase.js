import { createClient } from '@supabase/supabase-js';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase Config - URL:', supabaseUrl);
console.log('Supabase Config - Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
