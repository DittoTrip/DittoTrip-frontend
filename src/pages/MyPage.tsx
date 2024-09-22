import { faChevronCircleRight, faChevronRight, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"

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
            </div>
        </MyPageStyle>
    )
}

const MyPageStyle = styled.div`
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

        .user-name-box{
            margin-left: 5%;
            margin-right: 20%;
            position: relative;
            .badge-img {
                position: absolute;
                left: -10px;
                top: -5px;
            }
            .user-badge {
                color: ${({theme})=>theme.color.keyColor};
                background-color: #AFC5FE;
                ${({theme})=>theme.font.body5};
                display: inline-block;
                border-radius: 50px;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                .chevron {
                    path {
                        color: ${({theme})=>theme.color.subColor1};
                    }
                }
            }

            .user-name {
                color: white;
                ${({theme})=>theme.font.body2};
            }
        }
    }
    .main-box {
        background-color: ${({theme})=>theme.color.subColor1};
        height: 550px;
    }
    .title {
        ${({theme})=>theme.font.subTitle}
        color: white;
        margin: 0 20px;
    }
`;

export default MyPage;