import { faChevronRight, faMap, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const MyPage = () => {
    return (
        <MyPageStyle>
            <div className="main-box">
                <div className="title">마이페이지</div>

                <div className="user-box">
                    <div className="user-img"></div>
                    <div className="user-name-box">
                        <div className="badge-img">
                            <img src="https://velog.velcdn.com/images/gogo6570/post/11c556cb-9758-4906-b83a-f9994f916e26/image.png"></img>
                        </div>
                        <div className="user-badge">
                            스타터 디토
                            <div className="chevron">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                        <div className="user-name">앞구르기뒷구르기</div>
                    </div>
                    <div className="fix">
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                </div>

                <div className="exp-bar">
                    <div className="exp-fill" style={{ width: "70%" }}></div>
                </div>
                <div className="level">
                    <div className="now">LV1 스타터 디토</div>
                    <div className="count">(200/300)</div>
                    <div className="next">LV2 비기너 디토</div>
                </div>

                <div className="user-detail">
                    <div className="number">
                        <div className="map-icon"><FontAwesomeIcon icon={faMap}/></div>
                        <div className="follow-number">4.8만</div>
                        <div className="follow-number">33</div>
                    </div>
                    <div className="follow">
                        <div className="list">방문 스팟</div>
                        <div className="list">팔로워</div>
                        <div className="list">팔로잉</div>
                    </div>
                </div>
            </div>
        </MyPageStyle>
    );
}

const MyPageStyle = styled.div`
    .user-detail {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        background-color: #AFC5FE;
        padding: 15px 50px;
        border-radius: 15px;
        align-items: center;

        .number {
            display: flex;
            justify-content: space-between;
            
            path {
                color: white;
            }
            .follow-number{
                color: white;
                ${({ theme }) => theme.font.body1};
            }
        }
        .follow {
            display: flex;
            justify-content: space-between;
            
            path {
                color: white;
            }
            .list{
                color: white;
                ${({ theme }) => theme.font.body5};
            }
        }
    }
    
    .level {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        .now {
            color: ${({ theme }) => theme.color.subColor2};
            ${({ theme }) => theme.font.body5};
            font-weight: bold;
        }
        .count {
            color: ${({ theme }) => theme.color.subColor2};
            ${({ theme }) => theme.font.body5};
            font-weight: bold;
        }.next {
            color: ${({ theme }) => theme.color.subColor2};
            ${({ theme }) => theme.font.body5};
            font-weight: bold;
        }
    }

    .user-box {
        display: flex;
        margin: 19px;
        align-items: center;

        .fix {
            width: 20px;
            height: 20px;
            path {
                color: white;
            }
        }

        .user-img {
            width: 80px;
            height: 80px;
            background-color: white;
            border-radius: 100%;
        }

        .user-name-box {
            margin-left: 5%;
            margin-right: 20%;
            position: relative;

            .badge-img {
                position: absolute;
                left: -10px;
                top: -5px;
            }

            .user-badge {
                color: ${({ theme }) => theme.color.keyColor};
                background-color: #AFC5FE;
                ${({ theme }) => theme.font.body5};
                display: inline-block;
                border-radius: 50px;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                font-weight: bold;

                .chevron {
                    path {
                        color: ${({ theme }) => theme.color.subColor1};
                    }
                }
            }

            .user-name {
                color: white;
                ${({ theme }) => theme.font.body2};
            }
        }
    }

    .main-box {
        background-color: ${({ theme }) => theme.color.subColor1};
        height: 550px;
    }

    .title {
        ${({ theme }) => theme.font.subTitle};
        color: white;
        margin: 0 20px;
    }

    .exp-bar {
        width: 90%;
        height: 9px;
        background-color: #e0e0e0;
        border-radius: 10px;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 8px;
        overflow: hidden;
    }

    .exp-fill {
        height: 100%;
        background-color: ${({ theme }) => theme.color.keyColor};
        border-radius: 10px 0 0 10px;
        transition: width 0.5s ease;
    }
`;

export default MyPage;
