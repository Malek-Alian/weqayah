import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import ar from './utils/language/locales/ar.json';
import en from './utils/language/locales/en.json';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// RTL languages
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

const isDevelopment = process.env.NODE_ENV === 'development';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: isDevelopment,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Helper function to check if language is RTL
export const isRTL = (language) => {
  return rtlLanguages.includes(language);
};

// Helper function to get text direction
export const getTextDirection = (language) => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export default i18n;
