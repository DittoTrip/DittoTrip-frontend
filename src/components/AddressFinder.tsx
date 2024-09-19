import { Dispatch, SetStateAction, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import { UseFormSetValue } from 'react-hook-form';
import { ISpotForm } from '../pages/SpotApply';

interface IAddressFinder {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<ISpotForm>;
}

const AddressFinder = ({ setValue, isOpen, setIsOpen }: IAddressFinder) => {
  // 팝업이 열리면 스크롤을 막고, 닫히면 스크롤을 다시 활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 언마운트될 때 스크롤 다시 활성화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 주소 검색 완료 시 처리할 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    getPosByAddress(fullAddress).then(({ pointX, pointY }) => {
      setValue('pointX', pointX);
      setValue('pointY', pointY);
      setValue('address', fullAddress);

      setIsOpen(false);
    });
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <Overlay onClick={handleOverlayClick}>
        <div className="popup" onClick={handlePopupClick}>
          <IoCloseSharp fill="#888" size={28} className="close-icon" onClick={() => setIsOpen(false)} />
          <DaumPostcode onComplete={handleComplete} />
        </div>
      </Overlay>
    )
  );
};

export default AddressFinder;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: hidden;

  .popup {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 90vw;
    overflow: auto;
    position: relative;
    padding-top: 46px;

    .close-icon {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 1;
      cursor: pointer;
    }
  }
`;

const getPosByAddress = (query: string) =>
  axios
    .get('https://dapi.kakao.com/v2/local/search/address.json', {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_API_KAKAO_CLIENT_ID}`,
      },
      params: {
        query: query,
      },
    })
    .then(response => {
      return { pointX: Number(response.data.documents[0].x), pointY: Number(response.data.documents[0].y) };
    })
    .catch(error => error);
