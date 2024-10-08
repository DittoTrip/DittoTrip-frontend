import { styled } from 'styled-components';

interface Props {
  photoList?: string[];
  width: number;
  height: number;
  gap: number;
  handleImageClick: (image: string) => void;
}

const PhotoSlide = ({ photoList, width, height, gap, handleImageClick }: Props) => {
  return (
    <PhotoSlideStyled width={width} height={height} gap={gap}>
      <ul className="photo-slide">
        {photoList?.map(item => {
          return (
            <li>
              <img src={item} className="still-cut" onClick={() => handleImageClick(item)} />
            </li>
          );
        })}
      </ul>
    </PhotoSlideStyled>
  );
};

const PhotoSlideStyled = styled.div<{ width: number; height: number; gap: number }>`
  .photo-slide {
    display: flex;

    gap: ${({ gap }) => gap}px;

    margin: 0;
    padding: 10px 0;

    white-space: nowrap;
    overflow-x: scroll;
    list-style: none;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  .still-cut {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    object-fit: cover;
  }
`;

export default PhotoSlide;
