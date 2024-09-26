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
import { TapItem } from './Category';
import { OptionItem } from './ReviewList';
import SearchUser from '../components/search/SearchUser';
import SearchCeleb from '../components/search/SearchCeleb';
import SearchContent from '../components/search/SearchContent';
import useSearchData from '../hooks/search/useSearchData';

const SearchResult = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWordFromURL = searchParams.get('search') || '';
  // const sortFromURL = searchParams.get('sort') || 'createdDateTime,desc';

  const tapData: TapItem[] = [
    { id: 1, title: '스팟', content: <></> },
    { id: 2, title: '컨텐츠', content: <></> },
    { id: 3, title: '연예인', content: <></> },
    { id: 4, title: '사용자', content: <></> },
  ];

  const [searchWord, setSearchWord] = useState(searchWordFromURL);
  const [selectedTapId, setSelectedId] = useState<number>(tapData[0]?.id);

  const sortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('list.sortOptions.newest'),
      sort: 'createdDateTime,desc',
      handleClick: () => {
        setSelectedSortId(0);
        setIsSortOpen(false);
        setSearchParams({ sort: 'createdDateTime,desc' });
      },
    },
    {
      id: 1,
      text: t('list.sortOptions.distance'),
      sort: 'distance',
      handleClick: () => {
        setSelectedSortId(1);
        setIsSortOpen(false);
        setSearchParams({ sort: 'distance,desc' });
      },
    },
    {
      id: 2,
      text: t('list.sortOptions.highest'),
      sort: 'rating,desc',
      handleClick: () => {
        setSelectedSortId(2);
        setIsSortOpen(false);
        setSearchParams({ sort: 'rating,desc' });
      },
    },
  ];

  const [selectedSortId, setSelectedSortId] = useState(sortOptions[0].id);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const {
    spotListData,
    contentListData,
    celebrityListData,
    userListData,
    setSpotPage,
    setContentPage,
    setCelebrityPage,
    setUserPage,
    // setSpotListData,
  } = useSearchData(selectedTapId);

  useEffect(() => {
    setSearchParams({ search: searchWord, sort: sortOptions[selectedSortId].sort! });
    setSpotPage(0);
    setContentPage(0);
    setCelebrityPage(0);
    setUserPage(0);
  }, [searchWord, selectedSortId]);

  return (
    <SearchResultStyled>
      <div className="app-bar">
        <AppBar
          leading={false}
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

            {spotListData.map((data, idx) => (
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
          <div className="content-search-list">
            {contentListData.map((data, idx) => (
              <SearchContent data={data} key={idx} />
            ))}
          </div>
        )}
        {selectedTapId === 3 && (
          <>
            {celebrityListData.map((data, idx) => (
              <SearchCeleb data={data} key={idx} />
            ))}
          </>
        )}
        {selectedTapId === 4 && (
          <>
            {userListData.map(data => (
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
  .content-search-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .dropdown {
    display: flex;
    justify-content: start;

    margin-top: 10px;
  }
`;

export default SearchResult;
