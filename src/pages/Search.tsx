import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import AppBar from '../components/common/AppBar';
import SearchBar from '../components/common/SearchBar';
import TextSlide from '../components/common/TextSlide';
import DittoTap from '../components/search/DittoTap';
import DittoSlide from '../components/search/DittoSlide';

import { TapItem } from './Category';
import { useNavigate } from 'react-router-dom';
import { deleteSearchWord, getRecentSearchWords, saveSearchWord } from '../utils/recentSearches';

export interface searchItem {
  title: string;
}

export interface dittoItem {
  img: string;
  title: string;
}

const CAROUSEL_IMAGES: dittoItem[] = [
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '1.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '2.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '3.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '4.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '5.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '6.눈물의 여왕',
  },
  {
    img: 'https://velog.velcdn.com/images/gogo6570/post/43eb6553-a55e-4856-b497-e6c4f86b94e7/image.png',
    title: '7.눈물의 여왕',
  },
];

const CAROUSEL_TEXTS = [
  { title: '도꺠비' },
  { title: '공유' },
  { title: '강원도' },
  { title: '이상한 변호사 우영우' },
  { title: '도꺠비' },
  { title: '도꺠비' },
];

const Search = () => {
  const { t } = useTranslation();
  const [searchWord, setSearchWord] = useState('');
  const [recentWord, setRecentWord] = useState(getRecentSearchWords());

  const navigate = useNavigate();
  console.log(searchWord);
  if (searchWord) {
    navigate(`/search-result?search=${searchWord}`);
  }

  const handleDeleteSearch = (word: string) => {
    deleteSearchWord(word);
    setRecentWord(getRecentSearchWords());
  };

  const tapData: TapItem[] = [
    { id: 1, title: `${t('category.tap.contents')}`, content: <div>영상 컨턴츠</div> },
    { id: 2, title: `${t('category.tap.celebrity')}`, content: <div>연예인</div> },
  ];

  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);
  return (
    <SearchStyled>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('search.what')}</div>} action={<></>} />
      </div>

      <div className="container">
        <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} handleSubmit={saveSearchWord} />

        <div className="search-title">{t('search.recentSearches')}</div>

        <div className="recent-list">
          {recentWord.map((word: string) => (
            <div className="recent-item" key={word}>
              <div className="recent-content">{word}</div>
              <div className="delete-btn" onClick={() => handleDeleteSearch(word)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          ))}
        </div>

        <div className="search-title">{t('search.suggestion')}</div>
        <TextSlide carouselTextList={CAROUSEL_TEXTS} />

        <RiseDittoStyled>
          <div className="ditto-title">{t('search.rising')}</div>
          <div className="ditto">|</div>
          <DittoTap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
        </RiseDittoStyled>
        <DittoSlide carouselDittoList={CAROUSEL_IMAGES} />
      </div>
    </SearchStyled>
  );
};

const RiseDittoStyled = styled.div`
  display: flex;
`;

const SearchStyled = styled.div`
  .app-bar .title {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.body1};
    color: ${({ theme }) => theme.color.keyColor};
  }
  .search-title {
    margin-top: 32px;
    margin-bottom: 16px;
    ${({ theme }) => theme.font.body2};
    display: inline-block;
  }
  .ditto-title {
    ${({ theme }) => theme.font.body2};
    margin-top: 24px;
  }
  .ditto {
    margin-top: 22px;
    padding-left: 14.5px;
    color: ${({ theme }) => theme.color.gray80};
  }

  .container {
    margin: 10px 28px;
  }

  .recent-content {
    padding: 5px;
    width: 95%;
    float: left;
  }
  .delete-btn {
    width: 5%;
    float: left;
  }
  .clear {
    clear: both;
  }
`;

export default Search;
