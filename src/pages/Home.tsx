import { styled } from 'styled-components';
import LangSelectButton from '../components/LangSelectButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import suggestImg from '../assets/homemain.png'

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <HomeStyle>
      <LangSelectButton />
      <div className="title">HOME</div>
      <div className="body2">{t('home.suggest')}</div>
      <img src={suggestImg} className='suggest-img'></img>
      <div className="body2">{t('home.where')}</div>
      <div className="body2">{t('home.hot ditto')}</div>
      
    </HomeStyle>
  );
};

const HomeStyle = styled.main`
  display: flex;
  flex-direction: column;

  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.title}
    text-align: left;
    line-height: 49px;
    margin-bottom:15px;
  }
  .body2 {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2}
  }
  .suggest-img {
    
    width: 336px;
    height: 376px;
    
  }
  
`;

export default Home;
