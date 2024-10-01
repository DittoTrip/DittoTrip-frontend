import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { searchSpot } from '../../api/spot';
import { searchCategory } from '../../api/category';

import { SpotData } from '../../models/spot/spotModel';
import { CategoryData } from '../../models/category/categoryModel';
import { searchUser } from '../../api/user';
import { defaultPageOptions } from '../../constants/constant';
import { UserData } from '../../models/user/userModel';

const useSearchData = (tapId: number) => {
  // 데이터 관리
  const [spotListData, setSpotListData] = useState<SpotData[]>([]);
  const [contentListData, setContentListData] = useState<CategoryData[]>([]);
  const [celebrityListData, setCelebrityListData] = useState<CategoryData[]>([]);
  const [userListData, setUserListData] = useState<UserData[]>([]);

  // 페이지 관리
  const [spotPage, setSpotPage] = useState(0);
  const [contentPage, setContentPage] = useState(0);
  const [celebrityPage, setCelebrityPage] = useState(0);
  const [userPage, setUserPage] = useState(0);

  // 유저 경도 위도
  const [userX, setUserX] = useState<number | null>(null);
  const [userY, setUserY] = useState<number | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search');
  const sort = params.get('sort');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserX(position.coords.longitude);
      setUserY(position.coords.latitude);
    });
  }, []);

  const loadMoreSpotData = async () => {
    const data = { userX, userY, page: spotPage, sort, query: search };
    console.log(sort, search, data);
    if (search === null) {
      return;
    }

    const newData = (await searchSpot(data)).spotDataList;

    console.log(newData);

    setSpotListData(prev => [...prev, ...newData]);
    setSpotPage(prevPage => prevPage + 1);
  };

  const loadMoreContentData = async () => {
    if (search === null) {
      return;
    }

    const newData = (await searchCategory(search, 'CONTENT', contentPage)).categoryDataList;

    console.log(newData);

    setContentListData(prev => [...prev, ...newData]);
    setContentPage(prevPage => prevPage + 1);
  };

  const loadMoreCelebrityData = async () => {
    if (search === null) {
      return;
    }

    const newData = (await searchCategory(search, 'PERSON', celebrityPage)).categoryDataList;

    console.log(newData);

    setCelebrityListData(prev => [...prev, ...newData]);
    setCelebrityPage(prevPage => prevPage + 1);
  };
  const loadMoreUserData = async () => {
    if (search === null) {
      return;
    }
    const data = { page: userPage, size: defaultPageOptions, query: search };

    const newData = (await searchUser(data)).userDataList;

    console.log(newData);

    setUserListData(prev => [...prev, ...newData]);
    setUserPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setSpotPage(0);
    setContentPage(0);
    setCelebrityPage(0);
    setUserPage(0);

    setSpotListData([]);
    setContentListData([]);
    setCelebrityListData([]);
    setUserListData([]);

    if (tapId == 1) {
      loadMoreSpotData();
    }
    if (tapId == 2) {
      loadMoreContentData();
    }
    if (tapId == 3) {
      loadMoreCelebrityData();
    }
    if (tapId == 4) {
      loadMoreUserData();
    }
  }, [search, sort, tapId]);

  return {
    spotListData,
    contentListData,
    celebrityListData,
    userListData,
    loadMoreSpotData,
    loadMoreContentData,
    loadMoreCelebrityData,
    loadMoreUserData,
    setSpotPage,
    setContentPage,
    setCelebrityPage,
    setUserPage,
    setSpotListData,
  };
};

export default useSearchData;
