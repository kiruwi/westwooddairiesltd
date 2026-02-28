import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serverKey = serviceRoleKey ?? anonKey;

export const hasSupabaseServiceRole = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseServer =
  supabaseUrl && serverKey
    ? createClient(supabaseUrl, serverKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;
