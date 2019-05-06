import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de/translation.json';
import en from './locales/en/translation.json';
import zh_cn from './locales/zh_cn/translation.json';
import zh_tw from './locales/zh_tw/translation.json';


// Load translations for each language
const resources = {
  de,
  en,
  zh_cn,
  zh_tw,
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
    lng: 'en',
    resources,
  });

export default i18n;
