import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { TapItem } from './Category';
import { useEffect, useState } from 'react';
import Tap from '../components/common/Tab';
import QuestCard from '../components/quest/QuestCard';
import { UserQuest } from '../models/quest/questModel';
import { getQuestList } from '../api/reward';
import { useTranslation } from 'react-i18next';

const Quest = () => {
  const { t } = useTranslation();

  const tapData: TapItem[] = [
    {
      id: 0,
      title: `${t('quest.attainment')}`,
      content: <></>,
    },
    {
      id: 1,
      title: `${t('quest.progress')}`,
      content: <></>,
    },
    {
      id: 2,
      title: `${t('quest.complete')}`,
      content: <></>,
    },
  ];

  const [selectedTapId, setSelectedTapId] = useState<number>(tapData[0]?.id);
  const [userQuestDataList, setUserQuestDataList] = useState<UserQuest[] | null>(null);
  const status = ['PENDING', 'NOT_ACHIEVE', 'ACHIEVE'];

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getQuestList(status[selectedTapId]); // Fetch quest data from API

        console.log(data);
        setUserQuestDataList(data.userQuestDataList);
      } catch (error) {
        console.error('Failed to fetch quest data', error);
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
