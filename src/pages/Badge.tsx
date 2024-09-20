import styled from "styled-components"
import AppBar from "../components/common/AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Badge = () => {

    const boxData = Array.from({ length: 9 }, (_, i) => i);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null); 

    const handleBoxClick = (index) => {
        setSelectedBox(index); 
        setIsOpen(true); 
    };

    const handleClose = () => {
        setIsOpen(false);
    };

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
                    <div className="badge-img-box">
                        <img className="badge-img" src="https://velog.velcdn.com/images/gogo6570/post/e74f67d8-487c-40c1-9905-3a288de433cf/image.png"></img>
                        <div className="badge-title">스타터 디토</div>
                    </div>
                    <div className="badge-content">
                        <div className="now">뱃지 수집 현황</div>     
                        <div className="count">1개</div>     
                    </div>
            </div>
            <div className="container">
                <div className="badge-list">
                    {boxData.map((item, index) => (
                        <div key={index} className="box-wrapper" onClick={() => handleBoxClick(index)}>
                            <div className="box">
                                <div className="number">
                                    <div className="lock">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                </div>
                            </div>
                            <div className="label">스타터 디토 </div> 
                        </div>
                    ))}
                </div>
            </div>

            {isOpen && (
                <>
                    <Overlay onClick={handleClose} />
                    <Modal>
                        <div className="modal-content">
                            <h2>박스 {selectedBox} </h2>
                            <p> 설명</p>
                            <button onClick={handleClose}>닫기</button>
                        </div>
                    </Modal>
                </>
            )}
        </BadgeStyle>
    )
}

const BadgeStyle = styled.div`

.badge-box {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.badge-img-box {
    background-color: ${({ theme }) => theme.color.subColor3};
    border-radius: 100%;
    width: 140px;
    height: 140px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.badge-img {
    position: absolute;
    
}
.badge-title {
    position: absolute;
    bottom: -15px;
    background-color: ${({ theme }) => theme.color.subColor3};
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2};
    border: solid ${({ theme }) => theme.color.keyColor};
    border-radius: 20px;
    padding: 0 16px;
}
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
        flex-direction: column; 
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
        margin-top: 5px; 
        ${({ theme }) => theme.font.body3}
    }
    .lock {
        font-size: 24px;
        path {
            color : ${({theme})=>theme.color.gray60}
        }
    }

    .badge-content {
        margin-top: 44px;

            .now {
            ${({ theme }) => theme.font.body3};
            }
            .count {
            color: ${({ theme }) => theme.color.keyColor};
            ${({ theme }) => theme.font.body2};
            
            }
    }
    
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 999;
`;

const Modal = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease-in-out;

    .modal-content {
        padding: 20px;
        text-align: center;

        h2 {
            margin-bottom: 20px;
        }

        button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: ${({ theme }) => theme.color.keyColor};
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }
    }
`;

export default Badge;
