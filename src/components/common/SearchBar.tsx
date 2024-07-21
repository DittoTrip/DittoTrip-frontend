import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  placeHolder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchWord, placeHolder }: SearchBarProps) => {
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
      <div className="searchButton" onClick={handleSearch} style={{ color: 'yellow' }}>
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
  margin-bottom: 20px;
  height: 45px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.subColor1};
  border-radius: 20px;

  .input {
    padding: 5px 15px;
    border: none;
    outline: none;
    height: 100%;
    ${({ theme }) => theme.font.body4}
  }
  .searchButton {
    padding: 0 15px;
    color: ${({ theme }) => theme.color.subColor1};
  }

  .button.disable {
    background-color: lightgray;
  }
`;

export default SearchBar;
