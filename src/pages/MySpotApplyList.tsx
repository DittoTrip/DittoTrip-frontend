import { styled } from 'styled-components';
import useSpotApplyList from '../hooks/spot/useSpotApplyList';
import AppBar from '../components/common/AppBar';
import ErrorPage from './Error';
import SpotApplyItem from '../components/spot/SpotApplyItem';
import { useTranslation } from 'react-i18next';

const MySpotApplyList = () => {
  const { t } = useTranslation();
  const { spotApplyList, loading } = useSpotApplyList();

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <MySpotApplyListStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('myPage.spotApplication')}</div>} />
      </div>
      <div className="content-wrapper">
        {spotApplyList.map(apply => (
          <SpotApplyItem data={apply} />
        ))}
      </div>
    </MySpotApplyListStyle>
  );
};

const MySpotApplyListStyle = styled.div`
  .title {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.subTitle}
  }

  .content-wrapper {
    margin: 0 28px;
  }
`;

export default MySpotApplyList;
