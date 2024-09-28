import React, { ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import heic2any from 'heic2any';

interface ImageUploaderProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

function MainImageUploader({ setSelectedImage, previewUrl, setPreviewUrl }: ImageUploaderProps) {
  const imageInput = useRef<HTMLInputElement>(null);

  // 이미지 업로드 버튼 클릭 시 파일 선택창 열기
  const onClickImageUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (imageInput.current !== null) {
      imageInput.current.click();
    }
  };

  // 이미지 선택 시 처리
  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     setSelectedImage(file); // 선택한 이미지 저장
  //     setPreviewUrl(URL.createObjectURL(file)); // 미리보기 URL 생성
  //   }
  // };
  // 이미지 선택 시 처리
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];

      if (
        file.type === 'image/heic' ||
        file.type === 'image/heif' ||
        file.name.endsWith('.HEIC') ||
        file.name.endsWith('.HEIF')
      ) {
        try {
          const blob = new Blob([file]);
          const transBlob = await heic2any({
            blob,
            quality: 0.1,
            toType: 'image/jpeg',
          });

          file = new File(
            [transBlob as Blob],
            file.name.replace(/\.heif/gi, '.jpg').replace(/\.heic/gi, '.jpg'),

            {
              type: 'image/jpeg',
              lastModified: new Date().getTime(),
            }
          );
        } catch (error) {
          console.error('HEIC/HEIF 변환 중 오류 발생: ', error);
          return;
        }
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 이미지 제거 처리
  const handleRemoveImage = () => {
    setSelectedImage(null); // 선택한 이미지 초기화
    setPreviewUrl(null); // 미리보기 URL 초기화
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // 메모리 해제
    }
  };

  // 컴포넌트가 언마운트될 때 메모리 해제
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <ImageUploaderStyle>
      <input
        className="btn-add-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={imageInput}
        style={{ display: 'none' }}
      />
      <div className="image-container">
        {previewUrl ? (
          <div className="image-wrapper">
            <button className="btn-remove-image" onClick={handleRemoveImage}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img className="image-preview" src={previewUrl} alt="Image Preview" />
          </div>
        ) : (
          <button onClick={onClickImageUpload} className="btn-add-image">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>
    </ImageUploaderStyle>
  );
}

// 스타일 정의
const ImageUploaderStyle = styled.div`
  .image-container {
    width: 120px;
    height: 120px;
    margin: 55px auto;
  }

  .image-wrapper {
    position: relative;
  }

  .image-preview {
    height: 120px;
    width: 120px;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    object-fit: cover;
  }

  .btn-add-image {
    height: 120px;
    width: 120px;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    path {
      color: ${({ theme }) => theme.color.gray40};
    }
  }

  .btn-remove-image {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: ${({ theme }) => theme.color.gray40};
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MainImageUploader;
