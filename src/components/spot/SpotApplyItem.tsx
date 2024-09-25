import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { SpotApplyMiniData } from '../../models/spotapply/spotApplyModel';
import { defaultImage } from '../../constants/constant';
import formatDate from '../../utils/formatDate';
import SpotApplyStatusItem from './SpotApplyStatusItem';

interface Props {
  data: SpotApplyMiniData;
}

const SpotApplyItem = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <SpotApplyItemStyle onClick={() => navigate(`/my-spotapply/${data.id}`)}>
      <img className="apply-image" src={data.imagePath ?? defaultImage} />
      <div className="apply-info">
        <div className="apply-date">{formatDate(data.createdDateTime)}</div>
        <div className="apply-name">{data.name}</div>
      </div>
      <div className="apply-status">
        <SpotApplyStatusItem status={data!.spotApplyStatus} />
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
