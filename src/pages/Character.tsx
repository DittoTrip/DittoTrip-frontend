import styled from "styled-components"
import AppBar from "../components/common/AppBar";
import Button from "../components/common/Button";
import { useState } from "react";

const Character = () =>{

    return (
        <CharacterStyle>
            <div className="app-bar">
                <AppBar 
                    leading={true} 
                    title={
                        <div className="title">캐릭터 편집</div>
                    } 
                    action={
                        <div className="btn">
                        <Button size={"small"} scheme={"keyButton"}>완료</Button>
                        </div>
                    }/>
            </div>
            <div className="container">
                <div className="character-tab">

                </div>
            </div>


        </CharacterStyle>
    )
}

const CharacterStyle = styled.div`
    .app-bar {
        background-color: #F9F9F9;
    }
    .title {
        ${({theme})=>theme.font.subTitle};
        flex: 1;
    }

    .container {
        height: 400px;
        width: 100%;
        background-color:#F9F9F9;
        position: relative;
    }
    .character-tab {
        height: 500px;
        width: 100%;
        background-color: white;
        position: absolute;
        top: 310px;
        border-radius: 30px;
        box-shadow: 0px -1px 15px -2px rgb(0, 0, 0, 0.1);
    }
`;

export default Character;