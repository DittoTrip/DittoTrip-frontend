import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import Modal from '../components/common/Modal';

const Report = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const reportOptions = [
    'Swearing',
    'illegalInformation',
    'Promotional',
    'PersonalInformation',
    'PornographyContent',
    'inappropriateNickname',
    'etc',
  ];

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <ReportStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div></div>} />
      </div>
      <div className="report-wrapper">
        <div className="report-title">{t('report.title')}</div>
        <div className="report-options">
          {reportOptions.map(option => (
            <div className="report-option-item" onClick={handleClick}>
              {t(`report.options.${option}`)}
            </div>
          ))}
        </div>
      </div>
      {isOpen && <Modal message={t('report.message')} setIsOpen={setIsOpen} width={60} />}
    </ReportStyle>
  );
};

const ReportStyle = styled.div`
  .report-title {
    ${({ theme }) => theme.font.body1};
    font-weight: bold;
  }
  .report-wrapper {
    margin: 4px 17px 0 17px;

    .report-title {
      padding-left: 17px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
    }

    .report-option-item {
      ${({ theme }) => theme.font.body3}
      padding: 20px 0 20px 17px;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
      font-weight: medium;
    }
  }
`;

export default Report;
