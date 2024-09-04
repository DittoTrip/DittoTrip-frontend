import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import Button from '../common/Button';

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <ButtonStyled>
      <Button size={'smallWithIcon'} scheme={'subButton2'} onClick={onClick} className="favorite-container">
        <FontAwesomeIcon icon={isFavorite ? faHeart : faEmptyHeart} className="heart-icon" />
        <div>즐겨찾기</div>
      </Button>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.div`
  display: flex;
  justify-content: end;
  gap: 4px;
  margin-top: 8px;

  .heart-icon {
    font-size: 16px;
    path {
      color: ${({ theme }) => theme.color.keyColor};
    }
  }
`;

export default FavoriteButton;
