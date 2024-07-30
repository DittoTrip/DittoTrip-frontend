import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  placeHolder: string;
}

const SearchBar = ({ setSearchWord, placeHolder }: SearchBarProps) => {
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
        placeholder={placeHolder}
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
  height: 45px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.subColor1};
  border-radius: 20px;
  gap: 5px;
  justify-content: center;
  padding: 0 20px;

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
