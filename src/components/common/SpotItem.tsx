import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import Dot from './Dot';
import TagSlide from './TagSlide';
import Star from './Star';
import { defaultImage } from '../../constants/constant';
import useBookmarkedSpot from '../../hooks/spot/useSpotLike';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SpotData } from '../../models/spot/spotModel';

interface Props {
  data: SpotData;
  setSelectedAddress: (selectedAddress: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SpotItem = ({ data, setSelectedAddress, setIsOpen }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  // 주소 클릭
  const handleAddressClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAddress(data.address);
    setIsOpen(true);
  };

  // 좋아요 기능
  const [bookmarkedId, setBookmarkedId] = useState<number | null>();
  const { isBookmarked, toggleBookmark } = useBookmarkedSpot(data.spotId.toString(), bookmarkedId!);

  // 좋아요 id 저장 (삭제에 필요)
  useEffect(() => {
    setBookmarkedId(data.myBookmarkId);
  }, [data]);

  const handleHeartClick = (event: React.MouseEvent) => {
    console.log(isLoggedIn);
    event.stopPropagation();
    if (!isLoggedIn) {
      alert('로그인하세요');
      return;
    }
    toggleBookmark();
  };

  return (
    <SpotItemStyle onClick={() => navigate(`/spot/${data.spotId}`)}>
      <div className="spot-image-box">
        <img className="spot-image" src={data.imagePath ?? defaultImage} />
      </div>
      <div className="spot-info">
        <div className="spot-info-header">
          <div className="spot-info-name">{data.name}</div>
          <div className="heart">
            <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} onClick={handleHeartClick} />
          </div>
        </div>
        <div className="spot-info-rating-wrapper">
          <div className="spot-info-rating">{data.rating}</div>
          <Star rating={data.rating} size={12} gap={3} />
        </div>
        <div className="spot-info-address-wrapper" onClick={handleAddressClick}>
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
  width: 100vw-32px;

  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray20};
  background-color: ${({ theme }) => theme.color.background};

  .spot-image-box {
    height: 100px;
    aspect-ratio: 6/5;

    .spot-image {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .spot-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw - 168px;

    .spot-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

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
      margin-top: 10px;
      width: 100vw - 168px;
    }
  }
`;

export default SpotItem;
