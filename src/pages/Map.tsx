import { useEffect, useState } from 'react';
import MarkerImg from '../assets/marker.png';
import ToggleButtonComponent from '../components/common/ToggleView';
import { spotMapList } from '../api/spot';
import { useParams } from 'react-router-dom';
import AppBar from '../components/common/AppBar';
import { CategoryData } from '../models/category/categoryModel';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useBookmarkedCategory from '../hooks/category/useCategoryLike';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const { kakao } = window;

const Map = () => {
  const [location, setLocation] = useState([36, 127]);
  const [zoom, setZoom] = useState(9);
  const { id } = useParams();

  const imageSrc = MarkerImg;
  const imageSize = new kakao.maps.Size(20, 30);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const [category, setCategory] = useState<CategoryData>();

  const { isBookmarked, toggleBookmark } = useBookmarkedCategory(id!);

  const handleHeartClick = () => {
    toggleBookmark();
  };

  // 현재 위치 받아오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  // 관련 spot list API
  const fetchSpots = async (startX: number, startY: number, endX: number, endY: number) => {
    const req = { startX, startY, endX, endY };

    const response = await spotMapList(id!, req);
    console.log(response);

    setCategory(response.categoryData);
    return response.spotDataList;
  };

  // 이동 시 새로운 지도 그리기
  useEffect(() => {
    const container = document.getElementById('map');
    const options = { center: new window.kakao.maps.LatLng(location[0], location[1]), level: zoom };
    const kakaoMap = new kakao.maps.Map(container, options);

    const bound = kakaoMap.getBounds();

    fetchSpots(bound.ha, bound.qa, bound.oa, bound.pa).then(spots => {
      for (let i = 0; i < spots.length; i++) {
        const position = new kakao.maps.LatLng(spots[i].pointY, spots[i].pointX);
        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: position,
          image: markerImage,
        });

        // 태그 2개만 뽑기
        const tagHTML = spots[i].hashtags
          ? spots[i].hashtags
              .slice(0, 2)
              .map(item => `<span class='tag'>#${item}</span>`)
              .join(' ')
          : '';

        // 오버레이
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content:
            `<a class='map-overlay'  href='/spot/${spots[i].spotId}' >` +
            `<div class="spot-image-box">` +
            `<img class="spot-image" src=${spots[i].imagePath} />` +
            `</div>` +
            `<div class="spot-info">` +
            `<div class="spot-info-header">` +
            `<div class="spot-info-name">${spots[i].name}</div>` +
            `<div class="spot-info-rating">${spots[i].rating.toFixed(1)}</div>` +
            `</div>` +
            `<div class="spot-info-address-wrapper" onClick={handleAddressClick}>` +
            `<div class="spot-info-distance">${'300m'}</div>` +
            `<div class="spot-info-address">${spots[i].address}</div>` +
            `<FontAwesomeIcon className="more-icon" icon={faChevronDown} />` +
            `</div>` +
            `<div class="spot-info-tag-wrapper">` +
            `<div class="tag-slide">` +
            tagHTML +
            `</div>` +
            `</div>` +
            `</div>` +
            `</a>`,

          xAnchor: 0.5,
          yAnchor: 1.7,
        });

        // 마커 클릭시 오버레이 표시
        kakao.maps.event.addListener(marker, 'click', function () {
          customOverlay.setMap(kakaoMap);
        });

        // 맵 클릭 시 오버레이 제거
        kakao.maps.event.addListener(kakaoMap, 'click', function () {
          customOverlay.setMap(null);
        });

        marker.setMap(kakaoMap);
      }
    });

    // 지도 드래그 이벤트
    kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();

      // console.log('지도 좌측 하단 위도, 경도', bound.ha, bound.qa);
      // console.log('지도 우측 상단 위도, 경도', bound.oa, bound.pa);
      // console.log('중심', center.Ma, center.La, 'zoom ', zoom);

      setLocation([center.Ma, center.La]);
      setZoom(newZoom);

      fetchSpots(bound.ha, bound.qa, bound.oa, bound.pa);
    });

    // 지도 확대/축소 이벤트
    kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();
      // console.log('지도 좌측 하단 경도, 위도', bound.ha, bound.qa);
      // console.log('지도 우측 상단 경도, 위도', bound.oa, bound.pa);
      // console.log('중심', center.Ma, center.La, 'zoom ', zoom);

      setLocation([center.Ma, center.La]);
      setZoom(newZoom);

      fetchSpots(bound.ha, bound.qa, bound.oa, bound.pa);
    });
  }, [location, zoom]);

  return (
    <MapStyle>
      <ToggleButtonComponent isMap={true} />
      <div className="app-bar">
        <AppBar
          leading={true}
          title={<div className="title">{category?.name}</div>}
          action={
            <div className="heart">
              <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} onClick={handleHeartClick} />
            </div>
          }
        />
      </div>

      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </MapStyle>
  );
};

const MapStyle = styled.div`
  .app-bar {
    ${({ theme }) => theme.font.subTitle}

    .heart {
      font-size: 20px;
      path {
        color: ${({ theme }) => theme.color.keyColor};
      }
    }
  }

  .map-overlay {
    display: flex;
    gap: 16px;

    width: 300px;
    height: 120px;

    padding: 14px;

    text-decoration: none;
    background-color: white;
    boarder-radius: 16px;
    border-radius: 16px;
  }
  .spot-image-box {
    width: 90px;
    height: 90px;
    border-radius: 16px;
  }
  .spot-image {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 16px;
  }
  .spot-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .spot-info-header {
      display: flex;
      align-items: center;
      gap: 4px;

      margin-bottom: 4px;

      .spot-info-name {
        ${({ theme }) => theme.font.body2};
      }

      .spot-info-rating {
        ${({ theme }) => theme.font.body5}
      }
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
    }
  }

  .tag-slide {
    width: 100%;
    display: flex;
    gap: 24px 8px;

    margin: 0;
    padding: 0;
    margin-top: 6px;

    white-space: nowrap;
    overflow-x: scroll;
    list-style: none;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .tag {
    width: fit-content;
    padding: 2px 12px;

    border-radius: 15px;

    background-color: ${({ theme }) => theme.color.subColor3};
    color: black;
    ${({ theme }) => theme.font.body4};
  }
`;

export default Map;
