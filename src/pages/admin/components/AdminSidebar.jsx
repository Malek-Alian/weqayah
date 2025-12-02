import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Book,
  Building,
  Contact,
  Home,
  Hospital,
  LogOut,
  Megaphone,
  Newspaper,
  Settings,
  UserLock,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/weqayah-logo.png';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    {
      name: t('admin.sidebar.overview', 'Overview'),
      href: '/admin',
      icon: Home,
    },
    {
      name: t('admin.sidebar.patients', 'Patients'),
      href: '/admin/patients',
      icon: Contact,
    },
    {
      name: t('admin.sidebar.hospitals', 'Hospitals'),
      href: '/admin/hospitals',
      icon: Hospital,
    },
    {
      name: t('admin.sidebar.clinics', 'Clinics'),
      href: '/admin/clinics',
      icon: Building,
    },
    {
      name: t('admin.sidebar.doctors', 'Doctors'),
      href: '/admin/doctors',
      icon: UserLock,
    },
    {
      name: t('admin.sidebar.news', 'News'),
      href: '/admin/medical-news',
      icon: Newspaper,
    },
    {
      name: t('admin.sidebar.blogs', 'Blogs'),
      href: '/admin/blogs',
      icon: Book,
    },
    {
      name: t('admin.sidebar.advertisements', 'Advertisements'),
      href: '/admin/advertisements',
      icon: Megaphone,
    },
    {
      name: t('admin.sidebar.settings', 'Settings'),
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-gray-600 opacity-75 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:h-full lg:w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex h-full flex-col'>
          {/* Header */}
          <div className='flex h-16 items-center justify-between px-6 border-b border-border'>
            <div className='flex items-center space-x-3'>
              <img src={logo} alt='Weqayah' className='h-8' />
              <span className='text-lg font-bold text-foreground'>
                {t('admin.sidebar.title', 'Admin Panel')}
              </span>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden'
              onClick={onClose}
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 space-y-1 px-3 py-4'>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <Icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive(item.href)
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className='border-t border-border p-4'>
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarFallback className='bg-muted text-muted-foreground text-sm font-medium'>
                  A
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-foreground truncate'>
                  {t('admin.sidebar.admin', 'Admin User')}
                </p>
                <p className='text-xs text-muted-foreground truncate'>
                  {t('admin.sidebar.role', 'Administrator')}
                </p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='w-full mt-3 justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10'
            >
              <LogOut className='mr-2 h-4 w-4' />
              {t('admin.sidebar.signOut', 'Sign Out')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
