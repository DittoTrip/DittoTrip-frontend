import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { defaultImage } from '../../constants/constant';
import { SpotVisit } from '../../models/spot/spotModel';
import MiniReviewItem from '../review/MiniReviewItem';
import TagSlide from '../common/TagSlide';
import formatDate from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: SpotVisit;
  setSelectedAddress: (selectedAddress: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const VisitedSpotCard = ({ data, setSelectedAddress, setIsOpen }: Props) => {
  const navigate = useNavigate();
  const handleAddressClick = () => {
    setSelectedAddress(data.address);
    setIsOpen(true);
  };

  const handleSpotClick = () => {
    navigate(`/spot/${data.spotId}`);
  };
  return (
    <VisitedSpotCardStyled>
      <div className="visit-date">{formatDate(data.createdDateTime)}</div>
      <div className="spot-section" onClick={handleSpotClick}>
        <div>
          <img className="spot-image" src={data.imagePath || defaultImage} />
        </div>
        <div className="spot-info">
          <div className="spot-info-name-wrapper">
            <div className="spot-info-name">{data.spotName}</div>
            <FontAwesomeIcon icon={faChevronRight} className="arrow-btn" />
          </div>
          <div className="spot-info-address-wrapper" onClick={() => handleAddressClick()}>
            <div className="spot-info-address">{data.address}</div>
            <FontAwesomeIcon className="more-icon" icon={faChevronDown} />
          </div>
          <div className="tag-wrapper">
            <TagSlide tagList={data.hashtags} />
          </div>
        </div>
      </div>

      {data.reviewMiniData && (
        <MiniReviewItem
          id={data.reviewMiniData.reviewId}
          userName={data.reviewMiniData.username}
          rating={data.reviewMiniData.rating}
          text={data.reviewMiniData.reviewBody}
        />
      )}
    </VisitedSpotCardStyled>
  );
};

const VisitedSpotCardStyled = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.background};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  padding: 20px 16px 10px 16px;
  margin-bottom: 20px;

  .visit-date {
    margin-bottom: 16px;

    color: ${({ theme }) => theme.color.gray60};
    ${({ theme }) => theme.font.body3};
  }
  .spot-section {
    display: flex;
    margin-bottom: 16px;

    .spot-image {
      width: 25vw;
      aspect-ratio: 1.3;
      border-radius: 12px;
      object-fit: cover;
    }

    .spot-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 16px;
      flex: 1;

      box-sizing: border-box;

      .spot-info-name-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;

        margin-bottom: 8px;
        .spot-info-name {
          ${({ theme }) => theme.font.body2};
        }
        .arrow-btn {
          font-size: 12px;
        }
      }

      .spot-info-address-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;

        .spot-info-address {
          color: ${({ theme }) => theme.color.gray60};
          ${({ theme }) => theme.font.body4};
          width: 160px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .more-icon {
          font-size: 7px;
        }

        path {
          color: ${({ theme }) => theme.color.gray60};
        }
      }
      .tag-wrapper {
        margin: 8px 0;
        width: 48vw;

        overflow-x: scroll;
      }
    }
  }
`;

export default VisitedSpotCard;
