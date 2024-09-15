import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';
import LangSelectButton from '../components/LangSelectButton';
import AppBar from '../components/common/AppBar';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DittoInfinity from '../components/ditto/DittoInfinity';
import useDittoList from '../hooks/ditto/useDittoList';
import ErrorPage from './Error';
import { defaultPageOptions } from '../constants/constant';

export interface dittoInfi {
  img: string;
  title: string;
  name: string;
}

const Ditto = () => {
  const { t } = useTranslation();
  const [searchWord, setSearchWord] = useState('');
  console.log(searchWord);
  const [currentPage, setCurrentPage] = useState(0);
  const { dittoList, loading, error, hasMore } = useDittoList(currentPage, defaultPageOptions);

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

  if (loading && currentPage === 0) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }
  return (
    <DittoStyle>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">Ditto</div>} action={<LangSelectButton />} />
      </div>
      <div className="search-bar">
        <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
      </div>
      <DittoInfinity dittoList={dittoList} />
    </DittoStyle>
  );
};

const DittoStyle = styled.div`
  .title {
    ${({ theme }) => theme.font.title}
    color :  ${({ theme }) => theme.color.keyColor}
  }
  .search-bar {
    margin: 8px 28px;
    margin-bottom: 13px;
  }
`;

export default Ditto;
