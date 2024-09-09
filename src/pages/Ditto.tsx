import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
import LangSelectButton from "../components/LangSelectButton";
import AppBar from "../components/common/AppBar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DittoInfinity from "../components/ditto/DittoInfinity";

export interface dittoInfi {
    img: string;
    title : string;
    name : string;
}

export const DummyDitto = [
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/f02d5c0c-d612-4c68-9771-207a65d1a49c/image.png",
        title : "쁘띠 프랑스",
        name : "프레첼"
    },
]

const Ditto = () => {

    const { t } = useTranslation();
    const [searchWord, setSearchWord] = useState('');

    return ( 
        <DittoStyle>
            <div className="app-bar">
                <AppBar
                    leading={false}
                    title={
                        <div className="title">
                            Ditto
                        </div>
                }
                action={<LangSelectButton/>}
                />
            </div>
            <div className="search-bar">
                <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
            </div>
            <DittoInfinity dittoList={DummyDitto}/> 
        </DittoStyle>
    )
}

const DittoStyle = styled.div`
    .title {
        ${({theme}) => theme.font.title}
        color :  ${({theme}) => theme.color.keyColor}
    }
    .search-bar {
        margin: 8px 28px;
        margin-bottom: 13px;
    }
`;


export default Ditto;