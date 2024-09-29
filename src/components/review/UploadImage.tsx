import React, { ChangeEvent, useRef } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface ImageUploaderProps {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

function ImageUploader({ selectedImages, setSelectedImages, previewUrls, setPreviewUrls }: ImageUploaderProps) {
  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImageUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (imageInput.current !== null) {
      imageInput.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const { t } = useTranslation();
    if (files.length + selectedImages.length > 10) {
      alert(`${t('message.img')}`);
      return;
    }

    const newImages = files.slice(0, 10 - selectedImages.length);
    setSelectedImages(prevImages => [...prevImages, ...newImages]);

    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });

    setPreviewUrls(prevUrls => {
      const updatedUrls = prevUrls.filter((_, i) => i !== index);
      return updatedUrls;
    });
  };

  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <ImageUploaderStyle>
      <input
        className="btn-add-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={imageInput}
        multiple
        style={{ display: 'none' }}
      />
      <div className="image-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button onClick={onClickImageUpload} className="btn-add-image">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {previewUrls.map((url, index) => (
          <img
            className="image-preview"
            key={index}
            src={url}
            alt={`Image Preview ${index}`}
            onClick={() => handleRemoveImage(index)}
          />
        ))}
      </div>
      <div className="file-length">({selectedImages.length}/10)</div>
    </ImageUploaderStyle>
  );
}

const ImageUploaderStyle = styled.div`
  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .image-preview {
    height: 77px;
    width: 77px;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    object-fit: cover;
  }
  .btn-add-image {
    height: 77px;
    width: 77px;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    background-color: transparent;
    path {
      color: ${({ theme }) => theme.color.gray40};
    }
  }
  .file-length {
    text-align: right;
    color: ${({ theme }) => theme.color.gray60};
  }
`;

export default ImageUploader;
