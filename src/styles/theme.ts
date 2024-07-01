import { css } from 'styled-components';

export type ThemeName = 'light' | 'dark';
export type ColorKey =
  | 'keyColor'
  | 'subColor1'
  | 'subColor2'
  | 'background'
  | 'gray20'
  | 'gray40'
  | 'gray60'
  | 'gray80';
// 헤더
export type HeadingSize = 'large' | 'medium' | 'small';
// 버튼
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal' | 'like';
// 헤더
export type LayoutWidth = 'large' | 'medium' | 'small';

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  borderRadius: {
    default: string;
  };
}

export const light: Theme = {
  name: 'light',
  color: {
    keyColor: '#0044F1',
    subColor1: '#7FA1F8',
    subColor2: '#0924A9',
    background: 'white',
    gray20: '#EEEEEE',
    gray40: '#D6D6D6',
    gray60: '#AAAAAA',
    gray80: '#717171',
  },

  borderRadius: {
    default: '4px',
  },
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: {
    keyColor: '#ff5800',
    subColor1: 'lightgray',
    subColor2: '#5F5F5F',
    background: 'white',
    gray20: '#EEEEEE',
    gray40: '#D6D6D6',
    gray60: '#AAAAAA',
    gray80: '#717171',
  },
};

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};

export const fonts = {
  title: css`
    font-size: 36px;
    font-weight: 800;
    line-height: 130%;
    letter-spacing: -0.024rem;
  `,
  subTitle: css`
    font-size: 24px;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.024rem;
  `,
  body1: css`
    font-size: 20px;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: -0.024rem;
  `,
  body2: css`
    font-size: 16px;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.024rem;
  `,
  body3: css`
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.024rem;
  `,
  body4: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: -0.024rem;
  `,
};
