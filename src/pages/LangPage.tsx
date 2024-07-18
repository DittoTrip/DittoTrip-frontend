import LangSelectButton from '../components/LangSelectButton';
import { useTranslation } from 'react-i18next';

const LangPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LangSelectButton />
      {t('login.welcome')}
    </div>
  );
};

export default LangPage;
