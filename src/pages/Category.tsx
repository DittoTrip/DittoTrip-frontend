import { useTranslation } from 'react-i18next';
import SearchBar from '../components/common/SearchBar';
import Tap from '../components/common/Tab';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Slide from '../components/common/Slide';
import SearchDetail from '../components/common/SearchDetail';

export interface TapItem {
  id: number;
  title: string;
  content: JSX.Element;
}
export interface contentItem {
  img: string;
  name: string;
}

const CAROUSEL_IMAGES = [
  { img: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg', name: '김수현' },
  {
    img: 'https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg',
    name: '김지원',
  },
  {
    img: 'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg',
    name: '송혜교',
  },
  {
    img: 'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg',
    name: '송혜교',
  },
  {
    img: 'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg',
    name: '송혜교',
  },
];
const Category = () => {
  const { t } = useTranslation();
  const tapData: TapItem[] = [
    { id: 1, title: `${t('category.tap.contents')}`, content: <div>드라마 / 영화</div> },
    { id: 2, title: `${t('category.tap.celebrity')}`, content: <div>연예인들</div> },
  ];

  const [searchWord, setSearchWord] = useState('');
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  useEffect(() => {
    // 검색 api 호출 => data 갱신
  }, [searchWord]);

  return (
    <CategoryStyled>
      <StyledSearchDetail/>
      <div className="title">카테고리</div>
      <SearchBar setSearchWord={setSearchWord} placeHolder={t('search.placeHolder')} />
      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />

      <div className="content">
        <div className="subTitle">{t('category.contents.entertainment')}</div>
        <Slide carouselList={CAROUSEL_IMAGES} />
      </div>

      <div className="content">
        <div className="subTitle">{t('category.contents.drama')}</div>
        <Slide carouselList={CAROUSEL_IMAGES} />
      </div>

      <div className="content">
        <div className="subTitle">{t('category.contents.movie')}</div>
        <Slide carouselList={CAROUSEL_IMAGES} />
      </div>
    </CategoryStyled>
  );
};

const CategoryStyled = styled.div`
  position: relative;
  padding: 20px 0;
  .title {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.subTitle};
  }
  .subTitle {
    ${({ theme }) => theme.font.body2};
  }
  .content {
    padding: 12px 0;
  }
`;

const StyledSearchDetail = styled(SearchDetail)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default Category;
