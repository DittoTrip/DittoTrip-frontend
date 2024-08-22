import { styled } from 'styled-components';
import { GNBItemDataType, GlobalNavigationBarType } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLayerGroup, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from 'react-router-dom';

interface GlobalNavigationBarProps {
  GNBType: GlobalNavigationBarType;
}

const GNBItemData: GNBItemDataType[] = [
  { name: 'home', route: '/', icon: faHouse },
  { name: 'search', route: '/category', icon: faSearch },
  { name: 'ditto', route: '/ditto', icon: faLayerGroup },
  { name: 'my', route: '/my', icon: faUser },
];

const GlobalNavigationBar = ({ GNBType }: GlobalNavigationBarProps) => {
  const navigate = useNavigate();

  if (GNBType === undefined) {
    return <></>;
  }

  const GNBItem = ({ item }: { item: GNBItemDataType }) => {
    return (
      <button className={`gnb-item ${item.name === GNBType ? 'active' : ''}`} onClick={() => navigate(item.route)}>
        <FontAwesomeIcon icon={item.icon as IconProp} />
        {item.name}
      </button>
    );
  };

  return (
    <GlobalNavigationBarStyled>
      <div className="gnb-item-wrapper">
        {GNBItemData.map((item, idx) => (
          <GNBItem key={`gnb-item-${idx}`} item={item} />
        ))}
      </div>
    </GlobalNavigationBarStyled>
  );
};

export const GlobalNavigationBarStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 87px;

  background: ${({ theme }) => theme.color.background};

  .gnb-item-wrapper {
    display: flex;
    justify-content: space-between;

    width: 375px;
    height: 100%;

    .gnb-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 84px;
      height: 60px;

      cursor: pointer;
      border: none;

      .GNB-fa-icon {
        color: blue;
      }

      &.active,
      &:hover {
        color: ${({ theme }) => theme.color.keyColor};

        path {
          color: ${({ theme }) => theme.color.keyColor};
        }
      }
    }
  }
`;

export default GlobalNavigationBar;
