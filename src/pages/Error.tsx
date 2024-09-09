import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faGears } from '@fortawesome/free-solid-svg-icons';
type ErrorType = 'error' | `warning`;

const ErrorPage = ({ message, type }: { message?: string; type?: ErrorType }) => {
  const { t } = useTranslation();

  return (
    <ErrorPageStyle>
      <div>
        {type == 'error' ? (
          <FontAwesomeIcon icon={faGears} className="check-icon" />
        ) : type == 'warning' ? (
          <FontAwesomeIcon icon={faBug} className="check-icon" />
        ) : (
          <></>
        )}
      </div>
      {message ?? t('error')}
    </ErrorPageStyle>
  );
};

const ErrorPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  height: 90vh;

  ${({ theme }) => theme.font.body3}

  .check-icon {
    font-size: 80px;

    path {
      color: ${({ theme }) => theme.color.gray40};
    }
  }
`;

export default ErrorPage;
