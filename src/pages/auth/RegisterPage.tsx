import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUp } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'sonner';
import { SUBSCRIPTION_TIERS, getTrialEndDate } from '../../lib/utils';

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName: string;
  tier: 'starter' | 'professional' | 'enterprise';
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      tier: 'professional',
    },
  });
  
  const password = watch('password');
  
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    
    try {
      // Step 1: Create the user account
      const { error, data: authData } = await signUp(data.email, data.password);
      
      if (error) {
        toast.error(error.message || 'Failed to sign up');
        return;
      }
      
      if (!authData.user) {
        toast.error('Failed to create user');
        return;
      }
      
      // In a real implementation, we would create the company and user records in Supabase here
      // For demo purposes, we'll just redirect to a success page
      
      toast.success('Registration successful! Please check your email to confirm your account.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNextStep = () => {
    setStep(2);
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };
  
  return (
    <div>
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
        Create your account
      </h2>
      
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            
            <Button
              type="button"
              fullWidth={true}
              onClick={handleNextStep}
            >
              Next
            </Button>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              
              <Input
                label="Last Name"
                type="text"
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register('lastName', {
                  required: 'Last name is required',
                })}
              />
            </div>
            
            <Input
              label="Company Name"
              type="text"
              autoComplete="organization"
              error={errors.companyName?.message}
              {...register('companyName', {
                required: 'Company name is required',
              })}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Choose your subscription plan
              </label>
              
              <div className="grid grid-cols-1 gap-4 mt-2">
                {SUBSCRIPTION_TIERS.map((tier) => (
                  <label
                    key={tier.id}
                    className={`
                      relative rounded-lg border p-4 flex cursor-pointer
                      ${watch('tier') === tier.id ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}
                    `}
                  >
                    <input
                      type="radio"
                      value={tier.id}
                      className="sr-only"
                      {...register('tier')}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{tier.name}</span>
                          {tier.popular && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">${tier.price}/mo</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevStep}
              >
                Back
              </Button>
              
              <Button
                type="submit"
                fullWidth={true}
                isLoading={loading}
              >
                Create Account
              </Button>
            </div>
          </>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;