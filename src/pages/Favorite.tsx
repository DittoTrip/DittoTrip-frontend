import { styled } from 'styled-components';

import Tap from '../components/common/Tab';
import { TapItem } from './Category';
import AppBar from '../components/common/AppBar';
import { useState } from 'react';
import useFavoriteData from '../hooks/favorite/useFavoriteData';
import SearchContent from '../components/search/SearchContent';
import SearchCeleb from '../components/search/SearchCeleb';
import SpotItem from '../components/common/SpotItem';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useTranslation } from 'react-i18next';

const tapData: TapItem[] = [
  { id: 1, title: '스팟', content: <div>드라마 / 영화</div> },
  { id: 2, title: '컨텐츠', content: <div>연예인들</div> },
  { id: 3, title: '연예인', content: <div>연예인들</div> },
];

const Favorite = () => {
  const { t } = useTranslation();

  const [selectedTapId, setSelectedId] = useState<number>(tapData[0]?.id);
  const { spotListData, contentListData, celebrityListData } = useFavoriteData();
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  console.log(spotListData, contentListData, celebrityListData);

  return (
    <FavoriteStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">찜</div>} />
      </div>
      <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        {selectedTapId === 1 && (
          <>
            {spotListData?.map((data, idx) => (
              <SpotItem key={idx} data={data} setIsOpen={setIsAddressOpen} setSelectedAddress={setSelectedAddress} />
            ))}

            {isAddressOpen && (
              <BottomSheet title={t('bottomsheet.address')} content={selectedAddress} setIsOpen={setIsAddressOpen} />
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
      </div>
    </FavoriteStyle>
  );
};

const FavoriteStyle = styled.div`
  .title {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.subTitle}
  }
  .content-wrapper {
    margin: 16px 22px;
  }
  .content-search-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export default Favorite;
