import { styled } from 'styled-components';

import Tap from '../components/common/Tab';
import { TapItem } from './Category';
import AppBar from '../components/common/AppBar';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorPage from './Error';
import useUserDittoList from '../hooks/ditto/useUserDittoList';
import { defaultImage } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
import DittoInfinity from '../components/ditto/DittoInfinity';
import useUserFavoriteDittoList from '../hooks/ditto/useFavoriteDittoList';

const tapData: TapItem[] = [
  { id: 1, title: '디토', content: <div></div> },
  { id: 2, title: '북마크', content: <div></div> },
];

const MyDitto = ({ isMine }: { isMine: boolean }) => {
  const { id } = useParams();

  const [selectedTapId, setSelectedId] = useState<number>(tapData[0]?.id);
  const [currentPage, setCurrentPage] = useState(0);
  const { dittoList, loading, hasMore } = useUserDittoList(id!, currentPage, 10);
  const { bookmarkedDittoList, floading } = useUserFavoriteDittoList();

  // Infinite scroll logic
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

  if ((loading || floading) && currentPage === 0) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }
  console.log(dittoList, currentPage, loading, hasMore);

  return (
    <MyDittoStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">디토</div>} />
      </div>
      {isMine && <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedId} />}
      <div className="content-wrapper">
        {selectedTapId === 1 && (
          <>
            <DittoInfinity dittoList={dittoList} itemsPerRow={3} />
          </>
        )}
        {selectedTapId === 2 && (
          <>
            <DittoInfinity dittoList={bookmarkedDittoList} itemsPerRow={3} />
          </>
        )}
      </div>
    </MyDittoStyle>
  );
};

const MyDittoStyle = styled.div`
  .title {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.subTitle}
  }
`;

export default MyDitto;
