import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import SpotCard from '../components/common/SpotCard';
import { useCallback, useEffect, useState } from 'react';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useSearchParams } from 'react-router-dom';
import { defaultPageOptions } from '../constants/constant';
import { aroundSpotList } from '../api/spot';
import { Item } from '../models/spot/publicSpotModel';
import ErrorPage from './Error';
import LangSelectButton from '../components/LangSelectButton';
import i18n from '../lang/i18n';

const Around = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const mapX = searchParams.get('mapX');
  const mapY = searchParams.get('mapY');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const [aroundList, setAroundList] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAroundSpotList = async () => {
    if (mapX && mapY) {
      const req = {
        numOfRows: 10,
        pageNo: currentPage,
        MobileOS: 'WIN',
        MobileApp: 'Ditto',
        _type: 'json',
        mapX,
        mapY,
        radius: 20000,
        contentTypeId: i18n.language == 'ko' ? 12 : 76,
        serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
      };

      setLoading(true);

      try {
        const res = await aroundSpotList(req);
        const totalCount = res.data.response.body.totalCount || 0;

        if (res.data.response.body.items.item) {
          setAroundList(prev => [...prev, ...res.data.response.body.items.item]);
        }

        setTotalPages(Math.ceil(totalCount / defaultPageOptions));
      } catch (error) {
        console.log('error 발생', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAroundSpotList();
  }, [mapX, mapY, currentPage]);

  useEffect(() => {
    setAroundList([]);
    setCurrentPage(1);
    fetchAroundSpotList();
  }, [i18n.language]);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && currentPage < totalPage) {
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
        <AppBar leading={true} title={<div className="title">{t('around.title')}</div>} action={<LangSelectButton />} />
      </div>
      <div className="content-wrapper">
        {aroundList.map(data => (
          <SpotCard data={data} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress} />
        ))}
        {!loading && aroundList.length == 0 && <div className="empty-data">주변 관광지 데이터가 없습니다. </div>}
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
