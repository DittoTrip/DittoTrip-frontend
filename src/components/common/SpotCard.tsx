import { styled } from 'styled-components';
import Dot from './Dot';
import Star from './Star';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface AroundDataType {
  img: string;
  name: string;
  distance: string;
  rating: number;
  address: string;
}

interface Props {
  data: AroundDataType;
  setSelectedAddress: (selectedAddress: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SpotCard = ({ data, setSelectedAddress, setIsOpen }: Props) => {
  const handleAddressClick = () => {
    setSelectedAddress(data.address);
    setIsOpen(true);
  };
  return (
    <SpotCardStyled>
      <img className="spot-image" src={data.img} />
      <div className="spot-info">
        <div className="spot-info-header">
          <div className="spot-info-name">{data.name}</div>
          <Dot color={'gray40'} />
          <div className="spot-info-distance">{data.distance}</div>
        </div>
        <div className="spot-info-rating-wrapper">
          <div className="spot-info-rating">{data.rating}</div>
          <Star rating={data.rating} size={12} gap={3} />
        </div>
        <div className="spot-info-address-wrapper" onClick={() => handleAddressClick()}>
          <div className="spot-info-address">{data.address}</div>
          <FontAwesomeIcon className="more-icon" icon={faChevronDown} />
        </div>
      </div>
    </SpotCardStyled>
  );
};

const SpotCardStyled = styled.div`
  display: flex;
  height: 100px;

  margin-bottom: 16px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.background};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .spot-image {
    width: 128px;
    border-radius: 12px;
  }
  .spot-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;

    .spot-info-header {
      display: flex;
      align-items: center;
      gap: 8px;

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
    }

    .spot-info-address-wrapper {
      display: flex;
      align-items: center;

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
  }
`;

export default SpotCard;
