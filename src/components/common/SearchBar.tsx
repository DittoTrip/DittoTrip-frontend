import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  placeholder: string;
  setSearchWord: (searchWord: string) => void;
  handleSubmit?: (search: string) => void;
}

const SearchBar = ({ setSearchWord, placeholder, handleSubmit }: SearchBarProps) => {
  const queryParams = new URLSearchParams(window.location.search);
  const initialSearchTerm = queryParams.get('search') || ''; // Default to empty string if no 'search' param

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = () => {
    setSearchWord(searchTerm);
    if (handleSubmit) handleSubmit(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  return (
    <SearchContainer>
      <div className="searchButton" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  height: 45px;
  padding: 0 20px;

  border: 1px solid ${({ theme }) => theme.color.subColor1};
  border-radius: 20px;

  .input {
    flex: 1;
    padding: 5px;
    border: none;
    outline: none;
    height: 100%;
    ${({ theme }) => theme.font.body4}
  }
  .searchButton {
    font-size: 14px;
    path {
      color: ${({ theme }) => theme.color.subColor1};
    }
  }
`;

export default SearchBar;
