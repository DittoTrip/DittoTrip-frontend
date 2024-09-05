import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
import LangSelectButton from "../components/LangSelectButton";
import AppBar from "../components/common/AppBar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DummyDitto = [
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
            <div className="content-wrapper">
                {DummyDitto.map((item, i)=>{
                    return (
                        <div key={i} className="ditto-box">
                            <img className="content-img" src={item.img}></img>
                            <div className="title-box">
                                <div className="location">{item.title}</div>
                                <div className="name">{item.name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
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
    .content-wrapper {
        margin: 8px 28px;
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: 8px; 
    }

    .ditto-box {
        position: relative;
        width: 100%; 
        display: block;
    }

    .content-img {
        border-radius: 15px;
        width: 100%; 
        height: auto; 
        display: block;
    }

    .title-box {
        position: absolute;
        bottom: 10px;
        left: 10px;
        
        .location {
            ${({theme}) => theme.font.body2}
            color: white;
        }
        .name {
            ${({theme}) => theme.font.body5}
            color: white;
        }
    }

    @media (max-width: 768px) {
        .content-wrapper {
            grid-template-columns: repeat(2, 1fr); 
        }
    }

    @media (max-width: 300px) {
        .content-wrapper {
            grid-template-columns: repeat(1, 1fr); /* 아주 작은 화면에서는 1줄로 변경 */
        }
    }
`;


export default Ditto;