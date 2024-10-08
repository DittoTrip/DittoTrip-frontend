import { faChevronRight, faFlag, faHeart, faMap, faMapPin, faPen, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import ProfileImg from '../components/common/ProfileImg';
import useUserData from '../hooks/user/useUserData';
import ErrorPage from './Error';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { addFollow, deleteFollow } from '../api/follow';
import { useEffect, useState } from 'react';
import { defaultBadge } from '../constants/constant';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';

const MyPage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user');
  const { userData, loading, error } = useUserData(userId!);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();

  const [isFollowed, setIsFollowed] = useState<number | null>(null);

  useEffect(() => {
    if (userData?.myFollowingId !== undefined) {
      setIsFollowed(userData.myFollowingId);
    }
  }, [userData]);

  const toggleFollow = async () => {
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');

      return;
    }

    if (!isFollowed) {
      const res = await addFollow(userData!.userData.userId.toString());
      if (res == 200) {
        setIsFollowed(1);
      } else {
        alert(`${t('message.followFail')}`);
      }
    } else {
      const res = await deleteFollow(userData!.userData.userId.toString());
      if (res == 200) {
        setIsFollowed(null);
      } else {
        alert(`${t('message.unFollowFail')}`);
      }
    }
  };
  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={error} type="error" />;
  }

  return (
    <MyPageStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={<div className="title">{t('myPage.title')}</div>}
          action={
            <div className="action">
              {userData?.isMine && (
                <div className="alarm-wrapper" onClick={() => navigate(`/alarm`)}>
                  <FontAwesomeIcon className="alarm-icon" icon={faBell} />
                  {userData?.isNotCheckedAlarm && <span className="not-checked" />}
                </div>
              )}
              <LangSelectButton backgroundColor="subColor2" />
            </div>
          }
          backgroundColor={'subColor1'}
        />
      </div>
      <div className="background"></div>
      <div className="content-wrapper">
        <div className="user-box">
          <div
            className="user-img"
            onClick={() => {
              userData?.isMine && navigate(`/character`);
            }}>
            <ProfileImg userProfileData={userData!.userData.userProfileData} width="80px" background={true} />
          </div>
          <div className="user-name-box">
            <img
              className="badge-img"
              src={
                userData?.userData.userProfileData.badgeData
                  ? userData?.userData.userProfileData.badgeData.imagePath
                  : defaultBadge
              }></img>
            <div>
              <div className="user-badge" onClick={() => navigate(`/badge?user=${userData?.userData.userId}`)}>
                {userData?.userData.userProfileData.badgeData
                  ? userData?.userData.userProfileData.badgeData.name
                  : '여행의 새싹'}
                <div className="chevron">
                  <FontAwesomeIcon icon={faChevronRight} className="right-icon" />
                </div>
              </div>
            </div>

            <div className="user-name">{userData?.userData.nickname}</div>
          </div>
          <div className="fix">
            {userData?.isMine ? (
              <FontAwesomeIcon icon={faPen} onClick={() => navigate(`/edit-profile`)} className="right-icon" />
            ) : isFollowed ? (
              <Button size={'small'} scheme={'keyButton'} onClick={toggleFollow}>
                Following
              </Button>
            ) : (
              <Button size={'small'} scheme={'emptyKeyButton'} onClick={toggleFollow}>
                Follow
              </Button>
            )}
          </div>
        </div>

        <div className="exp-bar">
          <div
            className="exp-fill"
            style={{ width: `${userData!.userProfileData.progressionData.progressionRate * 100}%` }}></div>
        </div>
        <div className="level">
          <div className="now">{userData?.userProfileData.progressionData.presentLevel} </div>
          <div className="count">
            ({userData?.userProfileData.progressionData.presentExp}/
            {userData?.userProfileData.progressionData.requiredExp})
          </div>
          <div className="next">{userData?.userProfileData.progressionData.nextLevel}</div>
        </div>

        <div className="user-detail">
          <div
            className="box-section"
            onClick={() => {
              navigate(`/visited-spot/${userData?.userData.userId}`);
            }}>
            <div className="follow-number">
              <FontAwesomeIcon icon={faMap} className="follow-number" />
            </div>
            <div className="list">{t('myPage.spot')}</div>
          </div>
          <div
            className="box-section"
            onClick={() => {
              navigate(`/follow/${userData?.userData.userId}`);
            }}>
            <div className="follow-number">{userData?.followedCount}</div>
            <div className="list">{t('myPage.follower')}</div>
          </div>
          <div
            className="box-section"
            onClick={() => {
              navigate(`/follow/${userData?.userData.userId}?tapId=2`);
            }}>
            <div className="follow-number">{userData?.followingCount}</div>
            <div className="list">{t('myPage.following')}</div>
          </div>
        </div>

        <div className="ditto-wrapper">
          <div className="ditto-box">
            <div
              className="ditto-text"
              onClick={() => {
                userData?.isMine
                  ? navigate(`/user-ditto/${userData?.userData.userId}?isMine=true`)
                  : navigate(`/user-ditto/${userData?.userData.userId}?isMine=false`);
              }}>
              {t('myPage.ditto')}
              <FontAwesomeIcon icon={faChevronRight} className="right-icon" />
            </div>
            <div className="ditto-img">
              {userData?.dittoMiniDataList.map(data => {
                return (
                  <img src={data.imagePath} className="img-box" onClick={() => navigate(`/ditto/${data.dittoId}`)} />
                );
              })}
            </div>
          </div>

          {userData?.isMine && (
            <div className="btn-wrapper">
              <div
                className="btn"
                onClick={() => {
                  navigate(`/favorite`);
                }}>
                <FontAwesomeIcon icon={faHeart} />
                {t('myPage.like')}
                <FontAwesomeIcon icon={faChevronRight} className="right-icon" />
              </div>
              <div
                className="btn"
                onClick={() => {
                  navigate(`/quest/list`);
                }}>
                <FontAwesomeIcon icon={faFlag} />
                {t('myPage.quest')}
                <FontAwesomeIcon icon={faChevronRight} className="right-icon" />
              </div>
              <div
                className="btn"
                onClick={() => {
                  navigate(`/my-spotapply`);
                }}>
                <FontAwesomeIcon icon={faMapPin} />
                {t('myPage.spotApplication')}
                <FontAwesomeIcon icon={faChevronRight} className="right-icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    </MyPageStyle>
  );
};

const MyPageStyle = styled.div`
  position: relative;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 450px;
    background-color: ${({ theme }) => theme.color.subColor1}; /* Desired background color */
    z-index: 0;
  }

  .app-bar {
    .title {
      ${({ theme }) => theme.font.subTitle};
      color: white;
    }
    .action {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .alarm-wrapper {
      position: relative;
      display: inline-block;

      cursor: pointer;

      .alarm-icon {
        font-size: 20px;
        path {
          color: ${({ theme }) => theme.color.subColor2};
        }
      }

      .not-checked {
        position: absolute;
        top: 0;
        right: 0;
        width: 3px;
        height: 3px;
        background-color: red;
        border-radius: 50%;
      }
    }
  }
  .content-wrapper {
    position: relative;
    margin: 0 12px;
    z-index: 1;
  }

  .user-box {
    display: flex;
    margin: 19px;
    align-items: center;
    justify-content: space-between;

    .user-img {
      width: 80px;
      height: 80px;
      background-color: white;
      border-radius: 100%;
    }

    .fix {
      path {
        color: white;
      }
    }

    .user-name-box {
      margin-left: 5%;
      margin-right: 20%;
      position: relative;
      flex: 1;

      .badge-img {
        position: absolute;
        left: -4px;

        width: 18px;
        height: 18px;
      }

      .user-badge {
        color: ${({ theme }) => theme.color.keyColor};
        width: fit-content;

        white-space: nowrap;
        background-color: #afc5fe;
        ${({ theme }) => theme.font.body5};
        border-radius: 50px;
        padding: 0 10px 0 20px;
        display: flex;
        font-weight: bold;

        .chevron {
          margin-left: 8px;
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

  .exp-bar {
    height: 9px;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin: 8px 16px 0 16px;

    overflow: hidden;

    .exp-fill {
      height: 100%;
      background-color: ${({ theme }) => theme.color.keyColor};
      border-radius: 10px 0 0 10px;
      transition: width 0.5s ease;
    }
  }

  .level {
    margin: 8px 16px 0 16px;
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
    }
    .next {
      color: ${({ theme }) => theme.color.subColor2};
      ${({ theme }) => theme.font.body5};
      font-weight: bold;
    }
  }

  .user-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 50px;
    margin: 20px auto;

    border-radius: 15px;
    background: linear-gradient(0.8turn, #85a7ff, #bbceff);
    color: white;
    .box-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      gap: 6px;
      cursor: pointer;
    }

    .follow-number {
      color: white;
      ${({ theme }) => theme.font.body1};
      font-weight: bold;
      font-size: 20px;

      path {
        color: white;
      }
    }

    .list {
      color: white;
      ${({ theme }) => theme.font.body5};
      font-weight: bold;
    }
  }

  .ditto-box {
    background-color: white;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 15px;
    padding: 20px;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));

    .ditto-text {
      display: flex;
      justify-content: space-between;
      ${({ theme }) => theme.font.body1}
      font-weight: bold;
      margin-bottom: 24px;
    }
    .ditto-img {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      ascpect-ratio: 1;
      gap: 10px;

      .img-box {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 5px;
        object-fit: cover;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 20px;
    margin-bottom: 16px;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
    background-color: white;
    border-radius: 15px;
    ${({ theme }) => theme.font.body1};

    svg {
      margin-right: 10px;
    }
  }

  .right-icon {
    margin-left: auto;
    cursor: pointer;
  }
`;

export default MyPage;
