import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import AppBar from '../components/common/AppBar';
import SearchBar from '../components/common/SearchBar';
import Tap from '../components/common/Tab';

import CategorySection from '../components/category/CategorySection';
import FavoriteButton from '../components/category/FavoriteButton';

import { fetchMoreData } from '../api/category';
import { CategoryData, subType } from '../models/Category/categoryModel';
import { defaultPageOptions } from '../constants/constant';

export interface TapItem {
  id: number;
  title: string;
  content: JSX.Element;
}

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //데이터 저장
  const [dramaList, setDramaList] = useState<CategoryData[]>([]);
  const [movieList, setMovieList] = useState<CategoryData[]>([]);
  const [entertainmentList, setEntertainmentList] = useState<CategoryData[]>([]);

  const [actorList, setActorList] = useState<CategoryData[]>([]);
  const [comedianList, setComedianList] = useState<CategoryData[]>([]);
  const [singerList, setSingerList] = useState<CategoryData[]>([]);

  // 페이지 관리
  const [dramaPage, setDramaPage] = useState(0);
  const [moviePage, setMoviePage] = useState(0);
  const [entertainmentPage, setEntertainmentPage] = useState(0);

  const [actorPage, setActorPage] = useState(0);
  const [comedianPage, setComedianPage] = useState(0);
  const [singerPage, setSingerPage] = useState(0);

  // 즐겨찾기 상태 관리
  const [isFavorite, setFavoritesView] = useState(false);

  // 데이터 load
  const loadMoreData = async (
    subType: subType,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const data = { subType, size: defaultPageOptions, page };
    const newData = (await fetchMoreData(data)).categoryDataList;

    if (subType === 'PERSON_SINGER') {
      setSingerList(prev => [...prev, ...newData]);
    } else if (subType === 'PERSON_ACTOR') {
      setActorList(prev => [...prev, ...newData]);
    } else if (subType === 'PERSON_COMEDIAN') {
      setComedianList(prev => [...prev, ...newData]);
    } else if (subType === 'CONTENT_MOVIE') {
      setMovieList(prev => [...prev, ...newData]);
    } else if (subType === 'CONTENT_DRAMA') {
      setDramaList(prev => [...prev, ...newData]);
    } else if (subType === 'CONTENT_ENTERTAINMENT') {
      setEntertainmentList(prev => [...prev, ...newData]);
    }

    setPage(prevPage => prevPage + 1);
  };

  // 초기 데이터
  useEffect(() => {
    loadMoreData('CONTENT_DRAMA', dramaPage, setDramaPage);
    loadMoreData('CONTENT_MOVIE', moviePage, setMoviePage);
    loadMoreData('CONTENT_ENTERTAINMENT', entertainmentPage, setEntertainmentPage);

    loadMoreData('PERSON_ACTOR', actorPage, setActorPage);
    loadMoreData('PERSON_SINGER', singerPage, setSingerPage);
    loadMoreData('PERSON_COMEDIAN', comedianPage, setComedianPage);
  }, []);

  // 즐겨찾기 클릭
  const handleHeartClick = () => {
    setFavoritesView(!isFavorite);
  };

  const tapData: TapItem[] = [
    {
      id: 0,
      title: `${t('category.tap.contents')}`,
      content: (
        <>
          <CategorySection
            title={t('category.contents.entertainment')}
            list={entertainmentList}
            subType="CONTENT_ENTERTAINMENT"
            page={entertainmentPage}
            setPage={setEntertainmentPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.contents.drama')}
            list={dramaList}
            subType="CONTENT_DRAMA"
            page={dramaPage}
            setPage={setDramaPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.contents.movie')}
            list={movieList}
            subType="CONTENT_MOVIE"
            page={moviePage}
            setPage={setMoviePage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
        </>
      ),
    },
    {
      id: 1,
      title: `${t('category.tap.celebrity')}`,
      content: (
        <>
          <CategorySection
            title={t('category.celebrity.comedian')}
            list={comedianList}
            subType="PERSON_COMEDIAN"
            page={comedianPage}
            setPage={setComedianPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.celebrity.singer')}
            list={singerList}
            subType="PERSON_SINGER"
            page={singerPage}
            setPage={setSingerPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.celebrity.actor')}
            list={actorList}
            subType="PERSON_ACTOR"
            page={actorPage}
            setPage={setActorPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
        </>
      ),
    },
  ];

  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  return (
    <CategoryStyled>
      <AppBar leading={false} title={<div className="title">카테고리</div>} />
      <div className="searchBar" onClick={() => navigate('/search')}>
        <SearchBar setSearchWord={() => {}} placeholder={t('search.placeholder')} />
      </div>

      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        <FavoriteButton isFavorite={isFavorite} onClick={handleHeartClick} />
        {tapData[selectedId].content}
      </div>
    </CategoryStyled>
  );
};

const CategoryStyled = styled.div`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    text-align: left;
    flex: 1;
    ${({ theme }) => theme.font.subTitle};
  }
  .searchBar {
    margin: 8px 28px 0 28px;
  }
  .content-wrapper {
    margin: 0 28px;
  }
`;

export default Category;
