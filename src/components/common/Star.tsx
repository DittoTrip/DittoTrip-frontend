import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

interface Props {
  rating: number;
}

const Star = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <StarStyle>
      {[...Array(fullStars)].map(() => (
        <FontAwesomeIcon icon={faStar} />
      ))}
      {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} />}
      {[...Array(emptyStars)].map(() => (
        <FontAwesomeIcon icon={faStarEmpty} />
      ))}
    </StarStyle>
  );
};

const StarStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  path {
    color: ${({ theme }) => theme.color.keyColor};
  }
`;

export default Star;
