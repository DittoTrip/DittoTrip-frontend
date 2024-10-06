import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import Weekend from '../components/home/Weekend';
import Drama from '../components/home/Drama';
import KakaoLoginRedirect from '../hooks/login/kakaoLogin';
import { useEffect, useState } from 'react';
import { getHomeData } from '../api/home';
import { HomeData } from '../models/mainpage/mainpage';
import ErrorPage from './Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HotSpot from '../components/home/HotSpot';

import logo from '../assets/Ditto_logo.png';
import i18n from '../lang/i18n';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const { t } = useTranslation();
  const [homeData, setHomeData] = useState<HomeData>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const language = i18n.language;
  const { isLoggedIn } = useAuthStore();

  const fetchHome = () => {
    setLoading(true);
    getHomeData()
      .then(response => {
        setHomeData(response);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchHome();
  }, [language]);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <HomeStyled>
      <KakaoLoginRedirect />
      <div className="app-bar">
        <AppBar
          leading={false}
          title={
            <div className="title">
              <img className="logo" src={logo} />
              Ditto Trip
            </div>
          }
          action={
            <div className="action">
              <div className="alarm-wrapper" onClick={() => navigate(`/alarm`)}>
                {isLoggedIn && <FontAwesomeIcon className="alarm-icon" icon={faBell} />}
                {homeData!.isNotCheckedAlarm && <span className="not-checked" />}
              </div>
              <LangSelectButton />
            </div>
          }
        />
      </div>
      <div className="body2">{t('home.suggest')}</div>
      <Weekend data={homeData!.dittoData} />
      <div className="body2">{t('home.where')}</div>
      <Drama dramaList={homeData!.categoryDataList} />
      <div className="body2">{t('home.hot spot')}</div>
      <HotSpot dittoList={homeData!.spotDataList} />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  margin: 0 28px;

  .title {
    display: flex;
    gap: 14px;
    align-items: center;
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body1}
    font-weight: bold;

    .logo {
      width: 33px;
    }
  }

  .action {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .alarm-wrapper {
    position: relative;
    display: inline-block;

    cursor: pointer;

    .alarm-icon {
      font-size: 20px;
      path {
        color: ${({ theme }) => theme.color.subColor2};
      }
    }

    .not-checked {
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 3px;
      background-color: red;
      border-radius: 50%;
    }
  }

  .body2 {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2}
    margin-bottom: 8px;
    margin-top: 20px;
  }
`;

export default Home;
