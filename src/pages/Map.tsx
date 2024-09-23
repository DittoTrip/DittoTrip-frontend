import React, { useEffect, useState } from 'react';
import MarkerImg from '../assets/marker.png';
import ToggleButtonComponent from '../components/common/ToggleView';
import { spotMapList } from '../api/spot';
import { useParams } from 'react-router-dom';
import { SpotData } from '../models/spot/spotModel';

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
  const [currentLocation, setCurrentLocation] = useState([36, 127]);
  const [location, setLocation] = useState([36, 127]);
  const [zoom, setZoom] = useState(10);
  const [markers, setMarkers] = useState<SpotData[]>([]);
  const { id } = useParams();

  const imageSrc = MarkerImg;
  const imageSize = new kakao.maps.Size(20, 30);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  const [start, setStart] = useState([36, 127]);
  const [end, setEnd] = useState([36, 127]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
    console.log('navigator.geolocation.getCurrentPosition', location);
  }, []);

  // 관련 spot list API
  const fetchSpots = async (startX: number, startY: number, endX: number, endY: number) => {
    const req = { startX, startY, endX, endY };

    const response = await spotMapList(id!, req);
    console.log(response);

    setMarkers(response.spotDataList);
    drawMarkers();
  };

  const drawMarkers = () => {
    // 마커 생성
    for (let i = 0; i < markers.length; i++) {
      const marker = new kakao.maps.Marker({
        markers: new kakao.maps.LatLng(new kakao.maps.LatLng(markers[i].pointY, markers[i].pointX)),
        image: markerImage,
      });
      console.log(markers[i].pointY, markers[i].pointX);
      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, 'click', function () {
        alert(`click ${markers[i].name}, ${markers[i].pointX}, ${markers[i].pointY}`);
      });

      marker.setMap(map);
    }
  };

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById('map');
    const options = { center: new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]), level: 20 };
    const kakaoMap = new kakao.maps.Map(container, options);

    // // 지도 이동 이벤트
    kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();
      console.log('----드래그 변경----');

      console.log('지도 좌측 하단 위도, 경도', bound.ha, bound.qa);
      console.log('지도 우측 상단 위도, 경도', bound.oa, bound.pa);
      console.log('중심', center.Ma, center.La);

      setStart([bound.ha, bound.qa]);
      setEnd([bound.oa, bound.pa]);
      setLocation([center.Ma, center.La]);
      setZoom(newZoom);
      console.log('zoom', newZoom);

      // ha, qa : 지도 좌측하단 위도, 경도
      // oa, pa : 지도 우측 상단 위도, 경도
      // 마커 정보 받아오기 api 호출 => data를 변경해서 리렌더링할 것인지 / 지도 이동시 리렌더링
    });

    kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
      const bound = kakaoMap.getBounds();
      const center = kakaoMap.getCenter();
      const newZoom = kakaoMap.getLevel();
      console.log('----줌 변경----');
      console.log('지도 좌측 하단 경도, 위도', bound.ha, bound.qa);
      console.log('지도 우측 상단 경도, 위도', bound.oa, bound.pa);
      console.log('중심', center.Ma, center.La);
      console.log('zoom', newZoom);

      setLocation([center.Ma, center.La]);
      setStart([bound.ha, bound.qa]);
      setEnd([bound.oa, bound.pa]);
      setZoom(newZoom);
      console.log('zoom', zoom);
    });

    setMap(kakaoMap);
  }, [currentLocation]);

  useEffect(() => {
    console.log('맵 변경');
    if (map) {
      const bound = map.getBounds();
      const center = map.getCenter();
      const newZoom = map.getLevel();
      console.log('----줌 변경----');
      console.log('지도 좌측 하단 경도, 위도 ', bound.ha, bound.qa);
      console.log('지도 우측 상단 경도, 위도', bound.oa, bound.pa);
      console.log('중심', center.Ma, center.La);
      console.log('zoom', newZoom);

      setLocation([center.Ma, center.La]);
      setZoom(newZoom);
      console.log('zoom', zoom);
      fetchSpots(bound.ha, bound.qa, bound.oa, bound.pa);
    }
  }, [map, start, end]);

  return (
    <div>
      <ToggleButtonComponent isMap={true} />
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default Map;
