import { styled } from 'styled-components';
import { defaultImage } from '../../constants/constant';

interface DittoItemProps {
  img: string;
  title: string;
}

const DittoItem = ({ img, title }: DittoItemProps) => {
  return (
    <DittoItemStyled>
      <img className="ditto-item-img" src={img ?? defaultImage} alt={title} />
      <div className="ditto-item-name">{title}</div>
    </DittoItemStyled>
  );
};

const DittoItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin-right: 8px;

  .ditto-item-img {
    width: 100px;
    height: 128px;
    object-fit: cover;
    border-radius: 12px;
  }
  .ditto-item-name {
    width: 100px;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ theme }) => theme.font.body3}
  }
`;

export default DittoItem;
