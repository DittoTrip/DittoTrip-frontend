import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import Star from '../common/Star';
import Dot from '../common/Dot';
import TagSlide from '../common/TagSlide';

interface SearchSpotDataType {
  img: string;
  name: string;
  distance: string;
  rating: number;
  address: string;
  reviewCount: number;
  tagList: string[];
}

interface Props {
  data: SearchSpotDataType;
}
const SearchSpot = ({ data }: Props) => {
  return (
    <SearchSpotStyle>
      <img className="spot-image" src={data.img} />
      <div className="spot-info">
        <div className="spot-info-header">
          <div className="spot-info-name">{data.name}</div>
          <div className="heart">
            <FontAwesomeIcon icon={faEmptyHeart} />
          </div>
        </div>

        <div className="spot-info-rating-wrapper">
          <div className="spot-info-rating">{data.rating}</div>
          <Star rating={data.rating} size={12} gap={3} />
          <div className="review-count">({data.reviewCount})</div>
        </div>

        <div className="spot-info-address-wrapper">
          <div className="spot-info-distance">{data.distance}</div>
          <Dot color={'gray40'} />
          <div className="spot-info-address">{data.address}</div>
          <FontAwesomeIcon className="more-icon" icon={faChevronDown} />
        </div>
        <TagSlide tagList={data.tagList} />
      </div>
    </SearchSpotStyle>
  );
};

const SearchSpotStyle = styled.div`
  display: flex;
  height: 116px;
  width: 100%;
  margin-bottom: 16px;

  border-bottom: solid 1px #b6b6b6;

  .spot-image {
    width: 120px;
    height: 100px;
    border-radius: 12px;
  }
  .spot-info {
    display: flex;
    flex-direction: column;

    padding-left: 24px;

    .spot-info-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 28px;

      .spot-info-name {
        ${({ theme }) => theme.font.body2};
      }
      .spot-info-distance {
        ${({ theme }) => theme.font.body4};
        color: ${({ theme }) => theme.color.gray80};
      }
    }

    .spot-info-rating-wrapper {
      display: flex;
      gap: 8px;

      ${({ theme }) => theme.font.body5}
      .review-count {
        color: ${({ theme }) => theme.color.gray60};
      }
    }

    .spot-info-address-wrapper {
      display: flex;
      align-items: center;
      gap: 3px;

      .spot-info-address {
        color: ${({ theme }) => theme.color.gray60};
        ${({ theme }) => theme.font.body4};
        width: 135px;

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
    .heart {
      font-size: 20px;
      path {
        color: ${({ theme }) => theme.color.keyColor};
      }
    }
  }
`;

export default SearchSpot;
