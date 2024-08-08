import { styled } from 'styled-components';
import LangSelectButton from '../components/LangSelectButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Weekend from '../components/home/Weekend';
import Drama from '../components/home/Drama';
import HotDitto from '../components/home/Hotditto';

export interface dramaItem {
  img: string;
  title: string;
}

const DRAMA_IMAGE = [
  {
    img :'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title:'뷰티 인사이드'
  },
  {
    img :'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title:'뷰티 인사이드'
  },
  {
    img :'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title:'뷰티 인사이드'
  },
  {
    img :'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title:'뷰티 인사이드'
  },
  {
    img :'https://velog.velcdn.com/images/gogo6570/post/a68996dd-2333-41bb-89a6-36c9e710d0b3/image.png',
    title:'뷰티 인사이드'
  },
];

const HOTDITTO_IMAGE = [
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
  {
    img:'https://velog.velcdn.com/images/gogo6570/post/8b1d5b9c-c003-4f3d-908f-c970a65b431f/image.png',
    location:'수원 방화수류정',
    title:'수원 토박이'
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <HomeStyled>
      <div className="title">HOME</div>
      <LangSelectHomeButton/>
      <div className="body2">{t('home.suggest')}</div>
      <Weekend/>
      <div className="body2">{t('home.where')}</div>
      <Drama dramaList = {DRAMA_IMAGE}/>
      <div className="body2">{t('home.hot ditto')}</div>
      
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 393px;
  height: 1459px;
  margin-left: auto;
  margin-right: auto;
  div {
    margin-left: auto;
    margin-right: auto;
  }
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.title}
    margin-bottom:10px;
    margin-left: 26.5px;
    display: inline-block;
    width: 307.5px;
    float: left;
  }
  .body2 {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2}
    margin-bottom: 8px;
    margin-left: 26.5px;
    margin-top: 23px;
    clear: both;
  }
`;

const LangSelectHomeButton = styled(LangSelectButton)`
  float: left;
`;

export default Home;
