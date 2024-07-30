import { useState } from 'react';
import Tap from '../components/common/Tab';
import { styled } from 'styled-components';

export interface TapItem {
  id: number;
  title: string;
  content: JSX.Element;
}

const tapData: TapItem[] = [
  { id: 1, title: '영상 컨텐츠', content: <div>드라마 / 영화</div> },
  { id: 2, title: '연예인', content: <div>연예인들</div> },
];

const TapPage = () => {
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  return (
    <TabPageStyled>
      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content">{tapData.find(item => item.id === selectedId)?.content}</div>
    </TabPageStyled>
  );
};
const TabPageStyled = styled.div`
  .content {
    margin-top: 30px;
  }
`;

export default TapPage;
