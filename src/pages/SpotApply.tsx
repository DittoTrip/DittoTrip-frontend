import styled from "styled-components";
import AppBar from "../components/common/AppBar";
import ImageUploader from "../components/review/UploadImage";
import TagSlide from "../components/common/TagSlide";
import { dittoDetails } from "./DittoDetail";
import { useState } from "react";
import Button from "../components/common/Button";

const SpotApply = () => {

    const [dittoText, setDittoText] = useState('');
    const [stillCut, setStillCut] = useState('');

    return(
        <SpotApplyStyle>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            스팟 신청하기
                        </div>
                }
                />
            </div>
            <div className="main-img">
                <ImageUploader />
            </div>
            
            <div className="content-wrapper">
                <div className="spot-box">
                    <div className="spot-title">이름</div>
                    <input className="spot-input" placeholder="스팟의 이름을 알려 주세요!" size={60}></input>
                </div>
                <div className="spot-box">
                    <div className="spot-title">주소</div>
                    <input className="spot-input" placeholder="스팟의 주소는 어떻게 되나요?" size={60}></input>
                </div>
                <div className="spot-box">
                    <div className="spot-title">카테고리</div>
                </div>

                <div className="spot-box">
                    <div className="tag-wrapper">
                        <div className="spot-title">태그</div>
                        <div className="tag-length">({dittoText.length}/10)</div>
                    </div>
                    <TagSlide tagList={dittoDetails.tagList}/>
                </div>

                <div className="spot-box">
                    <div className="spot-title">스틸컷</div>
                    <div className="still-length">({stillCut.length}/10)</div>
                    <div className="img-box">
                        <img className="still-cut" src="https://velog.velcdn.com/images/gogo6570/post/e421aaed-013c-4667-8384-fb9b849b67bc/image.png"></img>
                        <img className="still-cut" src="https://velog.velcdn.com/images/gogo6570/post/e421aaed-013c-4667-8384-fb9b849b67bc/image.png"></img>
                        <img className="still-cut" src="https://velog.velcdn.com/images/gogo6570/post/e421aaed-013c-4667-8384-fb9b849b67bc/image.png"></img>
                    </div>

                </div>
                
                <div className="review-submit">
                    <Button size="large" scheme="subButton" className="spot-submit-button">
                    스팟 등록
                    </Button>
                </div>
                
            </div>
            

        </SpotApplyStyle>
    )
};

const SpotApplyStyle = styled.div`
    .app-bar {
        .title {
        ${({theme})=>theme.font.subTitle}
        }
    }

    .main-img{
        height: 200px;
        border-bottom: solid 0.1px;
        color : ${({theme})=>theme.color.gray80};
    }

    .content-wrapper {
        margin: 0 28px 16px 28px;

        .spot-box {
            padding : 18px;
            border-bottom: solid 0.1px;
            color : ${({theme})=>theme.color.gray80};
        }

        .spot-title {
            ${({theme})=>theme.font.body2}
        }

        .spot-input:focus{
            outline: none;
        }
    }
`;

export default SpotApply;