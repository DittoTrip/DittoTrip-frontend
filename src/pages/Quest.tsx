import styled from "styled-components";
import AppBar from "../components/common/AppBar";
import { TapItem } from "./Category";
import { useState } from "react";
import Tap from "../components/common/Tab";
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
const Quest = () => {
    const tapData: TapItem[] = [
        {
            id: 0,
            title: `${t('quest.progress')}`,
            content: <></>,
        },
        {
            id: 1,
            title: `${t('quest.complete')}`,
            content: <></>,
        },
    ];

  
    const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);
    const [expData, setExpData] = useState({ current: 200, total: 300 });

    
    const expPercentage = (expData.current / expData.total) * 100;

    return (
        <QuestStyle>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={<div className="title">{t('quest.title')}</div>}
                />
            </div>
            <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
            
            <div className="quest-list-box">
                <div className="quest-box">
                    <div className="detail">
                        <div className="text-box">
                            <div className="item">아이템</div>
                            <div className="quest">팔로워 10명 모으기</div>
                            <div className="compen">눈 아이템 + 30xp 지급</div>
                        </div>
                        <div className="img"></div>
                    </div>

                    <div className="exp-container">
                        <div className="exp">
                            <div className="exp-fill" style={{ width: `${expPercentage}%` }}></div>
                        </div>
                        <div className="exp-text">{expData.current}/{expData.total}</div>
                    </div>
                </div>
                <div className="quest-box">
                    <div className="detail">
                        <div className="text-box">
                            <div className="item2">배지</div>
                            <div className="quest">팔로워 10명 모으기</div>
                            <div className="compen">눈 아이템 + 30xp 지급</div>
                        </div>
                        <div className="img"></div>
                    </div>

                    <div className="exp-container">
                        <div className="exp">
                            <div className="exp-fill" style={{ width: `${expPercentage}%` }}></div>
                        </div>
                        <div className="exp-text">{expData.current}/{expData.total}</div>
                    </div>
                </div>
            </div>

        </QuestStyle>
    );
};

const QuestStyle = styled.div`
.quest-list-box {
        margin: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
        border-radius: 20px;
    }
    .quest-box {
        padding: 20px;
        padding-bottom: 20px; 
        border-bottom: solid 1px ${({ theme }) => theme.color.gray40};
        margin-left: 20px;
        margin-right: 20px;

        .detail {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text-box {
                display: flex;
                flex-direction: column;

                .item {
                    background-color: #FFA1A1;
                    color: white;
                    border-radius: 15px;
                    width: fit-content;
                    padding: 0 15px;
                }
                .item2 {
                    background-color: #92F66F;
                    color: white;
                    border-radius: 15px;
                    width: fit-content;
                    padding: 0 15px;
                }
                .quest {
                    ${({theme})=>theme.font.body2};
                }
                .compen {
                    color: ${({theme})=>theme.color.gray80};
                    ${({theme})=>theme.font.body4}
                }
            }

            .img {
                width: 72px;
                height: 72px;
                background-color: ${({ theme }) => theme.color.gray20};
                border-radius: 100%;
            }
        }

        .exp-container {
            display: flex; 
            align-items: center;
            justify-content: space-between; 
            width: 100%;
            margin-top: 10px;
        }

        .exp {
            width: 70%; 
            background-color: ${({ theme }) => theme.color.gray20};
            border-radius: 5px;
            height: 10px;
            overflow: hidden; 

            .exp-fill {
                height: 100%;
                background-color: ${({ theme }) => theme.color.subColor1};
                transition: width 0.5s ease;
                border-radius: 5px 0 0 5px;
            }
        }

        .exp-text {
            width: 30%; 
            text-align: right;
            color: ${({ theme }) => theme.color.keyColor};
            ${({ theme }) => theme.font.body5};
            font-weight: bold;
            padding-right: 21px;
        }
    }

    .title {
        ${({ theme }) => theme.font.subTitle};
        flex: 1;
    }
`;

export default Quest;
