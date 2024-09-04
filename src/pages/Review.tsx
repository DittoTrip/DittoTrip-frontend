import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import Tap from '../components/common/Tab';
import { TapItem } from './Category';

import Star from '../components/common/Star';
import ReviewItem from '../components/review/ReviewItem';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';

export interface OptionItem {
  id: number;
  text: string;
  handleClick: () => void;
}

const Review = () => {
  const { t } = useTranslation();

  const reviewSortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('review.reviewSortOptions.newest'),
      handleClick: () => {
        setSelectedSortId(0);
        setIsOpen(false);
      },
    },
    {
      id: 1,
      text: t('review.reviewSortOptions.oldest'),
      handleClick: () => {
        setSelectedSortId(1);
        setIsOpen(false);
      },
    },
    {
      id: 2,
      text: t('review.reviewSortOptions.highest'),
      handleClick: () => {
        setSelectedSortId(2);
        setIsOpen(false);
      },
    },
    {
      id: 3,
      text: t('review.reviewSortOptions.lowest'),
      handleClick: () => {
        setSelectedSortId(3);
        setIsOpen(false);
      },
    },
  ];

  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.modify'),
      handleClick: () => {
        alert('modify');
      },
    },
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        alert('delete');
      },
    },
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        alert('report');
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] = useState(reviewSortOptions[0].id);
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  const tapData: TapItem[] = [
    {
      id: 1,
      title: t('review.tap.total'),
      content: (
        <div>
          <ReviewItem setIsExpandedOption={setIsExpandedOptions} />
          <ReviewItem setIsExpandedOption={setIsExpandedOptions} />
          <ReviewItem setIsExpandedOption={setIsExpandedOptions} />
        </div>
      ),
    },
    { id: 2, title: t('review.tap.comment'), content: <ReviewItem setIsExpandedOption={setIsExpandedOptions} /> },
    { id: 3, title: t('review.tap.photo'), content: <ReviewItem setIsExpandedOption={setIsExpandedOptions} /> },
  ];

  const [selectedTapId, setSelectedTapId] = useState<number>(tapData[0]?.id);

  return (
    <ReviewStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={
            <div className="title">
              {t('review.title')}
              <div className="count"> (102)</div>
            </div>
          }
          action={<div></div>}
        />
      </div>
      <div className="star-rating">
        <Star rating={4.5} showRatingValue={true} color={'keyColor'} gap={8} size={24} />
      </div>
      <div className="tap">
        <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedTapId} />
      </div>
      <div className="dropdown">
        <DropDown setIsOpen={() => setIsOpen(true)} value={reviewSortOptions[selectedSortId]} />
      </div>
      <div className="content">
        {/* <DropDown setValue={() => alert('클릭')} /> */}
        {tapData.find(item => item.id === selectedTapId)?.content}
      </div>
      {isOpen && (
        <BottomSheet
          title={t('bottomsheet.sort')}
          list={reviewSortOptions}
          setIsOpen={setIsOpen}
          selectedSortId={selectedSortId}
        />
      )}
      {isExpandedOptions && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
          selectedSortId={-1}
        />
      )}
    </ReviewStyle>
  );
};

const ReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    ${({ theme }) => theme.font.subTitle};

    .count {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
  .star-rating {
    margin-top: 8px;
  }
  .tap {
    margin-top: 4px;
  }

  .dropdown {
    display: flex;
    justify-content: start;

    margin: 10px 28px 0 28px;
  }

  .content {
    margin: 0 28px;
  }
`;

export default Review;
