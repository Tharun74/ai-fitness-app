import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface Profile {
  id: string;
  created_at: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  fitness_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  goals?: string[];
}

export interface User {
  id: string;
  email: string;
  profile?: Profile;
}