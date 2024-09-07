import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import SearchBar from '../components/common/SearchBar';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Tap from '../components/common/Tab';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import SpotItem from '../components/common/SpotItem';
import { SpotData } from '../models/Spot/spotModel';
import { TapItem } from './Category';
import { OptionItem } from './Review';
import SearchUser from '../components/search/SearchUser';
import SearchCeleb from '../components/search/SearchCeleb';
import SearchContent from '../components/search/SearchContent';

export const DummyContent = [
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png',
    title: '눈물의 여왕',
    isLike: false,
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png',
    title: '눈물의 여왕',
    isLike: false,
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png',
    title: '눈물의 여왕',
    isLike: false,
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png',
    title: '눈물의 여왕',
    isLike: false,
  },
];
export const DummyCeleb = [
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/32a3092f-f595-438a-b56e-2c7bc52b142f/image.png',
    name: '김수현',
    isLike: false,
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/32a3092f-f595-438a-b56e-2c7bc52b142f/image.png',
    name: '김수현',
    isLike: false,
  },
];

export const DummyUser = [
  {
    name: '김수현',
  },
  {
    name: '김수현도둑',
  },
];

export const DummyDataList: SpotData[] = [
  {
    spotId: 1,
    name: '소소주점',
    address: '경기도 남양주시 와부읍 덕소로',
    pointX: 37.751736,
    pointY: 127.12987,
    imagePath:
      'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    hashtags: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    myBookmarkId: 1,
  },
  {
    spotId: 1,
    name: '안 소소주점',
    address: '경기도 남양주시 와부읍 덕소로',
    pointX: 37.751736,
    pointY: 127.12987,
    imagePath:
      'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    hashtags: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    myBookmarkId: 1,
  },
];

const SearchResult = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWordFromURL = searchParams.get('search') || '';

  const tapData: TapItem[] = [
    { id: 1, title: '스팟', content: <div>드라마 / 영화</div> },
    { id: 2, title: '컨텐츠', content: <div>연예인들</div> },
    { id: 3, title: '연예인', content: <div>연예인들</div> },
    { id: 4, title: '사용자', content: <div>연예인들</div> },
  ];

  const [searchWord, setSearchWord] = useState(searchWordFromURL);
  const [selectedTapId, setSelectedId] = useState<number>(tapData[0]?.id);

  const sortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('list.sortOptions.newest'),
      sort: 'newest',
      handleClick: () => {
        setSelectedSortId(0);
        setIsSortOpen(false);
      },
    },
    {
      id: 1,
      text: t('list.sortOptions.distance'),
      sort: 'distance',
      handleClick: () => {
        setSelectedSortId(1);
        setIsSortOpen(false);
      },
    },
    {
      id: 2,
      text: t('list.sortOptions.highest'),
      sort: 'rating',
      handleClick: () => {
        setSelectedSortId(2);
        setIsSortOpen(false);
      },
    },
  ];

  const [selectedSortId, setSelectedSortId] = useState(sortOptions[0].id);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  useEffect(() => {
    if (searchWord) {
      setSearchParams({ search: searchWord });
    } else {
      setSearchParams({});
    }
  }, [searchWord, setSearchParams]);

  useEffect(() => {
    if (selectedTapId == 1) {
      // loadSpotData
    }
    if (selectedTapId == 2) {
      // loadContentData
    }
    if (selectedTapId == 3) {
      // loadCelebrityData
    }
    if (selectedTapId == 4) {
      // loadUserData
    }
  }, [searchWordFromURL]);

  // const [spotPage, setSpotPage] = useState(0);
  // const [contentPage, setContentPage] = useState(0);
  // const [celebrityPage, setCelebrityPage] = useState(0);
  // const [userPage, setUserPage] = useState(0);

  return (
    <SearchResultStyled>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={
            <div className="title">
              <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
            </div>
          }
        />
      </div>
      <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        {selectedTapId === 1 && (
          <>
            <div className="dropdown">
              <DropDown value={sortOptions[selectedSortId]} setIsOpen={setIsSortOpen} />
            </div>

            {DummyDataList.map((data, idx) => (
              <SpotItem key={idx} data={data} setIsOpen={setIsAddressOpen} setSelectedAddress={setSelectedAddress} />
            ))}

            {isAddressOpen && (
              <BottomSheet title={t('bottomsheet.address')} content={selectedAddress} setIsOpen={setIsAddressOpen} />
            )}
            {isSortOpen && (
              <BottomSheet
                title={t('bottomsheet.sort')}
                list={sortOptions}
                setIsOpen={setIsSortOpen}
                selectedSortId={selectedSortId}
              />
            )}
          </>
        )}
        {selectedTapId === 2 && (
          <>
            {DummyContent.map(data => (
              <SearchContent data={data} />
            ))}
          </>
        )}
        {selectedTapId === 3 && (
          <>
            {DummyCeleb.map(data => (
              <SearchCeleb data={data} />
            ))}
          </>
        )}
        {selectedTapId === 4 && (
          <>
            {DummyUser.map(data => (
              <SearchUser data={data} />
            ))}
          </>
        )}
      </div>
    </SearchResultStyled>
  );
};

const SearchResultStyled = styled.div`
  .app-bar {
    .title {
      flex: 1;
    }
  }
  .content-wrapper {
    margin: 16px 22px;
  }

  .dropdown {
    display: flex;
    justify-content: start;

    margin-top: 10px;
  }
`;

export default SearchResult;
