import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

// Logging in, signing up, and logging out

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupCredentials extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const login = useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      // Redirect after successful login
      navigate('/');
      // Show success toast
      toast.success('Welcome back!');
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  const signup = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            display_name: credentials.username
          }
        }
      });
      if (error) throw error;
    },
    onSuccess: () => {
      navigate('/');
      toast.success('Welcome to BookshelfQuest!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Check your email for reset instructions');
      navigate('/login');
    }
  });

  const resetPassword = useMutation({
    mutationFn: async ({ password, confirmPassword }: { 
      password: string; 
      confirmPassword: string 
    }) => {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      navigate('/login');
    }
  });

  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      navigate('/');
      queryClient.setQueryData(['user'], null);
      toast.success('Logged out successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed', session?.expires_at);
        // Optionally refresh user data
        queryClient.invalidateQueries({ queryKey: ['user'] });
      } else if (event === 'SIGNED_OUT') {
        // Clear any cached data
        queryClient.clear();
      } else if (event === 'SIGNED_IN') {
        // Refresh queries that depend on auth
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout
  };
}; 