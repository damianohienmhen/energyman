// src/lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        avatar: 'Avatar',
        upload: 'Upload',
        acceptedFiles: 'Accepted files',
        pleaseWait: 'Please wait...',
      },
    },
    // You can add more languages here later, e.g., 'fr', 'es', etc.
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language if translation key not found

  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
