import { useTranslation } from 'react-i18next';
import SearchBar from '../components/common/SearchBar';

const SearchPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar
        setSearchWord={() => {
          alert('검색');
        }}
        placeHolder={t('search.placeHolder')}
      />
    </div>
  );
};

export default SearchPage;
