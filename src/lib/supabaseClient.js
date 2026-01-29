import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Arrel Warning: Supabase credentials missing. Using mock client.');

  // Chainable mock helper
  const createChainableMock = () => {
    const mock = () => createChainableMock();
    mock.select = () => createChainableMock();
    mock.insert = () => Promise.resolve({ data: [], error: null });
    mock.upsert = () => Promise.resolve({ data: [], error: null });
    mock.update = () => Promise.resolve({ data: [], error: null });
    mock.delete = () => Promise.resolve({ data: [], error: null });
    mock.eq = () => createChainableMock();
    mock.order = () => createChainableMock();
    mock.single = () => Promise.resolve({ data: null, error: null });
    mock.limit = () => createChainableMock();
    mock.maybeSingle = () => Promise.resolve({ data: null, error: null });
    // Default promise resolution for un-awaited chains acting as promises
    mock.then = (resolve) => resolve({ data: [], error: null });
    return mock;
  };

  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      signInWithOtp: () => Promise.resolve({ error: { message: 'Mode Offline (Mock)' } }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => createChainableMock(),
  };
}

export { supabase };
