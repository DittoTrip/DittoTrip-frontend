import styled from "styled-components";
import SearchBar from "./SearchBar";


const SearchDetail = () => {
    return (
        <SearchDetailStyled>
    
    </SearchDetailStyled>
    );
};

const SearchDetailStyled = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: red;
    .title {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.subTitle};
}
`;

export default SearchDetail;