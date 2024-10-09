import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import SpotCard from '../components/spot/SpotCard';
import { useCallback, useEffect, useState } from 'react';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useSearchParams } from 'react-router-dom';
import { defaultImage, defaultPageOptions } from '../constants/constant';
import { aroundSpotList } from '../api/spot';
import { Item } from '../models/spot/publicSpotModel';
import ErrorPage from './Error';
import LangSelectButton from '../components/LangSelectButton';
import i18n from '../lang/i18n';
import ImageModal from '../components/common/ImageModal';

const Around = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const mapX = searchParams.get('mapX');
  const mapY = searchParams.get('mapY');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const [aroundList, setAroundList] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 사진 이미지 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const handleImageClick = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const fetchAroundSpotList = async (page: number) => {
    if (mapX && mapY) {
      const req = {
        numOfRows: 10,
        pageNo: page,
        MobileOS: 'WIN',
        MobileApp: 'Ditto',
        _type: 'json',
        mapX,
        mapY,
        radius: 20000,
        contentTypeId: i18n.language == 'ko' ? 12 : 76,
        serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
      };

      try {
        setLoading(true);

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

  // useEffect(() => {
  //   if (mapX && mapY && currentPage === 1) {
  //     fetchAroundSpotList();
  //   }
  // }, [mapX, mapY]);

  useEffect(() => {
    setAroundList([]);
    setCurrentPage(1);

    fetchAroundSpotList(1);
    window.scrollTo(0, 0);
  }, [i18n.language]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchAroundSpotList(currentPage);
    }
  }, [currentPage]);

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

  return (
    <AroundStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('around.title')}</div>} action={<LangSelectButton />} />
      </div>

      {loading && currentPage == 1 ? (
        <ErrorPage message={'Loading...'} type="loading" />
      ) : (
        <div className="content-wrapper">
          {aroundList.map(data => (
            <SpotCard
              data={data}
              setIsOpen={setIsOpen}
              setSelectedAddress={setSelectedAddress}
              handleImageClick={handleImageClick}
            />
          ))}
          {!loading && aroundList.length == 0 && <div className="empty-data">주변 관광지 데이터가 없습니다. </div>}
        </div>
      )}

      {isOpen && <BottomSheet title={t('bottomsheet.address')} content={selectedAddress} setIsOpen={setIsOpen} />}
      {isModalOpen && <ImageModal setIsOpen={setIsModalOpen} imageUrl={modalImage ?? defaultImage} width={90} />}
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
