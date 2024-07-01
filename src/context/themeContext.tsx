import { ReactNode, createContext, useEffect, useState } from 'react';
import { ThemeName, getTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOVALSTORAGE_KEY = 'book_store_theme';
// 테마상태와 토글 함수 interface 정의
interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}
// createContext할 때 default값이 필요해서 생성
export const state = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => {},
};

// context 만들기(테마상태/ 테마 바꾸는 함수 포함), export
// default value가 필요해서 state를 만들어서 넣은 것
// 사용할 때는 value로 값을 넣어줄 것임.
export const ThemeContext = createContext<State>(state);

// 테마 상태 총괄 provider , export
export const DittoProvider = ({ children }: { children: ReactNode }) => {
  //   기본 값 설정, state로 테마 상태 관리
  const [themeName, setThemeName] = useState<ThemeName>('light');

  // reload될 때
  // 로컬 스토리지에서 THEME_LOVALSTORAGE_KEY를 키로 가진 테마 상태 가져옴
  // 로컬 스토리지에서 가져온 게 있다면 테마 상태 setState
  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOVALSTORAGE_KEY) as ThemeName;

    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  // 토글하고 setState & 로컬 스토리지에 저장
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
    localStorage.setItem(THEME_LOVALSTORAGE_KEY, themeName === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
// ThemeContext.Provider
// ThemeContext는 만든 context, provider로 뿌려줌.
//  value로 테마상태, 토글함수 넣어줌. (interface 따름)

// themeProvider
// theme 파일에서 state에 저장된 themeName으로 가져와서 themeprovider 설정
// 상태를 통해 themeName props로 넘겨주기
// ?? => themeProvider에 바로 themeName넣으면 안되는 이유
// styled-components 이용
// 없으면 하위 파일에서 theme 파일에서 맞는 테마 색상을 못찾음.

// GlobalStyle
// global 파일에서 props에 따라 globalstyle 만들어서 export
// styled-components 에서 createGlobalStyle 이용

// ThemeSwitcher
// setThemeName 이용하여 themeName 상태 바꾸는 역할
