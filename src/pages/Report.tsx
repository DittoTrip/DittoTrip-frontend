import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import AppBar from '../components/common/AppBar';
import Modal from '../components/common/Modal';
import { addReport } from '../api/report';
import { ReportReasonType, ReportTargetType } from '../models/report/reportModel';

const Report = () => {
  const { t } = useTranslation();
  const { type, id } = useParams();
  const targetType = type as ReportTargetType;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const reportOptions: ReportReasonType[] = [
    'BLAME',
    'ILLEGAL_INFORMATION',
    'BUSINESS',
    'PERSONAL_INFORMATION_EXPOSURE',
    'SENSATIONAL_CONTENTS',
    'ILLEGAL_NICKNAME',
    'ETC',
  ];

  // 신고 등록 핸들러
  const handleReportSubmit = async (reasonType: ReportReasonType) => {
    try {
      const data = {
        reportReasonType: reasonType,
        targetId: id!,
        reportTargetType: targetType,
      };

      const status = await addReport(data);

      if (status === 200) {
        setMessage(t('report.successMessage'));

        setIsOpen(true);
      } else {
        setMessage(t('report.errorMessage'));
        setIsOpen(true);
      }
    } catch (error) {
      setMessage(t('report.errorMessage'));
      setIsOpen(true);
    }
  };

  return (
    <ReportStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div></div>} />
      </div>
      <div className="report-wrapper">
        <div className="report-title">{t('report.title')}</div>
        <div className="report-options">
          {reportOptions.map((option: ReportReasonType) => (
            <div
              key={option}
              className="report-option-item"
              onClick={() => handleReportSubmit(option)} // 옵션 클릭 시 실행
            >
              {t(`report.options.${option}`)}
            </div>
          ))}
        </div>
      </div>
      {isOpen && <Modal message={message} setIsOpen={setIsOpen} width={60} handleConfirm={() => navigate(-1)} />}
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
      ${({ theme }) => theme.font.body3};
      padding: 20px 0 20px 17px;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
      font-weight: medium;
      cursor: pointer;
    }
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
`;

export default Report;
