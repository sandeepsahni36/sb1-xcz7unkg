import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/authStore';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { initialize } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data?.session) {
          // Get the hash parameters
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const type = hashParams.get('type');
          
          // Initialize the auth store to get the latest user data
          await initialize();

          // Show appropriate success message based on the action type
          switch (type) {
            case 'signup':
              toast.success('Email confirmed successfully! Welcome to scopoStay.');
              break;
            case 'recovery':
              toast.success('Password reset successful.');
              break;
            case 'emailChange':
              toast.success('Email address updated successfully.');
              break;
            default:
              toast.success('Authentication successful');
          }

          // Check if it's the user's first login
          const { data: { user } } = await supabase.auth.getUser();
          const isFirstLogin = user?.user_metadata?.first_login;

          if (isFirstLogin) {
            // Clear the first login flag
            await supabase.auth.updateUser({
              data: { first_login: false }
            });
            
            // Redirect to onboarding or welcome page
            navigate('/dashboard?welcome=true');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/login');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast.error(error.message || 'Authentication failed');
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate, initialize]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Processing authentication...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;