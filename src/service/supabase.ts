import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

const supabaseOptions: SupabaseClientOptions = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY || "",
  supabaseOptions
);

export { supabaseClient };
