import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

interface Props {
  rating: number;
  showRatingValue: boolean;
}

const Star = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <StarStyle>
      <div className="star">
        {[...Array(fullStars)].map((_, idx) => (
          <FontAwesomeIcon icon={faStar} key={idx} />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} />}
        {[...Array(emptyStars)].map((_, idx) => (
          <FontAwesomeIcon icon={faStarEmpty} key={idx} />
        ))}
      </div>

      <div className="text-rating">
        <div className="rating">{rating}</div>
        <div className="max"> / 5.0</div>
      </div>
    </StarStyle>
  );
};

const StarStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .star {
    display: flex;
    gap: 8px;

    font-size: 24px;
    path {
      color: ${({ theme }) => theme.color.keyColor};
    }
  }
  .text-rating {
    display: flex;
    ${({ theme }) => theme.font.body1};

    .max {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
`;

export default Star;
