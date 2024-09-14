import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
  leading: boolean;
  title: React.ReactNode;
  action?: React.ReactNode;
}

const AppBar = ({ leading, title, action }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBarStyle>
        {leading && (
          <div className="leading">
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          </div>
        )}
        <div className="appbar-title">{title}</div>
        {action && <div className="action">{action}</div>}
      </AppBarStyle>
      {/* 앱바의 높이만큼 공간 차지 */}
      <Spacer />
    </>
  );
};

const AppBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 28px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;

  .leading {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-right: 20px;
  }
  .appbar-title {
    flex: 1;
  }
`;

const Spacer = styled.div`
  height: 60px;
`;

export default AppBar;
