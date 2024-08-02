import React, { useEffect, useState } from 'react';
import MarkerImg from '../assets/marker.png';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const { kakao } = window;

const Map = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [location, setLocation] = useState([0, 0]);

  const imageSrc = MarkerImg;
  const imageSize = new kakao.maps.Size(20, 30);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById('map');
    const options = { center: new window.kakao.maps.LatLng(location[0], location[1]) };
    const kakaoMap = new kakao.maps.Map(container, options);

    // 마커 더미 데이터
    const position = [
      {
        title: '세종대',
        latlng: new kakao.maps.LatLng(37.55107703286589, 127.07239842359955),
      },
      {
        title: '세종대2',
        latlng: new kakao.maps.LatLng(37.55165239045389, 127.07445863039187),
      },
    ];

    // 마커 생성
    for (let i = 0; i < position.length; i++) {
      const marker = new kakao.maps.Marker({
        position: position[i].latlng,
        image: markerImage,
      });
      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, 'click', function () {
        alert(`click ${position[i].title}`);
      });

      marker.setMap(kakaoMap);
    }

    // 지도 이동 이벤트
    kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      console.log('지도 좌측 하단 위도, 경도', bound.ha, bound.qa);
      console.log('지도 우측 상단 위도, 경도', bound.oa, bound.pa);
      console.log('중심', center.La, center.Ma);
      setLocation([center.Ma, center.La]);
      // ha, qa : 지도 좌측하단 위도, 경도
      // oa, pa : 지도 우측 상단 위도, 경도
      // 마커 정보 받아오기 api 호출 => data를 변경해서 리렌더링할 것인지 / 지도 이동시 리렌더링
    });

    setMap(kakaoMap);
  }, [location]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default Map;
