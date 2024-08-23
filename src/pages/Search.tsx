import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LangSelectButton from "../components/LangSelectButton";
import AppBar from "../components/common/AppBar";
import TextSlide from "../components/common/TextSlide";
import Tap from "../components/common/Tab";
import DittoTap from "../components/search/DittoTap";

export interface searchItem {
    title : string;
}

export interface TapItem {
    id : number;
    title: string;
    content: JSX.Element;
}

const CAROUSEL_TEXTS = [
    { title : "도꺠비"},{ title : "공유"},{ title : "강원도"},
    { title : "이상한 변호사 우영우"},{ title : "도꺠비"},{ title : "도꺠비"},
]

const Search = () => {
    const { t } = useTranslation();
    const [searchWord, setSearchWord] = useState('');
    let navigate = useNavigate();

    const tapData: TapItem[] = [
        {id: 1, title: `${t('category.tap.contents')}`, content: <div>영상 컨턴츠</div>},
        {id: 2, title: `${t('category.tap.celebrity')}`, content: <div>연예인</div>}
    ]

    const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);
    return (
        <SearchStyled>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            무엇을 찾으시나요?
                        </div>
                }
                action={<LangSelectButton/>}
                />
            </div>
            
            <div className="container">
            <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeHolder')} />
                
                <div className="search-title">최근 검색</div>

                <div className="recent-list">
                    <div className="recent-content">슬기로운 깜빵생활</div>
                    <div className="delete-btn">
                    <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
                <div className="clear"/>
                
                <div className="search-title"> 추천 검색어</div>
                <TextSlide carouselList={CAROUSEL_TEXTS}/>
                
                <div className="search-title">급상승 디토</div>
                <DittoTap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId}/>
            </div>
            
        </SearchStyled>
    )
}

const SearchStyled = styled.div`
    .app-bar .title {
    display: flex;
    justify-content: center;
    ${({ theme }) => theme.font.body1};
    color: ${({theme})=>theme.color.keyColor};
    }
    .search-title {
        margin-top: 32px;
        margin-bottom: 16px;
        ${({theme})=>theme.font.body2};
        display: inline-block;
    }
    .container {
        margin: 0 27px;
    }
    .recent-list {
        display: block;
    }
    .recent-content{
        width: 95%;
        float: left;
    }
    .delete-btn{
        width: 5%;
        float: left;
    }
    .clear {
        clear: both;
    }
`

export default Search;