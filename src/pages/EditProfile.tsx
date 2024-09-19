import styled from "styled-components"
import AppBar from "../components/common/AppBar";
import Button from "../components/common/Button";

const EditProfile = () => {
    return(
        <EditProfileStyle>
            <div className="app-bar">
                <AppBar leading={true} title={<div className="title">회원정보</div>} />
            </div>

            <div className="main-box">
                <img className="user-img" src="https://velog.velcdn.com/images/gogo6570/post/0e77a7b1-2abc-470d-aacb-3022f62fd553/image.png"></img>
            </div>

            <div className="content-wrapper">
                <div className="profile-box">
                    <div>
                        <div className="profile-title">닉네임</div>
                        <div className="profile-input" >앞구르기뒷구르기</div>  
                    </div>
                    <div className="btn-wrapper">
                        <Button size={'small'} scheme={'subButton2'}>닉네임 변경</Button>
                    </div>
                </div>
                <div className="profile-box">
                    <div className="profile-title">아이디</div>
                    <div className="profile-input">xxxx@naver.com</div>
                </div>
                <div className="profile-box">
                    <div>
                        <div className="profile-title">비밀번호</div>
                        <div className="profile-input">xxxxxx</div>
                    </div>
                    <div className="btn-wrapper">
                        <Button size={'small'} scheme={'subButton2'}>변경하기</Button>
                    </div>
                </div>

                <div className="end">
                    <div>로그아웃</div>
                    <div>|</div>
                    <div>회원탈퇴</div>
                </div>
            </div>

        </EditProfileStyle>
    )
}

const EditProfileStyle = styled.div`
    .title {
        ${({theme})=>theme.font.subTitle};
    }
    
    .main-box {
        height: 250px;
        border-bottom: solid 0.1px;
        color : ${({theme})=>theme.color.gray80};

        .user-img {
            display: block;
        margin-right: auto;
        margin-left: auto;
        }
    }

    .content-wrapper {
        margin: 0 28px 16px 28px;

        .profile-box {
            position: relative;
            padding : 18px;
            border-bottom: solid 0.1px;
            color : ${({theme})=>theme.color.gray80};
        }

        .profile-title {
            ${({theme})=>theme.font.body2}
        }

        .profile-input{
            color : ${({theme})=>theme.color.gray80};
            margin-top: 8px;
        }

        .btn-wrapper {
            position: absolute;
            right: 0;
            top:35%;

        }

        .end {
            display: flex;
            margin-top: 94px;
            color : ${({theme})=>theme.color.gray80};
            ${({theme})=>theme.font.body4}
            justify-content: space-between;
        }
    }
`;

export default EditProfile;