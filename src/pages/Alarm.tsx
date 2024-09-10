import styled from "styled-components";
import AppBar from "../components/common/AppBar";

const Alarm = () => {
    return (
        <AlarmStyle>
        <div className="app-bar">
            <AppBar leading={true} title={<div className="title">알림</div>} />
        </div>

        <div className="alarm-box">
            <div className="alarm-title"></div>
            <div className="alarm-content"></div>
            <div className="alarm-date"></div>
        </div>
        </AlarmStyle>
    )
};

const AlarmStyle = styled.div`
    .title {
        ${({theme})=>theme.font.subTitle};
    }

`;

export default Alarm;