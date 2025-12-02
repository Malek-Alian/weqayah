import { useTranslation } from 'react-i18next';
import { Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className='relative bg-primary text-primary-foreground'>
      <div className='px-4 py-12'>
        {/* Brand Name */}
        <div className='text-center mb-8'>
          <h2 className='text-4xl md:text-5xl font-bold text-primary-foreground'>
            Weqayah
          </h2>
        </div>

        {/* Mission Statement */}
        <div className='text-center mb-8 max-w-4xl mx-auto'>
          <p className='text-lg md:text-xl leading-relaxed text-primary-foreground'>
            {t('footer.mission')}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className='flex justify-center space-x-6 mb-8'>
          {/* LinkedIn */}
          <a
            href='#'
            className='w-12 h-12 bg-background rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
            aria-label='LinkedIn'
          >
            <Linkedin className='w-6 h-6 text-blue-600' />
          </a>

          {/* Facebook */}
          <a
            href='#'
            className='w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
            aria-label='Facebook'
          >
            <Facebook className='w-6 h-6 text-blue-600' />
          </a>

          {/* YouTube */}
          <a
            href='#'
            className='w-12 h-12 bg-background rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
            aria-label='YouTube'
          >
            <Youtube className='w-6 h-6 text-red-600' />
          </a>

          {/* Instagram */}
          <a
            href='#'
            className='w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
            aria-label='Instagram'
          >
            <Instagram className='w-6 h-6 text-pink-600' />
          </a>
        </div>

        {/* Company Info */}
        <div className='text-center'>
          <p className='text-primary-foreground text-sm md:text-base'>
            {t('footer.operatedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
