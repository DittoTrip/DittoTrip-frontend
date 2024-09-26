import { styled } from 'styled-components';
import { UserQuest } from '../../models/quest/questModel';
import { getQuestItem } from '../../api/reward';

interface QuestCardProps {
  quest: UserQuest;
  setSelectedTapId: (id: number) => void;
}

const QuestCard = ({ quest, setSelectedTapId }: QuestCardProps) => {
  const expPercentage = (quest.nowCount / quest.conditionCount) * 100;

  const handleGetQuestItem = async (userQuestId: number) => {
    try {
      await getQuestItem(userQuestId);

      alert('수령 성공');
      setSelectedTapId(2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestCardStyle>
      <div className="quest-box">
        <div className="detail">
          <div className="text-box">
            <div className={`item${quest.rewardData.type == 'ITEM' ? 1 : ''}`}>{'ITEM'}</div>
            <div className="quest">{quest.title}</div>
            <div className="compen">{`${quest.rewardData.name} + ${quest.rewardData.xp}XP 지급`}</div>
          </div>
          {quest.userQuestStatus == 'PENDING' && (
            <div className="img-box prev" onClick={() => handleGetQuestItem(quest.userQuestId)}>
              {quest.rewardData.type} 받기
            </div>
          )}
          {quest.userQuestStatus != 'PENDING' && (
            <img
              className={`img-box ${quest.userQuestStatus == 'ACHIEVE' ? 'complete' : ''}`}
              src={quest.rewardData.imagePath}
            />
          )}
        </div>

        <div className="exp-container">
          <div className="exp">
            <div className="exp-fill" style={{ width: `${expPercentage}%` }}></div>
          </div>
          <div className="exp-text">
            {quest.nowCount}/{quest.conditionCount}
          </div>
        </div>
      </div>
    </QuestCardStyle>
  );
};

export default QuestCard;

const QuestCardStyle = styled.div`
  .quest-box {
    padding: 20px;
    padding-bottom: 20px;
    border-bottom: solid 1px ${({ theme }) => theme.color.gray40};

    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text-box {
        display: flex;
        flex-direction: column;

        .item {
          background-color: #ffa1a1;
          color: white;
          border-radius: 15px;
          width: fit-content;
          padding: 0 15px;
          ${({ theme }) => theme.font.body5}
          margin-bottom: 8px;
        }
        .item2 {
          background-color: #92f66f;
          color: white;
          border-radius: 15px;
          width: fit-content;
          padding: 0 15px;
          margin-bottom: 8px;
          ${({ theme }) => theme.font.body5}
        }
        .quest {
          ${({ theme }) => theme.font.body2};
        }
        .compen {
          color: ${({ theme }) => theme.color.gray80};
          ${({ theme }) => theme.font.body4}
        }
      }

      .img-box {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 72px;
        height: 72px;

        background-color: ${({ theme }) => theme.color.subColor3};
        border-radius: 100%;
        object-fit: cover;
        ${({ theme }) => theme.font.body5}
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.color.keyColor};
      }

      .img-box.prev {
        background-color: ${({ theme }) => theme.color.keyColor};
        color: white;
        font-weight: bold;
      }
      .img-box.complete {
        background-color: ${({ theme }) => theme.color.gray20};
        border: 2px solid ${({ theme }) => theme.color.gray80};
      }
    }

    .exp-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 10px;
    }

    .exp {
      width: 70%;
      background-color: ${({ theme }) => theme.color.gray20};
      border-radius: 5px;
      height: 10px;
      overflow: hidden;

      .exp-fill {
        height: 100%;
        background-color: ${({ theme }) => theme.color.subColor1};
        transition: width 0.5s ease;
        border-radius: 5px 0 0 5px;
      }
    }

    .exp-text {
      width: 30%;
      text-align: right;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body5};
      font-weight: bold;
      padding-right: 21px;
    }
  }
`;
