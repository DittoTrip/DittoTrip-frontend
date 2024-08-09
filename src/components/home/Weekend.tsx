import styled from "styled-components"
import mainImage from "../../assets/homemain.png"

const Weekend = () => {
    return(
        <WeekendStyled>
            <div className="main-img">
                <div className="main-title">
                "도꺠비" 촬영지 강릉 주문진 방파제
                </div>
                <div className="main-content">
                도깨비 신부 김고은이 도깨비 공유를 불러낼면서 면장면을 만들어낸 장소로
                유명한 이곳!
                </div>
            </div>
        </WeekendStyled>
    );
};

const WeekendStyled = styled.div`
    width: 336px;
    height: 376px;
    text-align: left;
    .main-img {
        background-image: url(${mainImage});
        width: 100%;
        height: 100%;
        position: relative;
    }

    .main-title {
        color: white;
        ${({theme})=> theme.font.subTitle};
        position: absolute;
        bottom: 62.6px;
        left: 13.5px;
        width: 250px;
        height: 66px;
        margin-left: 9px;
        word-spacing: 0.1px;
    }
    .main-content {
        color: white;
        ${({theme})=>theme.font.body4};
        position: absolute;
        margin-left: 9px;
        width: 303px;
        height: 37px;
        bottom: 20px;
        left: 13.5px;
        line-height: 18px;
    }
`;

export default Weekend;