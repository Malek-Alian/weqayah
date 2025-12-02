import LanguageSelector from '@/components/LanguageSelector';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Menu, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const AdminHeader = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Get current page title based on the route
  const getCurrentPageTitle = () => {
    const path = location.pathname;

    if (path === '/admin') {
      return t('admin.sidebar.overview', 'Overview');
    } else if (path.startsWith('/admin/patients')) {
      return t('admin.sidebar.patients', 'Patients');
    } else if (path.startsWith('/admin/hospitals')) {
      return t('admin.sidebar.hospitals', 'Hospitals');
    } else if (path.startsWith('/admin/clinics')) {
      return t('admin.sidebar.clinics', 'Clinics');
    } else if (path.startsWith('/admin/doctors')) {
      return t('admin.sidebar.doctors', 'Doctors');
    } else if (path.startsWith('/admin/medical-news')) {
      return t('admin.sidebar.medicalNews', 'Medical News');
    } else if (path.startsWith('/admin/blogs')) {
      return t('admin.sidebar.blogs', 'Blogs');
    } else if (path.startsWith('/admin/advertisements')) {
      return t('admin.sidebar.advertisements', 'Advertisements');
    } else if (path.startsWith('/admin/settings')) {
      return t('admin.sidebar.settings', 'Settings');
    } else {
      return t('admin.sidebar.overview', 'Overview');
    }
  };

  return (
    <header className='bg-background shadow-sm border-b border-border sticky top-0 z-40'>
      <div className='flex h-16 items-center justify-between px-6'>
        {/* Left side */}
        <div className='flex items-center space-x-4'>
          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='sm'
            className='lg:hidden'
            onClick={onMenuClick}
          >
            <Menu className='h-5 w-5' />
          </Button>

          {/* Current page title */}
          <div>
            <h1 className='hidden sm:block text-lg md:text-2xl font-semibold text-foreground'>
              {getCurrentPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className='flex items-center space-x-4'>
          <LanguageSelector />

          {/* Notifications */}
          <Button variant='ghost' size='sm' className='relative'>
            <Bell className='h-5 w-5' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs text-white'
            >
              3
            </Badge>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center space-x-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarFallback className='bg-primary text-primary-foreground'>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
                <div className='hidden md:block text-left'>
                  <p className='text-sm font-medium text-foreground'>
                    {t('admin.header.admin', 'Admin User')}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {t('admin.header.role', 'Administrator')}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem>
                {t('admin.header.profile', 'Profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('admin.header.settings', 'Settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive focus:text-destructive'>
                {t('admin.header.signOut', 'Sign Out')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
