import styled from "styled-components"
import AppBar from "../components/common/AppBar";
import LangSelectButton from "../components/LangSelectButton";
import Button from "../components/common/Button";
import TagSlide from "../components/common/TagSlide";

import CommentInput from "../components/comment/CommentInput";
import DittoInfinity from "../components/ditto/DittoInfinity";
import { DummyDitto } from "./Ditto";
import CommenList from "../components/comment/CommentList";

export const dittoDetails = {
    tagList: ['김태리', '배우','미스터션샤인',]
}

const DittoDetail = () => {
    return ( 
        <DittoDetailStyle>
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
            <img className="main-img" src="https://velog.velcdn.com/images/gogo6570/post/13956471-8806-4af6-a68b-50037177105a/image.png"/>
            <div className="content-wrapper">
                <div className="ditto-user-btn">
                    <div className="user-background">
                        <img className="user-img" src="https://velog.velcdn.com/images/gogo6570/post/348417d6-a282-46f0-bbcd-a0583ac83850/image.png"></img>
                    </div>
                    <div className="user-name">압구르기 뒷구르기
                        <div className="date"></div>
                    </div>
                    <img className="badge-img" src="https://velog.velcdn.com/images/gogo6570/post/2f0e493d-b0fe-407c-a8fc-0cc5d7b4db78/image.png"></img>
                    <Button size={'small'} scheme={'keyButton'}>Follow</Button>
                </div>

                <div>
                    <div></div>
                    <div>만휴정</div>
                </div>

                <div className="ditto-content">미스터 션샤인의 촬영지! "합시다. 러브"로 유명해진
                    그곳에 다녀왔습니다. 엄청 푸르고 예뻤어요. 이 시기에는 관광객들이 많이 없어서
                    조용하게 들길 수 있었습니다. 추천해요~
                </div>

                <TagSlide tagList={dittoDetails.tagList} />

                <div className="bookmark-comment-icon">
                    <div className="bookmark"></div>
                    <div className="comment"></div>
                </div>

                <CommenList/>
                <CommentInput/>

                <div>더 알아보기</div>

                <DittoInfinity dittoList={DummyDitto}/>

            </div>
        </DittoDetailStyle>
    )
}

const DittoDetailStyle = styled.div`
    .title {
        ${({theme}) => theme.font.title}
        color :  ${({theme}) => theme.color.keyColor}
    }
    .app-bar {
        margin-bottom: 20px;
    }
    .main-img {
        width: 100%;
        height: 400px;
    }
    .content-wrapper {
        margin: 29px 28px 16px 28px;

        .ditto-user-btn {
            display: flex;
            
        }
    }
`;

export default DittoDetail;