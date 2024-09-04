import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faBars } from '@fortawesome/free-solid-svg-icons';

const ToggleButtonComponent: React.FC = () => {
  const [isMapView, setIsMapView] = useState(true);

  const toggleView = () => {
    setIsMapView(!isMapView);
    if (isMapView) {
      // 여기에서 리스트 페이지로 전환
      console.log('리스트 페이지로 전환');
    } else {
      // 여기에서 지도 페이지로 전환
      console.log('지도 페이지로 전환');
    }
  };

  return (
    <ButtonContainer>
      <ToggleButton active={isMapView} onClick={toggleView}>
        <FontAwesomeIcon icon={isMapView ? faBars : faLocationCrosshairs} className="icon" />
        {isMapView ? '리스트' : '지도'}
      </ToggleButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 100px;
  width: 100%;

  display: flex;
  justify-content: center;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 14px 25px;
  ${({ theme }) => theme.font.body2};

  color: ${({ active }) => (active ? 'white' : 'black')};
  background-color: ${({ theme, active }) => (active ? theme.color.subColor1 : 'white')};

  border: none;
  border-radius: 100px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  .icon {
    path {
      color: ${({ active }) => (active ? 'white' : 'black')};
    }
  }
`;

export default ToggleButtonComponent;
