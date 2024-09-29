import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';
import LangSelectButton from '../components/LangSelectButton';
import AppBar from '../components/common/AppBar';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DittoInfinity from '../components/ditto/DittoInfinity';
import useDittoList from '../hooks/ditto/useDittoList';
import ErrorPage from './Error';
import WriteButton from '../components/ditto/WriteButton';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useNavigate } from 'react-router-dom';
import i18n from '../lang/i18n';
// import { defaultPageOptions } from '../constants/constant';

export interface dittoInfi {
  img: string;
  title: string;
  name: string;
}

const Ditto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language;

  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const { dittoList, loading, error, hasMore } = useDittoList(currentPage, 10, searchWord, language);

  useEffect(() => {
    setCurrentPage(0);
  }, [language]);

  // 디토 작성, 스팟 신청
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.writeDitto'),
      handleClick: () => {
        navigate(`/ditto/new`);
      },
    },
    {
      id: 0,
      text: t('bottomsheet.ApplyForASpot'),
      handleClick: () => {
        navigate(`/spot/new`);
      },
    },
  ];

  useEffect(() => {
    setCurrentPage(0);
  }, [searchWord]);

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
    return <ErrorPage message={'Error'} type="error" />;
  }
  return (
    <DittoStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={<div className="title">Ditto</div>}
          action={
            <div className="action">
              <WriteButton
                handleClick={() => {
                  setIsExpandedOptions(true);
                }}
              />
              <LangSelectButton />
            </div>
          }
        />
      </div>
      <div className="search-bar">
        <SearchBar setSearchWord={setSearchWord} placeholder={t('search.search')} />
      </div>
      <DittoInfinity dittoList={dittoList} itemsPerRow={2} />

      {isExpandedOptions && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
        />
      )}
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
  .action {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

export default Ditto;
