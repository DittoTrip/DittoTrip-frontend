import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { ColorKey } from '../../styles/theme';

interface Props {
  rating: number;
  showRatingValue: boolean;
  size: number;
  gap: number;
  color?: ColorKey;
}

// 디폴트는 검정색, color 있으면 blue

const Star = ({ rating, showRatingValue, color, gap, size }: Props) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <StarStyle color={color} gap={gap} size={size}>
      <div className="star">
        {[...Array(fullStars)].map((_, idx) => (
          <FontAwesomeIcon icon={faStar} key={idx} />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} />}
        {[...Array(emptyStars)].map((_, idx) => (
          <FontAwesomeIcon icon={faStarEmpty} key={idx} />
        ))}
      </div>

      {showRatingValue && (
        <div className="text-rating">
          <div className="rating">{rating}</div>
          <div className="max"> {' / 5.0'}</div>
        </div>
      )}
    </StarStyle>
  );
};

const StarStyle = styled.div<{ size: number; color?: ColorKey; gap: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .star {
    display: flex;
    gap: ${({ gap }) => gap}px;

    font-size: ${({ size }) => size}px;
    path {
      color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.black)};
    }
  }
  .text-rating {
    display: flex;
    align-items: center;

    ${({ theme }) => theme.font.body1};

    .max {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
`;

export default Star;
