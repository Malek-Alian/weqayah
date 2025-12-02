import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function FooterNavigation() {
  const { t } = useTranslation();
  return (
    <div className='w-full bg-white border-t border-gray-200'>
      <nav className='flex justify-center items-center py-4 px-6'>
        <div className='flex space-x-8 text-sm font-medium text-gray-700'>
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
