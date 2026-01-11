import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Check for guest mode
        const guestMode = localStorage.getItem('arrel_is_guest');
        if (guestMode === 'true') {
            setIsGuest(true);
        }

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            // If we have a user, we are definitely not a guest in the anonymous sense anymore
            if (currentUser) {
                setIsGuest(false);
                localStorage.removeItem('arrel_is_guest');
            }

            setLoading(false);

            // DATA SYNC: Bridge from anonymous to authenticated
            if (currentUser) {
                const localDiagnosis = localStorage.getItem('arrel_diagnosis_raw');
                if (localDiagnosis) {
                    try {
                        const scores = JSON.parse(localDiagnosis);
                        // Upload to Supabase
                        supabase.from('diagnostics').insert([{
                            user_id: currentUser.id,
                            scores: scores,
                            completed_at: new Date().toISOString()
                        }]).then(({ error }) => {
                            if (!error) {
                                // Clear local storage only on success
                                localStorage.removeItem('arrel_diagnosis_raw');
                                // Optionally init user state if needed
                                supabase.from('user_state').upsert({
                                    user_id: currentUser.id,
                                    current_day: 1,
                                    current_cycle: 1,
                                    last_active_at: new Date().toISOString()
                                });
                            } else {
                                console.error("Error syncing diagnosis:", error);
                            }
                        });
                    } catch (e) {
                        console.error("Error parsing local diagnosis for sync:", e);
                    }
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const enterAsGuest = () => {
        setIsGuest(true);
        localStorage.setItem('arrel_is_guest', 'true');
    };

    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signInWithOtp: (email) => supabase.auth.signInWithOtp({ email }),
        signOut: () => {
            setIsGuest(false);
            localStorage.removeItem('arrel_is_guest');
            return supabase.auth.signOut();
        },
        enterAsGuest,
        user,
        session,
        isGuest,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
