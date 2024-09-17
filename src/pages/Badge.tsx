import styled from "styled-components"
import AppBar from "../components/common/AppBar";

const Badge = () => {

    const boxData = Array.from({ length: 9 }, (_, i) => i);

    return (
        <BadgeStyle>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">뱃지</div>
                    }
                    />
            </div>
            <div className="badge-box">

            </div>
            <div className="container">
                <div className="badge-list">
                    {boxData.map((item, index) => (
                        <div key={index} className="box-wrapper">
                            <div className="box">
                                <div className="number">{item + 1}</div>
                            </div>
                            <div className="label">스타터 디토 {item + 1}</div> 
                        </div>
                    ))}
                </div>
            </div>
        </BadgeStyle>
    )
}

const BadgeStyle = styled.div`
    .title {
        ${({ theme }) => theme.font.subTitle};
        flex: 1;
    }

    .badge-box {
        height: 280px;
        border-bottom: solid 1px;
        color: ${({theme})=>theme.color.gray40};
    }

    .badge-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .container {
        margin: 0 20px;
    }

    .box-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .box {
        width: 100px;
        height: 100px;
        background-color:#F9F9F9;
        display: flex;
        flex-direction: column; /* 수직 정렬을 위해 추가 */
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 16px;
        color: #333;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        border-radius: 100%;
    }

    .number {
        font-size: 16px;
        color: #333;
    }

    .label {
        font-size: 12px;
        color: #666;
        margin-top: 5px; /* 글씨 사이 간격 */
        ${({ theme }) => theme.font.body3}
    }
`;

export default Badge;
