import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import { getUserDetail } from '../api/user';
import { useNavigate, useParams } from 'react-router-dom';
import { UserDataForAdmin } from '../models/user/userModel';
import ErrorPage from './Error';
import ProfileImg from '../components/common/ProfileImg';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserDataForAdmin>();
  const [loading, setLoading] = useState<boolean>(true);
  const naviagate = useNavigate();
  const { t } = useTranslation();

  const fetchUserInfo = async () => {
    setLoading(true);

    const response = await getUserDetail(id!);
    setUserData(response.userDataForAdmin);
    setLoading(false);
  };
  useEffect(() => {
    fetchUserInfo();
  }, [id]);

  if (loading) return <ErrorPage message={'Loading'} type="loading" />;

  return (
    <EditProfileStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('editProfile.title')}</div>} />
      </div>

      <div className="main-box">
        <div className="user-img">
          <ProfileImg userProfileData={userData!.userProfileData} width={'140px'} showEditIcon={true} />
        </div>
      </div>

      <div className="content-wrapper">
        <div className="profile-box">
          <div className="text-wrapper">
            <div className="profile-title">{t('editProfile.nickname')}</div>
            <div className="profile-text">{userData!.nickname}</div>
          </div>
          <div className="btn-wrapper">
            <Button size={'small'} scheme={'subButton2'} onClick={() => naviagate(`/edit-nickname`)}>
            {t('editProfile.nicknameChange')}
            </Button>
          </div>
        </div>
        <div className="profile-box">
          <div>
            <div className="profile-title">{t('editProfile.id')}</div>
            <div className="profile-text">{userData!.email}</div>
          </div>
        </div>
        <div className="profile-box">
          <div className="profile-title">{t('editProfile.password')}</div>
          <div className="btn-wrapper">
            <Button size={'small'} scheme={'subButton2'} onClick={() => naviagate(`/edit-password`)}>
            {t('editProfile.passwordChange')}
            </Button>
          </div>
        </div>
        <div className="sub-menu-wrapper">
          <div className="find-pw">
            <a href="/find-password">{t('editProfile.passwordFind')}</a>
          </div>
          <div className="divider"></div>
          <div className="join">
            <a href="/join">{t('editProfile.join')}</a>
          </div>
        </div>
      </div>
    </EditProfileStyle>
  );
};

const EditProfileStyle = styled.div`
  .title {
    ${({ theme }) => theme.font.subTitle};
  }

  .main-box {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 250px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
  }

  .content-wrapper {
    margin: 0 28px 16px 28px;

    .profile-box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      height: 88px;
      padding: 18px;

      border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
      color: ${({ theme }) => theme.color.gray80};
    }

    .profile-title {
      ${({ theme }) => theme.font.body2}
    }

    .profile-text {
      color: ${({ theme }) => theme.color.gray80};
      margin-top: 8px;
    }

    .sub-menu-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 50px;

      position: fixed;
      bottom: 100px;
      left: 0;

      width: 100%;
      padding: 0 28px;
    }

    .sub-menu-wrapper a,
    .text {
      display: block;
      text-align: center;
      width: 100px;

      ${({ theme }) => theme.font.body4}
      color: ${({ theme }) => theme.color.gray80};

      text-decoration: none;
      cursor: pointer;
    }

    .container .divider {
      border-left: 1px solid #ccc;
      height: 15px;
    }
  }
`;

export default EditProfile;
