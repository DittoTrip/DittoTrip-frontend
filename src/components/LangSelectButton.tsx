import { useState } from 'react';
import { styled } from 'styled-components';

import i18n from '../lang/i18n';
import korea from '../assets/korea.png';
import UK from '../assets/UK.jpg';
import { ColorKey } from '../styles/theme';

interface Props {
  backgroundColor?: ColorKey;
}

const LangSelectButton = ({ backgroundColor }: Props) => {
  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = () => {
    setLang(lang === 'ko' ? 'en' : 'ko');
    i18n.changeLanguage(lang === 'ko' ? 'en' : 'ko');
  };

  return (
    <div>
      <LangSelectButtonStyled backgroundColor={backgroundColor!}>
        <div className="langSelectButton" onClick={() => changeLanguage()}>
          <img src={lang === 'ko' ? korea : UK} width={'15px'} />
        </div>
      </LangSelectButtonStyled>
    </div>
  );
};

const LangSelectButtonStyled = styled.div<{ backgroundColor: ColorKey }>`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.color[backgroundColor] : theme.color.subColor1};
  .langSelectButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export default LangSelectButton;
