import AdImage from '@/components/AdImage';
import FooterNavigation from '@/components/FooterNavigation';
import LanguageSelector from '@/components/LanguageSelector';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AdArea } from '@/components/ui/ad-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { isRTL } from '@/i18n';
import { get, post } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuEye, LuEyeOff, LuX } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../../assets/weqayah-logo.png';

function SigninPage() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const {
    refreshUser,
    isAuthenticated,
    user,
    loading: authLoading,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [advertisement, setAdvertisement] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchAdvertisement = async () => {
    try {
      const response = await get('/ads/active?section=SIGN_IN_SIGN_UP');
      setAdvertisement(response?.data?.[0]);
    } catch (error) {
      toast.error('Error fetching advertisement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisement();
  }, []);

  // Redirect authenticated users away from signin page
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Show loading state while checking authentication
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Don't render the form if user is authenticated (redirect will happen)
  if (isAuthenticated && user) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const response = await post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (data) {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);

          // Refresh user state in AuthContext
          try {
            await refreshUser();
          } catch (profileError) {
            toast.error(
              'Failed to fetch user profile after login:',
              profileError
            );
            // Continue with navigation even if profile fetch fails
          }
        }

        // Navigate based on user role
        if (data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          t('signIn.form.error') ||
          'Login failed. Please try again.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-4xl'>
          <Card className='overflow-hidden py-0'>
            <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[600px]'>
              {/* Left Side - Ad Area */}
              <AdArea
                size='large'
                className='w-full h-full min-h-24 bg-primary hover:bg-primary/90 text-primary-foreground rounded-b-none sm:rounded-e-none border-0'
                placeholder={t('signIn.advertisement')}
                loading={isLoading}
                children={
                  <AdImage imageUrl={advertisement?.images?.[0]?.imageUrl} />
                }
              />

              {/* Right Side - Signin Form */}
              <div className='p-8 pt-0 flex flex-col justify-center relative'>
                {/* Close Button */}
                <Button
                  variant='ghost'
                  size='icon'
                  className={`absolute top-4 ${
                    isRTL(language) ? 'left-4' : 'right-4'
                  }`}
                  onClick={() => window.history.back()}
                >
                  <LuX className='h-4 w-4' />
                </Button>

                {/* Language Selector */}
                <LanguageSelector
                  className={`absolute top-4 ${
                    isRTL(language) ? 'right-4' : 'left-4'
                  }`}
                />

                {/* Logo */}
                <div className='flex justify-center mb-0'>
                  <img src={logo} alt='logo' className='h-16 mt-20 mb-4' />
                </div>

                {/* Title */}
                <div className='text-center mb-8'>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    {t('signIn.title')}
                  </h1>
                  <p className='text-gray-600'>
                    {t('signIn.subtitle')}{' '}
                    <Link to='/signup' className='text-primary hover:underline'>
                      {t('signIn.signUpLink')}
                    </Link>
                  </p>
                </div>

                {/* Signin Form */}
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Email Field */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-sm font-medium text-gray-700'
                    >
                      {t('signIn.form.emailAddress')}
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder={t('signIn.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      required
                      className='w-full'
                    />
                  </div>

                  {/* Password Field */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Label
                        htmlFor='password'
                        className='text-sm font-medium text-gray-700'
                      >
                        {t('signIn.form.password')}
                      </Label>
                      <Button
                        type='button'
                        variant='link'
                        size='sm'
                        className='text-xs text-gray-500 h-auto p-0'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword
                          ? t('signIn.form.hidePassword')
                          : t('signIn.form.showPassword')}
                      </Button>
                    </div>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('signIn.form.passwordPlaceholder')}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
                        required
                        className='w-full pr-10'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <LuEyeOff className='h-4 w-4 text-gray-400' />
                        ) : (
                          <LuEye className='h-4 w-4 text-gray-400' />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3'
                    disabled={submitLoading}
                  >
                    {submitLoading ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        {t('signIn.form.loading')}
                      </div>
                    ) : (
                      t('signIn.form.signIn')
                    )}
                  </Button>

                  {/* Forgot Password Link */}
                  <div className='text-center'>
                    <Link
                      to='/forgot-password'
                      className='text-sm text-gray-600 hover:text-primary hover:underline'
                    >
                      {t('signIn.form.forgotPassword')}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Footer - Full Width */}
      <FooterNavigation />
    </div>
  );
}

export default SigninPage;
