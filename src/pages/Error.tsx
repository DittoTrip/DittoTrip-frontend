import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return <> {t('error')}</>;
};

export default ErrorPage;
