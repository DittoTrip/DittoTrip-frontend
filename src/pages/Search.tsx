import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const { t } = useTranslation();
    const [searchWord, setSearchWord] = useState('');
    let navigate = useNavigate();
    return (
        <SearchStyled>
            
            <div className="title">무엇을 찾으시나요?</div>
            <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeHolder')} />

            <div className="recent">
                <div className="recent-title">{t('search.recentSearches')}</div>
                <div className="delete-btn">
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="delete-btn">
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="delete-btn">
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>

            
        </SearchStyled>
    )
}

const SearchStyled = styled.div`
    .title {
        color: ${({theme}) => theme.color.keyColor};
        ${({theme})=> theme.font.subTitle}
    }
`

export default Search;