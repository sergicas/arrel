import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import BrandLoader from '../components/BrandLoader';

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('arrel_is_guest') === 'true';
  });

  useEffect(() => {
    let mounted = true;

    // Safety Timeout to prevent infinite loading (e.g. network block)
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Auth check timed out. Defaulting to loaded state.');
        setLoading(false);
      }
    }, 5000); // 5 seconds max wait

    // Check active sessions and sets the user
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      })
      .catch((err) => {
        console.error('Auth session check error', err);
        if (mounted) setLoading(false);
      });



    // Listen for changes on auth state (logged in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        // If we have a user, we are definitely not a guest in the anonymous sense anymore
        if (currentUser) {
          setIsGuest(false);
          localStorage.removeItem('arrel_is_guest');
        }

        setLoading(false);
      }

      // DATA SYNC: Bridge from anonymous to authenticated
      const currentUser = session?.user ?? null;
      if (currentUser) {
        // 1. Sync Diagnosis
        const localDiagnosis = localStorage.getItem('arrel_diagnosis_raw');
        if (localDiagnosis) {
          try {
            const scores = JSON.parse(localDiagnosis);
            supabase
              .from('diagnostics')
              .insert([{ user_id: currentUser.id, scores, completed_at: new Date().toISOString() }])
              .then(({ error }) => {
                if (error) {
                  console.error('[Arrel Auth] Error syncing diagnosis:', error);
                } else {
                  console.log('[Arrel Auth] Diagnosis synced successfully');
                  localStorage.removeItem('arrel_diagnosis_raw');
                }
              });
          } catch (e) {
            console.error('Sync Error (Diagnosis)', e);
          }
        }

        // 2. Sync Progress (Current Day)
        const guestDay = Number(localStorage.getItem('arrel_guest_day') || localStorage.getItem('secure_arrel_guest_day'));
        if (guestDay && guestDay > 1) {
          supabase.from('user_state').upsert({
            user_id: currentUser.id,
            current_day: guestDay,
            current_cycle: 1,
            last_active_at: new Date().toISOString(),
          }).then(({ error }) => {
            if (error) {
              console.error('[Arrel Auth] Error syncing guest progress:', error);
            } else {
              console.log('[Arrel Auth] Guest progress synced to day', guestDay);
            }
          });
        } else {
          // Initialize if new user and no guest data
          supabase
            .from('user_state')
            .select('id')
            .eq('user_id', currentUser.id)
            .maybeSingle()
            .then(({ data, error: selectError }) => {
              if (selectError) {
                console.error('[Arrel Auth] Error checking existing user_state:', selectError);
                return;
              }
              if (!data) {
                console.log('[Arrel Auth] New user detected, creating user_state...');
                supabase.from('user_state').insert({
                  user_id: currentUser.id,
                  current_day: 1,
                  current_cycle: 1,
                }).then(({ error: insertError }) => {
                  if (insertError) {
                    console.error('[Arrel Auth] Error creating user_state:', insertError);
                  } else {
                    console.log('[Arrel Auth] user_state created successfully for user', currentUser.id);
                  }
                });
              } else {
                console.log('[Arrel Auth] Existing user_state found');
              }
            });
        }
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('arrel_is_guest', 'true');
  };

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signInWithOtp: (email) => supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    }),
    signOut: () => {
      setIsGuest(false);
      localStorage.removeItem('arrel_is_guest');
      return supabase.auth.signOut();
    },
    enterAsGuest,
    user,
    session,
    isGuest,
    loading,
  };

  if (loading) {
    return <BrandLoader text="Inicialitzant..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
