import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  isMap: boolean;
}
const ToggleButtonComponent = ({ isMap }: Props) => {
  // true: list view, false: map view
  const [isMapView, setIsMapView] = useState<boolean>(isMap);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleView = () => {
    if (isMapView) {
      setIsMapView(!isMapView);
      navigate(`/spot/list/${id}`);
      console.log('리스트 페이지로 전환');
    } else {
      setIsMapView(!isMapView);
      navigate(`/spot/map/${id}`);
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
  right: 20px;
  display: flex;
  z-index: 10;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;

  padding: 8px 12px;
  ${({ theme }) => theme.font.body2};

  color: ${({ active }) => (active ? 'white' : 'black')};
  background-color: ${({ theme, active }) => (active ? theme.color.subColor1 : 'white')};

  border: none;
  border: 1px solid ${({ active, theme }) => (active ? theme.color.subColor1 : 'black')};
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
