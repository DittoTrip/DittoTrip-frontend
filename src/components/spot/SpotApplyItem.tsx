import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { SpotApplyMiniData, SpotApplyStatus } from '../../models/spotapply/spotApplyModel';
import { defaultImage } from '../../constants/constant';
import formatDate from '../../utils/formatDate';
import Button from '../common/Button';

interface Props {
  data: SpotApplyMiniData;
}

const SpotApplyStatusMap: { [key in SpotApplyStatus]: string } = {
  PENDING: '신청중',
  APPROVED: '신청 완료',
  REJECTED: '신청 거절',
};

const SpotApplyItem = ({ data }: Props) => {
  const navigate = useNavigate();

  const getSpotApplyStatusMap = (type: SpotApplyStatus) => {
    return SpotApplyStatusMap[type] || type; // 매핑된 값이 없으면 원래 값 반환
  };

  return (
    <SpotApplyItemStyle onClick={() => navigate(`/`)}>
      <img className="apply-image" src={data.imagePage ?? defaultImage} />
      <div className="apply-info">
        <div className="apply-date">{formatDate(data.createdDateTime)}</div>
        <div className="apply-name">{data.name}</div>
      </div>
      <div className="apply-status">
        {data.spotApplyStatus == 'PENDING' && (
          <Button
            size={'small'}
            scheme={'keyButton'}
            color="keyColor"
            backgroundColor="subColor3"
            borderColor="keyColor">
            {getSpotApplyStatusMap(data.spotApplyStatus)}
          </Button>
        )}
        {data.spotApplyStatus == 'APPROVED' && (
          <Button size={'small'} scheme={'keyButton'}>
            {getSpotApplyStatusMap(data.spotApplyStatus)}
          </Button>
        )}

        {data.spotApplyStatus == 'REJECTED' && (
          <Button size={'small'} scheme={'keyButton'} color="gray80" backgroundColor="gray20" borderColor="gray80">
            {getSpotApplyStatusMap(data.spotApplyStatus)}
          </Button>
        )}
      </div>
    </SpotApplyItemStyle>
  );
};

const SpotApplyItemStyle = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray20};
  background-color: ${({ theme }) => theme.color.background};

  .apply-image {
    height: 80px;
    width: 80px;
    border-radius: 12px;
  }

  .apply-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex: 1;
    .apply-date {
      color: ${({ theme }) => theme.color.gray60};
      ${({ theme }) => theme.font.body4};
    }
    .apply-name {
      ${({ theme }) => theme.font.body4};
      font-weight: bold;
    }
  }
  .apply-status {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default SpotApplyItem;
