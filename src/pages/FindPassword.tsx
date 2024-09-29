import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import AppBar from '../components/common/AppBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPassword } from '../api/auth';

const FindPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlesendPassword = async () => {
    try {
      setLoading(true);
      const req = { email };

      const response = await sendPassword(req);
      if (response == 200) {
        alert(`${t('message.sent')}`);
      }
    } catch (error) {
      alert(`${t('message.checkEmail')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FindPasswordStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('editProfile.findPassword')}</div>} />
      </div>
      <div className="content-wrapper">
        <div className="input-title">{t('join.email')}</div>
        <div className="user-varification">
          <input
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-container"
          />
          <Button size={'medium'} scheme={'keyButton'} onClick={handlesendPassword} disabled={loading}>
            {'전송하기'}
          </Button>
        </div>
        {loading && <div className="sending">{t('alarm.sending')}</div>}
        {!loading && !email && <div className="sending">{t('alarm.plzEmail')}</div>}
      </div>
    </FindPasswordStyle>
  );
};

const FindPasswordStyle = styled.div`
  .app-bar {
    .title {
      flex: 1;

      color: black;
      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 30px 28px 0 28px;

    .input-title {
      margin-bottom: 10px;

      color: ${({ theme }) => theme.color.gray80};
      ${({ theme }) => theme.font.body2};
    }

    .user-varification {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 13px;

      margin-bottom: 10px;
    }

    .sending {
      min-height: 20px;

      margin-left: 10px;
      margin-bottom: 8px;

      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body5};
    }
  }

  .input-container {
    height: 52px;
    padding: 15px;
    flex: 1;

    outline: none;
    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.gray20};
  }
`;

export default FindPassword;
