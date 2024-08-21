import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  placeholder: string;
}

const SearchBar = ({ setSearchWord, placeholder }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    setSearchWord(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키가 눌리면 검색 실행
    }
  };

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
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러
      />
    </SearchContainer>
  );
};

// 스타일드 컴포넌트 정의
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
