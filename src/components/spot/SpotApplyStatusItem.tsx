import { styled } from 'styled-components';

import { SpotApplyStatus } from '../../models/spotapply/spotApplyModel';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  status: SpotApplyStatus;
}

const SpotApplyStatusItem = ({ status }: Props) => {
  const { t } = useTranslation();

  const SpotApplyStatusItemMap: { [key in SpotApplyStatus]: string } = {
    PENDING: t('spotApply.pending'),
    APPROVED: t('spotApply.approved'),
    REJECTED: t('spotApply.rejected'),
  };
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
