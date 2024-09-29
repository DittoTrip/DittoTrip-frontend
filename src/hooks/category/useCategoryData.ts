import { useEffect, useState } from 'react';
import { CategoryData, SubType } from '../../models/category/categoryModel';
import { defaultPageOptions } from '../../constants/constant';
import { fetchMoreData } from '../../api/category';

const useCategoryData = (language: string) => {
  // 데이터 관리
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

  const loadMoreData = async (
    subType: SubType,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const data = { subType, size: defaultPageOptions, page };
    const newData = (await fetchMoreData(data)).categoryDataList;

    switch (subType) {
      case 'PERSON_SINGER':
        setSingerList(prev => [...prev, ...newData]);
        break;
      case 'PERSON_ACTOR':
        setActorList(prev => [...prev, ...newData]);
        break;
      case 'PERSON_COMEDIAN':
        setComedianList(prev => [...prev, ...newData]);
        break;
      case 'CONTENT_MOVIE':
        setMovieList(prev => [...prev, ...newData]);
        break;
      case 'CONTENT_DRAMA':
        setDramaList(prev => [...prev, ...newData]);
        break;
      case 'CONTENT_ENTERTAINMENT':
        setEntertainmentList(prev => [...prev, ...newData]);
        break;
    }
    setPage(prevPage => prevPage + 1);
  };

  const loadInitialData = () => {
    // 페이지 초기화
    setDramaPage(0);
    setMoviePage(0);
    setEntertainmentPage(0);
    setActorPage(0);
    setComedianPage(0);
    setSingerPage(0);

    // 데이터 초기화
    setDramaList([]);
    setMovieList([]);
    setEntertainmentList([]);
    setActorList([]);
    setComedianList([]);
    setSingerList([]);

    // 첫 페이지 데이터를 다시 로드
    loadMoreData('CONTENT_DRAMA', 0, setDramaPage);
    loadMoreData('CONTENT_MOVIE', 0, setMoviePage);
    loadMoreData('CONTENT_ENTERTAINMENT', 0, setEntertainmentPage);
    loadMoreData('PERSON_ACTOR', 0, setActorPage);
    loadMoreData('PERSON_SINGER', 0, setSingerPage);
    loadMoreData('PERSON_COMEDIAN', 0, setComedianPage);
  };

  // 언어 변경에 따른 데이터 초기화 및 재로드
  useEffect(() => {
    loadInitialData();
  }, [language]); // 언어가 변경될 때마다 실행

  return {
    dramaList,
    movieList,
    entertainmentList,
    actorList,
    comedianList,
    singerList,
    dramaPage,
    moviePage,
    entertainmentPage,
    actorPage,
    comedianPage,
    singerPage,
    setDramaPage,
    setMoviePage,
    setEntertainmentPage,
    setActorPage,
    setComedianPage,
    setSingerPage,
    loadMoreData,
  };
};

export default useCategoryData;
