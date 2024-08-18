import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SearchBar from "../components/common/SearchBar";



const SearchPage = () => {
    const { t } = useTranslation();
    const [searchWord, setSearchWord] = useState('');
    return (
        <SearchPageStyled>
            <div className="title">무엇을 찾으시나요?</div>
            <SearchBar setSearchWord={setSearchWord} placeHolder={t('search.placeHolder')} />

        </SearchPageStyled>
    )
}

const SearchPageStyled = styled.div`
    .title {
        color: ${({theme}) => theme.color.keyColor};
        ${({theme})=> theme.font.subTitle}
    }
`

export default SearchPage;