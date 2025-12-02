import FooterNavigation from '@/components/FooterNavigation';
import LanguageSelector from '@/components/LanguageSelector';
import { AdArea } from '@/components/ui/ad-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isRTL } from '@/i18n';
import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/weqayah-logo.png';

function SignupPage() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    country: '',
    userType: 'patient',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Signup data:', formData);
      // Handle successful signUp
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Australia',
    'Japan',
    'South Korea',
    'China',
    'India',
    'Brazil',
    'Mexico',
    'Saudi Arabia',
    'UAE',
    'Egypt',
    'Turkey',
    'Russia',
    'South Africa',
  ];

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
                className='w-full h-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-e-none border-0'
                placeholder={t('signUp.advertisement')}
              />

              {/* Right Side - Signup Form */}
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
                  <X className='h-4 w-4' />
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
                    {t('signUp.title')}
                  </h1>
                  <p className='text-gray-600'>
                    {t('signUp.subtitle')}{' '}
                    <Link to='/signin' className='text-primary hover:underline'>
                      {t('signUp.signInLink')}
                    </Link>
                  </p>
                </div>

                {/* User Type Selection */}
                <div className='mb-6'>
                  <Label className='text-sm font-medium text-gray-700 mb-3 block'>
                    {t('signUp.form.selectRole')}
                  </Label>
                  <div className='flex gap-6'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='patient'
                        checked={formData.userType === 'patient'}
                        onCheckedChange={() => handleUserTypeChange('patient')}
                      />
                      <Label htmlFor='patient' className='text-sm'>
                        {t('signUp.userType.patient')}
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='doctor'
                        checked={formData.userType === 'doctor'}
                        onCheckedChange={() => handleUserTypeChange('doctor')}
                      />
                      <Label htmlFor='doctor' className='text-sm'>
                        {t('signUp.userType.doctor')}
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Email Field */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-sm font-medium text-gray-700'
                    >
                      {t('signUp.form.emailAddress')}
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder={t('signUp.form.emailPlaceholder')}
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
                        {t('signUp.form.password')}
                      </Label>
                      <Button
                        type='button'
                        variant='link'
                        size='sm'
                        className='text-xs text-gray-500 h-auto p-0'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword
                          ? t('signUp.form.hidePassword')
                          : t('signUp.form.showPassword')}
                      </Button>
                    </div>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('signUp.form.passwordPlaceholder')}
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
                          <EyeOff className='h-4 w-4 text-gray-400' />
                        ) : (
                          <Eye className='h-4 w-4 text-gray-400' />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Country Field */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='country'
                      className='text-sm font-medium text-gray-700'
                    >
                      {t('signUp.form.countryResidence')}
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange('country', value)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          placeholder={t('signUp.form.countryPlaceholder')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        {t('signUp.form.loading')}
                      </div>
                    ) : (
                      t('signUp.form.createAccount')
                    )}
                  </Button>
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

export default SignupPage;
