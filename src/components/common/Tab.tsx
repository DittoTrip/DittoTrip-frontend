import styled from 'styled-components';
import { TapItem } from '../../pages/Category';

interface TapProps {
  tapData: TapItem[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}

const Tap = ({ tapData, selectedId, setSelectedId }: TapProps) => {
  return (
    <TabStyled>
      <div className="tapMenu">
        {tapData.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`tapItem ${selectedId === item.id ? 'selected' : ''}`}>
            {item.title}
          </div>
        ))}
      </div>
    </TabStyled>
  );
};

const TabStyled = styled.div`
  .tapMenu {
    width: 100%;
    display: flex;
    padding: 12px 0;
  }

  .tapMenu .tapItem {
    flex: 1;
    padding: 12px;
    border-bottom: 1px solid #ccc;

    text-align: center;
    color: ${({ theme }) => theme.color.gray40};
    ${({ theme }) => theme.font.body3}

    cursor: pointer;
  }

  .tapMenu .selected {
    border-bottom: 1px solid black;

    ${({ theme }) => theme.font.body2}
    color: black;
  }
`;

export default Tap;
