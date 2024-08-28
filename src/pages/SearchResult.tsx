import styled from "styled-components"
import LangSelectButton from "../components/LangSelectButton";
import AppBar from "../components/common/AppBar";
import SearchBar from "../components/common/SearchBar";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tap from "../components/common/Tab";
import DropDown from "../components/common/DropDown";

export interface TapItem {
    id: number;
    title: string;
    content: JSX.Element;
}

const SearchResult = () => {
    const { t } = useTranslation();
    const tapData: TapItem[] = [
        { id: 1, title: "스팟", content: <div>드라마 / 영화</div> },
        { id: 2, title: "컨텐츠", content: <div>연예인들</div> },
        { id: 3, title: "연예인", content: <div>연예인들</div> },
        { id: 4, title: "사용자", content: <div>연예인들</div> },
    ];

    const [searchWord, setSearchWord] = useState('');
    const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);


    return (
        <SearchResultStyled>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
                        </div>
                }
                action={<LangSelectButton/>}
                />
            </div>
            <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
            <DropDown setValue={() => setSelectedId} />
        </SearchResultStyled>
    )
}

const SearchResultStyled = styled.div``

export default SearchResult;