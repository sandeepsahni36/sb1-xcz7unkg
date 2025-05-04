import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Get the current site URL for redirects
const getSiteUrl = () => {
  let siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  // Remove trailing slash if present
  siteUrl = siteUrl.replace(/\/$/, '');
  return siteUrl;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: `${getSiteUrl()}/auth/callback`,
  },
});

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      data: {
        first_login: true,
      },
    },
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/reset-password`,
  });
}

export async function updatePassword(newPassword: string) {
  return supabase.auth.updateUser({
    password: newPassword,
  });
}

export async function updateEmail(newEmail: string) {
  return supabase.auth.updateUser({
    email: newEmail,
  }, {
    emailRedirectTo: `${getSiteUrl()}/auth/callback`,
  });
}

export async function getCurrentUser() {
  return supabase.auth.getUser();
}

export async function resendConfirmationEmail(email: string) {
  return supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
    },
  });
}

// Development mode function to bypass authentication
export function devModeEnabled() {
  return import.meta.env.VITE_DEV_MODE === 'true';
}