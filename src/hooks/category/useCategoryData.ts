import { useEffect, useState } from 'react';
import { CategoryData, SubType } from '../../models/Category/categoryModel';
import { defaultPageOptions } from '../../constants/constant';
import { fetchMoreData } from '../../api/category';

const useCategoryData = () => {
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

  useEffect(() => {
    loadMoreData('CONTENT_DRAMA', dramaPage, setDramaPage);
    loadMoreData('CONTENT_MOVIE', moviePage, setMoviePage);
    loadMoreData('CONTENT_ENTERTAINMENT', entertainmentPage, setEntertainmentPage);

    loadMoreData('PERSON_ACTOR', actorPage, setActorPage);
    loadMoreData('PERSON_SINGER', singerPage, setSingerPage);
    loadMoreData('PERSON_COMEDIAN', comedianPage, setComedianPage);
  }, []);

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
