import { styled } from 'styled-components';
import { SpotImageData } from '../../models/spot/spotModel';

interface Props {
  photoList?: SpotImageData[];
  width: number;
  height: number;
  gap: number;
}

const PhotoSlide = ({ photoList, width, height, gap }: Props) => {
  return (
    <PhotoSlideStyled width={width} height={height} gap={gap}>
      <ul className="photo-slide">
        {photoList?.map(item => {
          return (
            <li>
              <img src={item.imagePath} className="still-cut" />
            </li>
          );
        })}
      </ul>
    </PhotoSlideStyled>
  );
};

const PhotoSlideStyled = styled.div<{ width: number; height: number; gap: number }>`
  .photo-slide {
    display: grid;
    grid-auto-flow: column;

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
  }
`;

export default PhotoSlide;
