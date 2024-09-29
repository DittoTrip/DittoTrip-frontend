import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langEn from './lang.en.json';
import langKo from './lang.ko.json';
import { useLanguageStore } from '../store/langStore';

const resource = {
  en: {
    translation: langEn,
  },
  ko: {
    translation: langKo,
  },
};

// zustand 스토어에서 언어 가져오기
const language = useLanguageStore.getState().language;

i18n.use(initReactI18next).init({
  resources: resource,
  lng: language, // zustand에서 가져온 언어로 초기화
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
