import styled from "styled-components";


interface SearchItemProps {
    title: string;
}

const SearchItem = ({title} : SearchItemProps) =>{
    return (
        <SearchItemStyled>
            <div className="search-item-name">{title}</div>
        </SearchItemStyled>
    )
}

const SearchItemStyled = styled.div`
border: 1.4px solid ${({ theme }) => theme.color.subColor1};
border-radius: 20px;
padding: 0 10px;
display: inline-block;
.search-item-name {
    color: ${({theme})=>theme.color.keyColor};
    text-align: center;
    ${({theme})=>theme.font.body4};
}
`;

export default SearchItem;