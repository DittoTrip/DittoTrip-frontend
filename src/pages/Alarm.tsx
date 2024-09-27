import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { useCallback, useEffect, useState } from 'react';
import formatDateWithTime from '../utils/formDateWithTime';
import { AlarmData } from '../models/alarm/alarmModel';
import { getAlarmList } from '../api/alarm';
import ErrorPage from './Error';
import { defaultPageOptions } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Alarm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [alarmDataList, setAlarmDataList] = useState<AlarmData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchAlarms = async () => {
    setLoading(true);
    try {
      const req = { page: currentPage, size: defaultPageOptions, sort: 'createdDateTime,desc' };

      const response = await getAlarmList(req);

      setAlarmDataList(response.alarmDataList);
      setTotalPage(response.totalPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && currentPage + 1 < totalPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && currentPage == 0) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <AlarmStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('alarm.title')}</div>} />
      </div>
      <div className="content-wrapper">
        {alarmDataList.map(alarm => (
          <div
            className={`alarm-box ${alarm.isChecked ? 'checked' : ''}`}
            key={alarm.alarmId}
            onClick={() => {
              navigate(`${alarm.path}`);
            }}>
            <div className={`alarm-title ${alarm.isChecked ? 'checked' : ''}`}>{alarm.title}</div>
            <div className={`alarm-content ${alarm.isChecked ? 'checked' : ''}`}>{alarm.body}</div>
            <div className={`alarm-date ${alarm.isChecked ? 'checked' : ''}`}>
              {formatDateWithTime(alarm.createdDateTime)}
            </div>
          </div>
        ))}
      </div>
    </AlarmStyle>
  );
};

const AlarmStyle = styled.div`
  .title {
    ${({ theme }) => theme.font.subTitle};
  }

  .content-wrapper {
    margin: 16px 16px 12px 12px;

    .alarm-box {
      margin-bottom: 16px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      padding: 20px;
      border-radius: 15px;
      background-color: white;

      &.checked {
        background-color: ${({ theme }) => theme.color.gray20};
      }

      .alarm-title {
        color: ${({ theme }) => theme.color.keyColor};
        ${({ theme }) => theme.font.body2};
        font-weight: bold;

        &.checked {
          color: ${({ theme }) => theme.color.subColor1};
        }
      }

      .alarm-content {
        ${({ theme }) => theme.font.body5};
        font-weight: bold;
        margin: 8px 0;

        &.checked {
          color: ${({ theme }) => theme.color.gray80};
        }
      }

      .alarm-date {
        ${({ theme }) => theme.font.body5};
        color: ${({ theme }) => theme.color.gray60};

        &.checked {
          color: ${({ theme }) => theme.color.gray80};
        }
      }
    }
  }
`;

export default Alarm;
