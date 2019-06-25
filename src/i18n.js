import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de/translation.json';
import en from './locales/en/translation.json';
import zhCn from './locales/zhCn/translation.json';
import zhTw from './locales/zhTw/translation.json';
import fr from './locales/fr/translation.json';
import ja from './locales/ja/translation.json';
import ptBr from './locales/ptBr/translation.json';


// Load translations for each language
const resources = {
  de,
  en,
  fr,
  ja,
  'pt-BR': ptBr,
  'zh-CN': zhCn,
  'zh-TW': zhTw,
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
