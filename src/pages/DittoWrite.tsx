import styled from "styled-components"
import AppBar from "../components/common/AppBar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/common/Button";
import TagSlide from "../components/common/TagSlide";
import DittoDetail, { dittoDetails } from "./DittoDetail";

const DittoWrite = () => {
    const { t } = useTranslation();
    const [dittoText, setDittoText] = useState('');
    const [tag, setTag] = useState('');

    return (
        <DittoWriteStyle>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            작성하기
                        </div>
                }
                
                />
            </div>

            <div className="main-img">
                <img className="spot-img" src="https://velog.velcdn.com/images/gogo6570/post/99349234-8dd5-4035-9751-caaae8f7379e/image.png"></img>
                <div className="spot-name">스팟 이름</div>
            </div>

            <div className="review-input-box">
                <div className="input-title text-title">설명</div>
                <textarea
                className="review-text"
                placeholder={t('newReview.placeholder')}
                onChange={e => setDittoText(e.target.value)}
                value={dittoText}
                />
                <div className="text-length">({dittoText.length}/1000)</div>

                <div className="tag-wrapper">
                    <div className="input-title photo-title">태그</div>
                    <div className="tag-length">({dittoText.length}/10)</div>
                </div>

                <TagSlide tagList={dittoDetails.tagList}/>
            </div>

            <div className="review-submit">
                <Button size="large" scheme="subButton" className="review-submit-button">
                작성하기
                </Button>
            </div>

            
        </DittoWriteStyle>
    )
}

const DittoWriteStyle = styled.div`
    .app-bar {
        
        .title {
        ${({theme})=>theme.font.subTitle}
        
    }
    }

    .review-input-box {
    padding: 0 28px;

    .input-title {
      ${({ theme }) => theme.font.body1};
    }

    .text-title {
      margin-top: 28px;
      margin-bottom: 12px;
    }

    .review-text {
      height: 200px;
      width: 100%;
      padding: 15px;

      border-radius: 12px;
      border: none;
      outline: none;

      background-color: ${({ theme }) => theme.color.gray20};
    }

    .photo-title {
      margin-top: 5px;
      margin-bottom: 8px;
    }

    .text-length {
      text-align: right;
      color: ${({ theme }) => theme.color.gray60};
    }
    .tag-length {
        color: ${({ theme }) => theme.color.gray60};
    }
    .tag-wrapper {
        display: flex;
        text-align: center;
    }
  }
`;

export default DittoWrite;