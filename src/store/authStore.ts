import { create } from 'zustand';
import { User, Company } from '../types';
import { supabase, getCurrentUser } from '../lib/supabase';
import { devModeEnabled } from '../lib/supabase';

type AuthState = {
  user: User | null;
  company: Company | null;
  loading: boolean;
  isDevMode: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  company: null,
  loading: true,
  isDevMode: devModeEnabled(),
  isAuthenticated: false,
  isAdmin: false,

  initialize: async () => {
    // Check if dev mode is enabled
    const isDevMode = devModeEnabled();
    
    if (isDevMode) {
      // Create fake dev user and company
      const devUser: User = {
        id: 'dev-user',
        email: 'dev@example.com',
        firstName: 'Development',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      const devCompany: Company = {
        id: 'dev-company',
        name: 'Development Company',
        tier: 'enterprise',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set({
        user: devUser,
        company: devCompany,
        loading: false,
        isDevMode: true,
        isAuthenticated: true,
        isAdmin: true
      });
      
      return;
    }
    
    // For non-dev mode, check for real authentication
    try {
      const { data } = await getCurrentUser();
      
      if (!data.user) {
        set({ loading: false, isAuthenticated: false });
        return;
      }
      
      // Fetch user details from your users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (userError || !userData) {
        set({ loading: false, isAuthenticated: false });
        return;
      }
      
      // Fetch company details
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', userData.company_id)
        .single();
      
      if (companyError) {
        set({ loading: false, isAuthenticated: false });
        return;
      }
      
      // Transform data to match our types
      const user: User = {
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role,
        createdAt: userData.created_at,
      };
      
      const company: Company = {
        id: companyData.id,
        name: companyData.name,
        logo: companyData.logo,
        brandColor: companyData.brand_color,
        reportBackground: companyData.report_background,
        tier: companyData.tier,
        trialEndsAt: companyData.trial_ends_at,
        createdAt: companyData.created_at,
        updatedAt: companyData.updated_at,
      };
      
      set({
        user,
        company,
        loading: false,
        isAuthenticated: true,
        isAdmin: user.role === 'admin'
      });
    } catch (error) {
      console.error('Error initializing auth state:', error);
      set({ loading: false, isAuthenticated: false });
    }
  },
  
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    });
  },
  
  setCompany: (company) => {
    set({ company });
  },
  
  logout: async () => {
    if (!get().isDevMode) {
      await supabase.auth.signOut();
    }
    
    set({
      user: null,
      company: null,
      isAuthenticated: false,
      isAdmin: false
    });
  }
}));