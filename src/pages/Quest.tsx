import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { TapItem } from './Category';
import { useEffect, useState } from 'react';
import Tap from '../components/common/Tab';
import QuestCard from '../components/quest/QuestCard';
import { UserQuest, UserQuestDataListResponse } from '../models/quest/questModel';
import { getQuestList } from '../api/reward';

const tapData: TapItem[] = [
  {
    id: 0,
    title: '달성',
    content: <></>,
  },
  {
    id: 1,
    title: '진행중',
    content: <></>,
  },
  {
    id: 2,
    title: '완료',
    content: <></>,
  },
];
const Quest = () => {
  const [selectedTapId, setSelectedTapId] = useState<number>(tapData[0]?.id);
  const status = ['PENDING', 'NOT_ACHIEVE', 'ACHIEVE'];

  const [userQuestDataList, setUserQuestDataList] = useState<UserQuest[] | null>(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getQuestList(status[selectedTapId]); // Fetch quest data from API

        console.log(data);
        setUserQuestDataList(data.userQuestDataList);
      } catch (error) {
        console.error('Failed to fetch quest data', error);
      } finally {
      }
    };

    fetchQuestData();
  }, [selectedTapId]);

  return (
    <QuestStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">퀘스트</div>} />
      </div>
      <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedTapId} />

      <div className="quest-list-box">
        {userQuestDataList?.map(quest => (
          <QuestCard key={quest.userQuestId} quest={quest} setSelectedTapId={setSelectedTapId} />
        ))}
      </div>
    </QuestStyle>
  );
};

const QuestStyle = styled.div`
  .quest-list-box {
    margin: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  .title {
    ${({ theme }) => theme.font.subTitle};
    flex: 1;
  }
`;

export default Quest;
