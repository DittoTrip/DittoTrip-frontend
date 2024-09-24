import { useEffect, useState } from 'react';
import { favoriteSpotList } from '../../api/spot';
import { SpotData } from '../../models/spot/spotModel';
import { CategoryData } from '../../models/category/categoryModel';
import { bookmarkedCategoryList } from '../../api/category';

const useFavoriteData = () => {
  // 데이터 관리
  const [spotListData, setSpotListData] = useState<SpotData[]>([]);
  const [contentListData, setContentListData] = useState<CategoryData[]>([]);
  const [celebrityListData, setCelebrityListData] = useState<CategoryData[]>([]);

  // 유저 경도 위도
  const [userX, setUserX] = useState<number | null>(null);
  const [userY, setUserY] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserX(position.coords.latitude);
      setUserY(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    loadMoreSpotData();
    loadMoreContentData();
    loadMoreCelebrityData();
  }, [userX, userY]);

  const loadMoreSpotData = async () => {
    const newData = (await favoriteSpotList(userX!, userY!)).spotDataList;
    setSpotListData(newData);
  };

  const loadMoreContentData = async () => {
    const newData = (await bookmarkedCategoryList('CONTENT')).categoryDataList;

    setContentListData(newData);
  };

  const loadMoreCelebrityData = async () => {
    const newData = (await bookmarkedCategoryList('PERSON')).categoryDataList;

    setCelebrityListData(newData);
  };

  return {
    spotListData,
    contentListData,
    celebrityListData,
  };
};

export default useFavoriteData;
