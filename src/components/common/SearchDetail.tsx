import React, { useState } from 'react';
import styled from 'styled-components';


const SearchBar: React.FC = () => {
const [searchTerm, setSearchTerm] = useState<string>('');
const [recentSearches, setRecentSearches] = useState<string[]>(['React', 'TypeScript', 'Styled-Components']);
const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchTerm(e.target.value);
};

const handleSearchClick = () => {
if (searchTerm.trim() !== '' && !recentSearches.includes(searchTerm)) {
    setRecentSearches([searchTerm, ...recentSearches]);
}
setShowRecentSearches(false); // 검색 후 드롭다운 닫기
};

const handleInputFocus = () => {
setShowRecentSearches(true);
};

const handleRecentSearchClick = (term: string) => {
setSearchTerm(term);
setShowRecentSearches(false);
};

return (
<SearchBarWrapper>
    <SearchInput
    type="text"
    value={searchTerm}
    onChange={handleInputChange}
    onFocus={handleInputFocus}
    placeholder="Search..."
    />
    <RecentSearchesBox show={showRecentSearches}>
    {recentSearches.map((search, index) => (
        <RecentSearchItem key={index} onClick={() => handleRecentSearchClick(search)}>
        {search}
        </RecentSearchItem>
    ))}
    </RecentSearchesBox>
</SearchBarWrapper>
);
};

const SearchBarWrapper = styled.div`
position: relative;
width: 300px;
margin: 0 auto;
`;

const SearchInput = styled.input`
width: 100%;
padding: 10px;
border-radius: 4px;
border: 1px solid #ccc;
font-size: 16px;
`;

const RecentSearchesBox = styled.div<{ show: boolean }>`
position: absolute;
top: 100%;
left: 0;
width: 100%;
background-color: white;
border: 1px solid #ccc;
border-top: none;
border-radius: 0 0 4px 4px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
display: ${(props) => (props.show ? 'block' : 'none')};
z-index: 1000;
`;

const RecentSearchItem = styled.div`
padding: 10px;
cursor: pointer;
&:hover {
    background-color: #f0f0f0;
}
`;


export default SearchBar;
