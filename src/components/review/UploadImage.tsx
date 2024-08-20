import React, { useState, ChangeEvent } from 'react';

function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + selectedImages.length > 10) {
      alert('You can only upload up to 10 images.');
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
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} multiple />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image Preview ${index}`}
            style={{ width: '100px', height: '100px', cursor: 'pointer', objectFit: 'cover' }}
            onClick={() => handleRemoveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
