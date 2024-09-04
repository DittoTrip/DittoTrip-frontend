import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const ErrorPage = ({ message }: { message?: string }) => {
  const { t } = useTranslation();

  return <ErrorPageStyle> {message ?? t('error')}</ErrorPageStyle>;
};

const ErrorPageStyle = styled.div`
  text-align: center;
  margin-top: 200px;
`;

export default ErrorPage;
