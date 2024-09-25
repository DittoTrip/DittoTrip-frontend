import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { useEffect, useState } from 'react';
import { getBadgeList, modyfyBadge } from '../api/reward';
import { BadgeData } from '../models/reward/rewardModel';
import { useSearchParams } from 'react-router-dom';
import { defaultBadge } from '../constants/constant';
import ErrorPage from './Error';
import Button from '../components/common/Button';

const Badge = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user');

  const [isOpen, setIsOpen] = useState(false);

  const [userBadge, setUserBadge] = useState<BadgeData[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  const [currentBadge, setCurrentBadge] = useState<BadgeData | null>(null);
  const [isMine, setIsMine] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const handleBoxClick = (item: BadgeData) => {
    setSelectedBadge(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await getBadgeList(userId!);
      setCurrentBadge(response.userProfileData.badgeData);
      setUserBadge(response.badgeDataList);
      setIsMine(response.isMine);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const EditItems = async () => {
    try {
      await modyfyBadge(selectedBadge!.userBadgeId!);

      alert(`변경되었습니다.`);
      fetchItems();
    } catch (err) {
      console.log(err);
      alert(`문제가 발생했습니다. 다시 시도해주세요.`);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [userId]);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  const handleClick = () => {
    EditItems();
  };

  return (
    <BadgeStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">뱃지</div>} />
      </div>
      <div className="badge-box">
        <div className="badge-img-box">
          <img className="badge-item-img" src={currentBadge?.imagePath ?? defaultBadge}></img>
          <div className="badge-title">{currentBadge?.name}</div>
        </div>
        <div className="badge-content">
          <div className="now">뱃지 수집 현황</div>
          <div className="count">{userBadge.length}</div>
        </div>
      </div>
      <div className="container">
        <div className="badge-list">
          {userBadge
            .filter(item => item.userBadgeId != null)
            .map((item, index) => (
              <div key={index} className="box-wrapper" onClick={() => handleBoxClick(item)}>
                <div className="box">
                  <img
                    className="badge-item-img"
                    src={item.imagePath !== 'empty imagePath' ? item?.imagePath : defaultBadge}
                  />
                </div>
                <div className="label">{item.name}</div>
              </div>
            ))}
        </div>
      </div>

      {isOpen && (
        <>
          <Overlay onClick={handleClose} />
          <Modal>
            <div className="modal-content">
              <div className="badge-img-box gray">
                <img
                  className="badge-item-img"
                  src={selectedBadge!.imagePath !== 'empty imagePath' ? selectedBadge?.imagePath : defaultBadge}></img>
              </div>
              <div className="selected-title"> {selectedBadge!.name}</div>

              <div className="selected-condition"> {selectedBadge!.conditionBody}</div>
              <div className="selected-body"> {selectedBadge!.body}</div>

              {isMine && (
                <Button
                  scheme="keyButton"
                  size="large"
                  color="keyColor"
                  backgroundColor="subColor3"
                  onClick={handleClick}>
                  대표 배지로 설정
                </Button>
              )}
            </div>
          </Modal>
        </>
      )}
    </BadgeStyle>
  );
};

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

  .badge-title {
    position: absolute;
    bottom: -15px;
    border: 1px solid ${({ theme }) => theme.color.keyColor};
    border-radius: 20px;
    padding: 0 16px;
    background-color: ${({ theme }) => theme.color.subColor3};
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body2};
  }
  .title {
    ${({ theme }) => theme.font.subTitle};
    flex: 1;
  }

  .badge-box {
    height: 280px;
    border-bottom: solid 1px;
    color: ${({ theme }) => theme.color.gray40};
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

  .badge-item-img {
    width: 100%;
    height: 100%;
  }

  .box {
    width: 100px;
    height: 100px;
  }

  .badge-round-box {
    background-color: #f9f9f9;
    border-radius: 50%;
    width: 140px;
    height: 140px;
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
      color: ${({ theme }) => theme.color.gray60};
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
  z-index: 20;
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 30;
  transition: all 0.3s ease-in-out;


  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 28px 120px 28px;
    text-align: center;

  .selected-title {
      margin-top: 16px;
      margin-bottom: 4px;

      ${({ theme }) => theme.font.body2};
  }

  .selected-condition {
    margin-bottom: 20px;

    color: ${({ theme }) => theme.color.gray80};
    ${({ theme }) => theme.font.body4};
  }

  .selected-body {
    margin-bottom: 20px;

    ${({ theme }) => theme.font.body4};
  }
`;

export default Badge;
