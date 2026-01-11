import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn('Arrel Warning: Supabase credentials missing. Using mock client.');
    // Mock client to prevent crash and allow UI development
    supabase = {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithOtp: () => Promise.resolve({ error: { message: 'No Supabase connection. Check .env' } }),
            signOut: () => Promise.resolve({ error: null }),
        }
    };
}

export { supabase };
