import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
interface Props {
  rating: number;
}
const Star = ({ rating }: Props) => {
  console.log(rating);
  return (
    <StarStyle>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStarHalfStroke} />
    </StarStyle>
  );
};

const StarStyle = styled.div``;

export default Star;
