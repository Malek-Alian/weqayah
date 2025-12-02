import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';
import { isRTL } from '@/i18n';
import { cn } from '@/lib/utils';
import { HelpCircle, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import logo from '../assets/weqayah-logo.png';

const navigationItems = [
  { nameKey: 'navigation.home', href: '/' },
  { nameKey: 'navigation.findDoctor', href: '/find-doctor' },
  { nameKey: 'navigation.medicalNews', href: '/medical-news' },
  { nameKey: 'navigation.ourBlogs', href: '/blog' },
  { nameKey: 'navigation.about', href: '/about-us' },
];

const unauthenticatedAccountItems = [
  { nameKey: 'navigation.signIn', href: '/signin' },
  { nameKey: 'navigation.signUp', href: '/signup' },
];

const authenticatedAccountItems = [
  { nameKey: 'navigation.admin', href: '/admin' },
];

function Navigation() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const language = i18n.language;

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const signInSignUpFunction = () => {
    console.log('aa');

    setIsMobileMenuOpen(false);
    localStorage.setItem('redirectTo', location.pathname);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-2 h-full'>
            <Link to='/' className='flex items-center space-x-2 h-full'>
              <img src={logo} alt='Weqayah' className='h-11.5' />
              <span className='text-lg font-bold text-gray-900 tablet:text-xl lg:text-xl xl:text-xl'>
                Weqayah
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className='hidden xl:flex'>
            <NavigationMenuList
              className={`tablet:gap-1 lg:gap-2 ${
                isRTL(language) ? 'flex-row-reverse' : ''
              }`}
            >
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.nameKey}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 tablet:px-2 tablet:text-xs lg:px-4 lg:text-sm',
                        isActive(item.href) &&
                          'bg-accent text-accent-foreground'
                      )}
                    >
                      {t(item.nameKey)}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className='flex items-center space-x-2 tablet:space-x-3 lg:space-x-4'>
            {/* Language Selector */}
            <LanguageSelector />

            {/* Help */}
            <Link to='/help'>
              <Button
                variant='ghost'
                size='sm'
                className='hidden sm:flex tablet:text-xs lg:text-sm'
              >
                <HelpCircle className='me-1 h-4 w-4 tablet:me-2' />
                <span className='hidden tablet:inline'>
                  {t('navigation.help')}
                </span>
              </Button>
            </Link>

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center space-x-1 tablet:space-x-2'
                >
                  <User className='h-4 w-4' />
                  <span className='hidden sm:inline tablet:text-xs lg:text-sm'>
                    {isAuthenticated()
                      ? user?.name || t('navigation.account')
                      : t('navigation.account')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                {isAuthenticated() ? (
                  <>
                    {authenticatedAccountItems.map((item) => (
                      <DropdownMenuItem key={item.nameKey} asChild>
                        <Link
                          to={item.href}
                          className='flex w-full cursor-pointer'
                        >
                          {t(item.nameKey)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='text-red-600 focus:text-red-600'
                      onClick={logout}
                    >
                      {t('navigation.signOut')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  unauthenticatedAccountItems.map((item) => (
                    <DropdownMenuItem key={item.nameKey} asChild>
                      <Link
                        to={item.href}
                        className={`flex w-full cursor-pointer justify-${
                          isRTL(language) ? 'end' : 'start'
                        }`}
                      >
                        {t(item.nameKey)}
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='sm'
              className='xl:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='xl:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              {navigationItems.map((item) => (
                <Link
                  key={item.nameKey}
                  to={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive(item.href) && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.nameKey)}
                </Link>
              ))}
              <div className='border-t pt-2'>
                <Link
                  to='/help'
                  className='block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navigation.help')}
                </Link>
                {isAuthenticated() ? (
                  <>
                    <Link
                      to='/admin'
                      className='block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('navigation.admin')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className='block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 transition-colors hover:bg-accent hover:text-accent-foreground'
                    >
                      {t('navigation.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/signin'
                      className='block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
                      onClick={signInSignUpFunction}
                    >
                      {t('navigation.signIn')}
                    </Link>
                    <Link
                      to='/signup'
                      className='block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
                      onClick={signInSignUpFunction}
                    >
                      {t('navigation.signUp')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
