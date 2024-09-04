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
            <div className="content-wrapper">
                <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
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
    .ditto-box {
        display: inline-block;
        
    }

    .content-img {
        border-radius: 15px;
        position: relative;
    }
    .title {
        ${({theme}) => theme.font.title}
        color :  ${({theme}) => theme.color.keyColor}
    }
    .content-wrapper {
    margin: 8px 28px;
    }
    .title-box {
        position: absolute;

        .location {
            ${({theme}) => theme.font.body2}
            color : white
        }
        .name {
            ${({theme}) => theme.font.body5}
            color : white
        }
    }
`;

export default Ditto;