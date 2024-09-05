import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import SearchBar from '../components/common/SearchBar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Tap from '../components/common/Tab';
// import DropDown from '../components/common/DropDown';
import SearchContent from '../components/search/SearchContent';
import SearchCeleb from '../components/search/SearchCeleb';
import SearchUser from '../components/search/SearchUser';
import { OptionItem } from './Review';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import SpotItem from '../components/common/SpotItem';
import { SpotData } from '../models/Spot/spotModel';
// import { OptionItem } from './Review';

export interface TapItem {
  id: number;
  title: string;
  content: JSX.Element;
}

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
  const tapData: TapItem[] = [
    { id: 1, title: '스팟', content: <div>드라마 / 영화</div> },
    { id: 2, title: '컨텐츠', content: <div>연예인들</div> },
    { id: 3, title: '연예인', content: <div>연예인들</div> },
    { id: 4, title: '사용자', content: <div>연예인들</div> },
  ];

  const [searchWord, setSearchWord] = useState('');
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  const sortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('list.sortOptions.newest'),
      sort: 'newest',
      handleClick: () => {
        setSelectedSortId(0);
        setIsAddressOpen(false);
      },
    },
    {
      id: 1,
      text: t('list.sortOptions.distance'),
      sort: 'distance',

      handleClick: () => {
        setSelectedSortId(1);
        setIsAddressOpen(false);
      },
    },
    {
      id: 2,
      text: t('list.sortOptions.highest'),
      sort: 'rating',
      handleClick: () => {
        setSelectedSortId(2);
        setIsAddressOpen(false);
      },
    },
  ];

  const [selectedSortId, setSelectedSortId] = useState(sortOptions[0].id);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  console.log(searchWord);
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
      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        {selectedId === 1 && (
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
        {selectedId === 2 && (
          <>
            {DummyContent.map(data => (
              <SearchContent data={data} />
            ))}
          </>
        )}
        {selectedId === 3 && (
          <>
            {DummyCeleb.map(data => (
              <SearchCeleb data={data} />
            ))}
          </>
        )}
        {selectedId === 4 && (
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
