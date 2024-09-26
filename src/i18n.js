import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// const backend = new Backend({
//   // path where resources get loaded from
//   loadPath: '/locales/ES/translation.json',
// });

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ES',
    debug: false,
    // detection: {
    //     order: [ 'queryString','cookie'],
    //     cache: ['cookie']
    // },
    interpolation: {
      escapeValue: false,
    },
    
  });

// document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {document.documentElement.setAttribute('lang', lng);});
export default i18n;
