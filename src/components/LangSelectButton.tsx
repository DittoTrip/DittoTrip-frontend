import { useState } from 'react';
import { styled } from 'styled-components';

import i18n from '../lang/i18n';
import korea from '../assets/korea.png';
import UK from '../assets/UK.jpg';

const LangSelectButton = () => {
  const [lang, setLang] = useState('ko');

  const changeLanguage = () => {
    setLang(lang === 'ko' ? 'en' : 'ko');
    i18n.changeLanguage(lang === 'ko' ? 'en' : 'ko');
  };

  return (
    <div>
      <LangSelectButtonStyled>
        <div className="langSelectButton" onClick={() => changeLanguage()}>
          <img src={lang === 'ko' ? korea : UK} width={'15px'} />
        </div>
      </LangSelectButtonStyled>
    </div>
  );
};

const LangSelectButtonStyled = styled.div`
  margin-top: 9px;
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.subColor1};
`;

export default LangSelectButton;
