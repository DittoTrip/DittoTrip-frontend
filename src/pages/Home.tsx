import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import Weekend from '../components/home/Weekend';
import Drama from '../components/home/Drama';
import HotDitto from '../components/home/HotDitto';

export interface dramaItem {
  img: string;
  title: string;
}

export interface dittoItem {
  img: string;
  location: string;
  title: string;
}

const DRAMA_IMAGE = [
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title: '뷰티 인사이드',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/19a374e7-3cc0-4db5-8335-7c33d9ce2328/image.png',
    title: '동백꽃 필 무렵',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/c0999bfc-93fd-4a41-a1ba-1a277d109ea8/image.png',
    title: '눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/79bf120a-36d6-4d9c-972d-5866617a4ad0/image.png',
    title: '도꺠비',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/7ea13176-f7e3-4aa4-8419-d29eec305775/image.png',
    title: '나의 아저씨',
  },
];

const DITTO_IMAGE = [
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정',
    title: '수원 토박이',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정',
    title: '수원 토박이',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정',
    title: '수원 토박이',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정',
    title: '수원 토박이',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정asdwadfjejlwkjekljwlje',
    title: '수원 토박이',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location: '수원 방화수류정',
    title: '수원 토박이',
  },
];

const Home = () => {
  const { t } = useTranslation();
  return (
    <HomeStyled>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">Home</div>} action={<LangSelectButton />} />
      </div>
      <div className="body2">{t('home.suggest')}</div>
      <Weekend />
      <div className="body2">{t('home.where')}</div>
      <Drama dramaList={DRAMA_IMAGE} />
      <div className="body2">{t('home.hot ditto')}</div>
      <HotDitto dittoList={DITTO_IMAGE} />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  margin: 0 28px;

  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.title}
  }
  .body2 {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2}
    margin-bottom: 8px;
    margin-top: 20px;
  }
`;

export default Home;
