import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import AppBar from '../components/common/AppBar';
import SearchBar from '../components/common/SearchBar';
import Tap from '../components/common/Tab';
import CategorySection from '../components/category/CategorySection';
import FavoriteButton from '../components/category/FavoriteButton';

import useCategoryData from '../hooks/category/useCategoryData';
import LangSelectButton from '../components/LangSelectButton';
import { useAuthStore } from '../store/authStore';
import Modal from '../components/common/Modal';
import i18n from '../lang/i18n';

export interface TapItem {
  id: number;
  title: string;
  content: JSX.Element;
}

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const language = i18n.language;

  const [isFavorite, setFavoritesView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    dramaList,
    movieList,
    entertainmentList,
    actorList,
    comedianList,
    singerList,
    dramaPage,
    moviePage,
    entertainmentPage,
    actorPage,
    comedianPage,
    singerPage,
    setDramaPage,
    setMoviePage,
    setEntertainmentPage,
    setActorPage,
    setComedianPage,
    setSingerPage,
    loadMoreData,
  } = useCategoryData(language);

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      setIsOpen(true);
    } else {
      setFavoritesView(!isFavorite);
    }
  };

  const tapData: TapItem[] = [
    {
      id: 0,
      title: `${t('category.tap.contents')}`,
      content: (
        <>
          <CategorySection
            title={t('category.contents.entertainment')}
            list={entertainmentList}
            subType="CONTENT_ENTERTAINMENT"
            page={entertainmentPage}
            setPage={setEntertainmentPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.contents.drama')}
            list={dramaList}
            subType="CONTENT_DRAMA"
            page={dramaPage}
            setPage={setDramaPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.contents.movie')}
            list={movieList}
            subType="CONTENT_MOVIE"
            page={moviePage}
            setPage={setMoviePage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
        </>
      ),
    },
    {
      id: 1,
      title: `${t('category.tap.celebrity')}`,
      content: (
        <>
          <CategorySection
            title={t('category.celebrity.comedian')}
            list={comedianList}
            subType="PERSON_COMEDIAN"
            page={comedianPage}
            setPage={setComedianPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.celebrity.singer')}
            list={singerList}
            subType="PERSON_SINGER"
            page={singerPage}
            setPage={setSingerPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
          <CategorySection
            title={t('category.celebrity.actor')}
            list={actorList}
            subType="PERSON_ACTOR"
            page={actorPage}
            setPage={setActorPage}
            loadMoreData={loadMoreData}
            isFavorite={isFavorite}
          />
        </>
      ),
    },
  ];

  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  return (
    <CategoryStyled>
      <AppBar leading={false} title={<div className="title">{'Search'}</div>} action={<LangSelectButton />} />
      <div className="searchBar" onClick={() => navigate('/search')}>
        <SearchBar setSearchWord={() => {}} placeholder={t('search.placeholder')} />
      </div>

      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        <FavoriteButton isFavorite={isFavorite} onClick={handleHeartClick} />
        {tapData[selectedId].content}
      </div>

      {isOpen && (
        <Modal width={65} message={t('guide.login')} handleConfirm={() => navigate('/login')} setIsOpen={setIsOpen} />
      )}
    </CategoryStyled>
  );
};

const CategoryStyled = styled.div`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    text-align: left;
    flex: 1;
    ${({ theme }) => theme.font.title};
  }
  .searchBar {
    margin: 8px 28px 0 28px;
  }
  .content-wrapper {
    margin: 0 28px;
  }
`;

export default Category;
