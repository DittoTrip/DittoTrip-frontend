import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import Dot from './Dot';
import TagSlide from './TagSlide';
import Star from './Star';
import { SpotData } from '../../models/Spot/spotModel';
import { defaultImage } from '../../constants/constant';

interface Props {
  data: SpotData;
  setSelectedAddress: (selectedAddress: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SpotItem = ({ data, setSelectedAddress, setIsOpen }: Props) => {
  const handleAddressClick = () => {
    setSelectedAddress(data.address);
    setIsOpen(true);
  };

  const handleHeartClick = () => {};
  const isLiked = true;

  return (
    <SpotItemStyle>
      <img className="spot-image" src={data.imagePath ?? defaultImage} />
      <div className="spot-info">
        <div className="spot-info-header">
          <div className="spot-info-name">{data.name}</div>
          <div className="heart">
            <FontAwesomeIcon icon={isLiked ? faHeart : faEmptyHeart} onClick={() => handleHeartClick()} />
          </div>
        </div>
        <div className="spot-info-rating-wrapper">
          <div className="spot-info-rating">{data.rating}</div>
          <Star rating={data.rating} size={12} gap={3} />
        </div>
        <div className="spot-info-address-wrapper" onClick={() => handleAddressClick()}>
          <div className="spot-info-distance">{'임시'}</div>
          <Dot color={'gray40'} />

          <div className="spot-info-address">{data.address}</div>
          <FontAwesomeIcon className="more-icon" icon={faChevronDown} />
        </div>
        <div className="spot-info-tag">
          <TagSlide tagList={data.hashtags} />
        </div>
      </div>
    </SpotItemStyle>
  );
};

const SpotItemStyle = styled.div`
  display: flex;
  gap: 16px;

  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray20};
  background-color: ${({ theme }) => theme.color.background};

  .spot-image {
    height: 100px;
    width: 128px;
    border-radius: 12px;
  }

  .spot-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex: 1;

    .spot-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      margin-bottom: 4px;

      .spot-info-name {
        ${({ theme }) => theme.font.body2};
      }

      .heart {
        path {
          color: ${({ theme }) => theme.color.keyColor};
        }
      }
    }
    .spot-info-rating-wrapper {
      display: flex;
      gap: 8px;

      ${({ theme }) => theme.font.body5}
    }

    .spot-info-address-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      .spot-info-distance {
        ${({ theme }) => theme.font.body4};
        color: ${({ theme }) => theme.color.gray80};
      }

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
    .spot-info-tag {
      width: 230px;
    }
  }
`;

export default SpotItem;
