import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ColorKey } from '../../styles/theme';

interface Props {
  leading: boolean;
  title: React.ReactNode;
  action?: React.ReactNode;
  backgroundColor?: ColorKey;
}

const AppBar = ({ leading, title, action, backgroundColor }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBarStyle backgroundColor={backgroundColor!}>
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

const AppBarStyle = styled.div<{ backgroundColor: ColorKey }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 600px;
  height: 60px;
  padding: 0 28px;
  margin: 0 auto;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ backgroundColor, theme }) => (backgroundColor ? theme.color[backgroundColor] : 'white')};
  z-index: 10;

  .leading {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-right: 20px;

    cursor: pointer;
  }
  .appbar-title {
    flex: 1;
  }
`;

const Spacer = styled.div`
  height: 60px;
`;

export default AppBar;
