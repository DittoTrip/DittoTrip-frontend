// leading title action

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
      <div className="title">{title}</div>
      <div className="action">{action}</div>
    </AppBarStyle>
  );
};

const AppBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  padding: 18px 28px;

  .leading {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-right: 20px;
  }

  .title {
    flex: 1;
  }
`;

export default AppBar;
