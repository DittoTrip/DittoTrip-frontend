import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const { t } = useTranslation();
  const [searchWord, setSearchWord] = useState('');
  console.log(searchWord);
  return (
    <SearchPageStyled>
      <div className="title">무엇을 찾으시나요?</div>
      <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />

      <div className="recent">
        <div className="recent-title">{t('search.recentSearches')}</div>
        <div className="delete-btn">
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="delete-btn">
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="delete-btn">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </SearchPageStyled>
  );
};

const SearchPageStyled = styled.div`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.subTitle}
  }
`;

export default SearchPage;
