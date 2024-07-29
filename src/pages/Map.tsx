import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [location, setLocation] = useState([0, 0]);

  const mapRef = useRef(null);
  const { kakao } = window;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });

    if (window.kakao && window.kakao.maps) {
      const options = {
        center: new window.kakao.maps.LatLng(location[0], location[1]), // Map center coordinates.
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
    } else {
      console.error('Kakao maps library is not loaded.');
    }
  }, [location]);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Map;
