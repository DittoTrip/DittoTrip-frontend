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
    <AppBarStyle>
      {leading && (
        <div className="leading">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
        </div>
      )}
      <div>{title}</div>
      {action && <div className="action">{action}</div>}
    </AppBarStyle>
  );
};

const AppBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 28px;

  .leading {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-right: 20px;
  }
`;

export default AppBar;
