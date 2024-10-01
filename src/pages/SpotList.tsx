import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { useTranslation } from 'react-i18next';
import useSpotList from '../hooks/spot/useSpotList';
import useBookmarkedCategory from '../hooks/category/useCategoryLike';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import ToggleButtonComponent from '../components/common/ToggleView';
import SpotItem from '../components/spot/SpotItem';
import ErrorPage from './Error';

import { OptionItem } from './ReviewList';
import { defaultImage, defaultPageOptions } from '../constants/constant';

const List = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarkedCategory(id!);

  const sortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('list.sortOptions.newest'),
      sort: 'createdDateTime,desc',
      handleClick: () => {
        setSelectedSortId(0);
        setIsSortOpen(false);
        setCurrentPage(0);
      },
    },
    {
      id: 1,
      text: t('list.sortOptions.distance'),
      sort: 'distance',
      handleClick: () => {
        setSelectedSortId(1);
        setIsSortOpen(false);
        setCurrentPage(0);
      },
    },
    {
      id: 2,
      text: t('list.sortOptions.highest'),
      sort: 'rating,desc',
      handleClick: () => {
        setSelectedSortId(2);
        setIsSortOpen(false);
        setCurrentPage(0);
      },
    },
  ];

  const [selectedSortId, setSelectedSortId] = useState(sortOptions[0].id);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const { spotData, categoryData, loading, error, hasMore } = useSpotList(
    id!,
    sortOptions[selectedSortId].sort!,
    currentPage,
    defaultPageOptions
  );

  const handleHeartClick = () => {
    toggleBookmark();
  };

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      setCurrentPage(prevPage => prevPage + 1); // Load next page
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && currentPage === 0) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }

  return (
    <ListStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={<div>{categoryData?.name}</div>}
          action={
            <div className="heart">
              <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} onClick={handleHeartClick} />
            </div>
          }
        />
      </div>
      <img src={categoryData?.imageFilePath ?? defaultImage} className="main-img" />
      <div className="content-wrapper">
        <div className="list-tag-slide">
          <TagSlide tagList={categoryData?.hashtags} />
        </div>
        <div className="dropdown">
          <DropDown value={sortOptions[selectedSortId]} setIsOpen={setIsSortOpen} />
        </div>

        {spotData.map((data, idx) => (
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

      <ToggleButtonComponent isMap={false} />
    </ListStyle>
  );
};

const ListStyle = styled.div`
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

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      margin: 0 10px;
    }
  }
`;

export default List;
