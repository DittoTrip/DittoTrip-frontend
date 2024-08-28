import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';
import DropDown from '../components/common/DropDown';

import { OptionItem } from './Review';
import BottomSheet from '../components/bottomsheet/BottomSheet';

const List = () => {
  const { t } = useTranslation();

  const isLiked = true;

  const dummyTag = ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'];
  const sortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('list.sortOptions.newest'),
      handleClick: () => {
        setSelectedSortId(0);
        setIsOpen(false);
      },
    },
    {
      id: 1,
      text: t('list.sortOptions.distance'),
      handleClick: () => {
        setSelectedSortId(1);
        setIsOpen(false);
      },
    },
    {
      id: 2,
      text: t('list.sortOptions.highest'),
      handleClick: () => {
        setSelectedSortId(2);
        setIsOpen(false);
      },
    },
  ];

  const [selectedSortId, setSelectedSortId] = useState(sortOptions[0].id);
  const [isOpen, setIsOpen] = useState(false);

  const handleHeartClick = () => {};

  return (
    <ListStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={<div className="title">{'이상한 변호사 우영우'}</div>}
          action={
            <div className="heart">
              <FontAwesomeIcon icon={isLiked ? faHeart : faEmptyHeart} onClick={() => handleHeartClick()} />
            </div>
          }
        />
      </div>
      <img src={'https://image.ajunews.com/content/image/2022/07/19/20220719165306929129.jpg'} className="main-img" />
      <div className="content-wrapper">
        <TagSlide tagList={dummyTag} />
        <div className="dropdown">
          <DropDown value={sortOptions[selectedSortId]} setIsOpen={setIsOpen} />
        </div>
      </div>

      {isOpen && (
        <BottomSheet
          title={t('bottomsheet.sort')}
          list={sortOptions}
          setIsOpen={setIsOpen}
          selectedSortId={selectedSortId}
        />
      )}
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
  }
`;

export default List;
