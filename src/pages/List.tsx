import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import ToggleButtonComponent from '../components/common/ToggleView';
import SpotItem from '../components/common/SpotItem';

import { OptionItem } from './Review';
import useBookmarkedCategory from '../hooks/useCategory';
import useSpotList from '../hooks/spot/useSpotList';
import ErrorPage from './Error';

const List = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [selectedAddress, setSelectedAddress] = useState('');

  const { isBookmarked, toggleBookmark } = useBookmarkedCategory(id!);

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

  const handleHeartClick = () => {
    toggleBookmark();
  };
  // 해당 api 이용
  // const { data, loading, error } = useSpotList(id!, sortOptions[selectedSortId].sort!);
  const { data, loading, error } = useSpotList(id!, '');

  if (loading) {
    return <ErrorPage message={'Loading...'} />;
  } else if (error) return <ErrorPage message={'spot id를 확인해주세요'} />;

  return (
    <ListStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={<div className="title">{'이상한 변호사 우영우'}</div>}
          action={
            <div className="heart">
              <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} onClick={handleHeartClick} />
            </div>
          }
        />
      </div>
      <img src={'https://image.ajunews.com/content/image/2022/07/19/20220719165306929129.jpg'} className="main-img" />
      <div className="content-wrapper">
        <div className="list-tag-slide">
          <TagSlide tagList={data?.categoryData.hashtags} />
        </div>
        <div className="dropdown">
          <DropDown value={sortOptions[selectedSortId]} setIsOpen={setIsSortOpen} />
        </div>

        {data?.spotDataList.map((data, idx) => (
          <SpotItem key={idx} data={data} setIsOpen={setIsAddressOpen} setSelectedAddress={setSelectedAddress} />
        ))}
      </div>

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

      <ToggleButtonComponent />
    </ListStyle>
  );
};

const ListStyle = styled.div`
  width: 100%;

  .app-bar {
    ${({ theme }) => theme.font.subTitle}

    .heart {
      font-size: 20px;
      path {
        color: ${({ theme }) => theme.color.keyColor};
      }
    }
  }

  .main-img {
    width: 100%;
    aspect-ratio: 1;

    object-fit: cover;
  }

  .content-wrapper {
    margin: 6px 28px 0 28px;

    .dropdown {
      display: flex;
      justify-content: start;

      margin-top: 10px;
    }
    .list-tag-slide {
      padding: 10px 0;
    }
  }
`;

export default List;
