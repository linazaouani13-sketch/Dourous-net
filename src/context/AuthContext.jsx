import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = (data) => supabase.auth.signUp(data);
  const signIn = (data) => supabase.auth.signInWithPassword(data);
  const signOut = () => supabase.auth.signOut();
  const signInWithProvider = (provider) => supabase.auth.signInWithOAuth({ 
    provider,
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });

  const toggleFavorite = async (teacherId) => {
    if (!user) return;
    const currentFavorites = user.user_metadata?.favorites || [];
    const newFavorites = currentFavorites.includes(teacherId)
      ? currentFavorites.filter(id => id !== teacherId)
      : [...currentFavorites, teacherId];

    const { error } = await supabase.auth.updateUser({
      data: { favorites: newFavorites }
    });
    
    if (error) throw error;
    return newFavorites;
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithProvider,
    toggleFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
