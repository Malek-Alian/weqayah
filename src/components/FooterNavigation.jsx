import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function FooterNavigation() {
  const { t } = useTranslation();

  return (
    <div className='w-full bg-white border-t border-gray-200'>
      <nav className='flex justify-center items-center py-2 px-4 sm:py-4 sm:px-6'>
        <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-gray-700'>
          <Link
            to='/about-us'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.about')}
          </Link>
          <Link
            to='/help'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.help')}
          </Link>
          <Link
            to='/find-doctor'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.findDoctor')}
          </Link>
          <Link
            to='/medical-news'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.medicalNews')}
          </Link>
          <Link
            to='/blog'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.ourBlogs')}
          </Link>
          <Link
            to='/'
            className='hover:text-primary transition-colors duration-200'
          >
            {t('navigation.home')}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default FooterNavigation;
