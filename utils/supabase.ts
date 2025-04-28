import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bflnapfqkwugueefzhhk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbG5hcGZxa3d1Z3VlZWZ6aGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODI5MjksImV4cCI6MjA2MDc1ODkyOX0.Qsd_A_VICWDoDhAu4T6C3e756yI75wIVVbLzkcJjwPU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
