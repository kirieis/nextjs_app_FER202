import { createClient } from "@supabase/supabase-js";

// Read the Supabase credentials from environment variables (never hardcode them).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single shared Supabase client for the whole app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
