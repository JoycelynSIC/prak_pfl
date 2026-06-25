import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://budpqbztxqdmjvstbtcy.supabase.co";
const supabaseAnonKey = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
