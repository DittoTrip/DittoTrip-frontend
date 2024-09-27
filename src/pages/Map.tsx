import React, { useEffect, useState } from 'react';
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
  // const [markers, setMarkers] = useState<SpotData[]>([]);
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
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(spots[i].pointY, spots[i].pointX),
          image: markerImage,
        });
        // 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', function () {
          // alert(
          //   `이름: ${spots[i].name} / 별점: ${spots[i].rating} / 주소: ${spots[i].address} / 해시태그: ${spots[i].hashtags}`
          // );
        });

        marker.setMap(kakaoMap);
      }
    });

    // 지도 드래그 이벤트
    kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();

      console.log('지도 좌측 하단 위도, 경도', bound.ha, bound.qa);
      console.log('지도 우측 상단 위도, 경도', bound.oa, bound.pa);
      console.log('중심', center.Ma, center.La, 'zoom ', zoom);

      setLocation([center.Ma, center.La]);
      setZoom(newZoom);

      fetchSpots(bound.ha, bound.qa, bound.oa, bound.pa);
    });

    // 지도 확대/축소 이벤트
    kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();
      console.log('지도 좌측 하단 경도, 위도', bound.ha, bound.qa);
      console.log('지도 우측 상단 경도, 위도', bound.oa, bound.pa);
      console.log('중심', center.Ma, center.La, 'zoom ', zoom);

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
`;

export default Map;
