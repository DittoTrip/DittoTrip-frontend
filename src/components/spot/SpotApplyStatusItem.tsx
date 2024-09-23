import { styled } from 'styled-components';

import { SpotApplyStatus } from '../../models/spotapply/spotApplyModel';
import Button from '../common/Button';

interface Props {
  status: SpotApplyStatus;
}

const SpotApplyStatusItemMap: { [key in SpotApplyStatus]: string } = {
  PENDING: '신청중',
  APPROVED: '신청 완료',
  REJECTED: '신청 거절',
};

const SpotApplyStatusItem = ({ status }: Props) => {
  return (
    <SpotApplyStatusItemStyle>
      {status == 'PENDING' && (
        <Button size={'small'} scheme={'keyButton'} color="keyColor" backgroundColor="subColor3" borderColor="keyColor">
          {SpotApplyStatusItemMap[status]}
        </Button>
      )}
      {status == 'APPROVED' && (
        <Button size={'small'} scheme={'keyButton'}>
          {SpotApplyStatusItemMap[status]}
        </Button>
      )}

      {status == 'REJECTED' && (
        <Button size={'small'} scheme={'keyButton'} color="gray80" backgroundColor="gray20" borderColor="gray80">
          {SpotApplyStatusItemMap[status]}
        </Button>
      )}
    </SpotApplyStatusItemStyle>
  );
};

const SpotApplyStatusItemStyle = styled.div``;

export default SpotApplyStatusItem;
