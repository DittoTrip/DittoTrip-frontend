import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import useSpotApplyDetail from '../hooks/spot/useSpotApplyDetail';
import { defaultImage } from '../constants/constant';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import TagSlide from '../components/common/TagSlide';
import PhotoSlide from '../components/common/PhotoSlide';
import { useTranslation } from 'react-i18next';
import SpotApplyStatusItem from '../components/spot/SpotApplyStatusItem';
import ErrorPage from './Error';

const MySpotApplyDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { spotApplyDetailData, error, loading } = useSpotApplyDetail(id!);
  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) return <ErrorPage message={'error'} type="error" />;

  return (
    <MySpotApplyDetailStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div></div>} />
      </div>
      <div className="content-wrapper">
        <img className="spot-main-img" src={spotApplyDetailData?.imagePath ?? defaultImage} alt="" />

        <div className="apply-info">
          <div className="apply-date">{formatDate(spotApplyDetailData!.createdDateTime)}</div>
          <div className="apply-info-detail">
            <div className="apply-name">{spotApplyDetailData?.name}</div>
            <SpotApplyStatusItem status={spotApplyDetailData!.spotApplyStatus} />
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="spot-subtitle"> {t('myPage.address')}</div>

        <div className="apply-address"> {spotApplyDetailData?.address}</div>
      </div>
      <div className="content-wrapper">
        <div className="spot-subtitle"> {t('myPage.category')}</div>

        <div className="category-list">
          {spotApplyDetailData?.categoryDataList.map(category => (
            <div key={category.categoryId} className="category-item">
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div className="content-wrapper">
        <div className="spot-subtitle"> {'태그'}</div>
        <div className="tag-wrapper">
          <TagSlide tagList={spotApplyDetailData?.hashtags} />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="stillcut-wrapper">
          <div className="spot-subtitle"> {t('spot.stillCut')}</div>
          <PhotoSlide photoList={spotApplyDetailData!.imagePaths} width={112} height={76} gap={16} />
        </div>
      </div>
    </MySpotApplyDetailStyle>
  );
};

const MySpotApplyDetailStyle = styled.div`
  .content-wrapper {
    margin: 0 28px;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray20};

    .spot-main-img {
      width: 100%;
      border-radius: 12px;
      object-fit: cover;
    }

    .apply-info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      flex: 1;
      .apply-date {
        margin-top: 20px;
        color: ${({ theme }) => theme.color.gray60};
        ${({ theme }) => theme.font.body4};
      }

      .apply-info-detail {
        display: flex;
        gap: 12px;
        align-items: center;

        .apply-name {
          ${({ theme }) => theme.font.body1};
          font-weight: bold;
        }
      }
    }
    .apply-address {
      margin-top: 12px;

      color: ${({ theme }) => theme.color.gray60};
      ${({ theme }) => theme.font.body4};
    }

    .category-list {
      margin: 20px 0;
      border: 1px solid ${({ theme }) => theme.color.gray40};
      border-radius: 12px;
      padding: 8px;
      ${({ theme }) => theme.font.body4};
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 8px;
      margin-bottom: 4px;
      border-radius: 4px;
    }

    .tag-wrapper {
      margin: 10px 0;
    }

    .spot-subtitle {
      ${({ theme }) => theme.font.body2};
    }

    .stillcut-wrapper {
      margin-top: 17px;
      margin-bottom: 32px;
    }
  }

  .content-wrapper:first-child {
    border-bottom: 3px solid ${({ theme }) => theme.color.gray80};
  }
`;

export default MySpotApplyDetail;
