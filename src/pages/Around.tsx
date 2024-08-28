import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import SpotCard from '../components/common/SpotCard';
import { useState } from 'react';
import BottomSheet from '../components/bottomsheet/BottomSheet';

const DummyDataList = [
  {
    img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
  {
    img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
  {
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
  {
    img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
  {
    img: 'https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
  {
    img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    name: '소소주점',
    distance: '200km',
    rating: 4.5,
    address: '강원 강릉시 율곡로3139번길 24 오죽헌',
  },
];

const Around = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  return (
    <AroundStyle>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">{t('around.title')}</div>} />
      </div>
      <div className="content-wrapper">
        {DummyDataList.map(data => (
          <SpotCard data={data} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress} />
        ))}
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
  }
`;

export default Around;
