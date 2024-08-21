import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { ColorKey } from '../../styles/theme';
import { useEffect, useState } from 'react';

interface Props {
  rating: number;
  size: number;
  gap: number;
  color?: ColorKey;
  isEditable?: boolean;
  showRatingValue?: boolean;
}

// 디폴트는 검정색, color 있으면 blue

const Star = ({ rating, size, gap, color, isEditable, showRatingValue }: Props) => {
  const [curRating, setCurRating] = useState<number>(rating);
  const [starIcons, setStarIcons] = useState<IconDefinition[]>([
    faStarEmpty,
    faStarEmpty,
    faStarEmpty,
    faStarEmpty,
    faStarEmpty,
  ]);
  useEffect(() => {
    const fullStars = Math.floor(curRating);
    const halfStar = curRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let stars = [...Array(fullStars)].reduce(acc => [...acc, faStar], []);
    stars = halfStar ? [...stars, faStarHalfStroke] : stars;
    stars = [...Array(emptyStars)].reduce(acc => [...acc, faStarEmpty], stars);
    setStarIcons(stars);
  }, [curRating]);

  const handleStarClick = (idx: number) => {
    if (!isEditable) return;

    setCurRating(idx + 1);
  };

  return (
    <StarStyle color={color} gap={gap} size={size}>
      <div className={`star ${isEditable ? 'editable' : ''}`}>
        {starIcons?.map((starIcon: IconDefinition, idx: number) => (
          <FontAwesomeIcon icon={starIcon} key={idx} onClick={() => handleStarClick(idx)} />
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

    &.editable {
      cursor: pointer;
    }
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
