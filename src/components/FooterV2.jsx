import { isRTL } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import logo from '../assets/weqayah-logo.png';

const quickLinks = [
  { nameKey: 'navigation.home', href: '/' },
  { nameKey: 'navigation.findDoctor', href: '/find-doctor' },
  { nameKey: 'navigation.medicalNews', href: '/medical-news' },
  { nameKey: 'navigation.ourBlogs', href: '/blog' },
  { nameKey: 'navigation.about', href: '/about-us' },
  { nameKey: 'navigation.help', href: '/help' },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    href: '#',
    label: 'LinkedIn',
    color: 'text-blue-600 hover:text-blue-700',
    bgColor: 'hover:bg-blue-50',
  },
  {
    icon: FaFacebook,
    href: '#',
    label: 'Facebook',
    color: 'text-blue-600 hover:text-blue-700',
    bgColor: 'hover:bg-blue-50',
  },
  {
    icon: FaYoutube,
    href: '#',
    label: 'YouTube',
    color: 'text-red-600 hover:text-red-700',
    bgColor: 'hover:bg-red-50',
  },
  {
    icon: FaInstagram,
    href: '#',
    label: 'Instagram',
    color: 'text-pink-600 hover:text-pink-700',
    bgColor: 'hover:bg-pink-50',
  },
];

// eslint-disable-next-line react/prop-types
const FooterLink = ({ to, nameKey, t }) => (
  <li>
    <Link
      to={to}
      className='text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 text-sm flex items-center group'
    >
      {t(nameKey)}
    </Link>
  </li>
);

// eslint-disable-next-line react/prop-types
const ContactItem = ({ icon: Icon, text, rtl }) => (
  <div
    className={`flex items-center text-primary-foreground/80 text-sm ${
      rtl ? 'flex-row-reverse' : ''
    }`}
  >
    <Icon className={`w-4 h-4 ${rtl ? 'ml-2' : 'mr-2'}`} />
    <span>{text}</span>
  </div>
);

function FooterV2() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const rtl = isRTL(language);

  return (
    <footer className='relative bg-primary text-primary-foreground'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Company Info Section */}
          <div className='lg:col-span-1 space-y-4'>
            <Link to='/' className='flex items-center space-x-2 mb-6'>
              <img src={logo} alt='Weqayah' className='h-10' />
              <span className='text-2xl font-bold text-primary-foreground'>
                Weqayah
              </span>
            </Link>
            <p className='text-primary-foreground/90 text-sm leading-relaxed'>
              {t('footer.mission')}
            </p>
            <div className='pt-4'>
              <p className='text-primary-foreground/80 text-xs'>
                {t('footer.operatedBy')}
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary-foreground mb-4'>
              {t('footer.quickLinks')}
            </h3>
            <ul className={`space-y-3 ${rtl ? 'text-right' : 'text-left'}`}>
              {quickLinks.map((link) => (
                <FooterLink
                  key={link.nameKey}
                  to={link.href}
                  nameKey={link.nameKey}
                  t={t}
                />
              ))}
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary-foreground mb-4'>
              {t('footer.followUs')}
            </h3>
            <p className='text-primary-foreground/80 text-sm mb-6'>
              {t('footer.getInTouch')}
            </p>

            {/* Social Media Icons */}
            <div className={`flex ${rtl ? 'flex-row-reverse' : ''} gap-3 mb-6`}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 bg-background backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 ${social.bgColor} ${social.color} hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon className='w-5 h-5' />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className='space-y-2 pt-4 border-t border-primary-foreground/20'>
              <ContactItem icon={LuMail} text='info@weqayah.com' />
              <ContactItem icon={LuPhone} text='+962 6 123 4567' />
              <ContactItem icon={LuMapPin} text='Amman, Jordan' />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-primary-foreground/20 bg-primary/95'>
        <div className='container mx-auto px-4 py-6'>
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
              rtl ? 'md:flex-row-reverse' : ''
            }`}
          >
            <p className='text-primary-foreground text-sm text-center md:text-left'>
              {t('footer.copyright')}
            </p>
            <div className='flex items-center gap-4 text-primary-foreground text-sm'>
              <Link
                to='/help'
                className='hover:text-primary-foreground transition-colors duration-200'
              >
                {t('footer.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterV2;
