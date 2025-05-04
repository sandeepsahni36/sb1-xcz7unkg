import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building2, Mail, Phone, MapPin, Palette } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

type CompanySettingsFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  brandColor: string;
  reportBackground: string;
};

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const { company } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySettingsFormData>({
    defaultValues: {
      name: company?.name || '',
      email: '',
      phone: '',
      address: '',
      brandColor: company?.brandColor || '#2563EB',
      reportBackground: company?.reportBackground || '#FFFFFF',
    },
  });
  
  const onSubmit = async (data: CompanySettingsFormData) => {
    setLoading(true);
    
    try {
      // In a real implementation, we would update the company settings in Supabase here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Company settings updated successfully');
    } catch (error) {
      console.error('Failed to update company settings:', error);
      toast.error('Failed to update company settings');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your company information and branding settings.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-gray-200">
            {/* Company Information */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your company's basic information.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Company Name"
                  error={errors.name?.message}
                  {...register('name', {
                    required: 'Company name is required',
                  })}
                  leftIcon={<Building2 className="text-gray-400" size={20} />}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  error={errors.email?.message}
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  leftIcon={<Mail className="text-gray-400" size={20} />}
                />
                
                <Input
                  label="Phone Number"
                  error={errors.phone?.message}
                  {...register('phone')}
                  leftIcon={<Phone className="text-gray-400" size={20} />}
                />
                
                <Input
                  label="Address"
                  error={errors.address?.message}
                  {...register('address')}
                  leftIcon={<MapPin className="text-gray-400" size={20} />}
                />
              </div>
            </div>
            
            {/* Branding Settings */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Branding</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Customize your company's brand colors and report appearance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      className="h-10 w-10 rounded-md border border-gray-300"
                      {...register('brandColor')}
                    />
                    <Input
                      className="ml-2"
                      {...register('brandColor')}
                      leftIcon={<Palette className="text-gray-400" size={20} />}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Report Background
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      className="h-10 w-10 rounded-md border border-gray-300"
                      {...register('reportBackground')}
                    />
                    <Input
                      className="ml-2"
                      {...register('reportBackground')}
                      leftIcon={<Palette className="text-gray-400" size={20} />}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
              <Button
                type="button"
                variant="secondary"
                className="mr-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
        
        {/* Danger Zone */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Danger Zone</h2>
            <p className="mt-1 text-sm text-gray-500">
              Careful, these actions cannot be undone.
            </p>
            
            <div className="mt-6">
              <Button
                variant="danger"
                onClick={() => {
                  // Handle account deletion
                  toast.error('This feature is not implemented yet');
                }}
              >
                Delete Company Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;