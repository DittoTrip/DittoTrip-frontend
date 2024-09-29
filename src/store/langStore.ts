import create from 'zustand';
import i18n from 'i18next';

// LanguageType 정의
type LanguageType = 'ko' | 'en';

// zustand 상태 스토어 생성
interface LanguageStore {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

export const useLanguageStore = create<LanguageStore>(set => ({
  language: (localStorage.getItem('language') as LanguageType) || 'ko', // 초기 언어는 로컬스토리지에서 가져오기
  setLanguage: (language: LanguageType) => {
    i18n.changeLanguage(language); // i18n 언어 변경
    localStorage.setItem('language', language); // 로컬스토리지에 언어 저장
    set({ language });
  },
}));
