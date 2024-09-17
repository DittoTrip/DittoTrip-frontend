import styled from "styled-components";
import AppBar from "../components/common/AppBar";
import Button from "../components/common/Button";
import { useState } from "react";
import { TapItem } from "./Category";
import Tap from "../components/common/Tab";

const Character = () => {
    const tapData: TapItem[] = [
        {
            id: 0,
            title: '피부',
            content: (
                <></>
            ),
        },
        {
            id: 1,
            title: '머리',
            content: (
                <></>
            ),
        },
        {
            id: 2,
            title: '눈',
            content: (
                <></>
            ),
        },
        {
            id: 3,
            title: '입',
            content: (
                <></>
            ),
        },
        {
            id: 4,
            title: '장식',
            content: (
                <></>
            ),
        },
    ]

    const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

    // 더미 데이터 추가
    const boxData = Array.from({ length: 9 }, (_, i) => i);

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
                    } />
            </div>
            <div className="container">
                <div className="character-tab">
                    <div className="margin">
                        <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
                        <div className="box-container">
                            {boxData.map((item, index) => (
                                <div className="box" key={index}>
                                    {item + 1}
                                </div>
                            ))}
                        </div>
                    </div>
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
        ${({ theme }) => theme.font.subTitle};
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
    .margin {
        margin: 0 28px;
    }

    .box-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .box {
        width: 100px;
        height: 100px;
        background-color:#F9F9F9;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 16px;
        color: #333;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        border-radius: 100%;
    }
`;

export default Character;
