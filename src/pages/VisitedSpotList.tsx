import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import { useCallback, useEffect, useState } from 'react';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useParams } from 'react-router-dom';
import ErrorPage from './Error';
import LangSelectButton from '../components/LangSelectButton';
import VisitedSpotCard from '../components/spot/VisitedSpotCard';
import { defaultPageOptions } from '../constants/constant';
import useVisitedSpotList from '../hooks/spot/useVisitedSpotList';

const Around = () => {
  const { t } = useTranslation();
  const { id: userId } = useParams();

  const [selectedAddress, setSelectedAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { visitedList, loading, totalPage } = useVisitedSpotList(userId!, currentPage, defaultPageOptions);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 40 && !loading && currentPage + 1 !== totalPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log('scroll');
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && currentPage == 1) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <AroundStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{'방문 스팟'}</div>} action={<LangSelectButton />} />
      </div>
      <div className="content-wrapper">
        {visitedList.map(data => (
          <VisitedSpotCard data={data} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress} />
        ))}
        {!loading && visitedList.length == 0 && <div className="empty-data">방문 스팟이 없습니다.</div>}
      </div>

      {isOpen && <BottomSheet title={t('bottomsheet.address')} content={selectedAddress} setIsOpen={setIsOpen} />}
    </AroundStyle>
  );
};

const AroundStyle = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;

  .app-bar {
    .title {
      ${({ theme }) => theme.font.subTitle};
    }
  }

  .content-wrapper {
    margin: 16px 28px;

    .empty-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 70vh;
    }
  }
`;

export default Around;
