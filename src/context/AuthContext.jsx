import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import BrandLoader from '../components/BrandLoader';

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Payment & Trial State
  const [hasPaid, setHasPaid] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Helper to calculate trial status
  const checkTrialStatus = (createdAt, paidStatus) => {
    if (paidStatus) return false; // Not locked if paid

    // Default 30 days trial
    const TRIAL_DAYS = 30;
    const createdDate = new Date(createdAt);
    const now = new Date();

    // Difference in milliseconds
    const diffTime = Math.abs(now - createdDate);
    // Difference in days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > TRIAL_DAYS;
  };

  const refreshUserState = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_state')
      .select('has_paid, created_at')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error refreshing user state:', error);
      return;
    }

    if (data) {
      setHasPaid(data.has_paid || false);
      // Use user_state.created_at or fallback to user.created_at
      const userCreatedAt = data.created_at || user.created_at;
      const locked = checkTrialStatus(userCreatedAt, data.has_paid);
      setIsLocked(locked);
    }
  };

  const initiateCheckout = async () => {
    if (!user) return;

    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received', data);
        throw new Error('No checkout URL');
      }
    } catch (err) {
      console.error('Error initiating checkout:', err);
      throw err;
    }
  };

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
        } else {
          // Reset payment state on logout
          setHasPaid(false);
          setIsLocked(false);
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
            .select('id, has_paid, created_at') // Added has_paid and created_at
            .eq('user_id', currentUser.id)
            .maybeSingle()
            .then(async ({ data, error: selectError }) => {
              if (selectError) {
                console.error('[Arrel Auth] Error checking existing user_state:', selectError);
                return;
              }

              if (data) {
                console.log('[Arrel Auth] Existing user_state found');
                setIsNewUser(false);
                setNeedsOnboarding(false);

                // Update payment state
                setHasPaid(data.has_paid || false);
                const locked = checkTrialStatus(data.created_at || currentUser.created_at, data.has_paid);
                setIsLocked(locked);

              } else {
                console.log('[Arrel Auth] New user detected, creating user_state...');
                setIsNewUser(true);

                // Check if user has completed diagnosis
                const { data: diagData } = await supabase
                  .from('diagnostics')
                  .select('id')
                  .eq('user_id', currentUser.id)
                  .limit(1)
                  .maybeSingle();

                if (!diagData) {
                  console.log('[Arrel Auth] New user needs onboarding (no diagnosis)');
                  setNeedsOnboarding(true);
                }

                supabase.from('user_state').insert({
                  user_id: currentUser.id,
                  current_day: 1,
                  current_cycle: 1,
                  has_paid: false, // Explicitly set default
                }).then(({ error: insertError }) => {
                  if (insertError) {
                    console.error('[Arrel Auth] Error creating user_state:', insertError);
                  } else {
                    console.log('[Arrel Auth] user_state created successfully for user', currentUser.id);
                  }
                });
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

  const completeOnboarding = () => {
    setNeedsOnboarding(false);
    setIsNewUser(false);
  };

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    // Original signInWithOtp for backward compatibility
    signInWithOtp: (email) => supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    }),
    // Login: only works if user already exists
    signInWithOtpLogin: async (email) => {
      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: false, // Don't create new users
        },
      });
      // If error contains "user not found" type message, customize it
      if (result.error && (
        result.error.message?.toLowerCase().includes('user not found') ||
        result.error.message?.toLowerCase().includes('signups not allowed') ||
        result.error.status === 400
      )) {
        return {
          error: {
            ...result.error,
            message: 'Aquest compte no existeix. Crea un compte nou.',
            isUserNotFound: true
          }
        };
      }
      return result;
    },
    // Register: check if user exists first, then create
    signInWithOtpRegister: async (email) => {
      // First, try to send OTP without creating user to check if they exist
      const checkResult = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: false,
        },
      });

      // If no error, user already exists
      if (!checkResult.error) {
        return {
          error: {
            message: 'Aquest compte ja existeix. Utilitza "Ja tinc compte" per entrar.',
            isUserExists: true
          }
        };
      }

      // User doesn't exist, create them
      return supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true,
        },
      });
    },
    signOut: () => {
      setIsGuest(false);
      setIsNewUser(false);
      setNeedsOnboarding(false);
      setHasPaid(false);
      setIsLocked(false);
      localStorage.removeItem('arrel_is_guest');
      return supabase.auth.signOut();
    },
    enterAsGuest,
    completeOnboarding,
    refreshUserState,
    initiateCheckout,
    user,
    session,
    isGuest,
    isNewUser,
    needsOnboarding,
    hasPaid,
    isLocked,
    loading,
  };

  if (loading) {
    return <BrandLoader text="Inicialitzant..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
