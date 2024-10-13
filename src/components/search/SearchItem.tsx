import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { saveSearchWord } from '../../utils/recentSearches';

interface SearchItemProps {
  title: string;
}

const SearchItem = ({ title }: SearchItemProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/search-result?search=${title}`);
    saveSearchWord(title);
  };

  return (
    <SearchItemStyled>
      <div className="search-item-name" onClick={handleClick}>
        {title}
      </div>
    </SearchItemStyled>
  );
};

const SearchItemStyled = styled.div`
  border: 1.4px solid ${({ theme }) => theme.color.subColor1};
  border-radius: 20px;
  padding: 0 10px;
  display: inline-block;
  .search-item-name {
    color: ${({ theme }) => theme.color.keyColor};
    text-align: center;
    ${({ theme }) => theme.font.body4};

    cursor: pointer;
  }
`;

export default SearchItem;
