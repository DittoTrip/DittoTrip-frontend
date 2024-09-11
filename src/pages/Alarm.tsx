import styled from "styled-components";
import AppBar from "../components/common/AppBar";

const Alarm = () => {
    return (
        <AlarmStyle>
        <div className="app-bar">
            <AppBar leading={true} title={<div className="title">알림</div>} />
        </div>
        <div className="content-wrapper">
            <div className="alarm-box">
                <div className="alarm-title">리뷰를 남겨보세요</div>
                <div className="alarm-content">소덕동 팽나무의 방문이 즐거우셨다면 다른 분들을 위해 리뷰를 남겨주세요. 리뷰
                    쓰기는 방문 이후 0일 동안만 가능합니다.
                </div>
                <div className="alarm-date">07월 15일 17:11</div>
            </div>
            <div className="alarm-box">
                <div className="alarm-title">리뷰를 남겨보세요</div>
                <div className="alarm-content">소덕동 팽나무의 방문이 즐거우셨다면 다른 분들을 위해 리뷰를 남겨주세요. 리뷰
                    쓰기는 방문 이후 0일 동안만 가능합니다.
                </div>
                <div className="alarm-date">07월 15일 17:11</div>
            </div>
        </div>
        </AlarmStyle>
    )
};

const AlarmStyle = styled.div`
    .title {
        ${({theme})=>theme.font.subTitle};
    }

    .content-wrapper {
        margin: 16px 16px 12px 12px;

        .alarm-box {
        margin-bottom: 16px;
        box-shadow: 1px 1px 3px 1px rgb(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 15px;
        background-color: white; /* 배경색 */
        }

        .alarm-title {
            color: ${({theme})=>theme.color.keyColor};
            ${({theme})=>theme.font.body2};
        }

        .alarm-content {
            ${({theme})=>theme.font.body5};
            font-weight: bold;
            margin: 8px 0;
        }
        
        .alarm-date {
            ${({theme})=>theme.font.body5};
            color: ${({theme})=>theme.color.gray60};
        }
    }

`;

export default Alarm;