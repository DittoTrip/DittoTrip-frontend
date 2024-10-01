import { styled } from 'styled-components';
import { GNBItemDataType, GlobalNavigationBarType } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLayerGroup, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface GlobalNavigationBarProps {
  GNBType: GlobalNavigationBarType;
}

const GlobalNavigationBar = ({ GNBType }: GlobalNavigationBarProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const GNBItemData: GNBItemDataType[] = [
    { name: 'home', route: '/', icon: faHouse },
    { name: 'search', route: '/category', icon: faSearch },
    { name: 'ditto', route: '/ditto', icon: faLayerGroup },
    { name: 'my', route: isLoggedIn ? '/my-page' : '/login', icon: faUser },
  ];
  if (GNBType === undefined) {
    return <></>;
  }

  const GNBItem = ({ item }: { item: GNBItemDataType }) => {
    return (
      <button className={`gnb-item ${item.name === GNBType ? 'active' : ''}`} onClick={() => navigate(item.route)}>
        <FontAwesomeIcon icon={item.icon as IconProp} className="gnb-icon" />
        {item.name}
      </button>
    );
  };

  return (
    <GlobalNavigationBarStyled>
      <div className="gnb-container">
        <div className="gnb-item-wrapper">
          {GNBItemData.map((item, idx) => (
            <GNBItem key={`gnb-item-${idx}`} item={item} />
          ))}
        </div>
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

  background: ${({ theme }) => theme.color.gray40};
  z-index: 30;

  .gnb-container {
    background: white;
  }

  .gnb-item-wrapper {
    display: flex;
    justify-content: space-between;

    width: 375px;
    height: 100%;

    margin: 0 auto;

    .gnb-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 7px;

      margin: auto;
      width: 84px;
      height: 60px;

      cursor: pointer;
      border: none;

      ${({ theme }) => theme.font.body6};

      .GNB-fa-icon {
        color: blue;
      }

      .gnb-icon {
        font-size: 30px;
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

  @media screen and (min-width: 375px) {
    .gnb-container {
      width: 600px;
    }
  }

  @media screen and (min-width: 600px) {
    .gnb-container {
      width: 600px;
    }
  }
`;

export default GlobalNavigationBar;
