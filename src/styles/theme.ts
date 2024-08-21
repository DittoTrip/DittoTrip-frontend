import { RuleSet, css } from 'styled-components';

// 버튼
export type ButtonSize = 'large' | 'small';
export type ButtonScheme = 'keyButton' | 'subButton' | 'kakao';

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

const fonts = {
  title: css`
    font-size: 36px;
    font-weight: 800;
    line-height: 130%;
  `,
  subTitle: css`
    font-size: 24px;
    font-weight: 700;
    line-height: 130%;
  `,
  body1: css`
    font-size: 20px;
    font-weight: 500;
  `,
  body2: css`
    font-size: 16px;
    font-weight: 700;
  `,
  body3: css`
    font-size: 16px;
    font-weight: 500;
  `,
  body4: css`
    font-size: 14px;
    font-weight: 400;
  `,
  body5: css`
    font-size: 12px;
    font-weight: 400;
  `,
};

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  button: {
    [key in ButtonSize]: {
      font: RuleSet<object>;
      padding: string;
      width?: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  font: Record<string, RuleSet<object>>;
}

const colors = {
  keyColor: '#0044F1',
  subColor1: '#7FA1F8',
  subColor2: '#0924A9',
  background: 'white',
  gray20: '#EEEEEE',
  gray40: '#D6D6D6',
  gray60: '#AAAAAA',
  gray80: '#717171',
  kakao: '#FBE750',
  kakaoText: '#2F1F00',
};
export const light: Theme = {
  name: 'light',
  color: colors,
  button: {
    large: {
      font: fonts.body2,
      padding: '15px 0',
      width: '100%',
    },
    small: {
      font: fonts.body5,
      padding: '5px 10px',
    },
  },
  buttonScheme: {
    keyButton: {
      color: 'white',
      backgroundColor: colors.keyColor,
    },
    subButton: {
      color: 'white',
      backgroundColor: colors.subColor1,
    },
    kakao: {
      color: colors.kakaoText,
      backgroundColor: colors.kakao,
    },
  },

  borderRadius: {
    default: '12px',
  },
  font: fonts,
};

export const dark: Theme = {
  ...light,
  name: 'dark',
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
};

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
